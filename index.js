const searchParams = new URLSearchParams(window.location.search);
const searchName = searchParams.get('name');
let user_id = searchParams.get('user_id');

if (user_id == 'null') { user_id = null; }

const baseURL = "http://localhost:3000";
let recipeURL = `${baseURL}/recipes`;
const usersURL = `${baseURL}/users`;
let userURL = `${baseURL}/users`;


if (searchName) { recipeURL = `${recipeURL}?name=${searchName}`; } else { recipeURL = `${recipeURL}?sample=9`; }
if (user_id) { userURL = `${usersURL}/${user_id}`; } else { userURL = usersURL; }

const $header = document.querySelector('header');
const $section1 = document.querySelector('.section-1');
const $section2 = document.querySelector('.section-2');
const $section3 = document.querySelector('.section-3');

fetch(userURL)
  .then(parseJSON)
  .then(displayUserNav);

fetch(recipeURL)
  .then(parseJSON)
  .then(displayRecipeList);


//Display user navigation links, if logged in or logged out

function displayUserNav(userResponse) {
  if (user_id) {
    displayLogOut(userResponse);
  } else {
    displayLogIn(userResponse);
  }
}

// Display filtered recipes, or display 9 random recipes

function displayRecipeList(recipes) {
  displayFilterByName();
  displayRecipeListHeader();

  
  recipes
    .map(recipeToElement)
    .forEach(addRecipe);
  
  addSearchPlaceholder();

  return recipes;
}

// Filter recipes by name form

function displayFilterByName() {
  const $filterForm = document.querySelector('.form');
  $filterForm.innerHTML = `  
      <label for='ingredients_input' id='ingredients_header'>Let's Begin! Search Recipes:</label>
      <input type='text' id='ingredients_input' name='name'>
      <input type="hidden" name='user_id' value=${user_id}>
      <input type="submit" id='submit' value="Submit">
    `;
}

// Render filtered or sampled recipes

function displayRecipeListHeader() {
  const $h1 = document.createElement('h1');
  $h1.id = 'recipe-list-header';
  if (searchName) {
    $h1.textContent = 'Search Results:';
  } else {
    $h1.textContent = 'Mince Picks:';
  }

  const $section3header = document.querySelector('.section-3-header');
  $section3header.append($h1);
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

function addRecipe($recipeCard) {
  $section3.append($recipeCard);
}

function addSearchPlaceholder() {
  const $ingredient_input = document.getElementById('ingredients_input');
  if (searchName) {
     $ingredient_input.placeholder = searchName;

     $ingredient_input.onclick = function() {
       $ingredient_input.placeholder = '';
     };
  }
}

// Log in and Log out elements

function displayLogIn(users) {
  displayLogInForm(users);
  displayCreateUserForm();
}

function displayLogInForm(users) {
  const $form = document.createElement('form');
  $form.className = 'user-nav';
  $form.innerHTML = `
    <form>
      <label for='login_input'>Username:</label>
    </form>`;
  
  const $select = document.createElement('select');
  $select.name = 'user_id';
  const $submit = document.createElement('input');
  
  $submit.type = 'submit';
  $submit.value = 'Login';
  
  $form.append(addUserOptions($select, users), $submit);
  
  const $page_nav = document.getElementById('page-nav');
    
  $page_nav.append($form);
  return users;
}

function displayCreateUserForm() {
  const $form = document.createElement('form');
  $form.method = 'POST';
  $form.action = usersURL;
  $form.className = 'user-nav';
  $form.innerHTML = `
    <form>
      <label for='username_input'>Create User:</label>
      <input id='username_input' type='text' name='username' placeholder='Username'></input>
      <input id='name_input' type='text' name='name' placeholder='Name'></input>
      <input type='submit' value='Create User'></input>
    </form>`;

  const $user_nav = document.getElementById('user-nav');
  $user_nav.append($form);
  
  return $form;
}

function displayLogOut(user) {
  displayLogOutLink(user);
  displayProfileLink();

  return user;
}

function displayLogOutLink(user) {
  const $p = document.createElement('p');
  const $a = document.createElement('a');

  $p.textContent = `Logged in as ${user.user_name}`;
  $p.className = 'user-nav';
  $a.href = 'index.html';
  $a.textContent = 'Log Out';
  $a.className = 'user-nav';

  const $user_nav = document.getElementById('user-nav');
  $user_nav.append($p, $a);

  return user;
}

function addUserOptions($select, users) {
  $userOptions = users.map(userToOption);
  $userOptions.forEach($userOption => $select.append($userOption));

  return $select;
}

function userToOption(user) {
  const $option = document.createElement('option');
  $option.innerText = user.user_name;
  $option.value = user.id;
  return $option;
}

function displayProfileLink() {
  const $a = document.createElement('a');
  $a.href = `user.html?user_id=${user_id}`;
  $a.textContent = 'Go to Profile';

  const $div = document.querySelector('div.nav-bar');

  $div.append($a);
}

function parseJSON(response) {
  return response.json();
}