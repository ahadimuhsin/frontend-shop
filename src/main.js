import { createApp } from 'vue'
import App from './App.vue'
import Notifications from '@kyvg/vue3-notification'

// import router
import router from './router';

//vuex
import store from './store/index';

const app = createApp(App);

app.use(router);

app.use(store);
app.use(Notifications);

app.mixin({
    methods: {
        moneyFormat(number)
        {
            let reverse = number.toString().split('').reverse().join(''),
            thousands = reverse.match(/\d{1,3}/g)
            thousands = thousands.join('.').split('').reverse().join('')
            return thousands;
        },

        // calculate discount
        calculateDiscount(product)
        {
            return product.price - (product.price * (product.discount)/100)
        }
    }
});

app.mount("#app");
