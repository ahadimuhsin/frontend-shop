<template>
    <header class="section-header">
        <section class="header-main border-bottom">
            <div class="container-fluid">
                <div class="row align-items-center">
                    <div class="col-md-3 col-7">
                        <router-link :to="{name: 'home'}" class="text-decoration-none" data-abc="true">
                            <span class="logo">
                                <i class="fa fa-apple-alt">Toko Apple</i>
                            </span>
                        </router-link>
                    </div>
                    <div class="col-md-5 d-none d-md-block">
                        <form class="search-wrap">
                            <div class="input-group w-100">
                                <input type="text" class="form-control search-form"
                                style="width:55%; border: 1px solid #ffffff" name="q"
                                placeholder="Cari Barang">
                                <div class="input-group-append">
                                    <button class="btn search-button" type="submit">
                                        <i class="fa fa-search"></i>
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                    <div class="col-md-4 col-5">
                        <div class="d-flex justify-content-end">
                            <div class="cart-header">
                                <router-link :to="{name: 'cart'}" class="btn search-button btn-md"
                                style="color: #fff; background-color: #6677ef; border-color: #fff">
                                    <i class="fa fa-shopping-cart"> {{ cartCount }} | Rp. {{moneyFormat(cartTotal)}}</i>
                                </router-link>
                            </div>
                            <div class="acoount">
                                <router-link :to="{name: 'login'}" v-if="!isLoggedIn" class="btn search-button btn-md d-none d-md-block ml-4">
                                    <i class="fa fa-user-circle"></i> ACCOUNT
                                </router-link>
                                <router-link :to="{name: 'dashboard'}" v-else class="btn search-button btn-md d-none d-md-block ml-4">
                                    <i class="fa fa-tachometer-alt"></i> DASHBOARD
                                </router-link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </header>
</template>

<script>
import { computed, onMounted } from "vue";
import { useStore } from "vuex";
export default {
    setup() {
        const store = useStore();

        //computed
        const isLoggedIn = computed (() => {
            //get getters is LoggedIn dari module auth
            return store.getters['auth/isLoggedIn']
        })

        const cartCount = computed(() => {
            // console.log(store.getters['cart/cartCount'])
            return store.getters['cart/cartCount']
        })

        const cartTotal = computed(() => {
            return store.getters['cart/cartTotal']
        })

        //onMounted -> dijalankan saat page terload
        onMounted (() => {
            const token = store.state.auth.token;
            if(!token)
            {
                return
            }
            //panggil action cartCount
            store.dispatch('cart/cartCount');
            //panggil aksi cartTotal
            store.dispatch('cart/cartTotal');
        })

        return {
            store,
            isLoggedIn,
            cartCount,
            cartTotal
        }
    },
}
</script>