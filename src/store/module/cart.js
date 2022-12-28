import Api from "@/api/Api"
const cart = {
    namespaced: true,

    state: {
        cart: [],
        cartTotal: 0,
        cartWeight: 0
    },

    mutations: {
        GET_CART(state, product)
        {
            state.cart = product
        },
        TOTAL_CART(state, total)
        {
            state.cartTotal = total
        },
        CART_WEIGHT(state, weight)
        {
            state.cartWeight = weight
        },
        //clear all cart
        CLEAR_CART(state)
        {
            state.cart = [];
            state.cartTotal = 0;
            state.cartWeight = 0;
        }
    },

    actions: {
        addToCart({commit}, {product_id, price, quantity, weight})
        {
            const token = localStorage.getItem('token');
            const user = JSON.parse(localStorage.getItem('user'));

            //set axios header dengan bearer token
            Api.defaults.headers.common['Authorization'] = "Bearer "+token;

            //send cart ke server
            Api.post('/cart', {
                product_id: product_id,
                price: price,
                quantity: quantity,
                weight: weight,
                customer_id: user.id
            })
            .then(response => {
                //get data cart
                Api.get('/cart')
                .then(response => {
                    commit('GET_CART', response.data.cart)
                })

                //get total cart
                Api.get('/cart/total-price')
                .then(response => {
                    commit('TOTAL_CART', response.data.total)
                })

                //get total weight
                Api.get('/cart/total-weight')
                .then(response => {
                    commit('CART_WEIGHT', response.data.total)
                })
            })
        },

        cartCount({commit})
        {
            const token = localStorage.getItem('token');
            //set axios header dengan bearer token
            Api.defaults.headers.common['Authorization'] = "Bearer "+token;
            Api.get('/cart')
            .then(response => {
                console.log(response.data.cart)
                commit('GET_CART', response.data.cart)
            })
        },

        cartTotal({commit})
        {
            const token = localStorage.getItem('token');
            //set axios header dengan bearer token
            Api.defaults.headers.common['Authorization'] = "Bearer "+token;
            Api.get('/cart/total-price')
            .then(response => {
                commit('TOTAL_CART', response.data.total)
            })
        },

        cartWeight({commit})
        {
            const token = localStorage.getItem('token');
            //set axios header dengan bearer token
            Api.defaults.headers.common['Authorization'] = "Bearer "+token;
            Api.get('/cart/total-weight')
            .then(response => {
                commit('CART_WEIGHT', response.data.total)
            })
        },
        removeCart({commit}, cart_id)
        {
            const token = localStorage.getItem('token');
            //set axios header dengan bearer token
            Api.defaults.headers.common['Authorization'] = "Bearer "+token;
            Api.post('/cart/remove', {
                cart_id: cart_id
            })
            .then(() => {
                //jika proses remove berhasil, update data cart terbaru
                Api.get('/cart')
                .then(response => {
                    commit('GET_CART', response.data.cart)
                })
                //get total cart
                Api.get('/cart/total-price')
                .then(response => {
                    commit('TOTAL_CART', response.data.total)
                })

                //get total weight
                Api.get('/cart/total-weight')
                .then(response => {
                    commit('CART_WEIGHT', response.data.total)
                })
            })
        },
        checkout({commit}, data)
        {
            return new Promise((resolve, reject) => {
                const token = localStorage.getItem('token');
                //set axios header dengan bearer token
                Api.defaults.headers.common['Authorization'] = "Bearer "+token;
                Api.post('/checkout', {
                    courier: data.courier_type,
                    service: data.courier_service,
                    cost_courier: data.courier_cost,
                    weight: data.weight,
                    name: data.name,
                    province: data.province_id,
                    phone: data.phone,
                    city: data.city_id,
                    address: data.address,
                    grand_total: data.grandTotal,
                })
                .then(response => {
                    resolve(response.data);
                    //remove all cart on database
                    Api.post('/cart/remove-all')
                    .then(() => {
                        //commit to clear_cart mutation
                        commit('CLEAR_CART')
                    })
                    .catch(error => {
                        console.log(error)
                    })
                })
                .catch(error => {
                    reject(error);
                })
            })
        }
    },

    getters: {
        //get cart
        getCart(state)
        {
            return state.cart
        },
        cartCount(state)
        {
            return state.cart.length
        },
        cartTotal(state)
        {
            return state.cartTotal
        }
    }
}

export default cart