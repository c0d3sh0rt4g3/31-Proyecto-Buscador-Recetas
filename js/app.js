const selectCategories = document.querySelector("#categorias")
const resultContainer = document.querySelector("#resultado")

const startApp = () =>{
    getCategory()
}

const getCategory = () =>{
    const url = "https://www.themealdb.com/api/json/v1/1/categories.php"
    fetch(url)
        .then(result => result.json())
        .then(data => showCategories(data.categories))
}

const getFoodByCategory = (e) =>{
    const category = e.target.value
    const url = `https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`
    fetch(url)
        .then(result => result.json())
        .then(data => showFoodByCategory(data.meals))
}

/*
* idCategory: "1"
strCategory: "Beef"
strCategoryDescription: "Beef is the culinary name for meat from cattle, particularly skeletal muscle. Humans have
* been eating beef since prehistoric times.[1] Beef is a source of high-quality protein and essential nutrients.[2]"
strCategoryThumb: "https://www.themealdb.com/images/category/beef.png"
* */
const showCategories = (categories) =>{
    categories.forEach(category => {
        const option = document.createElement("option")
        option.value = category.strCategory
        option.textContent = category.strCategory
        selectCategories.appendChild(option)
    })
}

/*
* strMeal: "Baked salmon with fennel & tomatoes"
* strMealThumb: "https://www.themealdb.com/images/media/meals/1548772327.jpg"
* idMeal: "52959"
* */
const showFoodByCategory = (meals) =>{
    resultContainer.innerHTML = ""
    meals.forEach(meal => {
        const allRecipesContainer = document.createElement("div")
        allRecipesContainer.classList.add("col-md-4")

        const {idMeal, strMeal, strMealThumb} = meal
        const recipeDiv = document.createElement("div")
        const recipeHeading = document.createElement("h3")
        const recipeImg = document.createElement("img")
        const recipeCardBody = document.createElement("div")
        const recipeButton = document.createElement("button")

        recipeDiv.classList.add("card")
        recipeHeading.textContent = strMeal

        recipeImg.alt = strMeal
        recipeImg.src = strMealThumb
        recipeImg.classList.add("card-img-top")

        recipeCardBody.classList.add("card-body")

        recipeHeading.classList.add("card-title", "mb-3")
        recipeHeading.textContent = strMeal

        recipeButton.classList.add("btn", "btn-danger", "btn-primary")
        recipeButton.setAttribute("id", idMeal)
        recipeButton.textContent = "Add to favorites"

        recipeDiv.appendChild(recipeHeading)
        recipeDiv.appendChild(recipeImg)
        recipeDiv.appendChild(recipeButton)

        allRecipesContainer.appendChild(recipeDiv)
        resultContainer.appendChild(allRecipesContainer)
    })
}

document.addEventListener("DOMContentLoaded", startApp)
document.addEventListener("change", getFoodByCategory)