const gallery = document.querySelector(".gallery");
gallery.insertAdjacentHTML("beforebegin", `<div class="btn-filtre"></div>`);
const btnFiltre = document.querySelector(".btn-filtre");
const urlData = "http://localhost:5678/api/works";
const urlDataCat = "http://localhost:5678/api/categories";

//Ajout du bouton Tous
function AddBtnAll() {
    btnFiltre.insertAdjacentHTML("afterbegin", `<button id="tous" name="Tous">Tous</button>`);
}

async function loadData(url) {
    fetch(url)
        .then(response => response.json())
        .then(data => {
            AddBtnAll();
            displayData(data);
            boucleFor(data);
            sessionStorage.setItem('data', JSON.stringify(data));
            galleryModal(data);
            buttonModalHandler();
            clicAddImg(data);
            deleteImage(data);
        })
};
loadData(urlData);

//Reload la modale et la page d'accueil au moment de la suppression
function reloadDeleteModal(url) {
    const galleryMod = document.querySelector(".gallery-modal");
    const gallery = document.querySelector(".gallery");
    galleryMod.innerHTML = "";
    gallery.innerHTML = "";
    fetch(url)
        .then(response => response.json())
        .then(data => {
            galleryModal(data);
            boucleFor(data);
            sessionStorage.setItem('data', JSON.stringify(data));
            deleteImage(data);
        })
}
//reload au moment de l'ajout
async function reloadAddModal(url) {
    const galleryMod = document.querySelector(".gallery-modal");
    const gallery = document.querySelector(".gallery");
    galleryMod.innerHTML = "";
    gallery.innerHTML = "";
    fetch(url)
        .then(resp => resp.json())
        .then(data => {
            boucleFor(data);
            sessionStorage.setItem('data', JSON.stringify(data));
            galleryModal(data);
            deleteImage(data);
        })
}

//Affichage des datas
function boucleFor(data) {
    document.querySelector(".gallery").innerHTML = "";
    for (item of data) {
        gallery.insertAdjacentHTML("afterbegin", `<figure>
        <img src="${item.imageUrl}" alt="${item.title}" class="image">
        <figcaption class="title">${item.title}</figcaption>
        </figure>`);
    }
}

function displayData(data, idCat = 0) {
    const btnTous = document.querySelector("#tous"); 
    btnTous.addEventListener("click", () => {
        boucleFor(data); 
    });
    
    if(idCat > 0){
        document.querySelector(".gallery").innerHTML = "";
        console.log(idCat)
    }
    
    
    for (item of data) {
        if (item.categoryId == idCat) {
            gallery.insertAdjacentHTML("afterbegin", `<figure>
            <img src="${item.imageUrl}" alt="${item.title}" class="image">
            <figcaption class="title">${item.title}</figcaption>
            </figure>`);
        }
    }
    
}


//Télecharge data boutons Categorie
async function loadDataCat(url) {
    fetch(url)
        .then(response => response.json())
        .then(dataCat => {
            displayDataCat(dataCat);
            cat(dataCat);
        });
}
loadDataCat(urlDataCat);

//Récup data catégorie + affiche les boutons
function displayDataCat(dataCat) {
    for (let item of dataCat) {
        let btn = `<button id="${item.id}" name="${item.name}">${item.name}</button>`;
        btnFiltre.insertAdjacentHTML("beforeend", btn);
    }

    const buttons = document.querySelectorAll("#portfolio button");
    for (let button of buttons) {
        button.addEventListener("click", (e) => {
            const bt = e.target;
            let idCat = bt.getAttribute("id");
            idCat = Number(idCat);
            const getData = JSON.parse(sessionStorage.getItem('data'));
            displayData(getData, idCat);
        });
    }
}


//----------------------------------Modale--------------------------------------------------------------------
function displayModale() {
    //Affichage du lien modifier lorsqu'on est connecté
    const titleMesProjets = document.querySelector("#portfolio h2");
    titleMesProjets.insertAdjacentHTML('beforeend', `<a href="#" role="button" id="open-modal">modifier</a>`);

    const token = localStorage.getItem("token");
    if (token == null || token == "") {
        document.getElementById("open-modal").style.display = "none";
    }
}
//--------------------------------------Affichage de la modale--------------------------------------------------
const body = document.querySelector("body");
body.insertAdjacentHTML('afterbegin',
    `<div class="modal" id="modal" role="dialog">
<div class="modal-content affiche-bloc">
    <div id="modal-content_first_enfant">
        <div class="modal-close">
        <i class="fa-solid fa-xmark"></i>
        </div>
        <h3>Galerie photo</h3>
        <div class="gallery-modal"></div>
        <input type="submit" id="add" value="Ajouter une photo"></input>
        <a href="#" role="button" id="delete">supprimer la galerie</a>
    </div>
</div>
</div>`);

function galleryModal(data) {
    const galleryMod = document.querySelector(".gallery-modal");
    for (let i = 0; i < data.length; i++) {
        galleryMod.insertAdjacentHTML("beforeend", `<figure><div class="icon"><i class="fa-solid fa-trash-can"></i></div>
        <img src="${data[i].imageUrl}" alt="${data[i].title}" id="${data[i].id}" class="image" height="140px" width="100%">
        <figcaption class="title">éditer</figcaption>
        </figure>`);
    }
}

//-------------------------------------Affichage fenêtre ajout photo--------------------------------------------------
const formAddImag = document.querySelector(".modal-content");
formAddImag.insertAdjacentHTML('beforeend',
    `<div id="modal-content_add-img" class="affichageCacher">
<i class="fa-solid fa-arrow-left"></i>
<div class="add-img_close">
<i class="fa-solid fa-xmark"></i>
</div>
<h3>Ajout photo</h3>

<form class="formAddPhoto">
    <div class="img">
        <i class="fa-sharp fa-regular fa-image fa-4x" ></i>
        <label for="file" class="file add-color-grey" id="ajout-photo"> + Ajouter photo</label>
        <input src="*/assets" accept=".png" type="file" name="file" id="file" onchange="previewPicture(this)" required>
        <p>jpg, png : 4mo max</p>
        <img src="#" alt="" id="image">
    </div>
	<label for="title">Titre</label>
	<input type="text" name="title" id="title">
	<label for="category">Catégorie</label>
	<select type="number" name="category" id="category">
    <option value="">Choose a category</option>
    </select>
    <input type="submit" id="addPhoto" value="Valider">
</form>
</div>`);
const borderTopBtn = document.querySelector(".formAddPhoto #addPhoto");
borderTopBtn.insertAdjacentHTML("beforebegin", `<p style="border: 1px solid #B3B3B3; margin-top: 47px;"></p>`);

const erreurChamps = document.querySelector("#modal-content_add-img h3");
erreurChamps.insertAdjacentHTML("afterend", `<p style="color:red;" class="erreur-champs"></p>`);
erreurChamps.insertAdjacentHTML("afterend", `<p style="color:green;" class="champs-valid"></p>`);
const erreur = document.querySelector(".erreur-champs");
const valide = document.querySelector(".champs-valid");

//Récupération des catégories
function cat(dataCat) {
    dataCat.forEach(element => {
        const selectOption = document.querySelector("#category");
        selectOption.insertAdjacentHTML("beforeend", `<option value = "${element.id}">${element.name}</option>`)
    });
};

//------------------------------------------prévisualisé l'image---------------------------------------------
var image = document.getElementById("image");

function previewPicture(e) {

    // e.files contient un objet FileList
    const [file] = e.files
    let uploadFile = document.querySelector("#ajout-photo")
    // file est un objet File
    if (file) {
        //cacher le bouton ajouter photo
        uploadFile.classList.remove("add-color-grey");
        // L'objet FileReader
        let reader = new FileReader();
        // L'événement déclenché lorsque je choisis ma photo
        reader.onload = function (e) {
            // je change l'URL de l'image
            image.src = e.target.result
        }
        // Je lis le fichier uploadé
        reader.readAsDataURL(file);
    }
}


//------------------------------------------Ouverture de la modale----------------------------------------------------
function buttonModalHandler() {
    displayModale();
    const btn = document.querySelector("#open-modal");
    const contentModal = document.querySelector(".modal-content #modal-content_add-img");
    const ModalFirstChild = document.querySelector("#modal-content_first_enfant")
    btn.addEventListener("click", function (e) {
        e.preventDefault();
        let modal = document.querySelector(".modal");
        modal.classList.add("show");
    });

    //fermeture de la modale
    const closeModal = document.querySelector(".modal-close")
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

    //fermeture de la fenêtre add img uniquement
    const closeAddImg = document.querySelector(".add-img_close");
    closeAddImg.addEventListener("click", () => {
        contentModal.classList.add("affichageCacher");
        ModalFirstChild.classList.remove("affichageCacher");
    })
    //fleche gauche retour en arrière
    const arrowLeft = document.querySelector(".fa-arrow-left");
    arrowLeft.addEventListener("click", () => {
        contentModal.classList.add("affichageCacher");
        ModalFirstChild.classList.remove("affichageCacher");
    })

    //Ouverture fenêtre ajout photo
    const openWindowAddImg = document.querySelector("#add")
    openWindowAddImg.addEventListener("click", () => {
        contentModal.classList.remove("affichageCacher");
        ModalFirstChild.classList.add("affichageCacher");
    })
}



//--------------------------------------Supprimer des éléments du DOM------------------

function deleteImage() {
    const figures = document.querySelectorAll(".gallery-modal figure .icon");
    for (figure of figures) {
        figure.addEventListener("click", (e) => {
            e.preventDefault();
            const parentFigure = e.target.parentElement.parentNode;
            const childFigure = parentFigure.childNodes[2];
            let idFigure = childFigure.getAttribute("id");
            alertDelete(idFigure);
        });
    }
}

async function alertDelete(idFigure = 0) {
    let id = idFigure;
    //On récupère le token dans le localStorage
    let token = localStorage.getItem("token");
    await fetch(`http://localhost:5678/api/works/${id}`, {
        method: 'DELETE',
        body: id,
        headers: {
            "Authorization": `Bearer ${token}`,
            "Accept": "application/json",
        },
    })
        .then((res) => {
            if (res.ok == false) {
                alert("Suppression non valide !!");
            } else {
                alert("Suppression validé");
                reloadDeleteModal(urlData);
            }

        })
        .then(json => console.log("la ressource est bien supprimé"))
        .catch((error) => console.log(error))
}

//-------------------------------------Ajout des élément du DOM-------------------------

function clicAddImg() {
    document.querySelector(".formAddPhoto").addEventListener("submit", async (e) => {
        e.preventDefault();
        erreur.innerHTML = "";
        let token = localStorage.getItem("token");
        let userFile = document.getElementById("file").files[0];
        let userTitle = document.getElementById("title").value;
        let userCategory = document.getElementById("category").value;

        const formData = new FormData();
        formData.append("image", userFile);
        formData.append("title", userTitle);
        formData.append("category", userCategory);

        await fetch("http://localhost:5678/api/works", {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${token}`,
            },
            body: formData,
        })
            .then(resp => {
                console.table(resp)
                if (resp.ok == false) {
                    erreur.innerHTML = "Veuillez remplir tout les champs";
                    valide.innerHTML = "";
                } else {
                    erreur.classList.remove("erreur-champs");
                    valide.innerHTML = "le formulaire est correctement envoyé";
                    reloadAddModal(urlData);
                    document.getElementById("title").value = "";
                    document.getElementById("category").value = "";
                    let userFileReset = document.getElementById("file")
                    userFileReset.files = null;
                    let resetImage = document.getElementById("image");
                    resetImage.src = "";
                    let uploadFileVisible = document.querySelector("#ajout-photo");
                    uploadFileVisible.classList.add("add-color-grey");
                }
            })
            .then(json => console.log("la ressource est bien ajoutée"))
            .catch((error) => console.log(error))
    })
}

