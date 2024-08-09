function isDarkMode(){
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
}

// pour mettre à jour le favicon en fonction du theme
function updateFavicon() {
    const favicon = document.getElementById('favicon');
    const darkMode = isDarkMode();
    favicon.href = darkMode ? '/img/favicons/favicon_dark.png' : '/img/favicons/favicon_light.png';
}

document.addEventListener('DOMContentLoaded', updateFavicon);
window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', updateFavicon);



// Sélectionner toutes les balises Test
let nodeCopyright = document.getElementsByClassName('copyright'); 


for ( node in nodeCopyright){
    node.innerHTML = "Copyright (c) "+ (new Date().getFullYear()) + " Arnaud Sénécaut. -- All Rights Reserved.";
}



let monNom = "BΔcchvs";


let language = navigator.language;
let CVname;
if (language === "fr"){
    CVname = "CV_Arnaud_SENECAUT_Biologie.pdf"
}else{
    CVname = "CV_Arnaud_SENECAUT_Biologie_EN.pdf"
}


// Permet de scroller à la bonne section

function scrollToSection(id) {
    const targetElement = document.getElementById(id);
    if (targetElement) {
        targetElement.scrollIntoView({ behavior: 'smooth' });
    }
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
            if (rect.top <= window.innerHeight / 2 && rect.bottom >= window.innerHeight / 2) {
                
                if (currentSection != section.id){
                    console.log("Mise à jour de la section courante : "+currentSection + " -> "+ section.id);
                    currentSection = section.id;
                    
                    mainMenuUpdateSelectionMark(currentSection);
                }
            }
        });

        // console.log('Current section:', currentSection);
    });




    // Récupérer l'élément elem0
    const elem0 = document.getElementsByClassName('reseau')[0];

    // Récupérer l'élément section
    const section = document.getElementById('sec_Contact');

    // Créer un observer pour surveiller si la section est visible
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Ajouter la nouvelle classe quand la section est visible
                elem0.classList.add('hide');
                
            } else {
                // Revenir à la classe d'origine quand la section n'est plus visible
                elem0.classList.remove('hide');
            }
        });
    });

    // Observer la section
    observer.observe(section);


});