<template>
    <div class="card border-0 shadow rounded">
        <div class="card-body">
            <h5 class="font-weight-bold">
                <i class="fa fa-shopping-bag">                    
                </i> Kategori
            </h5>
            <hr>
            <ul class="list-group">
                <router-link :to="{name: 'detail_category', params: {slug: category.slug}}" 
                v-for="category in categories" :key="category.id" 
                class="list-group-item shadow-sm font-weight-bold 
                text-decoration-none text-dark">
                    <img :src="category.image" style="width:35px"> 
                    {{ category.name }}
                </router-link>
                <router-link :to="{name: 'categories'}" class="list-group-item shadow-sm text-center active 
                font-weight-bold text-decoration-none">
                    Lihat Kategori Lainnya 
                    <i class="fa fa-long-arrow-alt-right"></i>
                </router-link>
            </ul>
        </div>
    </div>
</template>

<script>
import { computed, onMounted } from "vue";
import { useStore } from "vuex";
export default {
    setup() {
        const store = useStore();
        
        //onMounted akan menjalanakn action getCategories di module category,
        //sebelum computed di atas dijalankan
        onMounted(() => {
            store.dispatch('category/getCategories')
        })

        const categories = computed(() => {
            return store.getters['category/getCategories']
        })

        return {
            store,
            categories
        }
    },
}
</script>