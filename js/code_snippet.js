// prépare une chaine à être utilisé dans une balise via innerHTML
function escapeHTML(text) {
    return text.replace(/&/g, '&amp;')
               .replace(/</g, '&lt;')
               .replace(/>/g, '&gt;')
               .replace(/"/g, '&quot;')
               .replace(/'/g, '&#039;')
               
               
            //    .replace(/#idt#/g, '<idt/>');
            // .replace(/\s\s\s\s/g, '<idt/>');
               
               ;
}


// ne remplace que les truc quil voit en dehors des quotes
function replaceOutsideQuotes(text, target, replacement) {
    // Expression régulière pour trouver les parties entre guillemets
    const quotedRegex = /"[^"]*"/g;
    const unquotedTextParts = [];
    let lastIndex = 0;
    
    // Trouver et isoler les parties entre guillemets
    text.replace(quotedRegex, (match, offset) => {
        // Ajouter le texte non cité avant cette occurrence
        if (offset > lastIndex) {
            unquotedTextParts.push(text.substring(lastIndex, offset));
        }
        // Ajouter le texte entre guillemets sans modification
        unquotedTextParts.push(match);
        lastIndex = offset + match.length;
    });

    // Ajouter le reste du texte après la dernière citation
    if (lastIndex < text.length) {
        unquotedTextParts.push(text.substring(lastIndex));
    }
    
    // Remplacer les occurrences de target dans les parties non citées
    return unquotedTextParts.map(part => {
        // Conserver les parties entre guillemets inchangées
        return part.startsWith('"') && part.endsWith('"') ? part : part.replace(new RegExp(target, 'g'), replacement);
    }).join('');
}


function replace_beginer_space(text) {
    // Utiliser une expression régulière pour trouver les espaces au début de la chaîne
    const match = text.match(/^( +)/);
    
    if (match) {
        // Nombre d'espaces trouvés
        let numSpaces = match[0].length;
        let replacement = '';
        
        // Remplacer les groupes de 4 espaces par &emsp;
        while (numSpaces >= 4) {
            replacement += '&emsp;';
            numSpaces -= 4;
        }
        
        // Remplacer les espaces restants par &nbsp;
        replacement += '&nbsp;'.repeat(numSpaces);
        
        // Remplacer les espaces au début de la chaîne par la chaîne de remplacement
        return replacement + text.slice(match[0].length);
    }
    
    // Retourner la chaîne originale si aucun espace n'est trouvé au début
    return text;
}


function colorTocken(text, regex, color_str){
    return text.replace(regex, ("<span style='color:'" + color_str + ">"+regex+"</span>"));
}


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
            let linesArray = textContent.split(/\r?\n/); 
            console.log("elem 0 : "+ linesArray[0]);

            for (let i = 0; i<linesArray.length; i++){
                // linesArray[i] = replaceOutsideQuotes(linesArray[i], "main", "HELLO MY DEAR");
                
                
                
                // echappe les caractères interdits.
                linesArray[i] = escapeHTML(linesArray[i]);

             
                //remplace les espace par des &spaces....
                linesArray[i] = replace_beginer_space(linesArray[i]);
       
                // color le include. 
                colorTocken(linesArray[i], "#include", "#FF00FF");
                
            }
            
            // Afficher les lignes dans un élément HTML
            let fileContentElement = document.getElementById('code_snippet');


            
            fileContentElement.innerHTML = linesArray.join("<br>"); // Joindre les lignes avec des retours à la ligne

            // Optionnel : Afficher le tableau des lignes dans la console
            console.log(linesArray);
        })
        .catch(error => {
            console.error('Erreur:', error);
        });

});    