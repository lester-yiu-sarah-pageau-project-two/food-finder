const cookingApp = {};

//PSEUDO CODE
    // User input to take in
        //1. Ingredient name (will be located in the query search param)
        //2. Filters which include...
            //1. Type of cuisine (string)
            //2. gluten free (boolean)
            //3. diet (ex. vegetarian / vegan)
            //4. Calorie range
/*

    1. Take in user input through radio input and text input
        - vegan: true / false
        - vegetarian: true / false
        - cuisines: string of type of cuisines
        - dairyFree: true / false

    2. Once submitted/clicked on submit button (use an event listener), store user input in variable 
        -NOTE: clear populated content once submitted
        - Create a function that is responsible for displaying new content

        2a. Also add an event listener (click) on the filter button that will pop up an modal showing the different filtering options available


    3. Use the variable (with user input stored within it) and pass it to the search parameters for the fetch call.
        - Search params include...
            - query: (food ingredient name in string)
            - intolerances : ( a string that includes...
                    Dairy
                    Egg
                    Gluten
                    Grain
                    Peanut
                    Seafood
                    Sesame
                    Shellfish
                    Soy
                    Sulfite
                    Tree Nut
                    Wheat                 
            )
            - maxCalories: (a number)
            - diet: (a string that includes
                vegan
                vegetarian
                pescetarian
                gluten free
                )

    4. In the situation where the object doesn't return an URL, write some logic that will filter (using the .filter() method) to get rid of fetched back meal objects that do not include an URL

    5. Write function that populates the items on the page once the fetch call is done.
        - Utilizes the image property on object returned.
        - Also uses the analyzedInstructions property
        - Also uses the property title & summary property

    6. If the recipe is clicked (use an event listener), add a class of display block to a modal to change it from display:none, allowing it to pop up on the page (toggle classes).

    7. Handle the tab index on everything behind the modal, utilizing conditional statements to switch off tab index if the modal is open. (EXTRA), after a certain amount of time has passed, switch images on the image courasel

    8. Add a next page button for more recipe results

*/

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
    // const userChoice = prompt('What food do you want?')

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
                ulEl.innerHTML = '';
                jsonData.results.forEach( (item) => {
                    cookingApp.appendItems(item);
                })
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
