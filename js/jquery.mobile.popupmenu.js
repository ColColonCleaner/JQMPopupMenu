/**
 * Author: cobeliga
 * Date: 8/28/12
 * Time: 4:58 PM
 */
;
(function ($) {
    /**
     * This function creates a menu centered on the target element on click.
     * The CSS for the menu can be found in jquery.mobile.popupmenu.css
     */
    $.fn.bindPopupMenu = function (popupMenuSettings) {
        $(this).click(function(){
            createMenu(this, popupMenuSettings);
        });
    }//end bindPopupMenu()

    /**
     * Creates a menu centered on the element, using the popup menu settings
     * @param element - element to which the popup menu will be aligned
     * @param popupMenuSettings - JSON object specifying settings for the popup menu
     */
    function createMenu(element, popupMenuSettings) {
        //remove all previous popupMenus from the DOM
        $('#popupMenuMain').remove();
        //import settings
        var width = popupMenuSettings.formatting.width;
        var height = popupMenuSettings.formatting.height;
        var margins = popupMenuSettings.formatting.margins;
        //convert to float, avoid integer division
        var optionsToDisplay = popupMenuSettings.formatting.optionsToDisplay + 0.0;
        var targetEl = $(element);

        //set up the inner rectangle which will hold the buttons, padding will push the back background around it by 10 pixels
        var popupMenuOuter = $('<div>')
            //attributes of the popup menu
            .attr('id', 'popupMenuMain')
            .attr('data-role', 'popup')
            //css properties of the popup menu
            .css('width', (width + (margins * 2)) + "px")
            .css('height', (height + (margins * 2)) + "px")
            .css('border-radius', '5px')
            //adding the color css rule
            .addClass('popupMenuBackground');

        //set up the inner rectangle which will hold the buttons, padding will push the back background around it by 10 pixels
        var popupMenu = $('<div>')
            //css properties of the popup menu
            .css('position', "relative")
            .css('margin', margins + "px")
            .css('top', margins + "px")
            .css('padding', '0')
            .css('width', (width) + "px")
            .css('height', (height) + "px")
            .css('border-radius', '5px')
            .css('overflow-y', 'hidden')
            .css('overflow-x', 'hidden')
            //adding the color css rule
            .addClass('popupMenuInnerBackground');

        var elementButtonList = $("<ul>")
            //attributes of the element list
            .attr('id', 'popupMenuElementList')
            //css properties of the element list
            .css('margin', '0')
            .css('height', height + "px")
            .css('width', width + "px");

        var totalElements = 0;
        $.each(popupMenuSettings.elementList, function (index, element) {
            //check to see if this id is already used in the web app
            if($("#"+element.buttonID).length>0)
            {
                console.log("Unable to create button '" + element.buttonID + "' in Popup Menu. Element already exists, use a different ID.");
                return;
            }
            //create the list buttons and add them to the inner rectangle
            var menuListElement = $('<li>')
                //attributes of this list element
                .attr('id', element.buttonID)
                //css properties of this list element
                .css('height', (height / optionsToDisplay) + "px")
                .css('line-height', (height / optionsToDisplay) + "px")
                .css('width', width + "px")
                //color css rule for this button
                .addClass('popupMenuButton')
                //inner html for this list element
                .html("<a style='padding:10px;'>" + element.buttonText + "</a>");
            elementButtonList.append(menuListElement);
            totalElements++;
        });

        //If there are more elements than can fit on the menu, activate scrolling
        if (totalElements > optionsToDisplay) {
            popupMenu.css('overflow-y', 'scroll');
        }

        //compile the elements and append to the body
        popupMenu.append(elementButtonList);
        popupMenuOuter.append(popupMenu);
        $('body').append(popupMenuOuter);

        //Assign all click events
        $.each(popupMenuSettings.elementList, function (index, element) {
            //Assign click events to the list elements
            $("#" + element.buttonID).click(popupMenuSettings.baseFunction);
            $("#" + element.buttonID).click(element.buttonAction);
        });

        $('#popupMenuMain')
            .popup({
                tolerance:"0,0,0,0"
            })
            .bind({
                popupafterclose:popupMenuSettings.onClose,
                popupafteropen:popupMenuSettings.onOpen
            });
        $('#popupMenuMain').popup('open', {
            positionTo:targetEl,
            transition:"pop"
        });
    }
})(jQuery);