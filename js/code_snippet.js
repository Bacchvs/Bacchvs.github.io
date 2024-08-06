document.addEventListener('DOMContentLoaded', () => {

    ///////////////////////////////////////////


    // URL du fichier à charger
    const fileUrl = '../documents/snippets/snippet.cpp';
    
    fetch(fileUrl)
        .then(response => {
            // Vérifier si la requête a réussi
            if (!response.ok) {
                throw new Error('Erreur lors du chargement du fichier.');
            }
            return response.text(); // Lire le contenu du fichier en tant que texte
        })
        .then(textContent => {
            // Diviser le texte en lignes
            const linesArray = textContent.split("\\r?\\n"); 
            

            linesArray.forEach(line => ()=>{
                line.replace("if", "CONDITION");
            });

            // Afficher les lignes dans un élément HTML
            const fileContentElement = document.getElementById('code_snippet');


            fileContentElement.textContent = linesArray.join("<br/>"); // Joindre les lignes avec des retours à la ligne

            // Optionnel : Afficher le tableau des lignes dans la console
            console.log(linesArray);
        })
        .catch(error => {
            console.error('Erreur:', error);
        });

});    