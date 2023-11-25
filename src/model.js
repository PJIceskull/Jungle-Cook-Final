// import listerners
import { addLoginListeners, addFormListeners } from "./index.js";

// Variables
let recipes = []; // Array for Recipes

// Route Function
export function changeRoute() {
  let hashTag = window.location.hash;
  let pageID = hashTag.replace("#", "");
  //   console.log(hashTag + ' ' + pageID);

  // Remove Listeners
  $(".login-Form .signin-Form div").off("click", "**");
  $(".login-Form .signin-Form .signinBTN").off("click", "**");

  $(".recipeForm-Holder div .addBTN").off("click", "**");

  if (pageID != "") {
    $.get(`pages/${pageID}.html`, function (data) {
      // console.log("data " + data);
      console.log("data: " + pageID);
      $("#app").html(data);

      // Set Listerners on other pages
      // Set Listeners if on login.html page
      if (pageID == "login") {
        $.get(`pages/${pageID}.html`, function (data) {
          $("#app").html(data);
          addLoginListeners();
        });
      }
      // Set Form Listeners if on create.html & editRecipes page
      if (pageID == "create" || pageID == "editRecipes") {
        $.get(`pages/${pageID}.html`, function (data) {
          $("#app").html(data);
          addFormListeners();
        });
      }
      // Appending Recipes
      if (recipes.length == 0) {
        console.log("No recipes");
        $(".Browse-Overlay article").append(`<h1>You have no recipes.</h1>`);
      } else {
        $.each(recipes, function (index, recipe) {
          $(".Cards-Wrapper").append(`<div class="recipeCard-Holder card-Wrap">
          <!-- Image -->
          <div class="card-IMG">
            <img src="${recipe.imagePath}" alt="Food Picture" loading="lazy" />
          </div>
          <!-- Card Information -->
          <div class="card-TEXT">
            <h2>${recipe.recipeName}</h2>
            <hr />
            <p>${recipe.recipeDesc}</p>
            <div class="Direction-Holder">
              <img src="image/icons/time.svg" alt="Timer" />
              <p>${recipe.recipeTime}</p>
            </div>
            <div class="Direction-Holder">
              <img src="image/icons/servings.svg" alt="ServeBowl" />
              <p>${recipe.serveSize} Serving</p>
            </div>
          </div>
          <!-- User Options -->
          <div class="options">
            <button class="viewBTN">
              <a href="#viewRecipes">View</a>
            </button>
            <button class="editBTN">
              <a href="#editRecipes">Edit Recipe</a>
            </button>
            <button class="deleteBTN">Delete</button>
          </div>
        </div>`);
        });
      }
    }).fail(function (error) {
      console.log("Error: ", error);
    });
  } else {
    $.get(`pages/home.html`, function (data) {
      // console.log("data " + data);
      console.log(pageID);
      $("#app").html(data);
    }).fail(function (error) {
      console.log("Error: ", error);
    });
  }
}

export function addRecipe(newRecipe) {
  recipes.push(newRecipe);
  console.log(recipes);
}
