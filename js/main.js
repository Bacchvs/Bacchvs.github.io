let isFullyCharged = false;
const time_start = new Date().getTime(); // Renvoie le temps en millisecondes depuis le 1er janvier 1970

const copyright_string = "Copyright © "+ (new Date().getFullYear()) + " Arnaud Sénécaut - All Rights Reserved.";
const monAge = new Date().getFullYear() - 2000;
              
function isDarkMode(){
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
}

// pour mettre à jour le favicon en fonction du theme
function updateFavicon() {
    const favicon = document.getElementById('favicon');
    const darkMode = isDarkMode();
    favicon.href = darkMode ? '/img/favicons/favicon_dark.png' : '/img/favicons/favicon_light.png';
}

updateFavicon();

// document.addEventListener('DOMContentLoaded', updateFavicon);
window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', updateFavicon);

let monNom = "BΔcchvs";


let language = navigator.language;
 
let CVname;
if (language === "fr"){
    CVname = "CV_Arnaud_SENECAUT_Biologie.pdf"
}else{
    CVname = "CV_Arnaud_SENECAUT_Biologie_EN.pdf"
}


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
    if (menu.style.display === 'none'){
        menu.style.display = 'flex';
    }else{
        menu.style.display = 'none';
    } 
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
    
    const messageElement = document.getElementById('message_copy');
    messageElement.classList.remove("hide");
    
  
    setTimeout(() => {
        messageElement.classList.add("hide");
    }, 1000);
}


function getMainMenu(){
    return  document.getElementsByClassName("menu")[0];
}

function mainMenuUpdateSelectionMark(target_name){
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
 

    /////// Pour le slider
        console.log("################################################################");
        let userpict_slider = document.querySelector("#userpict_slider");
      
      let lesEnfants = userpict_slider.children;
       
      let topIndex = 0;
         setInterval(()=>{
        console.log("boucle");
        for (let i = 0; i<lesEnfants.length; i++){
             lesEnfants[i].classList = ['slider_hide'];
        };
        
        lesEnfants[(topIndex+0)%lesEnfants.length].classList = ["slider_top"];
        lesEnfants[(topIndex+1)%lesEnfants.length].classList = ["slider_mid"];
        lesEnfants[(topIndex+2)%lesEnfants.length].classList = ["slider_bottom"];
        
        
        topIndex ++;
       
         },
         1000);
        
    
    ///////////////////////////////////////////
    
    


////////////////////////////// 

   
    let currentSection = 'sec_Accueil'; 

    document.addEventListener('scroll', function() {
        const sections = document.querySelectorAll('section');

        sections.forEach(section => {
            const rect = section.getBoundingClientRect();
            if (rect.top <= window.innerHeight /3 && rect.bottom >= window.innerHeight / 3) {
                
                if (currentSection != section.id){
                    console.log("Mise à jour de la section courante : "+currentSection + " -> "+ section.id);
                    currentSection = section.id;
                    
                    mainMenuUpdateSelectionMark(currentSection);
                    if (!isScrollingAuto) scrollToSection(currentSection);
                }
            }
        });

        // console.log('Current section:', currentSection);
    });

    //////////////////////////////////////////////////////////////////////////////////////////////
 
    ///////////////////////////////////////////////////////////////////////////////////////////




    // Récupérer l'élément elem0
    const elem0 = document.getElementsByClassName('reseau')[0];

    // Récupérer l'élément section
    const big_item = document.getElementById('big_item');
    const general_big_item = document.getElementById('big_reseau')


    // Créer un observer pour surveiller si la section est visible
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting ) {
                // Ajouter la nouvelle classe quand la section est visible
                elem0.classList.add('hide');
                general_big_item.classList.remove('hide');
                console.log("Cache les réseaux");
            } else {
                // Revenir à la classe d'origine quand la section n'est plus visible
                elem0.classList.remove('hide');
                general_big_item.classList.add('hide');
                console.log("Affiche les réseaux");
            }
        });
    });

    // Observer la section
    observer.observe(big_item);



    ///////////////////////////////////////////////////////////////////////////// put copyright

    let nodeCopyright = document.getElementsByTagName('copyright'); 
    for (let i = 0; i<nodeCopyright.length; i++){
      nodeCopyright[i].innerHTML = copyright_string; 
    }







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