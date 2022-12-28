import Api from "@/api/Api";

const auth = {
    //set namespace true
    namespaced: true,

    //state
    state: {
        //state untuk token, pakai localStorage
        token: localStorage.getItem('token') || '',
        //state user, simpan data user yang sedang login
        user: JSON.parse(localStorage.getItem('user')) || {}
    },

    //mutations
    mutations: {
        AUTH_SUCCESS(state, token, user)
        {
            state.token = token; //assign state token dengan response token
            state.user = user; //assign state user dengan response user
        },
        //update state user dari hasil response register/login
        GET_USER(state, user)
        {
            state.user = user;
        },
        AUTH_LOGOUT(state)
        {
            state.token = '';
            state.user = {};
        }
    },

    //actions
    actions: {
        register({commit}, user)
        {
            //define callback promise
            return new Promise((resolve, reject) => {
                Api.post('/register', {
                    //data yang dikirim ke serve untuk proses register
                    name: user.name,
                    email: user.email,
                    password: user.password,
                    password_confirmation: user.password_confirmation
                })
                .then(response => {
                    //define variable dengan isi hasil response dari server
                    const token = response.data.token;
                    const user = response.data.user;

                    //set localStorage untuk menyimpan token dan data user
                    localStorage.setItem('token', token);
                    localStorage.setItem('user', JSON.stringify(user));

                    //set default header axios dengan token
                    Api.defaults.headers.common['Authorization'] = "Bearer " + token

                    //commit auth success ke mutation
                    commit('AUTH_SUCCESS', token, user)

                    //resolve ke component dengan hasil response
                    resolve(response);
                })
                .catch(error => {
                    //jika gagal, hapus localStorage dengan key token
                    localStorage.removeItem('token');

                    //reject ke component dengan hasil response
                    reject(error.response.data);
                })
            })
        },
        getUser({commit}){
            const token = localStorage.getItem('token');

            Api.defaults.headers.common['Authorization'] = "Bearer " +token;

            Api.get('/user')
            .then(response => {
                //commit ke mutation GET_USER dengan hasil response
                commit('GET_USER', response.data.user)
            })
        },
        logout({commit})
        {
            return new Promise((resolve) => {
                //commit ke mutation logout
                commit('AUTH_LOGOUT');
                //remove value dari localStorage
                localStorage.removeItem('token')
                localStorage.removeItem('user')

                /**
                 * Untuk mereset cart saat logout
                 */
                commit('cart/GET_CART', 0, {root: true});
                commit('cart/TOTAL_CART', 0, {root: true});

                //delete header axios
                delete Api.defaults.headers.common['Authorization'];

                resolve()
            })
        },
        //action login
        login({commit}, user)
        {
            //define callback promise
            return new Promise((resolve, reject) => {
                Api.post('/login', {
                    //data yang dikirim ke server
                    email: user.email,
                    password: user.password
                })
                .then(response => {
                    const token = response.data.token;
                    const user = response.data.user;
                    //simpan ke localStorage
                    localStorage.setItem('token', token);
                    localStorage.setItem('user', JSON.stringify(user));
                    //set default header axios dengan token
                    Api.defaults.headers.common['Authorization'] = "Bearer "+token;

                    //commit auth succes ke mutation
                    commit('AUTH_SUCCESS', token, user)

                    //commmit get user ke mutation
                    commit('GET_USER', user);

                    /***
                     * commit cart total dan cart count ke state yang ada di module cart
                     */
                    //get data cart
                    Api.get('/cart')
                    .then(response => {
                        commit('cart/GET_CART', response.data.cart, {root: true})
                        //tambah root menjadi true, karena beda module
                    })

                    //get total cart
                    Api.get('/cart')
                    .then(response => {
                        commit('cart/TOTAL_CART', response.data.total, {root: true})
                        //tambah root menjadi true, karena beda module
                    })

                    //resolve ke component dengan hasil response
                    resolve(response);
                })
                .catch(error => {
                    //jika gagal, hapus localStorage dengan key token
                    localStorage.removeItem('token')

                    //reject ke component dengan hasil response
                    reject(error.response.data)
                })
            })
        }
    },

    //getters
    getters: {
        currentUser(state)
        {
            return state.user; //return data user
        },

        //loggedIn
        isLoggedIn(state)
        {
            return state.token; //return data token
        }
    }
}

export default auth