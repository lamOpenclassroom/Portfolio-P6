function listenerConnexion() {
    const formulaire = document.querySelector("#form");
    const paraErrorOrValid = document.querySelector("#login h2");
    paraErrorOrValid.insertAdjacentHTML("afterend",
    `<p style="color:red;" id="erreur"></p>
        <p style="color:green;" id="connexion-valid"></p>`)
    formulaire.addEventListener("submit", function (e) {
        e.preventDefault();
        let dataForm = {
            email: e.target.querySelector("[name=email]").value,
            password: e.target.querySelector("[name=password]").value
        }
        //convertir les datas récupérés en format json
        let dataFormJson = JSON.stringify(dataForm);

        //Appel de la fonction fetch
        fetch("http://localhost:5678/api/users/login", {
            method: "POST",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
            },
            body: dataFormJson
        }).then((resp) => {
            if (resp.ok == false) {
                document.getElementById("erreur").innerHTML = ("Erreur dans l’identifiant ou le mot de passe");
            } else {
                document.getElementById("connexion-valid").innerHTML = ("Vous êtes bien connecté");
                return resp.json();
            }
            
        })
        .then((data)=>{
            //On stock le token dans le localStorage
            localStorage.setItem("token", data.token);
            window.location.replace("http://127.0.0.1:5500/FrontEnd/index.html");
        })

    })
}
listenerConnexion();


