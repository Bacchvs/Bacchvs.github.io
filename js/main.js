// import util from "./util.js"


function isDarkMode(){
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
}

let isFullyCharged = false;
const time_start = new Date().getTime(); 

const copyright_string = "Copyright © "+ (new Date().getFullYear()) + " Arnaud Sénécaut - All Rights Reserved.";
const monAge = new Date().getFullYear() - 2000;
              
function messageCaviard(){
    alert("Bonjour,\n\nVeuillez noter que la version du CV que vous avez téléchargée est une version caviardée pour des raisons de confidentialité. Pour toute question ou pour obtenir des informations supplémentaires, n'hésitez pas à me contacter par e-mail.\nMerci de votre compréhension.\n\nCordialement,\n\tArnaud Sénécaut");
}

// pour mettre à jour le favicon en fonction du theme
function updateFavicon() {
    const favicon = document.getElementById('favicon');
    const darkMode =  isDarkMode();
    favicon.href = darkMode ? '/img/favicons/favicon_dark.png' : '/img/favicons/favicon_light.png';
}

updateFavicon();




// document.addEventListener('DOMContentLoaded', updateFavicon);
window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', updateFavicon);
 


let language = navigator.language;
 

// let CVname;
// if (language === "fr"){
//     CVname = "CV_Arnaud_SENECAUT_Biologie.pdf"
// }else{
//     CVname = "CV_Arnaud_SENECAUT_Biologie_EN.pdf"
// }


// Permet de scroller à la bonne section
// dit si on est pas déjà entrain de scrller automatiquement (affin de diférencier automatique de manuel)
let isScrollingAuto = false;

function scrollToSection(id) {
    isScrollingAuto = true;
    const targetElement = document.getElementById(id);
    if (targetElement) {
        targetElement.scrollIntoView({ behavior: 'smooth' });
    }
    setTimeout(() => {
        isScrollingAuto = false;  
    }, 500);
}

function menuUpdateSelectionMark(menu, target){
    for (let i = 0; i<menu.children.length; i++){
        menu.children[i].classList.remove("menu_selected");
    };

    target.classList.add("menu_selected");
}

function menuClick(menu, event){ 

    // ca le fera déjà quand il verra qu'on est dessus l'élément 
    // menuUpdateSelectionMark(menu, event.target);
    

    scrollToSection(event.target.getAttribute('target'));
}


function switch_menuVisibility(){
    const menu = getMainMenu();
    

    if (menu.classList.contains("hide")){
        
        menu.classList.remove("hide"); 
        
    }
    else{
        menu.classList.add("hide");
        
    }
}


// function updateFieldText(bBiologie, bChimie, bInformatique){
//     // les cominaisons : biologie, biochimie, bioInformatique, informatique, Chimie Analytique  


//     let str = "";


//     if (bBiologie && bChimie && bInformatique){
//         str = "La chimie pour comprendre les mécanismes sous-jacents, l'informatique pour traiter les données massives, et la biologie pour donner du sens et du contexte à ces informations : c'est cette combinaison unique de compétences que j'ai développée pour aborder les défis complexes de la recherche et proposer des solutions innovantes.";
//     }
//     else if (bBiologie){
//         if (bChimie){
//             // biochimie
//             str = "Tout au long de mon parcours en biologie, j'ai été animé par le désir de comprendre les mécanismes fondamentaux de la vie, en m'intéressant particulièrement aux protéines et enzymes qui en catalysent les réactions essentielles.";
//         }
//         else if (bInformatique){
//             // Bioinformatique
//             str = "Au cours de mon parcours en biologie et de mon DUT en informatique, j'ai développé des compétences pointues en traitement et modélisation des données biologiques, me permettant de décoder des systèmes complexes. Grâce à cette expertise, je suis en mesure de proposer des solutions novatrices pour répondre aux défis actuels et futurs de la biologie moderne.";
//         }
//         else {
//             // biologie toute seule
//             str = "Au cours de mon parcours, j'ai acquis une expertise approfondie en biologie, tant dans la recherche théorique qu'expérimentale, me permettant de maîtriser des techniques de pointe et d'explorer de nouvelles solutions innovantes. Mon approche allie rigueur scientifique et créativité pour répondre aux enjeux complexes de la biologie moderne et anticiper les avancées de la recherche de demain.";
//         }
//     }
//     else if (bChimie){
//         if (bInformatique){
//             // Chimie analytique
//             str = "Au fil de mon parcours, j'ai eu l'opportunité de traiter des volumes considérables de données issues d'analyses chimiques informatisées. Face à l'ampleur de ces données, il devient crucial de maîtriser des techniques et concepts informatiques avancés pour optimiser l'efficacité de l'analyse et réduire le temps de calcul. Grâce à ma solide expertise en informatique de bas niveau et en algorithmique, je suis en mesure de concevoir des solutions sur-mesure, parfaitement adaptées aux défis complexes de la recherche moderne.";
       

//         }
//         else {
//             // chimie toute seule
//             str = "Tout au long de mon parcours, ma passion pour la chimie m'a poussé à plonger au cœur des mécanismes réactionnels et des théories physiques fondamentales qui régissent notre monde. Convaincu que la chimie est la clé de la biologie, j'ai acquis une expertise dans des techniques d'analyses chimiques de pointe, telles que la chromatographie, la spectrométrie de masse (LC et GC-MS), la RMN, la spectroscopie infrarouge et titrage, afin d'élargir notre compréhension des phénomènes biologiques complexes.";
//         }
//     }
//     else if (bInformatique) {
//         // l'informatique
//         str = "Dans le contexte des enjeux de la recherche du XXIe siècle, l'informatique est devenue un levier incontournable pour l'innovation scientifique. Passionné par cette discipline, j'ai su perfectionner mes compétences en informatique lors de mon DUT, où j'ai acquis une maîtrise approfondie des technologies de pointe. J'ai également eu l'opportunité de mettre en œuvre ces compétences dans chacun des stages que j'ai réalisé, aussi bien en informatique qu'en biologie, où j'ai conçu des solutions informatiques performantes et optimisées pour répondre aux défis complexes de la recherche moderne.";
//     }
//     else {
//         // Pas de text 
//         str = "Sélectionnez un ou plusieurs domaines !";
//     }


//     let field_text = document.getElementById("field_text");
    
//     console.log("Mise en place du text : "+str);
//     field_text.innerText = str;



// }

function updateFieldText(bBiologie, bChimie, bInformatique) {
    // Cacher tous les paragraphes en réinitialisant la classe
    const allParagraphs = document.querySelectorAll("#field_text p");
    allParagraphs.forEach(p => p.classList.add("hide"));

    // Identifier quel texte afficher selon la combinaison
    let paragraphId = "f_default"; // Par défaut : "Sélectionnez un ou plusieurs domaines !"

    if (bBiologie && bChimie && bInformatique) {
        paragraphId = "f_bio_chimie_info";
    } else if (bBiologie) {
        if (bChimie) {
            paragraphId = "f_bio_chimie";
        } else if (bInformatique) {
            paragraphId = "f_bio_info";
        } else {
            paragraphId = "f_bio";
        }
    } else if (bChimie) {
        if (bInformatique) {
            paragraphId = "f_chimie_info";
        } else {
            paragraphId = "f_chimie";
        }
    } else if (bInformatique) {
        paragraphId = "f_info";
    }

    // Afficher le paragraphe correspondant
    const paragraphToShow = document.getElementById(paragraphId);
    if (paragraphToShow) {
        paragraphToShow.classList.remove("hide");
        console.log("Removing hide from : "+ paragraphToShow);
    }
     
}




function onFieldAction(target){
    // Récupérer l'état des autre

    if (target.classList.contains("selected")){
        target.classList.remove("selected");
    }
    else {
        target.classList.add("selected");
    }

    let cont = document.getElementById("field_container");
    let lesGosses = cont.getElementsByClassName("field");
    
    let bBiologie = false;
    let bInformatique = false;
    let bChimie = false;

    for (let i = 0; i < lesGosses.length; i++) {
        let child = lesGosses[i];

        if(child.classList.contains("selected")){
            switch (child.getAttribute("id")){
                case "biologie":
                        bBiologie = true;
                    break;
                case "chimie":
                        bChimie = true;
                    break;
                case "informatique":
                        bInformatique = true;
                    break;
                default:
                    console.log("Error : un des domaines selectionné n'existe pas.");
                    break;
            }
        }
    }


    console.log ("Update text: "+bBiologie + " " + bChimie + " "+ bInformatique);

    updateFieldText(bBiologie, bChimie, bInformatique);

}

 
function copyElemVal(elem) {

  let text = elem.getAttribute('value');

  const copyContent = async () => {
    try {
      await navigator.clipboard.writeText(text);
      console.log('Content copied to clipboard');
    } catch (err) {
      console.error('Failed to copy: ', err);
    }
  }
    copyContent();
    

    Toast.makeText(document.body, "Mail copié", Toast.LENGTH_LONG).show();

    // const messageElement = document.getElementById('message_copy');
    // messageElement.classList.remove("hide");
    
  
    // setTimeout(() => {
    //     messageElement.classList.add("hide");
    // }, 1000);
}


function getMainMenu(){
    return  document.getElementsByClassName("topsidemenu")[0];
}

function mainMenuUpdateSelectionMark(target_name){
    target_name = target_name.getAttribute("target")

    let main_menu = getMainMenu();

    let main_menu_children = main_menu.children;
    
    let menuItem = null;

    for (let i = 0; i < main_menu_children.length; i++){
        if (main_menu_children[i].getAttribute('target') == target_name){
            menuItem = main_menu_children[i];
            break;
        }
    }

    if (menuItem != null){
        menuUpdateSelectionMark(main_menu, menuItem);
    }
}
/////////////////////////////////////////


document.addEventListener('keydown', function(event) {
    if (event.ctrlKey && event.key === 's') {
        event.preventDefault(); // Empêche le comportement par défaut (enregistrement de la page)
         
    }
});


// document.getElementById("cv_displayer").setAttribute("src", "http://docs.google.com/gview?url=bacchvs.github.io/documents/"+CVname+"&embedded=true");
 

//////////////////////////////////////////////////////////// RELATIF AUX 2L2MENTS
document.addEventListener('DOMContentLoaded', () => {
 

     
    


////////////////////////////// 

   
    // let currentSection = 'sec_Accueil'; 

    // document.addEventListener('scroll', function() {
    //     const sections = document.querySelectorAll('section');

    //     sections.forEach(section => {
    //         const rect = section.getBoundingClientRect();
    //         if (rect.top <= window.innerHeight /3 && rect.bottom >= window.innerHeight / 3) {
                
    //             if (currentSection != section.id){
    //                 console.log("Mise à jour de la section courante : "+currentSection + " -> "+ section.id);
    //                 currentSection = section.id;
                    
    //                 mainMenuUpdateSelectionMark(currentSection);
    //                 if (!isScrollingAuto) scrollToSection(currentSection);
    //             }
    //         }
    //     });

    //     // console.log('Current section:', currentSection);
    // });

    //////////////////////////////////////////////////////////////////////////////////////////////
 
    ///////////////////////////////////////////////////////////////////////////////////////////




    // // Récupérer l'élément elem0
    // const elem0 = document.getElementsByClassName('reseau')[0];

    // // Récupérer l'élément section
    // const big_item = document.getElementById('big_item');
    // const general_big_item = document.getElementById('big_reseau')


    // // Créer un observer pour surveiller si la section est visible
    // const observer = new IntersectionObserver((entries) => {
    //     entries.forEach(entry => {
    //         if (entry.isIntersecting ) {
    //             // Ajouter la nouvelle classe quand la section est visible
    //             elem0.classList.add('hide');
    //             general_big_item.classList.remove('hide');
    //             console.log("Cache les réseaux");
    //         } else {
    //             // Revenir à la classe d'origine quand la section n'est plus visible
    //             elem0.classList.remove('hide');
    //             general_big_item.classList.add('hide');
    //             console.log("Affiche les réseaux");
    //         }
    //     });
    // });

    // // Observer la section
    // observer.observe(big_item);



    // ///////////////////////////////////////////////////////////////////////////////

    // // Dates de début et de fin
    // const startDate = new Date('2024-06-24');  // Remplacez par votre date de début

    // // Date actuelle
    // const now = new Date();
    // if (now < startDate) now = startDate;
 

    // /////// from  https://www.scriptol.fr/javascript/dates-difference.php

    // function dateDiff(dateold, datenew){
    //     return new Number((datenew.getTime() - dateold.getTime()) / 31536000000);
    // }

    // ////// end from 
    // var progression;
    // var elapsedYears = dateDiff(startDate, now);

    // // Calcul du pourcentage basé sur la règle spécifiée
    // if (elapsedYears <= 2) {
    //     // Si moins de 2 ans, la progression est linéaire de 0% à 50%
    //     progression = (elapsedYears / 2) * 20 + 52;
    // } else{
    //     // Entre 2 et 5 ans, la progression est linéaire de 50% à 100%
    //     progression = 52 + ((elapsedYears - 2) / 3) * 40;
    // } 
 
    // // Récupérer l'élément progress
    // const progress = document.getElementsByClassName('progress')[0];
     
    // // Créer un observer pour surveiller si la section est visible
    // const obs = new IntersectionObserver((entries) => {
    //     entries.forEach(entry => {
    //         if (entry.isIntersecting ) {
                
    //             progress.style.cssText += 'width: '+ progression + '%';
    //         } else {
    //             progress.style.cssText += 'width: 0%';
    //         }
    //     });
    // });

    // // Observer la section
    // obs.observe(progress);



    ///////////////////////////////////////////////////////////////////////////// put copyright

    console.log("insertion copyright");
    let nodeCopyright = document.getElementsByTagName('copyright'); 
    for (let i = 0; i<nodeCopyright.length; i++){
      nodeCopyright[i].innerHTML = copyright_string; 
    }

    console.log("fin d'insertion copyright");


 

    /////////////////////////////////////////////// NIVEAU ANGLAIS ESPAGNOL


    // setProgress(40, 70, document.getElementById('espagnol_circle'))
    // setProgress(70, 70, document.getElementById('anglais_circle'))



    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    isFullyCharged = true;
});






///////////////////////////////////////////////////////////////////////////////////// Pour faire un splash screen si besoin est. 
function checkVariable() {
    if (isFullyCharged) {
        // alert('Fin du chargement : '+(new Date().getTime() - time_start) + ' ms');
    } else {
        // console.log('La variable est encore fausse, vérification dans 100 ms.');
        setTimeout(checkVariable, 100); // Re-vérifie après 100 ms
    }
}


checkVariable(); // Commence la vérification






////////////////////////// TEST PROGRESSBAR