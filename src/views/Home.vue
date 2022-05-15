<template >
  <div class="flex flex-col items-center space-y-20">
    <div class="text-center space-y-4">
      <h3 class="text-white font-bold text-5xl">My Recipes</h3>
      <button class="bg-greenColor p-1 px-2 rounded-lg" @click="togglePopup">
        Add new recipe
      </button>
    </div>

    <!-- recipes -->
    <div class="grid grid-cols-2 w-1/2 gap-6 mx-auto">
      <div
        v-for="(recipe, index) in $store.state.recipes"
        :key="index"
        class="bg-grayColor text-white p-5 rounded-lg relative space-y-2"
      >
        <div class="absolute flex space-x-2 right-2 top-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-4 w-4 text-yellow-500 cursor-pointer"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            stroke-width="2"
            @click="editRecipe(index)"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
            />
          </svg>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-4 w-4 text-red-500 cursor-pointer"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            stroke-width="2"
            @click="deleteRecipe(index)"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
            />
          </svg>
        </div>

        <h2 class="font-semibold text-xl">{{ recipe.title }}</h2>
        <p>{{ recipe.description }}</p>
        <div class="">
          <router-link :to="{ name: 'Recipe', params: { slug: recipe.slug } }">
            <button class="bg-greenColor p-1 px-2 rounded-lg text-black ">
              View Recipe
            </button>
          </router-link>
        </div>
      </div>
    </div>
  </div>
  <!-- popup -->
  <div
    :class="{
      'absolute left-0 top-0 h-screen w-full bg-white/50 mainBgToClosePopup':
        popupOpen,
    }"
    @click="closePopup"
  >
    <div
      class="
        absolute
        p-6
        bg-grayColor
        w-1/3
        h-5/6
        text-white
        rounded-lg
        left-1/2
        top-1/2
        -translate-x-1/2 -translate-y-1/2
      "
      v-if="popupOpen"
    >
      <form class="h-full flex flex-col justify-center space-y-3" @submit.prevent="addNewRecipe">
        <h2 class="text-2xl font-bold mb-6">Add New Recipe</h2>

        <div class="flex-grow pr-5 space-y-3 overflow-y-scroll ">
          <div class="flex flex-col space-y-1">
            <label for="title">Title</label>
            <input
              class="p-1 bg-white rounded-lg text-black"
              type="text"
              id="title"
              v-model="title"
              required
            />
          </div>
  
          <div class="flex flex-col space-y-1">
            <label for="description">Description</label>
            <textarea
              class="p-1 bg-white rounded-lg text-black"
              rows="4"
              type="text"
              id="description"
              v-model="description"
            ></textarea>
          </div>
  
          <div class="flex flex-col space-y-2 items-start">
            <label for="ingredients">Ingredients</label>
            <input
              class="p-1 bg-white rounded-lg self-stretch text-black"
              type="text"
              id="ingredients"
              v-for="i in ingredientRows"
              :key="i"
              v-model="ingredients[i - 1]"
            />
            <button
              class="bg-greenColor p-1 px-2 rounded-lg text-black"
              type="button"
              @click="newIngredient"
            >
              Add Ingredients
            </button>
          </div>
  
          <div class="flex flex-col space-y-2">
            <label for="methods">Methods</label>
            <textarea
              class="p-1 bg-white rounded-lg text-black"
              rows="4"
              type="text"
              id="methods"
              v-for="index in methodRows"
              :key="index"
              v-model="methods[index - 1]"
            ></textarea>
            <button
              class="bg-greenColor p-1 px-2 rounded-lg text-black self-start"
              type="button"
              @click="newSteps"
            >
              Add Steps
            </button>
          </div>
        </div>

        <div class="flex space-x-2 justify-end">
            <button
              class="bg-greenColor p-1 px-2 rounded-lg text-black"
              type="submit"
            >
              Save
            </button>
            <button
              class="bg-red-500 p-1 px-2 rounded-lg text-black"
              type="button"
              @click="togglePopup()"
            >
              Close
            </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { reactive, ref, toRefs } from "vue";
import { useStore } from "vuex";

export default {
  setup() {
    var newRecipe = reactive({
      slug: "",
      title: "",
      description: "",
      ingredients: [],
      methods: [],
      ingredientRows: 1,
      methodRows: 1,
      editIndexR : null
    });

    const popupOpen = ref(false);
    var isUpdate = ref(false)
    var editIndex = ref('')

    function resetForm() {
      newRecipe.slug = "";
      newRecipe.title = "";
      newRecipe.description = "";
      newRecipe.ingredients = [];
      newRecipe.methods = [];
      newRecipe.ingredientRows = 1;
      newRecipe.methodRows = 1;
      isUpdate.value = false;
      editIndex.value = '';
    }

    function togglePopup() {
      popupOpen.value = !popupOpen.value;
      resetForm();
    }
    function closePopup() {
      let className = event.target.className;
      if (className.includes("mainBgToClosePopup")) {
        popupOpen.value = false;
      }
    }

    function newIngredient() {
      newRecipe.ingredientRows++;
    }

    function newSteps() {
      newRecipe.methodRows++;
    }

    const store = useStore();

    function addNewRecipe() {
      newRecipe.slug = newRecipe.title.toLocaleLowerCase().replace(/\s/g, "-");
      newRecipe.editIndexR = editIndex.value ;

      
      isUpdate.value ? store.dispatch("updateRecipes",  { ...newRecipe }) : store.dispatch("addRecipes", { ...newRecipe });
      this.togglePopup();
    }

    function deleteRecipe(index) {
      store.state.recipes.splice(index, 1);
    }

    function editRecipe(index) {
      this.togglePopup();

      isUpdate.value = true;
      editIndex.value = index;

      let editRecipe = store.state.recipes[index];
      newRecipe.title = editRecipe.title;
      newRecipe.slug = editRecipe.slug;
      newRecipe.description = editRecipe.description;
      newRecipe.ingredients = editRecipe.ingredients ? editRecipe.ingredients : [];
      newRecipe.methods = editRecipe.methods ? editRecipe.methods : [];
      newRecipe.ingredientRows = editRecipe.ingredients
        ? editRecipe.ingredients.length
        : 1;
      newRecipe.methodRows = editRecipe.methods ? editRecipe.methods.length : 1;
    }

    return {
      popupOpen,
      ...toRefs(newRecipe),
      togglePopup,
      closePopup,
      newIngredient,
      newSteps,
      addNewRecipe,
      deleteRecipe,
      editRecipe,
    };
  },
};
</script>

<style>
</style>