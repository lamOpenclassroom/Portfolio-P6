const gallery = document.querySelector(".gallery");
console.log(gallery);
const urlData = "http://localhost:5678/api/works";
const urlDataCat = "http://localhost:5678/api/categories";

//télécharger mes data du serveur
const loadData = async(url)=>{
    fetch(url)
    .then(response => response.json())
    .then(data => {
            console.table(data);
            displayData(data); 
            getCategory(data);
            getCategoryObj(data);
            getCategoryAppart(data);
            getCategoryHotel(data);
    })}; 
loadData(urlData);

//Affiche mes data
const displayData = (data)=>{
    for (let i = 0; i < data.length; i++){
        gallery.insertAdjacentHTML("afterbegin", `<figure>
        <img src="${data[i].imageUrl}" alt="${data[i].title}" class="image">
        <figcaption class="title">${data[i].title}</figcaption>
        </figure>`);
    }
}

//Télecharge data boutons Categorie
const loadDataCat = async(url)=>{
    fetch(url)
    .then(response => response.json())
    .then(dataCat => {
            console.table(dataCat);
            //displayDataCat(dataCat);
        });  
    }
loadDataCat(urlDataCat);

//Récup data catégorie + affiche dans HTML
/*const displayDataCat = (dataCat)=>{
    for (let i = 0; i < dataCat.length; i++){
        gallery.insertAdjacentHTML("beforebegin", `<button id="${dataCat[i].id}" name="${dataCat[i].name}">${dataCat[i].name}</button>`);
    }
}*/
gallery.insertAdjacentHTML("beforebegin", `<div id="btn-filtre"><button id="1" name="Tous">Tous</button> 
<button id="2" name="Objets">Objets</button> <button id="3" name="Appartements">Appartements</button>
<button id="4" name="Hôtels & restaurants">Hôtels & restaurants</button></div>`);


//Filtre des images
const btnTous = document.getElementById("1");
const btnObj = document.getElementById("2");
const btnAppart = document.getElementById("3");
const btnHotel = document.getElementById("4");
console.log(btnTous);
function getCategory(data){
    btnTous.addEventListener("click", ()=>{
    const category = new Set(data);
    category.forEach((point) => {
            if (point.categoryId < 0) {
            category.delete(point);
            }
    });
    document.querySelector(".gallery").innerHTML = "";
    displayData([...category]);
});
}

function getCategoryObj(data){
    btnObj.addEventListener("click", ()=>{
    const category = new Set(data);
    category.forEach((point) => {
            if (point.categoryId != 1) {
            category.delete(point);
            }
    });
    document.querySelector(".gallery").innerHTML = "";
    displayData([...category]);
});
}

function getCategoryAppart(data){
    btnAppart.addEventListener("click", ()=>{
    const category = new Set(data);
    category.forEach((point) => {
            if (point.categoryId != 2) {
            category.delete(point);
            }
    });
    document.querySelector(".gallery").innerHTML = "";
    displayData([...category]);
});
}

function getCategoryHotel(data){
    btnHotel.addEventListener("click", ()=>{
    const category = new Set(data);
    category.forEach((point) => {
            if (point.categoryId != 3) {
            category.delete(point);
            }
    });
    document.querySelector(".gallery").innerHTML = "";
    displayData([...category]);
});
}














//manière la plus simple.
/*const category = data.filter(obj => obj.categoryId == 3);
    document.querySelector(".gallery").innerHTML = "";
    displayData(category);
    console.log(category);*/


















