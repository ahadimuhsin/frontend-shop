import Api from "@/api/Api";

const category = {
    //set namespace true
    namespaced: true,

    //state
    state: {
        categories: [],
        productInCategory: []
    },

    //mutations
    mutations: {
        GET_CATEGORIES(state, categories)
        {
            state.categories = categories
        },
        //set state productInCategory data dari response
        PRODUCT_IN_CATEGORY(state, products)
        {
            state.productInCategory = products
        }
    },

    //actions
    actions: {
       getCategories({commit})
       {
            const token = localStorage.getItem('token');
            Api.defaults.headers.common['Authorization'] = "Bearer "+token;
           //get data categories ke server
           Api.get('/categories')
           .then(response => {
               commit('GET_CATEGORIES', response.data.data)
           })
           .catch(error => {
               console.log(error)
           })
       },
       getProductInCategory({commit}, slug)
       {
            const token = localStorage.getItem('token');
            Api.defaults.headers.common['Authorization'] = "Bearer "+token;
            Api.get(`category/${slug}`)
            .then(response => {
                commit('PRODUCT_IN_CATEGORY', response.data.product)
            }).catch(error => {
                console.log(error);
            })
       }
    },

    //getters
    getters: {
        getCategories(state)
        {
            return state.categories
        }
    }
}

export default category