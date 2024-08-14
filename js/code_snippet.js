// prépare une chaine à être utilisé dans une balise via innerHTML
async function escapeHTML(text) {
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
async function replaceOutsideQuotes(text, target, replacement) {
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


async function replace_beginer_space(text) {
    let nbSpace= 0;
    for (nbSpace=0; nbSpace<text.length; nbSpace++){
        if ([nbSpace] != text[nbSpace]){
            break;
        }
    } 
    
    if (nbSpace == 0){
        return text;
    }

    let numSpaces = nbSpace;
        
    // Remplacer les groupes de 4 espaces par &emsp;
    while (numSpaces >= 4) {
        replacement += '&emsp;';
        numSpaces -= 4;
    }
        
    // Remplacer les espaces restants par &nbsp;
    replacement += '&nbsp;'.repeat(numSpaces);
        
    // Remplacer les espaces au début de la chaîne par la chaîne de remplacement
    return replacement + text.substring(0, nbSpace);
}   


async function colorTocken(text, regex, class_name){
    let ret;
    if (Array.isArray(regex)){
        ret = text;
        for (let i=0; i<regex.length; i++){
            ret = await extractAndReplace(ret, regex[i], class_name);
        }
    }
    else{
         ret = await extractAndReplace(ret, regex, class_name);
    }
    
    return ret;
}


 

async function colorComment(text){
    let ret = text.replace("//", "<span class='comment'>"+"//");
    ret = ret + "</span>";
    return ret;
}

async function extractAndReplace(text, regexPattern, className) {
    try {
        // Crée une expression régulière à partir du modèle fourni
        let regex = new RegExp(regexPattern, 'g');
        let matches = [];
        let match;

        // console.log("regex : "+regex);
        // Trouve toutes les occurrences correspondant au modèle regex
        while ((match = regex.exec(text)) !== null) {
            matches.push({
                text: match[0],
                index: match.index
            });        
        }

        // console.log("matches : "+ '['+matches+']');
        
        let ret = ""; 
        let id_start = 0;

      

        // Remplace chaque occurrence par elle-même entourée d'une balise HTML avec la classe
        for(let i = 0; i< matches.length; i++){
            let rep_str = `<span class="${className}">${matches[i].text}</span>`;
             
            ret += text.substring(id_start, matches[i].index)  + rep_str;

            // console.log(rep_str + " LONGUEUR "+rep_str.length);
            id_start =   matches[i].index  + matches[i].text.length;
        }
        
        ret += text.substring(id_start, text.length); 

        return ret;
    } catch (e) {
        // Gestion des erreurs si le modèle regex est invalide
        console.error('Erreur dans le modèle regex :', e);
        return text;
    }
}

async function colorStrings(text){
    return extractAndReplace(text, "\"([^\"\\\\]*(\\\\.[^\"\\\\]*)*)\"", "text")
}

document.addEventListener('DOMContentLoaded', () => {
  
    ///////////////////////////////////////////


    // URL du fichier à charger
    const fileUrl = '../documents/snippets/snippet.';
    
    var lesLanguages = ["cpp"];

    fetch(fileUrl+ lesLanguages[new Date().getTime()%lesLanguages.length])
        .then(response => {
            // Vérifier si la requête a réussi
            if (!response.ok) {
                throw new Error('Erreur lors du chargement du fichier.');
            }
            return response.text(); // Lire le contenu du fichier en tant que texte
        })
        .then(async textContent => {
            // Diviser le texte en lignes
            let linesArray = textContent.split(/\r?\n/); 
            console.log("elem 0 : "+ linesArray[0]);

            for (let i = 0; i<linesArray.length; i++){
                
                  
                // echappe les caractères interdits.
                linesArray[i] = await escapeHTML(linesArray[i]); 
                linesArray[i] = await colorTocken(linesArray[i], ["/","\\:", "\\[", "\\]", "\\(", "\\)", "\\{", "\\}",  "\\\\", ",", "[*]", "<<"], "ponctuation");
                 
                //remplace les espace par des &spaces....
                linesArray[i] = await replace_beginer_space(linesArray[i]);
                // console.log(linesArray[i]);
                 
                // linesArray[i] = await colorTocken(linesArray[i], ["main", "argc", "argv", "std"], "varname");
                linesArray[i] = await colorTocken(linesArray[i], ["#include"], "directive");
                linesArray[i] = await colorTocken(linesArray[i], ["if", "else", "elif", "switch", "case", "break", "goto", "return", "for", "while", "do"], "keyword");
                linesArray[i] = await colorTocken(linesArray[i], ["char", "short", "int", "float", "double", "long", "const", "string", "std"], "types");
                linesArray[i] = await colorComment(linesArray[i]);

                // linesArray[i] = await colorStrings(linesArray[i]);
                

                // linesArray[i] = await colorTocken(linesArray[i], ["int"], "types");

                console.log(linesArray[i]);



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