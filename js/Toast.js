/*!
 * Notification Toast Javascript Module v1.0.0
 * Copyright (c) 2024 Bacchvs -- Sén.Ar. 
 * License: MIT (https://opensource.org/licenses/MIT)
 * Description: A JavaScript module for displaying toast notifications like Android.
 * 
 * This module allows you to easily display customizable toast notifications
 * in your web applications. It provides a simple API for creating, displaying,
 * and managing toast notifications with various options for customization.
 *
 * Usage:
 * - Include this file in your HTML.
 * - Instantiate the ToastModule class and use its methods to show notifications.
 *
 * Example:
 * const toast =  Toast.makeText(document.body, "Hello, world !", Toast.LENGTH_LONG);
 * toast.show();
 *
 * Author: A.S aka Bacchvs
 * GitHub: https://github.com/Bacchvs/AndroidLikeWebToast
 *
 * This software is provided "as is", without warranty of any kind.
 * See the LICENSE file for more details.
 */


var isReady = false;



document.addEventListener('DOMContentLoaded', () => {
    isReady = true;
});



export class Toast{
    static {
        Object.defineProperty(this, 'LENGTH_LONG', {
            value: 1,
            writable: false,  // Ne peut pas être modifié
            configurable: false,  // Ne peut pas être supprimé
            enumerable: true  // Peut être énuméré
        });

        Object.defineProperty(this, 'LENGTH_SHORT', {
            value: 0,
            writable: false,  // Ne peut pas être modifié
            configurable: false,  // Ne peut pas être supprimé
            enumerable: true  // Peut être énuméré
        });

    }
     

    static #lastID = 0;
    #isDead = false;


    #id;
    #toastElement;
    #length = 0;
    #sticky;
     
    constructor(_context, _text, _longueur, _sticky = false){
        if (!isReady) throw "Error : Toast can only be used once DOMContent is loaded.";
        
        this.#sticky = _sticky;

        // throw "Error : You cannot instanciate Toast class."
        const temporisator = 1000; // une seconde
        
        var longueur;
        if (_longueur == Toast.LENGTH_LONG){
            longueur = temporisator * 2;
            
        }
        else if (_longueur == Toast.LENGTH_SHORT){

            longueur = temporisator * 1;
        }
        else{
            throw "Error : Should be LENGHT_SHORT or LENGHT_LONG";
        }
 
        if (  ! (_context instanceof HTMLElement) ) throw "Error: you must specify an HTMLElement context. (maybe you forgot to wait for DOMContent to be loaded before using Toast ? ^^' )";

        this.#id = ++Toast.#lastID;
        
        this.#length = longueur;

        this.#toastElement = document.createElement('div');
       
        this.#toastElement.classList.add("toast");
        this.#toastElement.classList.add("toast_hide");
        this.#toastElement.setAttribute('id', this.#id);

        this.#toastElement.innerText = _text;

        _context.appendChild(this.#toastElement);

        if (this.#toastElement.clientWidth > window.innerWidth) throw "The Toast is too long in length !";
 
    }


    isDead(){
        return this.#isDead;
    }

    getID(){
        return this.#id;
    }


    show(){
        if(this.#isDead) throw `The Toast #${this.#id} has already been consumed. (use 'sticky' attribute for a reusable Toast).`;
        this.#toastElement.classList.remove('toast_hide');

        setTimeout(() => {
            this.#toastElement.classList.add('toast_hide');



            /// supprime l'élément après utilisation.
            if (! this.#sticky){
                setTimeout(()=>{this.#toastElement.remove()}, 1500);
                this.#isDead = true;
            }
            
        }, this.#length);
    }

    remove(){
        document.removeChild(this.#toastElement); 
    }

    static makeText(_context = document, _text = "", _longueur = EnumToastLength.LENGTH_SHORT, _sticky = false){
        return new Toast(_context, _text, _longueur, _sticky);
    }
}

 


export class ToastDisplayer{
    #toastContainer;

    constructor(_container){
        if (typeof _container === 'string'){
            this.#toastContainer = document.getElementById(_container);
        }else if (_container instanceof HTMLElement){
            this.#toastContainer = _container;
        }
    }


    display(_text, _duration=3000){ 
        if (!(typeof _text === 'string')) throw "Error: the attribute of display must be a textLike.";
        if (_duration < 0) throw "Error : you must specify a valid duration.";

        const toast = document.createElement('div');

        // might change in the future
        toast.className = 'squared_toast';
        toast.innerText = _text;
 
        this.#toastContainer.appendChild(toast);

        requestAnimationFrame(() => {
            toast.classList.add('show');
        });
    
        setTimeout(() => {
            toast.classList.remove('show');

            setTimeout(() => {
                this.#toastContainer.removeChild(toast); 
            }, 300);

        }, _duration);
    }
}






// for using outside a module

window.Toast = Toast;
window.ToastDisplayer = ToastDisplayer;