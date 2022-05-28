const cookingApp = {};

cookingApp.apiKey = `b816c6f070174a9596e8c0889839e0da`;

cookingApp.endpoint = `https://api.spoonacular.com/recipes/complexSearch`;

cookingApp.recipeEndPoint = `https://api.spoonacular.com/recipes/analyze`;

const formEl = document.querySelector('form');

const dairyChoice = document.querySelector(`input[id="dairy"]`); //checked

const glutenChoice = document.querySelector(`input[id="gluten"]`);

const vegetarianChoice = document.querySelector(`input[id="vegetarian-diet"]`);

const veganChoice = document.querySelector(`input[id="vegan-diet"]`);

const ulEl = document.querySelector('ul.column');

const openMenuEl = document.querySelector('.slideout-button');

const exitMenuEl = document.querySelector('.close-menu-button');

const slideMenu = document.querySelector('.slidemenu-nav');

const nothingYetEl = document.querySelector('.nothing-yet');

const noResultsEl = document.querySelector('.no-results');

cookingApp.openMenu = function () {
    openMenuEl.addEventListener('click', function() {
        slideMenu.classList.toggle("slidemenu-nav-closed");
        slideMenu.classList.toggle("slidemenu-nav-open");
    });
}

cookingApp.closeMenu = function () {
    exitMenuEl.addEventListener('click', function() {
        slideMenu.classList.toggle("slidemenu-nav-closed");
        slideMenu.classList.toggle("slidemenu-nav-open");
    })
}

cookingApp.slideMenu = function () {

    cookingApp.openMenu();

    cookingApp.closeMenu();

    slideMenu.addEventListener('click', function(e) {
        if (e.target.localName === "a") {
            slideMenu.classList.toggle("slidemenu-nav-closed");
            slideMenu.classList.toggle("slidemenu-nav-open");
        }
    })
}

cookingApp.placeEventListeners = function() {
    dairyChoice.addEventListener('click', () => {
        if (dairyChoice.checked === true) {
            cookingApp.dairyValue = dairyChoice.value;
        } else {
            cookingApp.dairyValue = '';
        }
    });

    glutenChoice.addEventListener('click', () => {
        if (glutenChoice.checked === true) {
            cookingApp.glutenValue = glutenChoice.value;
        } else {
            cookingApp.glutenValue = '';
        }
    });

    vegetarianChoice.addEventListener('click', () => {
        if (vegetarianChoice.checked === true) {
            cookingApp.dietValue = vegetarianChoice.value;
            const veganChoice = document.querySelector(`input[id='vegan-diet']`);
            veganChoice.checked = false;
        } else {
            cookingApp.dietValue = '';
        }
    });

    veganChoice.addEventListener('click', () => {
        if (veganChoice.checked === true) {
            cookingApp.dietValue = veganChoice.value;
            const vegetarianChoice = document.querySelector(`input[id='vegetarian-diet']`);
            vegetarianChoice.checked = false;
        } else {
            cookingApp.dietValue = '';
        } 
    });
}

cookingApp.submissionForm = function() {

    formEl.addEventListener('submit', (e) => {
        e.preventDefault();

        nothingYetEl.remove();

        cookingApp.dairyChoice = document.querySelector(`input[id="dairy"]`)

        cookingApp.vegetarianChoice = document.querySelector(`input[id="vegetarian-diet"]`);

        cookingApp.veganChoice = document.querySelector(`input[id='vegan-diet']`);

        cookingApp.cuisineChoice = document.querySelector(`select[name='type-of-cuisine']`); // .selected

        cookingApp.ingredientChoice = document.querySelector(`input[type='text']`); // value

        cookingApp.getInfo();
    });

}

cookingApp.getInfo = () => {

    const spoonUrl = new URL (cookingApp.endpoint);
    
    spoonUrl.search = new URLSearchParams({
        apiKey: cookingApp.apiKey,
        addRecipeInformation: true,
        instructionsRequired: true, //This is in analyzed instructions
        query: cookingApp.ingredientChoice.value,
        intolerances: `${cookingApp.dairyValue}, ${cookingApp.glutenValue}`,
        diet: cookingApp.dietValue,
        cuisine: cookingApp.cuisineChoice.value
    });

    fetch(spoonUrl)
        .then( (response) => {
            return response.json();
        })
            .then ( (jsonData) => {
                if (jsonData.results.length > 0) {
                    noResultsEl.classList.add('display-none');
                    ulEl.innerHTML = '';
                    jsonData.results.forEach( (item) => {
                        cookingApp.appendItems(item);
                    })                    
                } else {
                    ulEl.innerHTML = '';
                    noResultsEl.classList.toggle('display-none');
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

    ulEl.appendChild(item);
}

cookingApp.init = () => {
    cookingApp.placeEventListeners();
    cookingApp.submissionForm();
    cookingApp.slideMenu();
}

cookingApp.init();