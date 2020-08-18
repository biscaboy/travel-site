import throttle from 'lodash/throttle';
import debounce from 'lodash/debounce';

class RevealOnScroll {
    constructor(els, thresholdPercent) {
        this.itemsToReveal = els;
        this.thresholdPercent = thresholdPercent;
        this.browserHeight = window.innerHeight;  // this way we only ask size once.
        this.hideInitially();
        // on call this function 5 x a sec
        // the call to the bind method keeps us pointing to this object. (??)
        this.scrollThrottle = throttle(this.calcCaller, 200).bind(this);
        this.events();
    }

    events() {
        /* Use an empty arrow function for this to reference this class not the passed object. */
        window.addEventListener("scroll", this.scrollThrottle);
        window.addEventListener("resize", debounce(() => {
            console.log("Resize just ran");
                this.browserHeight = window.innerHeight;
        }, 333));
    }

    calcCaller() {
        this.itemsToReveal.forEach(el => {
            if (el.isRevealed == false) {
                this.calculateIfScrolledTo(el);
            }
        });
        this.itemsToReveal[this.itemsToReveal.length - 1].isLastItem = true;

    }

    calculateIfScrolledTo(el) {
        // this check sees if the current element is entering the screen
        // if so then we can check to see if it needs to be faded in.
        // efficiency so we don't call getBoundingClientRect() constantly 
        // on scrolls through the whole page
        if (window.scrollY + this.browserHeight > el.offsetTop) {
            console.log(el.getBoundingClientRect().y);
            let scrollPercent = (el.getBoundingClientRect().y / this.browserHeight) * 100;
            if (scrollPercent < this.thresholdPercent) {
                el.classList.add("reveal-item--is-visible");
                el.isRevealed = true;
                if (el.isLastItem == true) {
                    window.removeEventListener("scroll", this.scrollThrottle);
                }
            }
       }
    }

    hideInitially() {
        this.itemsToReveal.forEach(el => {
            el.classList.add("reveal-item")
            el.isRevealed = false;
        });
        
    }


}

export default RevealOnScroll;