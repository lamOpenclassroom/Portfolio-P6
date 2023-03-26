function listenerConnexion() {
    const formulaire = document.querySelector("#form");
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
                //"Authorization": Bearer <token> ne pas oublier pour renvois et suppression des travaux.
            },
            body: dataFormJson
        }).then(resp => {
            console.table(resp);
            if (resp.ok == false) {
                alert("Erreur dans l’identifiant ou le mot de passe");
            } else {
                console.log(resp.json())
                //console.log(JSON.parse(resp.json())) pour récupérer le token
                window.location.replace("http://127.0.0.1:5500/FrontEnd/index.html");
            }
        });

    })
}
listenerConnexion();


