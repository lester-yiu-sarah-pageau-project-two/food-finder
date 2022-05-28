const cookingApp = {};

cookingApp.apiKey = `8e7633fbea684358a5fde199da86bb01`;
cookingApp.endpoint = `https://api.spoonacular.com/recipes/complexSearch`;
cookingApp.recipeEndPoint = `https://api.spoonacular.com/recipes/analyze`;

cookingApp.formEl = document.querySelector('form');
cookingApp.dairyChoiceEl = document.querySelector(`input[id="dairy"]`)
cookingApp.glutenChoiceEl = document.querySelector(`input[id="gluten"]`);
cookingApp.vegetarianChoiceEl = document.querySelector(`input[id="vegetarian-diet"]`);
cookingApp.veganChoiceEl = document.querySelector(`input[id='vegan-diet']`);
cookingApp.cuisineChoiceEl = document.querySelector(`select[name='type-of-cuisine']`);
cookingApp.ingredientChoiceEl = document.querySelector(`input[type='text']`);
cookingApp.ulEl = document.querySelector('ul.column');
cookingApp.openMenuEl = document.querySelector('.slideout-button');
cookingApp.exitMenuEl = document.querySelector('.close-menu-button');
cookingApp.slideMenuEl = document.querySelector('.slidemenu-nav');
cookingApp.nothingYetEl = document.querySelector('.nothing-yet');
cookingApp.noResultsEl = document.querySelector('.no-results');

cookingApp.openMenu = function () {
    cookingApp.openMenuEl.addEventListener('click', function() {
        cookingApp.slideMenuEl.classList.toggle("slidemenu-nav-closed");
        cookingApp.slideMenuEl.classList.toggle("slidemenu-nav-open");
    });
}

cookingApp.closeMenu = function () {
    cookingApp.exitMenuEl.addEventListener('click', function() {
        cookingApp.slideMenuEl.classList.toggle("slidemenu-nav-closed");
        cookingApp.slideMenuEl.classList.toggle("slidemenu-nav-open");
    })
}

cookingApp.getSlideMenu = function () {

    cookingApp.openMenu();

    cookingApp.closeMenu();

    cookingApp.slideMenuEl.addEventListener('click', function(e) {
        if (e.target.localName === "a") {
            cookingApp.slideMenuEl.classList.toggle("slidemenu-nav-closed");
            cookingApp.slideMenuEl.classList.toggle("slidemenu-nav-open");
        }
    })
}

cookingApp.placeEventListeners = function() {
    cookingApp.dairyChoiceEl.addEventListener('click', () => {
        if (cookingApp.dairyChoiceEl.checked === true) {
            cookingApp.dairyValue = cookingApp.dairyChoiceEl.value;
        } else {
            cookingApp.dairyValue = '';
        }
    });

    cookingApp.glutenChoiceEl.addEventListener('click', () => {
        if (cookingApp.glutenChoiceEl.checked === true) {
            cookingApp.glutenValue = cookingApp.glutenChoiceEl.value;
        } else {
            cookingApp.glutenValue = '';
        }
    });

    cookingApp.vegetarianChoiceEl.addEventListener('click', () => {
        if (cookingApp.veganChoiceEl.checked === true) {
            cookingApp.veganChoiceEl.checked === false;
            cookingApp.dietValue = '';
            cookingApp.dietValue = cookingApp.vegetarianChoiceEl.value;
            cookingApp.veganChoiceEl.checked = false;
        } else if (cookingApp.vegetarianChoiceEl.value && cookingApp.vegetarianChoiceEl.checked === false) {
            cookingApp.dietValue = '';
        } else {
            cookingApp.dietValue = '';
            cookingApp.dietValue = cookingApp.vegetarianChoiceEl.value;
        }
    });

    cookingApp.veganChoiceEl.addEventListener('click', () => {
        if (cookingApp.vegetarianChoiceEl.checked === true) {
            cookingApp.vegetarianChoiceEl.checked === false;
            cookingApp.dietValue = '';
            cookingApp.dietValue = cookingApp.veganChoiceEl.value;
            cookingApp.vegetarianChoiceEl.checked = false;
        } else if (cookingApp.veganChoiceEl.value && cookingApp.veganChoiceEl.checked === false) {
            cookingApp.dietValue = '';
        } else {
            cookingApp.dietValue = '';
            cookingApp.dietValue = cookingApp.veganChoiceEl.value;
        }
    });
}

cookingApp.submissionForm = function() {

    cookingApp.formEl.addEventListener('submit', (e) => {
        e.preventDefault();
        cookingApp.nothingYetEl.remove();
        cookingApp.getInfo();
    });

}

cookingApp.getInfo = () => {

    const spoonUrl = new URL (cookingApp.endpoint);

    spoonUrl.search = new URLSearchParams({
        apiKey: cookingApp.apiKey,
        addRecipeInformation: true,
        instructionsRequired: true, //This is in analyzed instructions
        query: cookingApp.ingredientChoiceEl.value,
        intolerances: `${cookingApp.dairyValue}, ${cookingApp.glutenValue}`,
        diet: cookingApp.dietValue,
        cuisine: cookingApp.cuisineChoiceEl.value
    });

    fetch(spoonUrl)
        .then( (response) => {
            return response.json();
        })
            .then ( (jsonData) => {
                if (jsonData.results.length > 0) {
                    cookingApp.noResultsEl.classList.add('display-none');
                    cookingApp.ulEl.innerHTML = '';
                    jsonData.results.forEach( (item) => {
                        cookingApp.appendItems(item);
                    })                    
                } else {
                    cookingApp.ulEl.innerHTML = '';
                    if (cookingApp.noResultsEl.className === 'no-results display-none') {
                        cookingApp.noResultsEl.classList.toggle('display-none');
                    }
                }

            });
    }

cookingApp.appendItems = (argument) => {

    const newAnchorEl = document.createElement('a');
    newAnchorEl.href = argument.sourceUrl;
    newAnchorEl.target = '_blank';
    newAnchorEl.rel = 'noopener';

    const newLiEl = document.createElement('li');
    newLiEl.classList.add('box');
    newAnchorEl.appendChild(newLiEl);

    const newImageContEl = document.createElement('div');
    newImageContEl.classList.add('img-wrapper');
    newLiEl.appendChild(newImageContEl);

    const newTextContEl = document.createElement('div');
    newTextContEl.classList.add('text-container');
    newLiEl.appendChild(newTextContEl);

    const newImageEl = document.createElement('img');
    newImageEl.src = `${argument.image}`;
    newImageEl.alt = `${argument.title}`;
    newImageContEl.appendChild(newImageEl);

    const newHeadingEl = document.createElement('h3');
    newHeadingEl.innerText = `${argument.title}`;
    newTextContEl.appendChild(newHeadingEl);
    cookingApp.displayItems(newAnchorEl);
}

cookingApp.displayItems = (item) => {

    cookingApp.ulEl.appendChild(item);
}

cookingApp.init = () => {
    cookingApp.placeEventListeners();
    cookingApp.submissionForm();
    cookingApp.getSlideMenu();
}

cookingApp.init();