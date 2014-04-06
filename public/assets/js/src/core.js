
// This project has an external dependency on JQuery v 2.1.0
// https://ajax.googleapis.com/ajax/libs/jquery/2.1.0/jquery.min.js

// Create the Catan Object and set SC to be an allias of Catan
var Catan = {},
SC = Catan;


// Create global Catan vars
$(document).ready(function(){
    Catan.head = document.getElementsByTagName("head")[0];
    Catan.body = document.getElementsByTagName("body")[0];
    Catan.resource_map.init(2);
    Catan.map.init();
});

Catan.init = function() {

    $(window).resize(function(){
        Catan.cc.init();        
    });

    Catan.cc.init();
};