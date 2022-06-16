
/** Functions */

/** Event listeners */

if (window.addEventListener) {
    window.addEventListener('scroll', function(e) {
        /** scrolling menu */
        let scroll_y = window.scrollY;
        let logo = document.getElementById("logo");
        if (scroll_y === 0) {
            let navigation = document.getElementsByClassName("navbar")[0];
            navigation.classList.add('initial');

            logo.setAttribute("src", "/images/base/logo-D9.png");
        }
        else {
            let navigation = document.getElementsByClassName("navbar")[0];
            navigation.classList.remove('initial');

            logo.setAttribute("src", "/images/base/logo-2b.png");
        }

        /** scrolling name */
        let name = document.querySelector("#name");
        console.log(scroll_y);
        console.log("name y = " + getComputedStyle(name).top);
    });
};

/** Main */
// Initialise navigation bar backgroundlesheet

// Set logo
let logo = document.getElementById("logo");
logo.setAttribute("src", "/images/base/logo-D9.png");

// Launch name animation
let name = document.getElementById("name");
name.classList.add("build");

/** Wait two second before to set the name bar on/off alternatively */

function name_alternate_on_off() {
    let elt = document.getElementsByClassName("last-name")[0];

    if(elt.classList.contains("off")) {
        elt.classList.remove(("off"));
    }
    else {
        elt.classList.add(("off"));
    }

    setTimeout(function () {
        name_alternate_on_off()
    }, 500);
}

setTimeout(function () {
    name_alternate_on_off()
}, 2000);

$(window).resize(function () {
    console.log("New window width = " + $(document).width());
});