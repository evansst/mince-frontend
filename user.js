const searchParams = new URLSearchParams(window.location.search);
let user_id = searchParams.get('user_id');

const $main = document.querySelector('main');

baseURL = "http://localhost:3000";
userURL = `${baseURL}/users/${user_id}`;

fetch(userURL)
  .then(parseJSON)
  .then(displayPage);

function parseJSON(response) {
  return response.json();
}

function displayPage(user) {
  displayTitle(user);
  displayHeader(user);
  displayUserInfo(user);
  displayRecipeList(user.recipes);
}

function displayTitle(user) {
  const $title = document.querySelector('title');
  $title.textContent = user.username;

  return user;
}

function displayHeader(user) {
  const $h1 = document.createElement('h1');
  $h1.textContent = user.name;

  $main.append($h1);

  return user;
}

function displayUserInfo(user) {
  const $p = document.createElement('p');
  $p.className = 'favorites_header';
  $p.textContent = 'Favorite Recipes:';

  $main.append($p);

  return user;
}

function displayRecipeList(recipes) {
  const $ul = document.createElement('ul');
  $ul.className = 'recipe_list';

  const $recipes = recipes.map(recipe => {
    const $li = document.createElement('li');
    $li.className = 'recipe_list';
    $li.innerHTML = `<a href ='show.html?recipe_id=${recipe.id}&user_id=${user_id}'>${recipe.name}</a>`;

    return $li;
  });

  $main.append($ul);
  $recipes.forEach($recipe => {
    $ul.append($recipe);
  });

}
