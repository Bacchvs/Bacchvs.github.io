function setProgress(percentage, circle_radius, svg_circle) {

        circumference = 2 * Math.PI * circle_radius; 
        const offset = circumference - (percentage / 100 * circumference);
        svg_circle.getElementsByTagName('circle')[1].style.strokeDashoffset = offset;
        svg_circle.getElementsByClassName('circle-progress-pourcentage')[0].innerText = percentage + "%";
}


/// ajouter le meme genre de barre de chargement mais pour les languages informatiues. un bouton sur lequel j'appuie et ca affiche les languages. 

