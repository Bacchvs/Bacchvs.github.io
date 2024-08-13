function setProgress(percentage, circle_radius, svg_circle) {

        circumference = 2 * Math.PI * circle_radius; 
        const offset = circumference - (percentage / 100 * circumference);
        svg_circle.getElementsByTagName('circle')[1].style.strokeDashoffset = offset;
}


