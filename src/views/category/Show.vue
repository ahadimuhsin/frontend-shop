<template>
  <div class="container-fluid mb-5 mt-4">
    <div class="row" v-if="products.length > 0">
      <div
        v-for="product in products"
        :key="product.id"
        class="col-md-3 col-6 mb-3"
      >
        <div
          class="card h-100 border-0 shadow rounded-md"
          v-if="products.length > 0"
        >
          <div class="card-img">
            <img
              :src="product.image"
              class="w-100"
              style="
                height: 15em;
                object-fit: cover;
                border-top-left-radius: 0.25rem;
                border-top-right-radius: 0.25rem;
              "
            />
          </div>
          <div class="card-body">
            <router-link
              :to="{ name: 'detail_product', params: { slug: product.slug } }"
              class="card-title font-weight-bold"
              style="font-size: 20px"
            >
              {{ product.title }}
            </router-link>
            <div
              class="discount mt-2"
              style="color: #999"
              v-if="product.discount > 0"
            >
              <s>
                Rp. {{ moneyFormat(product.price) }} <br />
                {{ products.length }}
              </s>
              <span
                style="background-color: darkorange"
                class="badge badge-pill badge-success text-white"
              >
                Diskon {{ product.discount }} %
              </span>
            </div>

            <div
              class="price font-weight-bold mt-3"
              style="color: #47b04b; font-size: 20px"
            >
              Rp {{ moneyFormat(calculateDiscount(product)) }}
              <!-- <br>AA {{ products.length }} -->
            </div>
            <router-link
              :to="{ name: 'detail_product', params: { slug: product.slug } }"
              class="btn btn-primary btn-md mt-3 btn-block shadow-md"
            >
              Lihat Produk
            </router-link>
          </div>
        </div>
      </div>
    </div>
    <div class="row" v-else>
      <div class="col-md-12 col-6 mb-3">
        <div class="card h-100 border-0 shadow rounded-md text-center">
          Data Kosong
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { computed, onMounted } from "vue";
import { useStore } from "vuex";
import { useRoute } from "vue-router";
export default {
  setup() {
    const store = useStore();
    const route = useRoute();

    //onMounted menjalankan action getCategories di module category
    onMounted(() => {
      store.dispatch("category/getProductInCategory", route.params.slug);
    });

    const products = computed(() => {
      return store.state.category.productInCategory;
    });

    return {
      store,
      route,
      products,
    };
  },
};
</script>