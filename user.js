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

  displaySectionHeader('Favorite Recipes', user);
  if (user.recipes) {
    displayList(user.recipes, true);
  }
  displaySectionHeader('Shopping List', user);
  if (user.shopping_list.ingredients) {
    displayList(user.shopping_list.ingredients, false);
  }

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

function displaySectionHeader(headerString, user) {
  const $p = document.createElement('p');
  $p.className = 'favorites_header';
  $p.textContent = `${headerString}:`;

  $main.append($p);

  return user;
}

function displayList(list, links) {
  const $ul = document.createElement('ul');
  $ul.className = `item_list_${links}`;

  const $list = list.map(list_item => {
    const $li = document.createElement('li');
    $li.className = `item_list_${links}`;
    if (links) {
      $li.innerHTML = `<a href ='show.html?recipe_id=${list_item.id}&user_id=${user_id}'>${list_item.name}</a>`;
    } else {
      $li.innerText = list_item;
    }

    return $li;
  });

  $main.append($ul);
  $list.forEach($list => {
    $ul.append($list);
  });

}
