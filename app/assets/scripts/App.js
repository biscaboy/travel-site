import '../styles/styles.css';
import 'lazysizes';
import MobileMenu from './modules/MobileMenu';
import RevealOnScroll from './modules/RevealOnScroll';
import StickyHeader from './modules/StickyHeader';

new StickyHeader();
new RevealOnScroll(document.querySelectorAll(".feature-item"), 75);
new RevealOnScroll(document.querySelectorAll(".testimonial"), 60);
new MobileMenu();
let modal;

document.querySelectorAll(".open-modal").forEach(el => {
    el.addEventListener("click", e => {
        e.preventDefault();
        if (typeof modal == "undefined") {
            import(/* webpackChunkName: "modal" */'./modules/Modal').then(x => {
                modal = new x.default(); // creates new instance of our modal class
                setTimeout(() => modal.openTheModal(), 20);  // give the browser time to create the modal in memory
            }).catch(() => console.log("There was a problem.")); //returns a promise that we have to catch if never loads and or then process.    
        } else {
            modal.openTheModal();
        }
    });
});

if (module.hot) {
    module.hot.accept()
}






