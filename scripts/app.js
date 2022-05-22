// const cookingApp = {};

// //PSEUDO CODE
//     // User input to take in
//         //1. Ingredient name (will be located in the query search param)
//         //2. Filters which include...
//             //1. Type of cuisine (string)
//             //2. gluten free (boolean)
//             //3. diet (ex. vegetarian / vegan)
//             //4. Calorie range
// /*

//     1. Take in user input through radio input and text input
//         - vegan: true / false
//         - vegetarian: true / false
//         - cuisines: string of type of cuisines
//         - dairyFree: true / false

//     2. Once submitted/clicked on submit button (use an event listener), store user input in variable 
//         -NOTE: clear populated content once submitted
//         - Create a function that is responsible for displaying new content

//         2a. Also add an event listener (click) on the filter button that will pop up an modal showing the different filtering options available


//     3. Use the variable (with user input stored within it) and pass it to the search parameters for the fetch call.
//         - Search params include...
//             - query: (food ingredient name in string)
//             - intolerances : ( a string that includes...
//                     Dairy
//                     Egg
//                     Gluten
//                     Grain
//                     Peanut
//                     Seafood
//                     Sesame
//                     Shellfish
//                     Soy
//                     Sulfite
//                     Tree Nut
//                     Wheat                 
//             )
//             - maxCalories: (a number)
//             - diet: (a string that includes
//                 vegan
//                 vegetarian
//                 pescetarian
//                 gluten free
//                 )

//     4. In the situation where the object doesn't return an URL, write some logic that will filter (using the .filter() method) to get rid of fetched back meal objects that do not include an URL

//     5. Write function that populates the items on the page once the fetch call is done.
//         - Utilizes the image property on object returned.
//         - Also uses the analyzedInstructions property
//         - Also uses the property title & summary property

//     6. If the recipe is clicked (use an event listener), add a class of display block to a modal to change it from display:none, allowing it to pop up on the page (toggle classes).

//     7. Handle the tab index on everything behind the modal, utilizing conditional statements to switch off tab index if the modal is open. (EXTRA)

// */

// cookingApp.apiKey = `b816c6f070174a9596e8c0889839e0da`;

// cookingApp.endpoint = `https://api.spoonacular.com/recipes/complexSearch`;

// cookingApp.recipeEndPoint = `https://api.spoonacular.com/recipes/analyze`;

// cookingApp.getInfo = () => {
//     // const userChoice = prompt('What food do you want?')

//     const spoonUrl = new URL (cookingApp.endpoint);
    
//     spoonUrl.search = new URLSearchParams({
//         apiKey: cookingApp.apiKey,
//         addRecipeInformation: true,
//         instructionsRequired: true, //This is in analyzed instructions
//         query: 'sandwich',
//         diet: 'vegetarian'
//     });

//     fetch(spoonUrl)
//         .then( (response) => {
//             return response.json();
//         })
//             .then ( (jsonData) => {
//                 console.log(jsonData);
//             });
// }

// cookingApp.init = () => {
//     cookingApp.getInfo();
// }

// cookingApp.init();