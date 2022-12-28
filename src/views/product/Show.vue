<template>
    <div class="container mt-5 mb-5">
        <div class="row">
            <div class="col-md-4">
                <div class="card border-0 rounded shadow">
                    <div class="card-body p-2">
                        <img :src="product.image" class="w-100 border">
                    </div>
                </div>
            </div>
            <div class="col-md-8">
                <div class="card border-0 rounded shadow">
                    <div class="card-body">
                        <label class="font-weight-bold" style="font-size: 20px">
                            {{ product.title }}
                        </label>
                        <hr>
                        <div class="price-product" id="price-product" style="font-size: 1.35rem">
                            <span class="font-weight-bold mr-4" style="color: green">
                                Rp. {{ calculateDiscount(product) }}
                            </span>
                            <s class="font-weight-bold" style="text-decoration-color: red">
                                Rp. {{ product.price }}
                            </s>
                        </div>
                        <table class="table-borderless mt-3">
                            <tr>
                                <td class="font-weight-bold">Diskon</td>
                                <td>:</td>
                                <td>
                                    <button class="btn btn-sm" style="color: #ff2f00;border-color: #ff2f00">
                                    Diskon {{ product.discount }} %
                                    </button>
                                </td>
                            </tr>
                            <tr>
                                <td class="font-weight-bold">Berat</td>
                                <td>:</td>
                                <td>
                                    <span class="badge badge-pill badge-success" style="font-size: 14px; border-radius: .3rem; padding: .25em .5em .2em;">
                                        {{ product.weight }} gram
                                    </span>
                                </td>
                            </tr>
                        </table>
                        <button class="btn btn-primary btn-lg btn-block"
                        @click.prevent="addToCart(product.id, calculateDiscount(product), product.weight)">
                            <i class="fa fa-shopping-cart"></i>
                            Tambah Ke Keranjang
                        </button>
                    </div>
                </div>
            </div>
        </div>
        <div class="row mt-5">
            <div class="col-md-12">
                <div class="card border-0 rounded shadow">
                    <div class="card-body">
                        <label style="font-size: 20px" class="font-weight-bold">
                            Keterangan
                        </label>
                        <hr>
                        <div v-html="product.content"></div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { computed, onMounted } from 'vue';
import { useStore } from 'vuex';
import { useRoute, useRouter } from 'vue-router';
import {notify} from "@kyvg/vue3-notification";
export default {
    setup() {
        //vue route
        const route = useRoute();
        //vue router
        const router = useRouter();
        //store vuex
        const store = useStore();

        //onMounted akan menjalankan action getDetailProduct di module product vuex
        onMounted(() => {
            store.dispatch('product/getDetailProduct', route.params.slug)
        });

        //computed properti digunakan untuk mendapatkan data detail product dari
        //state product di module product vuex
        const product = computed(() => {
            return store.state.product.product
        });
        

        function addToCart(product_id, price, weight)
        {
            //ambil token
            const token = store.state.auth.token;

            //cek apakah tokennya ada
            if(!token)
            {
                return router.push({name: 'login'})
            }

            //panggul action addToCart di module cart
            store.dispatch('cart/addToCart', {
                product_id: product_id,
                price: price,
                weight: weight,
                quantity: 1
            });

            // using options
            notify({
                title: "Success",
                text: "Item added successfully",
                type: 'success'
            });
        }

        return {
            route,
            router,
            product,
            store,
            addToCart
        }
    },
}
</script>