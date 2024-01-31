let rowData = document.getElementById("rowData");
let searchContainer = document.getElementById("searchContainer");
let submitBtn;

$(document).ready(() => {
    searchByName("").then(() => {
        $(".loading-screen").fadeOut(500)
        $("body").css("overflow", "visible")
        // $(".inner-loading-screen").fadeOut(500)


    })  
})



function openSideNav() {
    $(".side-nav-menu").animate({
        left: 0
    }, 500)


    $(".open-close-icon").removeClass("fa-align-justify");
    $(".open-close-icon").addClass("fa-x");


    for (let i = 0; i < 5; i++) {
        $(".links li").eq(i).animate({
            top: 0
        }, (i + 5) * 100)
    }
}

// ------------------------

function closeSideNav() {
    let boxWidth = $(".side-nav-menu .nav-tab").outerWidth()
    $(".side-nav-menu").animate({
        left: -boxWidth
    }, 500)

    $(".open-close-icon").addClass("fa-align-justify");
    $(".open-close-icon").removeClass("fa-x");


    $(".links li").animate({
        top: 300
    }, 500)
}
closeSideNav()

$(".side-nav-menu i.open-close-icon").click(() => {
    if ($(".side-nav-menu").css("left") == "0px") {
        closeSideNav()
    } else {
        openSideNav()
    }
})

// ------------------------


function displayMeals(arr) {
    let cartoona = "";

    for (let i = 0; i < arr.length; i++) {
        cartoona += `
        <div class="col-md-3 position-relative mb-5">
                <div onclick="getMealDetails('${arr[i].idMeal}')" class="meal position-relative overflow-hidden rounded-2 cursor-pointer">
                    <img class="w-100" src="${arr[i].strMealThumb}" alt="" srcset="">
                    <div class="meal-layer position-absolute d-flex flex-column justify-content-center align-items-center text-black p-2">        
                        <div id="view_details">Viewdetails</div>  
                    </div>
                    
                </div>
                <p class="Of"><span class="nameOf">${arr[i].strMeal}<span></p>
        </div>
        `
    }

    rowData.innerHTML = cartoona
}

// ------------------------


// Categories
async function getCategories() {

    rowData.innerHTML = "";
    $(".inner-loading-screen").fadeIn(300)
    searchContainer.innerHTML = "";

    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/categories.php`)
    response = await response.json()

    displayCategories(response.categories)
    $(".inner-loading-screen").fadeOut(300)

}
function displayCategories(arr) {
    let cartoona = "";

    for (let i = 0; i < arr.length; i++) {
        cartoona += `
        <div class="col-md-3">
                <div onclick="getCategoryMeals('${arr[i].strCategory}')" class="meal position-relative overflow-hidden rounded-2 cursor-pointer">
                    <img class="w-100" src="${arr[i].strCategoryThumb}" alt="" srcset="">
                    <div class="meal-layer position-absolute text-center text-black p-2">
                        <h3>${arr[i].strCategory}</h3>
                        <p>${arr[i].strCategoryDescription.split(" ").slice(0,20).join(" ")}</p>
                    </div>
                </div>
        </div>
        `
    }

    rowData.innerHTML = cartoona
}

// ------------------------


// Area
async function getArea() {
    rowData.innerHTML = ""
    $(".inner-loading-screen").fadeIn(300)

    searchContainer.innerHTML = "";

    let respone = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?a=list`)
    respone = await respone.json()
    console.log(respone.meals);

    displayArea(respone.meals)
    $(".inner-loading-screen").fadeOut(300)

}
function displayArea(arr) {
    let cartoona = "";

    for (let i = 0; i < arr.length; i++) {
        cartoona += `
        <div class="col-md-3">
                <div onclick="getAreaMeals('${arr[i].strArea}')" class="rounded-2 text-center cursor-pointer">
                        <i class="fa-solid fa-house-laptop fa-4x"></i>
                        <h3>${arr[i].strArea}</h3>
                </div>
        </div>
        `
    }

    rowData.innerHTML = cartoona
}

// ------------------------


// Ingredients

async function getIngredients() {
    rowData.innerHTML = ""
    $(".inner-loading-screen").fadeIn(300)

    searchContainer.innerHTML = "";

    let respone = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?i=list`)
    respone = await respone.json()
    console.log(respone.meals);

    displayIngredients(respone.meals.slice(0, 20))
    $(".inner-loading-screen").fadeOut(300)

}
function displayIngredients(arr) {
    let cartoona = "";

    for (let i = 0; i < arr.length; i++) {
        cartoona += `
        <div class="col-md-3">
                <div onclick="getIngredientsMeals('${arr[i].strIngredient}')" class="ingre rounded-2 text-center">
                        <img src="images/HF160211_Global_Blog_2_Asia-Ingredient_01_low-1-1024x683.jpg" class = "w-100" alt="">
                        <div class = "ing-layer position-absolute text-black p-2">
                        <p>${arr[i].strDescription.split(" ").slice(0,20).join(" ")}</p>
                        <div id="vieww_details">Viewdetails</div>  
                        </div>
                        <h3>${arr[i].strIngredient}</h3>
                </div>
        </div>
        `
    }

    rowData.innerHTML = cartoona;
}

// ------------------------

async function getCategoryMeals(category) {
    rowData.innerHTML = ""
    $(".inner-loading-screen").fadeIn(300)

    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`)
    response = await response.json()


    displayMeals(response.meals.slice(0, 20))
    $(".inner-loading-screen").fadeOut(300)

}

async function getAreaMeals(area) {
    rowData.innerHTML = ""
    $(".inner-loading-screen").fadeIn(300)

    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${area}`)
    response = await response.json()


    displayMeals(response.meals.slice(0, 20))
    $(".inner-loading-screen").fadeOut(300)

}

async function getIngredientsMeals(ingredients) {
    rowData.innerHTML = ""
    $(".inner-loading-screen").fadeIn(300)

    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredients}`)
    response = await response.json()


    displayMeals(response.meals.slice(0, 20))
    $(".inner-loading-screen").fadeOut(300)

}

// ------------------------


// mealDetails

async function getMealDetails(mealID) {
    closeSideNav()
    rowData.innerHTML = ""
    $(".inner-loading-screen").fadeIn(300)

    searchContainer.innerHTML = "";
    let respone = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealID}`);
    respone = await respone.json();

    displayMealDetails(respone.meals[0])
    $(".inner-loading-screen").fadeOut(300)

}

function displayMealDetails(meal) {
    
    searchContainer.innerHTML = "";


    let ingredients = ``

    for (let i = 1; i <= 20; i++) {
        if (meal[`strIngredient${i}`]) {
            ingredients += `<li class="alert alert-info m-2 p-1">${meal[`strMeasure${i}`]} ${meal[`strIngredient${i}`]}</li>`
        }
    }

    let tags = meal.strTags?.split(",")
    // let tags = meal.strTags.split(",")
    if (!tags) tags = []

    let tagsStr = ''
    for (let i = 0; i < tags.length; i++) {
        tagsStr += `
        <li class="alert alert-danger m-2 p-1">${tags[i]}</li>`
    }

    let cartoona = `
    <div class="col-md-4 position-relative">
                <img class="w-100 rounded-3 " src="${meal.strMealThumb}"alt="">
                <h2>${meal.strMeal}</h2>
                
    </div>
            <div class="col-md-8">
                <h2>Details:</h2>
                <p class="h6">${meal.strInstructions}</p>
                <span class="fw-bolder h3">Area :<h3 class="alert alert-warning m-2 p-1">${meal.strArea}</h3> </span>
                <span class="fw-bolder h3">Category :<h3 class="alert alert-dark m-2 p-1">${meal.strCategory}</h3> </span>
                <h3>Recipes :</h3>
                <ul class="list-unstyled d-flex g-3 flex-wrap">
                    ${ingredients}
                </ul>

                <h3>Tags :</h3>
                <ul class="list-unstyled d-flex g-3 flex-wrap">
                    ${tagsStr}
                </ul>

                <a target="_blank" href="${meal.strSource}" class="btn btn-success">Source</a>
                <a target="_blank" href="${meal.strYoutube}" class="btn btn-danger">Youtube</a>
            </div>`

    rowData.innerHTML = cartoona;
}

// ------------------------


// search

function showSearchInputs() {
    searchContainer.innerHTML = `
    <div class="row py-4 ">
        <div class="col-md-6 ">
            <input onkeyup="searchByName(this.value)" class="form-control bg-transparent text-white" type="text" placeholder="Search By Name">
        </div>
        <div class="col-md-6">
            <input onkeyup="searchByFLetter(this.value)" length="1" class="form-control bg-transparent text-white" type="text" placeholder="Search By First Letter">
        </div>
    </div>`

    rowData.innerHTML = ""
}

async function searchByName(term) {
    closeSideNav()
    rowData.innerHTML = ""
    $(".inner-loading-screen").fadeIn(300)

    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${term}`)
    response = await response.json()

    response.meals ? displayMeals(response.meals) : displayMeals([])
    console.log();
    $(".inner-loading-screen").fadeOut(300)

}

async function searchByFLetter(term) {
    closeSideNav()
    rowData.innerHTML = ""
    $(".inner-loading-screen").fadeIn(300)

    term == "" ? term = "a" : "";
    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${term}`)
    response = await response.json()


    response.meals ? displayMeals(response.meals) : displayMeals([])
    $(".inner-loading-screen").fadeOut(300)
}

// ------------------------

// contact


function showContacts(){
rowData.innerHTML = `<div class="contact min-vh-100 d-flex  justify-content-center align-items-center">
<div class="container w-75 text-center">
    <div class="row g-4">
        <div class="col-6">
            <input id="name" onkeyup="inputsValidation()" type="text" class="form-control " placeholder="Enter Your Name">
            <div id="nameAlert" class="alert alert-danger w-100 mt-1 d-none">
                Special characters and numbers not allowed
            </div>
        </div>
        <div class="col-6">
            <input id="email" onkeyup="inputsValidation()" type="email" class="form-control" placeholder="Enter Your Email">
            <div id="emailAlert" class="alert alert-danger w-100 mt-1 d-none">
                 Email not valid "example@yyy.com"
            </div>
        </div>
        <div class="col-6">
            <input id="phone" onkeyup="inputsValidation()" type="number" class="form-control" placeholder="Enter Your Phone">
            <div id="phoneAlert" class="alert alert-danger w-100 mt-1 d-none">
                Enter Valid Phone Number
            </div>
        </div>
        <div class="col-6">
            <input id="age" onkeyup="inputsValidation()" type="number" class="form-control" placeholder="Enter Your Age">
            <div id="ageAlert" class="alert alert-danger w-100 mt-1 d-none ">
                Enter Valid Age
            </div>
        </div>
        <div class="col-6">
            <input id="password" onkeyup="inputsValidation()" type="password" class="form-control" placeholder="Enter Your Password">
            <div id="passwordAlert" class="alert alert-danger w-100 mt-1 d-none">
                Enter Valid Password "Minimum eight characters , at least one letter and one number:"
            </div>
        </div>
        <div class="col-6">
            <input id="Re-password" onkeyup="inputsValidation()" type="password" class="form-control" placeholder="Re-password">
            <div id="rePasswordAlert" class="alert alert-danger w-100 mt-1 d-none">
                Enter Valid rePassword
            </div>
        </div>
    </div>
    <button id="submitBtn" disabled class="btn btn-outline-danger mt-4" type="submit">Submit</button>
</div>
</div>  `

submitBtn = document.getElementById("submitBtn")   //3mltlh declare foooq

// هنمسك بقي ال اي دي وهنعمل عليه ايفينت عشان نغير ال تاتش
document.getElementById("name").addEventListener("focus" , ()=>{
    nameTouched = true;
})
document.getElementById("email").addEventListener("focus" , ()=>{
    emailTouched = true;
})
document.getElementById("phone").addEventListener("focus" , ()=>{
    phoneTouched = true;
})
document.getElementById("age").addEventListener("focus" , ()=>{
    ageTouched = true;
})
document.getElementById("password").addEventListener("focus" , ()=>{
    passwordTouched = true;
})
document.getElementById("Re-password").addEventListener("focus" , ()=>{
    rePassowrdTouched = true;
})
}

// عملت دول عشان ال اليرت كانت بتظهر ف كله لو عندي ايرور ف واحد بس
let nameTouched = false;
let emailTouched = false;
let phoneTouched = false;
let ageTouched = false;
let passwordTouched = false;
let rePassowrdTouched = false;


function inputsValidation(){     // 3aml de 3shan lma kolhm return true a5ly el button enable

    if (nameTouched) {
        if (nameValidation()) {
            document.getElementById("nameAlert").classList.replace("d-block" , "d-none")
            document.getElementById("name").classList.add("is-valid")
        }else{
            document.getElementById("nameAlert").classList.replace("d-none" , "d-block")
            document.getElementById("name").classList.remove("is-valid")

        }
    }

   if (emailTouched) {
    if (emailValidation()) {
        document.getElementById("emailAlert").classList.replace("d-block" , "d-none")
        document.getElementById("email").classList.add("is-valid")

    }else{
        document.getElementById("emailAlert").classList.replace("d-none" , "d-block")
        document.getElementById("email").classList.remove("is-valid")

    }
   }

   if (phoneTouched) {
    if (phoneValidation()) {
        document.getElementById("phoneAlert").classList.replace("d-block" , "d-none")
        document.getElementById("phone").classList.add("is-valid")

    }else{
        document.getElementById("phoneAlert").classList.replace("d-none" , "d-block")
        document.getElementById("phone").classList.remove("is-valid")

    }
   }

   if (ageTouched) {
    if (ageValidation()) {
        document.getElementById("ageAlert").classList.replace("d-block" , "d-none")
        document.getElementById("age").classList.add("is-valid")

    }else{
        document.getElementById("ageAlert").classList.replace("d-none" , "d-block")
        document.getElementById("age").classList.remove("is-valid")

    }

   }

    if (passwordTouched) {
        if (passwordValidation()) {
            document.getElementById("passwordAlert").classList.replace("d-block" , "d-none")
        document.getElementById("password").classList.add("is-valid")

        }else{
            document.getElementById("passwordAlert").classList.replace("d-none" , "d-block")
        document.getElementById("password").classList.remove("is-valid")

        }
    }

    if (rePassowrdTouched) {
        if (rePasswordValidation()) {
            document.getElementById("rePasswordAlert").classList.replace("d-block" , "d-none")
        document.getElementById("Re-password").classList.add("is-valid")

        }else{
            document.getElementById("rePasswordAlert").classList.replace("d-none" , "d-block")
        document.getElementById("Re-password").classList.remove("is-valid")

        }
    }


    
   if(nameValidation() && 
    emailValidation() &&
    phoneValidation() &&
    ageValidation() &&
    passwordValidation() &&
    rePasswordValidation()
    )
    {
        submitBtn.removeAttribute("disabled");    
    }else{
        submitBtn.setAttribute("disabled" , true)
    }
}

function nameValidation(){
   return /^[a-zA-Z ]+$/.test(document.getElementById("name").value);
}
function emailValidation(){
   return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(document.getElementById("email").value);
}
function phoneValidation(){
   return /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/.test(document.getElementById("phone").value);
}
function ageValidation(){
   return /^(0?[1-9]|[1-9][0-9]|[1][1-9][1-9]|200)$/.test(document.getElementById("age").value);
}
function passwordValidation(){
   return /^(?=.*\d)(?=.*[a-z])[0-9a-zA-Z]{8,}$/.test(document.getElementById("password").value);
}
function rePasswordValidation(){
   return document.getElementById("Re-password").value == document.getElementById("password").value;
}





