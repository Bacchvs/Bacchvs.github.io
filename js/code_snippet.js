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


/////////////////////////////////////////////////////////////////////////////////////// Les boutons avec logo du language


function getFile(path, callback) {
 
        fetch(path)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Erreur lors du chargement du fichier.');
                }
                return response.text(); // Lire le contenu du fichier en tant que texte
            })
            .then(callback)
            .catch(error => {
                console.error('Erreur:', error);
            });
}




// map <String, {logo, detail}>
// var data_languages = new Map();


let data_languages = []; // Déclaration globale pour que `data_languages` soit accessible partout

async function fetchDataForLanguages(lesLangages) {
    const promises = [];

    for (let i = 0; i < lesLangages.length; i++) {
        const lang = lesLangages[i];
        const data = { name: lang };

        const promise = Promise.all([
            getFile(`/img/svg/languages/${lang}.svg`).then(textContent => {
                data.logo = textContent;
            }),
            getFile(`/documents/snippets/${lang}.txt`).then(textContent => {
                data.detail = textContent;
            })
        ]).then(() => {
            data_languages.push(data); // Utilisation de `push` pour ajouter l'objet au tableau
        });

        promises.push(promise);
    }

    await Promise.all(promises);
}

// Exemple de fonction getFile
function getFile(url) {
    return new Promise((resolve, reject) => {
        fetch(url)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.text();
            })
            .then(resolve)
            .catch(reject);
    });
}
 


var isLanguageDataReady = false;

document.addEventListener('DOMContentLoaded', () => {

    var lesLangages = ["C", "C++", "Java", "Python", "R", "SQL"]; //, "COBOL", "VBA", "JavaScript", "HTML"


    let mesLanguages_container = document.getElementById("mesLanguagesInformatiques");
    let lang_detail_container = document.getElementById("lang_detail");
    

    // Appel de fetchDataForLanguages
    fetchDataForLanguages(lesLangages).then(() => {
        isLanguageDataReady = true;

        for (let i = 0; i < data_languages.length; i++) {
            mesLanguages_container.innerHTML += `<div onclick="lang_click(this)" class="btn_lang" id="${i}">${data_languages[i].logo}</div>`;
        }

        lang_detail_container.innerText = data_languages[0].detail;
    });



    // for(let i = 0; i< les_boutons_languages.length; i++){
    //     let lang = les_boutons_languages[i].getAttribute('lang').toUpperCase();
    //     if (lang != 'undefined'){
    //         if (! logos_languages.has(lang)){
    //             getFile("/img/svg/languages/"+lang+".svg", async textContent => {
    //                     logos_languages.set(lang, textContent);
    //                     les_boutons_languages[i].innerHTML = textContent;
    //                 });

    //             getFile("/img/documents/languages/"+lang+".txt", async textContent => {
    //                 detail_lang.set(lang, textContent);
    //             });
    //         }else{
    //             console.log("LOGO "+lang +" déjà présent. ");
    //             les_boutons_languages[i].innerHTML = logos_languages.get(lang);
    //         } 
    //     }
    // }



    // lang_detail_container.innerText = detail_lang.get("R");





});


var lastSelected = 0;

function lang_click(src){
    // si c'est pas pret, on fait rien
    if ( ! isLanguageDataReady) return;

    const btns = document.getElementsByClassName("btn_lang");

    let id = src.getAttribute("id");



    /// déséléctionne l'ancien language.
    btns[lastSelected%btns.length].classList.remove("selected_lang");

    
    /// séléctionne le language choisis.
    btns[id%btns.length].classList.add("selected_lang");

    /// met le text correspondant

    let lang_detail_container = document.getElementById("lang_detail");
    lang_detail_container.innerText = data_languages[id].detail;

    // met le code snippet correspondant
    // TODO: 
}