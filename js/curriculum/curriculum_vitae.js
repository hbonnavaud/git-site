/** GLOBALS */
/* initialise selected item */
var selected = "skills";
var menu_is_active = false;

/** FUNCTIONS */

function activate_menu() {
    /** Activate the menu */
    $(".menu").addClass("active");

    /** Scale windows **/
    let margin_size = 40;  // margin width after scaling (in px)
    $(".window").each(function() {
        let vertical_scale = 1 - (margin_size*2 / parseInt($(this).css("height")));
        let horizontal_scale = 1 - (margin_size*2 / parseInt($(this).css("width")));
        $(this).css("transform", "scale(" + horizontal_scale + ", " + vertical_scale + ")");
    });

    /** Activate the shader */
    $(".shader").show();

    menu_is_active = true;
}

function disable_menu() {
    /** Activate the menu */
    $(".menu").removeClass("active");

    /** Scale windows **/
    $(".window").each(function() {
        $(this).css("transform", "scale(1)");
    });

    /** Activate the shader */
    $(".shader").hide();

    menu_is_active = false;
}

function set_card_height_in_px() {
    /** give a height in px to each cards to prevent from a bootstrap card-deck wired behaviour ...
     * https://stackoverflow.com/questions/63193481/unexpected-behaviour-on-top-attribute-inside-bootstrap-card-group
     */
    let cards = $("#hobbies-window .card");
    let height = cards.height() + 20;
    cards.each(function() {
        $(this).css("height",  height+ "px");
    });
}

function set_window_container_height() {
    let window_container = $(".window-container");
    let selected_window = $("#" + selected + "-window");

    window_container.css("height", selected_window.css("height"));
}

function set_menu_position() {
    const menu = $(".menu");
    if ($("#" + selected + "-window").height() > menu.height()) {
        let footer_top = $("body").innerHeight() - $(".footer").innerHeight();
        let viewport_height = $(window).height();

        /** If footer is seen */
        if (window.scrollY >= (footer_top - viewport_height)) {
            menu.addClass("blocked");
            menu.css("top", (footer_top - viewport_height + $(".navbar").innerHeight()) + "px");
        } else {
            menu.removeClass("blocked");
            menu.css("top", $(".navbar").innerHeight() + "px");
        }
    }
}

/** ASS SOON WE CAN **/
// Give the selected window size to the window container
set_window_container_height();

/** EVENT LISTENERS */
$(window).resize(function () {
    set_window_container_height();
    set_card_height_in_px();
});

$(document).ready(function() {

    /* Set event listener for menu reaction */
    document.onmousemove = setMenuActivation;
    function setMenuActivation(event) {
        var x = event.clientX;
        if (x < 200) {
            console.log("active menu");
            activate_menu();
        } else {
            if (menu_is_active) {
                console.log("disable menu");
                disable_menu();
            }
        }
    }

    /* Block the menu if the user scroll to the bottom */
    if (window.addEventListener) {
        window.addEventListener('scroll', function(e) {
            set_menu_position();
        });
    }

    /* Set select window on menu item clicked */
    $(".menu li").click( function(event){

        // Constants
        const new_window_tag = this.id.split("-")[0];
        if (new_window_tag != selected) {
            const old_window = $("#" + selected + "-window");
            const new_window = $("#" + new_window_tag + "-window");

            /** Send user to the top */
            $(window).scrollTop(0);

            /** Select the new window */
            new_window.addClass("active");
            old_window.removeClass("active");
            selected = new_window_tag;
            set_window_container_height();
        }
    });

    set_card_height_in_px();
});