import Api from "@/api/Api";

const order = {
    //set namespace true
    namespaced: true,

    //state
    state: {
        orders: [],
        detailOrder: {},
        productInOrder: []
    },

    //mutations
    mutations: {
        GET_ORDER(state, orders)
        {
            state.orders = orders
        },
        //detail order
        DETAIL_ORDER(state, detailOrder)
        {
            state.detailOrder = detailOrder
        },
        PRODUCT_IN_ORDER(state, product)
        {
            state.productInOrder = product
        }
    },

    //actions
    actions: {
        getOrder({commit})
        {
            const token = localStorage.getItem('token');
            Api.defaults.headers.common['Authorization'] = "Bearer "+token;
            Api.get('/order')
            .then(response => {
                commit('GET_ORDER', response.data.data)
            })
        },
        detailOrder({commit}, snap_token)
        {
            const token = localStorage.getItem('token');
            Api.defaults.headers.common['Authorization'] = "Bearer "+token;
            Api.get(`order/${snap_token}`)
            .then(response => {
                commit('DETAIL_ORDER', response.data.data);
                commit('PRODUCT_IN_ORDER', response.data.product);
            })

        }
    },

    //getters
    getters: {
        getOrder(state)
        {
            return state.orders
        },
        //getter detailOrder
        detailOrder(state)
        {
            return state.detailOrder
        },
        //getter productInOrder
        productInOrder(state)
        {
            return state.productInOrder
        }
    }
}

export default order