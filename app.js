$(document).ready(function() {
    // $(".page-head").fadeIn();
    $("body").fadeIn(1500);
    //This is the sum of money from each line item
    var fullSumEarned = 0;
    // Upon page load, random budget is generated for demonstration purposes
    var availableBudget = (Math.random() * 2500).toFixed(2);
    // Random budget added into the "need to be earned" well
    $(".budget").html("$" + availableBudget);

// CHANGE THE NAV BAR COLOR based on what page you select
    $("#primary-nav li").on("click", function(event) {
        event.preventDefault();

        $(this).addClass("active");
        //remove active classes
        $(this).siblings().removeClass('active');
    });

//SHOW and HIDE PAGES
    //show bucketlist page
    $("#bucketlist-nav").on("click", function() {
        //remove all active-page classes from pages
        $("#bucketlist-page, #fitness-page, #studies-page, #errands-page").removeClass("active-page");
        //add active-page to bucketlist
        $("#bucketlist-page").addClass("active-page");
    });

    //show fitness page
    $("#fitness-nav").on("click", function() {
        //remove all active-page classes from pages
        $("#bucketlist-page, #fitness-page, #studies-page, #errands-page").removeClass("active-page");
        //add active-page to fitness
        $("#fitness-page").addClass("active-page");
        $("#fitness-page").fadeIn();
    });

    //show studies page
    $("#studies-nav").on("click", function() {
        //remove all active-page classes from pages
        $("#bucketlist-page, #fitness-page, #studies-page, #errands-page").removeClass("active-page");
        //add active-page to studies
        $("#studies-page").addClass("active-page");
    });

    //show errands page
    $("#errands-nav").on("click", function() {
        //remove all active-page classes from pages
        $("#bucketlist-page, #fitness-page, #studies-page, #errands-page").removeClass("active-page");
        //add active-page to errands
        $("#errands-page").addClass("active-page");
    });

// ADD A NEW ACTION ITEM TO A NEW ROW AT THE BOTTOM OF TABLE
    // $('#add-actionitem-modal').on('shown.bs.modal', function() {
    //     $('#modal-input').focus();
    // });

    $(".add-action-item-button").on("click", function() {
        $("#add-actionitem-modal").modal("show");
        $("#action-item-page").val($(this).attr("data-page"));
    });

    $("#action-item-add-button").on("click", function() {
        var actionData = {
            actionItem: $("#actionitem-input").val(),
            worth: $("#actionitemvalue-input").val()
        };

        HANDLE.renderTemplate({
            templateSource: "#list-item-template",
            data: actionData,
            where: $("#action-item-page").val() + " tbody",
            clearOriginal: false
        });

        $("#add-actionitem-modal").modal("hide");
        //Clear out the form fields for future inputs
        $("#actionitem-input").val("");
        $("#actionitemvalue-input").val("");
    });

//CLICK CHECKMARK AND ANIMATE IT, then turn it into a dollar icon, then turn row green and disappear and RETRIEVE "WORTH" VALUE and add to bottom well while subtracting from upper well
    $(document).on("click", ".complete-actionitem", function() {
        // Retrieve "worth" value and add to bottom well while subtracting from upper well
        var actionWorth = parseFloat($(this).parents("td").siblings(".action-worth").text().replace(/\$/, ""));
        //Keep track of the sum of money upon checkmarking
        fullSumEarned += actionWorth;
        //Remove from available budget
        availableBudget -= actionWorth;

        if (availableBudget >= 0) {
            // ensures updated money wells are rounded down to 2 decimal points
            $(".earned").html("$" + fullSumEarned.toFixed(2));
            $(".budget").html("$" + availableBudget.toFixed(2));
            //Make sure we can't do multiple clicks
            if ($(this).find("i").hasClass("fa-money")) {
                return;
            }

            $(this)
                .find("i")
                .addClass("animate")
                .removeClass("fa-check-square")
                .addClass("fa-money");

            var $parentTr = $(this).parents("tr");

            // Animate the row (parent) of the clicked icon (sibling)
            $parentTr.css("background-color", "rgba(101, 191, 11, 0.7)").animate({
                "opacity": ".25"
            }, 2000, function() {
                // barely noticeable
                $parentTr.animate({
                    "padding-left": "50px"
                });
            });
        } else {
            // Alert pops up asking you to refill balance if you go to or below zero
            alert("Oops! Current balance is too low. Please add funds to AllowMe balance.");
            //subtract action worth pre-emptively added to earned
            fullSumEarned -= actionWorth;
            //add back action worth pre-emptively subtracted from available budget
            availableBudget += actionWorth;
        };
    });
});
