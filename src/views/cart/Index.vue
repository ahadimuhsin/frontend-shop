<template>
    <div class="container-fluid mb-5 mt-4">
        <div class="row" v-if="cartTotal>0">
            <div class="col-md-6">
                <div class="card border-0 shadow rounded">
                    <div class="card-body">
                        <h5>
                            <i class="fa fa-shopping-cart"></i>
                            Detail
                        </h5>
                        <hr>
                        <table class="table" style="border-style: solid !important; border-color: rgb(198,206,214) !important">
                            <tbody>
                                <tr v-for="cart in carts" :key="cart.id" style="background: #edf2f7">
                                    <td class="b-none" width="25%">
                                        <div class="wrapper-image-cart">
                                            <img :src="cart.product.image" style="width: 100%; border-radius: .5rem">
                                        </div>
                                    </td>
                                    <td class="b-none" width="50%">
                                        <h5>
                                            <b>{{cart.product.title }}</b>
                                        </h5>
                                        <table class="table-borderless" style="font-size: 14px">
                                            <tr>
                                                <td style="padding: .20rem">Qty</td>
                                                <td style="padding: .20rem">:</td>
                                                <td style="padding: .20rem">{{cart.quantity}}</td>
                                            </tr>
                                        </table>
                                    </td>
                                    <td class="b-none text-right">
                                        <p class="m-0 font-weight-bold">
                                            Rp. {{ moneyFormat(cart.price) }}
                                        </p>
                                        <p class="m-0">
                                            <s style="text-decoration-color: red">
                                                Rp. {{ moneyFormat(cart.product.price * cart.quantity) }}
                                            </s>
                                        </p>
                                        <br>
                                        <div class="text-right">
                                            <button class="btn btn-sm btn-danger" @click.prevent="removeCart(cart.id)">
                                                <i class="fa fa-trash"></i>
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            </tbody>
                        </table>

                        <table class="table table-default">
                            <tbody>
                                <tr>
                                    <td class="set-td text-left" width="60%">
                                        <p class="m-0">Jumlah</p>
                                    </td>
                                    <td class="set-td text-right" width="30%">
                                        &nbsp; : Rp. 
                                    </td>
                                    <td class="set-td text-right">
                                        <p class="m-0" id="subtotal">
                                            {{ moneyFormat(cartTotal) }}
                                        </p>
                                    </td>
                                </tr>
                                <tr>
                                    <td class="set-td text-left border-0">
                                        <p class="m-0">Ongkos Kirim (<strong> {{cartWeight}}</strong> gram)</p>
                                    </td>
                                    <td class="set-td border-0 text-right">
                                        &nbsp; : Rp.
                                    </td>
                                    <td class="set-td border-0 text-right">
                                        <p class="m-0" id="ongkir-cart">0</p>
                                    </td>
                                </tr>
                                <tr>
                                    <td class="t-td text-left border-0">
                                        <p class="m-0 font-weight-bold h5 text-uppercase">
                                            Grand Total
                                        </p>
                                    </td>
                                    <td class="border-0 text-right">
                                        &nbsp; : Rp.
                                    </td>
                                    <td class="border-0 text-right">
                                        <p class="m-0 font-weight-bold h5" align="right">
                                            {{ moneyFormat(state.grandTotal) }}
                                        </p>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            <div class="col-md-6">
                <div class="card border-0 shadow rounded">
                    <div class="card-body">
                        <h5><i class="fa fa-user-circle"></i>
                        Rincian Pengiriman
                        </h5>
                        <hr>
                        <div class="row">
                            <div class="col-md-6">
                                <div class="form-group">
                                    <label for="" class="font-weight-bold">Nama Lengkap</label>
                                    <input type="text" id="nama_lengkap" class="form-control" placeholder="Nama Lengkap"
                                    v-model="state.name">
                                    <div v-if="validation.name" class="mt-2 alert alert-danger">
                                    Masukkan Nama Lengkap
                                    </div>
                                </div>
                            </div>
                            <div class="col-md-6">
                                <div class="form-group">
                                    <label for="" class="font-weight-bold">Nomor HP/Whatsapp</label>
                                    <input type="number" id="phone" class="form-control" placeholder="No Hp / Whatsapp"
                                    v-model="state.phone">
                                    <div v-if="validation.phone" class="mt-2 alert alert-danger">
                                    Masukkan Nomor Telepon
                                    </div>
                                </div>
                            </div>
                            <div class="col-md-12">
                                <div class="form-group">
                                    <label for="" class="font-weight-bold">Provinsi</label>
                                    <select v-model="state.province_id" @change="getCities" class="form-control">
                                        <option value="">-- Pilih Provinsi --</option>
                                        <option v-for="province in state.provinces" :key="province.id" :value="province.province_id">
                                            {{ province.name }}
                                        </option>
                                    </select>
                                </div>
                            </div>

                            <div class="col-md-12">
                                <div class="form-group">
                                    <label for="" class="font-weight-bold">Kota / Kabupaten</label>
                                    <select v-model="state.city_id" @change="getCourier" class="form-control">
                                        <option value="">-- Pilih Kota/Kabupaten --</option>
                                        <option v-for="city in state.cities" :key="city.id" :value="city.city_id">
                                            {{city.type}} {{ city.name }}
                                        </option>
                                    </select>
                                </div>
                            </div>

                            <div class="col-md-12">
                                <div class="form-group" v-if="state.courier">
                                    <label for="" class="font-weight-bold">Kurir Pengiriman</label>
                                    <br>
                                    <div class="form-check form-check-inline">
                                        <!-- JNE -->
                                        <input type="radio" class="form-check-input select-courier" name="courier" id="ongkors_kirim-jne"
                                        value="jne" v-model="state.courier_type" @change="getOngkir">
                                        <label for="ongkos_kirim-jne" class="form-check-label font-weight-bold mr-4">JNE</label>
                                        <!-- TIKI -->
                                        <input type="radio" class="form-check-input select-courier" name="courier" id="ongkors_kirim-tiki"
                                        value="tiki" v-model="state.courier_type" @change="getOngkir">
                                        <label for="ongkos_kirim-tiki" class="form-check-label font-weight-bold mr-4">TIKI</label>
                                        <!-- POS -->
                                        <input type="radio" class="form-check-input select-courier" name="courier" id="ongkors_kirim-pos"
                                        value="pos" v-model="state.courier_type" @change="getOngkir">
                                        <label for="ongkos_kirim-pos" class="form-check-label font-weight-bold mr-4">POS</label>
                                    </div>
                                </div>
                            </div>

                            <div class="col-md-12">
                                <div class="form-group" v-if="state.cost">
                                    <hr>
                                    <label for="" class="font-weight-bold">Service Kurir</label>
                                    <br>
                                    <div v-for="value in state.costs" :key="value.service" class="form-check form-check-inline">
                                        <input type="radio" class="form-check-input" name="cost" :id="value.service" :value="value.cost[0].value+'|'+value.service"
                                        v-model="state.costService" @change="getCostService">
                                        <label :for="value.service" class="form-check-label font-weight-normal mr-5">
                                            {{ value.service }} - Rp. {{ moneyFormat(value.cost[0].value) }}
                                        </label>    
                                    </div>
                                </div>
                            </div>

                            <div class="col-md-12">
                                <div class="form-group">
                                    <label for="" class="font-weight-bold">Alamt Lengkap</label>
                                    <textarea v-model="state.address" id="alamat" rows="4" class="form-control" placeholder="Jalan Pegangsaan Timur 56, Jakarta"></textarea>
                                    <div v-if="validation.address" class="mt-2 alert alert-danger"></div>
                                </div>
                            </div>
                        </div>

                        <div v-if="state.buttonCheckout" class="col-md-12">
                        <button @click.prevent="checkout" class="btn btn-primary btn-lg btn-block">Checkout</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="row" v-else>
            <div class="col-md-12">
                <div class="card border-0 shadowrounded">
                    <div class="card-body">
                        <h1 class="text-center">
                            Cart Kosong
                        </h1>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { onMounted, computed, reactive } from 'vue';
import { useStore } from 'vuex';
import Api from '@/api/Api';
import {useRouter} from 'vue-router';

export default {
    setup() {
        const store = useStore();
        const router = useRouter();
        //mounted cart
        onMounted(() => {
            //call action from cart module
            store.dispatch('cart/cartCount');
            store.dispatch('cart/cartTotal');
            store.dispatch('cart/cartWeight');
        })

        //get data cart dari getter cart di module cart
        const carts = computed (() => {
            return store.getters['cart/getCart']
        })

        //get data total cart dari state cartTotal
        const cartTotal = computed (() => {
            return store.state.cart.cartTotal
        })

         //get data weight cart dari state cartWeight
        const cartWeight = computed (() => {
            return store.state.cart.cartWeight
            
        })

        function removeCart(id)
        {
            //call actions removeCart from module cart
            store.dispatch('cart/removeCart', id);
        }

        const state = reactive({
            name: '',
            phone: '',
            address: '',
            provinces: [],
            province_id: '',
            cities: [],
            city_id: '',
            courier: false,
            courier_type: '',
            cost: false,
            costs: '',
            costService: '',
            courier_cost: 0,
            courier_service: '',
            buttonCheckout: false,
            grandTotal: 0
        })

        const validation = reactive({
            name: false,
            phone: false,
            address: false
        })

        

        const token = localStorage.getItem('token');

        const provinces = onMounted(() => {
            Api.defaults.headers.common['Authorization'] = "Bearer "+token;
            Api.get('/rajaongkir/provinsi')
            .then(response => {
                state.provinces = response.data.data
            })
            .catch(error => {
                console.log(error)
            })
        })

        function getCities()
        {
            Api.defaults.headers.common['Authorization'] = "Bearer "+token;
            Api.get('/rajaongkir/kota', {
                params: {
                    province_id: state.province_id
                }
            }).then(response => {
                state.cities = response.data.data
            }).catch(error => {
                console.log(error)
            })
        }

        //menampilkan pilihan kurir
        function getCourier()
        {
            state.courier = true
        }

        //mendapatkan ongkir
        function getOngkir()
        {
            //cek berat produk
            if(cartWeight.value == 0)
            {
                alert('Pilih produk terlebih dahulu')
                return
            }
            Api.defaults.headers.common['Authorization'] = "Bearer "+token;
            Api.post('/rajaongkir/cek-ongkir', {
                city_destination: state.city_id,
                weight: cartWeight.value,
                courier: state.courier_type
            })
            .then(response => {
                //set state cost menjadi true untuk menampilkan pilihan cost pengiriman
                state.cost = true;
                // console.log(response.data.data.rajaongkir.results[0].costs)
                state.costs = response.data.data.rajaongkir.results[0].costs
                
            }).catch(error => {
                console.log(error)
            })
        }

        //menampilkan biaya ongkir dan servis kurir
        function getCostService()
        {
            //split value dengan menghapus string |
            let shipping = state.costService.split("|");

            //set state cost dan service
            state.courier_cost = shipping[0];
            document.getElementById("ongkir-cart").innerHTML = parseInt(state.courier_cost).toLocaleString('id-ID');
            state.courier_service = shipping[1];
            Api.defaults.headers.common['Authorization'] = "Bearer "+token;
            Api.get('/cart/total-price')
            .then(response => {
                // state.grandTotal = 0;
                //jumlahkan total cart dan cost pengiriman
                state.grandTotal = parseInt(response.data.total) + parseInt(state.courier_cost);

                //show button checkout
                state.buttonCheckout = true
            })
        }

        function checkout()
        {
            if(state.name && state.phone && state.address && cartWeight.value)
            {
                let data = {
                    name: state.name,
                    phone: state.phone,
                    province_id: state.province_id,
                    city_id: state.city_id,
                    courier_type: state.courier_type,
                    courier_service: state.courier_service,
                    courier_cost: state.courier_cost,
                    weight: cartWeight.value,
                    address: state.address,
                    grandTotal: state.grandTotal,
                }
                store.dispatch('cart/checkout', data)
                .then(response => {
                    //jika berhasil, arahkan ke dtail order dengan parameter snap_token
                    router.push({
                        name: 'detail_order',
                        params: {
                            snap_token: response[0].snap_token
                        }
                    })
                }).catch(error => {
                    console.log(error);
                })
            }

            //cek validasi
            if(!state.name)
            {
                validation.name = true;
            }

            if(!state.phone)
            {
                validation.phone = true;
            }

            if(!state.address)
            {
                validation.address = true;
            }
        }

        return {
            carts,
            cartTotal,
            cartWeight,
            removeCart,
            state,
            validation,
            provinces,
            getCities,
            getCourier,
            getOngkir,
            getCostService,
            checkout
        }
    },
}
</script>