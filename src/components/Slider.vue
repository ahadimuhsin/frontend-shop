<template>
    <div class="carousel slide" id="carousel" data-ride="carousel">
        <div class="carousel-inner">
            <div class="carousel-item" v-for="(slider, id) in sliders" 
            :class="{active: id == 0}" :key="slider.id">
                <img :src="slider.image" class="d-block w-100 rounded-lg">
            </div>
        </div>

        <a class="carousel-control-prev" href="#carousel" role="button" data-slide="prev">
            <span class="carousel-control-prev-icon" aria-hidden="true">
            </span>
            <span class="sr-only">Previous</span>
        </a>
        <a class="carousel-control-next" href="#carousel" role="button" data-slide="next">
            <span class="carousel-control-next-icon" aria-hidden="true">
            </span>
            <span class="sr-only">Next</span>
        </a>
    </div>
</template>

<script>
import { computed, onMounted } from "vue";
import { useStore } from "vuex";
export default {
    setup() {
        const store = useStore();

        //onMounted akan menjalanakn action getSliders di module slider
        onMounted(() => {
            store.dispatch('slider/getSliders')
        })

        //computed digunakan untuk mendapatkan data dari slider di module sliders
        const sliders = computed(() => {
            return store.getters['slider/getSliders']
        })

        return {
            store,
            sliders
        }
    },
}
</script>