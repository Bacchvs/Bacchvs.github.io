export default {


    /**
     * Récupère les données associées à un cookie
     * @param {string} name Nom du cookie à récupérer
     * @return {string|null} La valeur du cookie ou null si le cookie n'existe pas
     */
     getCookie(name) {
        const cookies = document.cookie.split('; ');
        const value = cookies
            .find(c => c.startsWith(name + "="))
            ?.split('=')[1];
        return value !== undefined ? decodeURIComponent(value) : null;
    },

    /**
     * Crée ou modifie la valeur d'un cookie avec une durée spécifique
     * @param {string} name Nom du cookie
     * @param {string} value Valeur du cookie
     * @param {number} days Durée de vie du cookie (en jours)
     * @param {number} [hours] Durée de vie supplémentaire du cookie (en heures)
     */
    setCookie(name, value, days, hours = 0) {
        const date = new Date();

        // Calculer le total en jours, y compris les heures
        const totalDays = days + hours / 24;

        date.setDate(date.getDate() + totalDays);
        document.cookie = `${name}=${encodeURIComponent(value)}; expires=${date.toUTCString()}; path=/`;
    },



    isDarkMode(){
        return window.matchMedia('(prefers-color-scheme: dark)').matches;
    }

};