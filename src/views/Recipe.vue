<template>
  <div class="flex flex-col w-1/2 mx-auto space-y-6 text-white p-4">
    <div class="self-center cursor-pointer">
      <router-link to="/">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-6 w-6 text-greenColor"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          stroke-width="2"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
          />
        </svg>
      </router-link>
    </div>

    <h2 class="text-3xl font-semibold">{{ recipe.title }}</h2>
    <p>
     {{ recipe.description }}
    </p>
    <div class="bg-grayColor p-5 space-y-4 rounded-md">
      <p class="">Ingredients</p>
      <ul class="px-10 list-disc">
        <li v-for="item in recipe.ingredients" :key="item" > {{ item }} </li>
      </ul>
    </div>
    <div class="space-y-5">
      <p>Methods</p>
      <div v-for="item in recipe.methods" :key="item">
        <p class="pb-3"> {{ item }} </p>
        <hr />
      </div>
    </div>
  </div>
</template>

<script>
import { reactive, toRefs } from "vue";
import { useRoute } from "vue-router";
import { useStore } from "vuex";

export default {
  setup() {
    const router = useRoute();
    const store = useStore();

    const slug = router.params.slug;
    const recipe = reactive(
      store.state.recipes.filter((item) => item.slug == slug)
    );
    return {
      recipe: recipe[0],
    };
  },
};
</script>

<style>
</style>