import Api from "@/api/Api";

const product = {
    //set namespace true
    namespaced: true,

    //state
    state: {
        //array -> biasanya untuk data yg banyak
        products: [],
        //object -> biasanya untuk data yg hanya 1 baris
        product: {}
    },

    //mutations
    mutations: {
        GET_PRODUCTS(state, products)
        {
            state.products = products
        },
        DETAIL_PRODUCT(state, product)
        {
            state.product = product
        }
    },

    //actions
    actions: {
       getProducts({commit})
       {
            const token = localStorage.getItem('token');
            Api.defaults.headers.common['Authorization'] = "Bearer "+token;
            Api.get('/products')
            .then(response => {
                commit('GET_PRODUCTS', response.data.products)
            })
            .catch(error => {
                console.log(error)
            })
       },
       getDetailProduct({commit}, slug)
       {
            const token = localStorage.getItem('token');
            Api.defaults.headers.common['Authorization'] = "Bearer "+token;
            //ambil data product berdasarkan slug
            Api.get(`product/${slug}`)
            .then(response => {
                //hasilnya simpan ke state product
                commit('DETAIL_PRODUCT', response.data.product)
            })
            .catch(error => {
                console.log(error)
            })
       }
    },

    //getters
    getters: {
        getProducts(state)
        {
            return state.products
        }
    }
}

export default product