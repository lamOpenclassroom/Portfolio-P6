const gallery = document.querySelector(".gallery");
const urlData = "http://localhost:5678/api/works";
const urlDataCat = "http://localhost:5678/api/categories";

//télécharger mes data du serveur
const loadData = async (url) => {
    fetch(url)
        .then(response => response.json())
        .then(data => {
            displayData(data);
            //sessionStorage.setItem('data', JSON.stringify(data))
            console.table(data);
            galleryModal(data); //function affiche ma modale
            deleteImage(data);  //function supprime un élément de la modale
            //catégory Tous Obj Appart Hotel
            getCategory(data);
            getCategoryObj(data);
            getCategoryAppart(data);
            getCategoryHotel(data);
        })
};
loadData(urlData);


//Affiche mes data
const displayData = (data/*,idCat=0*/) => {
    /*console.log("test")
    
        if (idCat > 0) {
            console.log(item.categoryId)
        }*/
        for (item of data) {
        gallery.insertAdjacentHTML("afterbegin", `<figure>
            <img src="${item.imageUrl}" alt="${item.title}" class="image" category="${item.categoryId}">
            <figcaption class="title">${item.title}</figcaption>
            </figure>`);
        }
}






//test
/*function deleteElement(){
    //récupère ma liste d'images
    let image = document.querySelectorAll("#portfolio img");
    console.log(image);
    //convertir ma NodeList en Array.
    let array = [...image];
    console.log(array)
    document.querySelector(".gallery").innerHTML = "";
    array.filter(thisCat => thisCat.getAttribute("category") == 1);
    console.log(array)
}*/

/*
//Télecharge data boutons Categorie
const loadDataCat = async (url) => {
    fetch(url)
        .then(response => response.json())
        .then(dataCat => {
            //console.table(dataCat);
            displayDataCat(dataCat);
        });
}
loadDataCat(urlDataCat);

//Récup data catégorie + affiche les boutons
const displayDataCat = (dataCat) => {
    
    for (let item of dataCat) {
        let btn = `<button id="${item.id}" name="${item.name}">${item.name}</button>`;
        gallery.insertAdjacentHTML("beforebegin", btn);
    }
    const buttons = document.querySelectorAll("#portfolio button");
    console.log(buttons);
    for (let button of buttons) {
        button.addEventListener("click", (e) => {
            //console.log(e.target);
            const bt = e.target;
            let idCat = bt.getAttribute("id");
            idCat = Number(idCat);
            console.log(idCat);
            let getData = sessionStorage.getItem(JSON.parse('data'));
            console.log(getData);
            //console.log(data);
            displayData(getData, idCat);
        });
    }
}
*/






//Premère méthode
gallery.insertAdjacentHTML("beforebegin", `<div id="btn-filtre"><button id="1" name="Tous">Tous</button> 
<button id="2" name="Objets">Objets</button> <button id="3" name="Appartements">Appartements</button>
<button id="4" name="Hôtels & restaurants">Hôtels & restaurants</button></div>`);


//Filtre des images
const btnTous = document.getElementById("1");
const btnObj = document.getElementById("2");
const btnAppart = document.getElementById("3");
const btnHotel = document.getElementById("4");

function getCategory(data) {
    btnTous.addEventListener("click", () => {
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

function getCategoryObj(data) {
    btnObj.addEventListener("click", () => {
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

function getCategoryAppart(data) {
    btnAppart.addEventListener("click", () => {
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

function getCategoryHotel(data) {
    btnHotel.addEventListener("click", () => {
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

//-----------------------------------Modale-----------------------------------------
//Affichage du lien modifier
const titleMesProjets = document.querySelector("#portfolio h2");
console.log(titleMesProjets);
titleMesProjets.insertAdjacentHTML('beforeend', `<a href="#" role="button" id="open-modal">modifier</a>`);

//Affichage de la modale
const body = document.querySelector("body");
body.insertAdjacentHTML('afterbegin',
    `<div class="modal" id="modal" role="dialog">
<div class="modal-content">
    <div class="modal-close">X</div>
    <h3>Galerie photo</h3>
    <div class="gallery-modal"></div>
</div>
</div>`);

const galleryModal = (data) => {
    const galleryMod = document.querySelector(".gallery-modal");
    for (let i = 0; i < data.length; i++) {
        galleryMod.insertAdjacentHTML("beforeend", `<figure>
        <img src="${data[i].imageUrl}" alt="${data[i].title}" id="${data[i].id}" class="image" height="140px" width="100%">
        <figcaption class="title">éditer</figcaption>
        <div class="icon"><i class="fa-solid fa-trash-can"></i></div></figure>`);
    }
    galleryMod.insertAdjacentHTML('afterend', `<input type="submit" id="add" value="Ajouter une photo"></input>
    <a href="#" role="button" id="delete">supprimer la galerie</a>`);
}


// Ouverture de la modale
function getButton() { //change le nom de la fonction plus parlant (buttonModalHandler), garde le même shéma ES6
    const btn = document.querySelector("#open-modal");
    console.log(btn);
    btn.addEventListener("click", function (e) {
        e.preventDefault();
        let modal = document.querySelector(".modal");
        console.log(modal);
        modal.classList.add("show");
    });
    //fermeture de la modale
    const closeModal = document.querySelector(".modal-close")
    console.log(closeModal);
    closeModal.addEventListener("click", () => {
        modal.classList.remove("show");
    })
    //fermeture uniquement autour de la modale
    modal.addEventListener("click", () => {
        modal.classList.remove("show");
    })
    modal.children[0].addEventListener("click", (e) => {
        e.stopPropagation();
    })
} getButton();

//--------------------------------------Supprimer des éléments du DOM------------------

function deleteImage() {
    document.getElementById("1").addEventListener("click", alertDelete);
}

async function alertDelete() {
    console.log("clic image 1");
    let id = Number (1);
    console.log(id);
    //On stock le token dans le localStorage
    localStorage.setItem("token","eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImlhdCI6MTY4MDEwMTk3MSwiZXhwIjoxNjgwMTg4MzcxfQ.xoF9rsCjSTJ-CkKqP28Okn9eLhUbLgsSBNqFBiPl9pk");
    //On récupère le token dans le localStorage
    let token = localStorage.getItem("token");
    console.log(token)
    //let tokens = JSON.stringify(token);
    //console.log(tokens)
    await fetch(`http://localhost:5678/api/works/${id}`, {
        method: 'DELETE',
        body: id,
        headers: {
            "Authorization": `Bearer ${token}`,
            "Accept": "application/json",
            //"Content-Type": "application/json",
        },
    })
        .then((response) => {
            response.json()
            console.log(response.status)
        })
        .then((json) => console.log("la ressource est bien supprimé"))
        .catch((json) => console.log("il y a erreur"));
}

/*function deleteItem(id){
    let modalImg = document.querySelector(`.gallery-modal #${id}`);
    modalImg = modalImg.parentElement;//AJOUTE .DELETE pour supprimer la figure complète
    console.log(modalImg)
}*/

//pour suppr boucle sur les images (e.target.id)

/*Lorsque la requête DELETE fonction écrire le .then
.then((json)=> 
    {console.log("la ressource est bien supprimé")
    deleteItem(id);
    })
    .catch(error => console.log("il y a erreur"));
*/





