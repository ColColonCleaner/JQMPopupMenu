Dynamic Jquery Mobile Popup Menu
============

# Main Purpose

Using jquery mobile 1.2 alpha's new popup menu API, I created a menu generator based entirely in javascript and CSS, designed to create and show a menu without the need to write any HTML code.

jsfiddle example (fiddle not working right now for some reason, dependancies non functional):
http://jsfiddle.net/jCtQ2/3/

# Initialization

The plugin can be called in this format:
```js
$(selector).popupMenu(menuSettingsJSONObject);
```
The format of the settings JSON object can be as follows:
```js
/**
 * A JSON object representing elements that should appear in the called popup menu
 */
var popupMenuSettings = {
    //Formatting for the popup menu.
    //Values are in pixels for width, height, and margins.
    //Options to display is a float or integer, it will only show that number of buttons on the menu, enabling scrolling if the number of items will not fit on the menu.
    formatting:{
        width:190,
        height:200,
        margins:3,
        optionsToDisplay:4
    },
    //function to call on open
    onOpen:function(){
        //alert("open");
    },
    //function to call on close
    onClose:function(){
        //alert("close");
    },
    //the function to call along with specific button functionality
    baseFunction:function () {
        return;
    },
    //The css class that is to be assigned to all list elements
    elementClass:"popupMenuButton",
    //list of elements in the popup menu
    elementList:[
        {
            buttonID:"addNowButton",
            buttonText:"Add Now",
            buttonAction:function () {
                //stuff
            }
        },
        {
            buttonID:"addToCartbutton",
            buttonText:"Add to Cart",
            buttonAction:function () {
                //stuff
            }
        },
        {
            buttonID:"addReferralButton",
            buttonText:"Add Referral",
            buttonAction:function () {
                //stuff
            }
        },
        {
            buttonID:"notInterestedButton",
            buttonText:"Not Interested",
            buttonAction:function () {
                //stuff
            }
        }
    ]
};
```