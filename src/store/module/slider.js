import Api from "@/api/Api";

const slider = {
    //set namespace true
    namespaced: true,

    //state
    state: {
        sliders: []
    },

    //mutations
    mutations: {
        GET_SLIDERS(state, sliders)
        {
            state.sliders = sliders
        }
    },

    //actions
    actions: {
       getSliders({commit})
       {
            const token = localStorage.getItem('token');
            Api.defaults.headers.common['Authorization'] = "Bearer "+token;
           Api.get('/sliders')
           .then(response => {
               commit('GET_SLIDERS', response.data.data)
           })
           .catch(error => {
               console.log(error)
           })
       }
    },

    //getters
    getters: {
        getSliders(state)
        {
            return state.sliders
        }
    }
}

export default slider