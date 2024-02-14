


let monNom = "BΔcchvs";


let language = navigator.language;
let CVname;
if (language === "fr"){
    CVname = "CV_Arnaud_SENECAUT_Biologie.pdf"
}else{
    CVname = "CV_Arnaud_SENECAUT_Biologie_EN.pdf"
}

document.getElementById("cv_displayer").setAttribute("src", "http://docs.google.com/gview?url=bacchvs.github.io/documents/"+CVname+"&embedded=true");
 

