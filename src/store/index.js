import { createStore } from "vuex";

export default createStore({
  state: {
    recipes: [
      {
        slug: "katsu-curry",
        title: "Katsu Curry",
        description:
          "A delicious curry made with chicken, potatoes, and a special sauce",
        ingredients: [
          "1 tablespoon olive oil",
          "1 onion, chopped",
          "2 cloves garlic, chopped",
          "1 tablespoon curry powder",
        ],
        methods: [
          "Heat oil in a large skillet over medium heat.",
          "Add chicken and potatoes and cook, stirring, until heated through, about 5 minutes.",
        ],
      },
      {
        slug: "ramen-noodle-soup",
        title: "Ramen noodle soup",
        description: "A delicious curry made with chicken, potatoes, second ",
        ingredients: [
          "1 tablespoon olive oil",
          "1 onion, chopped",
          "2 cloves garlic, chopped",
          "1 tablespoon curry powder",
        ],
        methods: [
          "Heat oil in a large skillet over medium heat.",
          "Add onion and garlic and cook, stirring often, until softened, about 5 minutes.",
          "Add curry powder and cook, stirring, until fragrant, about 1 minute.",
          "Add chicken and potatoes and cook, stirring, until heated through, about 5 minutes.",
        ],
      },
    ],
  },
  mutations: {
    addRecipes(state, recipe) {
      state.recipes.push(recipe);
    },
    updateRecipes(state, recipe) {
      let index = recipe.editIndexR
      state.recipes[index].title = recipe.title;
      state.recipes[index].slug = recipe.slug;
      state.recipes[index].description = recipe.description;
      state.recipes[index].ingredients = recipe.ingredients
        ? recipe.ingredients
        : [];
      state.recipes[index].methods = recipe.methods ? recipe.methods : [];
    },
  },
  actions: {
    addRecipes({ commit }, recipe) {
      commit("addRecipes", recipe);
    },
    updateRecipes({ commit },recipe) {
      commit('updateRecipes', recipe)
    },
  },
  getters: {},
  modules: {},
});
