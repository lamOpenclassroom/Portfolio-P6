const gallery = document.querySelector(".gallery");
gallery.insertAdjacentHTML("beforebegin", `<div class="btn-filtre"></div>`);
const btnFiltre = document.querySelector(".btn-filtre");
const urlData = "http://localhost:5678/api/works";
const urlDataCat = "http://localhost:5678/api/categories";
btnFiltre.insertAdjacentHTML("afterbegin", `<button id="tous" name="Tous">Tous</button>`)
const btnTous = document.querySelector("#tous");
//télécharger mes data du serveur
const loadData = async (url) => {
    fetch(url)
        .then(response => response.json())
        .then(data => {
            displayData(data);
            boucleFor(data);
            console.log(data)
            sessionStorage.setItem('data', JSON.stringify(data))
            galleryModal(data); //function affiche ma modale
            deleteImage(data);  //function supprime un élément de la modale
            clicAddImg(data); //function rajoute une image
            /*//catégory Tous Obj Appart Hotel
            getCategory(data);
            getCategoryObj(data);
            getCategoryAppart(data);
            getCategoryHotel(data);*/
        })
};
loadData(urlData);

let boucleFor = (data) => {  
    for (item of data){
        gallery.insertAdjacentHTML("afterbegin", `<figure>
        <img src="${item.imageUrl}" alt="${item.title}" class="image">
        <figcaption class="title">${item.title}</figcaption>
        </figure>`); 
    } 
}

//Affiche mes data
const displayData = (data, idCat = 0) => {
    document.querySelector(".gallery").innerHTML = "";
    btnTous.addEventListener("click",()=>{
        document.querySelector(".gallery").innerHTML = "";
        boucleFor(data);
    })
    
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
        btnFiltre.insertAdjacentHTML("beforeend", btn);
    }
    
    const buttons = document.querySelectorAll("#portfolio button");
    console.log(buttons);
    for (let button of buttons) {
        button.addEventListener("click", (e) => {
            //console.log(e.target);
            const bt = e.target;
            let idCat = bt.getAttribute("id");
            idCat = Number(idCat);
            //console.log(idCat);
            //let getData = sessionStorage.getItem(JSON.parse('data'));
            const getData = JSON.parse(sessionStorage.getItem('data'));
            //console.log(getData);
            //console.log(data);
            displayData(getData, idCat);
        });
    }
}


//const btnTous = document.querySelector("#tous");
//console.log(btnTous);



/*
//Premère méthode
gallery.insertAdjacentHTML("beforebegin", `<div id="btn-filtre"> 
<button id="2" name="Objets">Objets</button> <button id="3" name="Appartements">Appartements</button>
<button id="4" name="Hôtels & restaurants">Hôtels & restaurants</button></div>`);


//Filtre des images

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
*/
//----------------------------------Modale--------------------------------------------------------------------
//Affichage du lien modifier
const titleMesProjets = document.querySelector("#portfolio h2");
console.log(titleMesProjets);
titleMesProjets.insertAdjacentHTML('beforeend', `<a href="#" role="button" id="open-modal">modifier</a>`);

//--------------------------------------Affichage de la modale--------------------------------------------------
const body = document.querySelector("body");
body.insertAdjacentHTML('afterbegin',
    `<div class="modal" id="modal" role="dialog">
<div class="modal-content affiche-bloc">
    <div class="modal-close">X</div>
    <h3>Galerie photo</h3>
    <div class="gallery-modal"></div>
    <input type="submit" id="add" value="Ajouter une photo"></input>
    <a href="#" role="button" id="delete">supprimer la galerie</a>
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
}

//-------------------------------------Affichage fenêtre ajout photo--------------------------------------------------

const formAddImag = document.querySelector("#modal");
console.log(formAddImag)
formAddImag.insertAdjacentHTML('beforeend',
    `<div id="add-img">
<i class="fa-regular fa-arrow-left"></i>
<div class="add-img_close">X</div>
<h3>Ajout photo</h3>

<form class="formAddPhoto">
    <div class="img">
        <label for="file" class="file"> + Ajouter photo</label>
        <input accept=".png" type="file" name="file" id="file">
        <p>jpg, png : 4mo max</p>
    </div>
	<label for="title">Titre</label>
	<input type="text" name="title" id="title">
	<label for="category">Catégorie</label>
	<select type="number" name="category" id="category">
    <option value="">Choose a category</option>
    <option value="1">1</option>
    <option value="2">2</option>
    <option value="3">3</option>
    </select>
    <input type="submit" id="addPhoto" value="Valider">
</form>
        
</div>`);

//------------------------------------------Ouverture de la modale----------------------------------------------------
function buttonModalHandler() {
    const btn = document.querySelector("#open-modal");
    console.log(btn);
    const contentModal = document.querySelector(".modal-content")
    console.log(contentModal)
    btn.addEventListener("click", function (e) {
        e.preventDefault();
        let modal = document.querySelector(".modal");
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

    //fermeture de la fenêtre add img uniquement
    const closeAddImg = document.querySelector(".add-img_close");
    closeAddImg.addEventListener("click", () => {
        contentModal.classList.add("affiche-bloc")
    })
    //fleche gauche retour en arrière
    const arrowLeft = document.querySelector(".fa-regular");
    console.log(arrowLeft);
    arrowLeft.addEventListener("click", () => {
        contentModal.classList.add("affiche-bloc")
    })



    //Ouverture fenêtre ajout photo
    const openWindowAddImg = document.querySelector("#add")
    console.log(openWindowAddImg);
    openWindowAddImg.addEventListener("click", () => {
        contentModal.classList.remove("affiche-bloc")
        modal.children[1].addEventListener("click", (e) => {
            e.stopPropagation();
        })
    })
} buttonModalHandler();

//--------------------------------------Supprimer des éléments du DOM------------------

function deleteImage() {
    document.getElementById("3").addEventListener("click", alertDelete);
}

async function alertDelete(e) {
    e.preventDefault();
    let id = Number(3);
    console.log(id);
    console.log("clic image 3");
    //On stock le token dans le localStorage
    localStorage.setItem("token", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImlhdCI6MTY4MDg4OTI0MiwiZXhwIjoxNjgwOTc1NjQyfQ.lQdwW4fT-xC5OfSeZ9rJ3L0y0Ckf2SKINqkMW6hAEO0");
    //On récupère le token dans le localStorage
    let token = localStorage.getItem("token");
    //console.log(token)
    //let tokens = JSON.stringify(token);

    await fetch(`http://localhost:5678/api/works/${id}`, {
        method: 'DELETE',
        body: id,
        headers: {
            "Authorization": `Bearer ${token}`,
            "Accept": "application/json",
        },
    })
        .then((res) => {
            res.json()
            console.log(res.status)
        })
        .then((json) => console.log("la ressource est bien supprimé"))
        .catch((json) => console.log("il y a erreur"))

}

//-------------------------------------Ajout des élément du DOM-------------------------

function clicAddImg() {
    document.querySelector(".formAddPhoto").addEventListener("submit", async (e) => {
        e.preventDefault();
        let token = localStorage.getItem("token");
        console.log(token);
        const userFile = document.getElementById("file").files[0];
        const userTitle = document.getElementById("title").value;
        const userCategory = document.getElementById("category").value;
        console.log(userFile,userTitle,userCategory)
        if (userFile == '' || userTitle == '' || userCategory == ''){
            alert("Veuillez remplir tout les champs")
        }

        const formData = new FormData();
        formData.append("image",userFile);
        formData.append("title",userTitle);
        formData.append("category",userCategory);
        console.log(formData);
        
        await fetch("http://localhost:5678/api/works",{
            method: "POST",
            headers: {
               // "Accept": "application/json",
                "Authorization": `Bearer ${token}`,
               // "Content-Type": "multipart/form-data",
            },
            body: formData,
        })
        .then(resp => {console.table(resp)
        if (resp.ok == false) {
            console.log("la requête est en erreur");
        } else {
            console.log(resp.json())
            alert("le formulaire est correctement envoyé")
        }
        })
})
}


