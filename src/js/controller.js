import * as model from './model.js';
import recipeView from './views/recipeView.js';
import searchView from './views/searchView.js';
import resultsView from './views/resultsView.js';
import paginationView from './views/paginationView.js';
import 'regenerator-runtime/runtime';
import 'core-js/stable';
import { async } from 'regenerator-runtime';
const recipeContainer = document.querySelector('.recipe');

if (module.hot) {
  module.hot.accept();
}

// https://forkify-api.herokuapp.com/v2

//Showing Recipe Function
const controlRecipes = async function () {
  try {
    const id = window.location.hash.slice(1);
    console.log(id);

    if (!id) return;

    recipeView.renderSpinner();

    //1. Loading Receipe Details

    await model.loadRecipe(id);

    // const { recipe } = model.state;

    //2.Rendering Receipe
    recipeView.render(model.state.recipe);
  } catch (err) {
    // alert(err);
    recipeView.renderError();
  }
};

const controlSearchResults = async function () {
  try {
    resultsView.renderSpinner();
    console.log(resultsView);
    //1. Get Search quey
    const query = searchView.getQuery();
    if (!query) return;

    //2.Load Search Results
    await model.loadSearchResults(query);

    //3. Render Results
    // resultsView.render(model.state.search.results);
    resultsView.render(model.getSearchResultsPage());
    // console.log(model.state.search.results);

    //4.Render initial pagination button
    paginationView.render(model.state.search);
  } catch (err) {
    console.log(err);
  }
};

const controlPagination = function (goToPage) {
  //1. Render New Results
  resultsView.render(model.getSearchResultsPage(goToPage));

  //2.Render New pagination button
  paginationView.render(model.state.search);
};
// controlSearchResults();
const init = function () {
  recipeView.addHandlerRender(controlRecipes);
  searchView.addHandlerSearch(controlSearchResults);
  paginationView.addHandlerClick(controlPagination);
};
init();
