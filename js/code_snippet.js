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


function colorTocken(text, regex, class_name){
    let ret;
    if (Array.isArray(regex)){
        ret = text;
        for (let i=0; i<regex.length; i++){
            ret = extractAndReplace(ret, regex[i], class_name);
        }
    }
    else{
         ret = extractAndReplace(ret, regex, class_name);
    }
    
    return ret;
}



function colorComment(text){
    let ret = text.replace("//", "<span class='comment'>"+"//");
    ret = ret + "</span>";
    return ret;
}

function extractAndReplace(text, regexPattern, className) {
    try {
        // Crée une expression régulière à partir du modèle fourni
        let regex = new RegExp(regexPattern, 'g');
        let matches = [];
        let match;

        console.log("regex : "+regex);
        // Trouve toutes les occurrences correspondant au modèle regex
        if ((match = regex.exec(text)) !== null) {
            matches.push(match); // Ajouter la correspondance trouvée au tableau
            console.log("match : "+match);
        }

        let ret = text; 
        // Remplace chaque occurrence par elle-même entourée d'une balise HTML avec la classe
        for( let i = 0; i< matches.length; i++){
            ret = ret.replace(matches[i], `<span class="${className}">${matches[i]}</span>`);            
        }
         
        return ret;
    } catch (e) {
        // Gestion des erreurs si le modèle regex est invalide
        console.error('Erreur dans le modèle regex :', e);
        return text;
    }
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

                linesArray[i] = colorTocken(linesArray[i], ["/",":?","\\:", "\\[", "\\]", "\\(", "\\)", "\\{", "\\}",  "\\\\", ",", "[*]", "<<"], "ponctuation");
                
             
                //remplace les espace par des &spaces....
                linesArray[i] = replace_beginer_space(linesArray[i]);

                
                
                // linesArray[i] = colorTocken(linesArray[i], ["main", "argc", "argv", "std"], "varname");
                linesArray[i] = colorTocken(linesArray[i], ["#include"], "directive");
                linesArray[i] = colorTocken(linesArray[i], ["if", "else", "elif", "switch", "case", "break", "goto", "return", "for", "while", "do"], "keyword");
                linesArray[i] = colorTocken(linesArray[i], ["char", "short", "int", "float", "double", "long", "const", "string", "std"], "types");
                // linesArray[i] = colorComment(linesArray[i]);

                  

                linesArray[i] = "<div class='line' n='"+i+"'>" + linesArray[i] + "</div>";
            }
            
            // Afficher les lignes dans un élément HTML
            let fileContentElement = document.getElementById('snipInf');





            fileContentElement.innerHTML = linesArray.join("<br>"); // Joindre les lignes avec des retours à la ligne

            // Optionnel : Afficher le tableau des lignes dans la console
            console.log(linesArray);
        })
        .catch(error => {
            console.error('Erreur:', error);
        });

});    