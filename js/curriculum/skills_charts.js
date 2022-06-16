/**
 * In the entire document:
 *  - SCC mean: Skills char context
 *  - SDC mean: Skills doughnut char
 */

/** Colors **/

// Reached skill color
const skill_level_color_1 = "#2B3B44";
const skill_level_color_2 = "#56778A";
const skill_level_color = skill_level_color_1;

// Missing skill color
const missing_skill_1 = "#D9D9D9";
const missing_skill_2 = "grey";
const missing_skill = missing_skill_1;

/** Functions **/

/**
 * This function create a skill chart (a doughnut with two data) into the given context using the given skill level.
 * @param ctx: context we are going to build the chart in.
 * @param level: skill level the chart is about.
 */
function create_skill_char_at(ctx, level) {
    new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: ['', ''],
            datasets: [{
                data: [level, 100 - level],
                backgroundColor: [
                    skill_level_color,
                    missing_skill
                ]
            }]
        },
        options: {
            rotation: 0.5 * Math.PI,
            legend: {
                display: false
            },
            responsive: true,
            maintainAspectRatio: false
        }
    });
}

function initialise_graph_inside(container) {
    container.find(".skill-level-doughnut").each(function() {

        /* Find the skill level */
        let level = 50;
        $(this).attr("class").split(" ").forEach(function(classname) {
            if(classname.split("-")[0] === "level") {
                level = parseInt(classname.split("-")[1]);
            }
        });

        /* Draw the graph */
        create_skill_char_at($(this), level);
    });
}

function increase_window_container_height() {

}

/** Skills **/
$(document).ready(function() {

    initialise_graph_inside($(".languages"));

    /** Skills section toggling **/
    $(".skills-family").each(function() {
        let family_ctx = $(this);
        family_ctx.find("> .skills-family-header").click(function() {
            // resize parent
            let parent = $(this).parent();
            parent.toggleClass("opened");

            /** Launch the dropdown animation */
            console.log("toggle " + family_ctx.find("> .skill-family-content"));
            family_ctx.find("> .skill-family-content").slideToggle(250, function () {
                set_window_container_height();
                set_menu_position();
            });
            set_window_container_height();
            set_menu_position();

            /** Definitively set a correct height for window background */
            initialise_graph_inside(parent);
        });
    });
});
