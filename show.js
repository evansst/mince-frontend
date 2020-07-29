const searchParams = new URLSearchParams(window.location.search)
const id = searchParams.get('id');

const $main = document.querySelector('main');

fetch(`http://localhost:3000/recipes/${id}`)
    .then(response => response.json())
    .then(showRecipe);

function showRecipe(recipe) {
  const $h1 = document.createElement('h1');
  $h1.innerText = recipe.name;
  $main.append($h1);

  const $r_image = document.createElement('img');
  $r_image.src = recipe.image;
  $main.append($r_image)

  const $p = document.createElement('p');
  $p.innerHTML = `<a class= 'recipe_url' href ='${recipe.url}'>Go To Full Recipe</a>`;
  $main.append($p);
  
  const $ul = document.createElement('ul');
  $ul.className = 'ingredient_list';
  $main.append($ul);


  recipe.ingredients.forEach (ingredient => {
    const $li = document.createElement('li');
    $li.className = 'ingredient_list';
    $li.innerHTML = ingredient;
    $ul.append($li);

    const $button = document.createElement('button')
    $button.className = 'button';
    $button.id= 'button';
    $button.innerText = '+'

    // Get button to change color when clicked
    // $button.onclick = function() {
    //     document.getElementById("button").style.backgroundColor = "red";
    //   };
    $li.append($button)

    $button.onclick = function(){
        list = []
        list.push($li.innerText)
        const $h5 = document.createElement('h5');
        $h5.innerText  = list;
        $main.append($h5)


        
    };
    
});
}


