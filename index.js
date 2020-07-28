
const searchParams = new URLSearchParams(window.location.search);
const searchName = searchParams.get('name');
let user_id = searchParams.get('user_id');

const baseURL = "http://localhost:3000";
let recipeURL = `${baseURL}/recipes`;


if (searchName) {
    recipeURL = `${recipeURL}?name=${searchName}`;
}

// // When the user scrolls the page, execute myFunction
// window.onscroll = function() { bannerScroll() };
// // Get the header
// let section2 = document.getElementById("banner");
// // Get the offset position of the navbar
// let sticky = section2.offsetBottom;
// // Add the sticky class to the banner when you reach its scroll position. Remove "sticky" when you leave the scroll position
// function bannerScroll() {
//   if (window.pageYOffset > sticky) {
//     banner.classList.add("sticky");
//   } else {
//     banner.classList.remove("sticky");
//   }
// }

// window.onscroll = function() { formScroll() };
// // Get the header
// let form = document.getElementById("filter");
// // Get the offset position of the navbar
// let formSticky = form.offsetTop;
// // Add the sticky class to the banner when you reach its scroll position. Remove "sticky" when you leave the scroll position
// function formScroll() {
//   if (window.pageYOffset > formSticky) {
//     banner.classList.add("formSticky");
//   } else {
//     banner.classList.remove("formSticky");
//   }
// }


const $section3 = document.querySelector('.section-3');


fetch(recipeURL)
    .then(parseJSON)
    .then(displayRecipes);
  

function parseJSON(response) {
  return response.json();
}

function displayRecipes(recipes) {
  recipes
    .map(recipeToElement)
    .forEach(showRecipes);
}

    
function recipeToElement(recipe) {
  const $h3 = document.createElement('h3');
  $h3.innerHTML  = `<a href ='show.html?recipe_id=${recipe.id}&user_id=${user_id}'>${recipe.name}</a>`;

  const $r_image = document.createElement('img');
  $r_image.src = recipe.image;
  $r_image.onclick = function() {
    window.location.href = `show.html?recipe_id=${recipe.id}&user_id=${user_id}`;
  };

  return createRecipeCard($h3, $r_image);
}

function createRecipeCard($h3, $r_image) {
  const $recipeCard = document.createElement('div');
  
  $recipeCard.className = 'cards';
  $recipeCard.append($h3, $r_image);

  return $recipeCard;
}

function showRecipes($recipeCard) {
  $section3.append($recipeCard);
}

window.scroll({
  top: 100,
  left: 100,
  behavior: 'smooth'
});
