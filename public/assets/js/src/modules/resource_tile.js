Catan.resource_tile = {

    resource_types : ["Lumber", "Sheep", "Ore", "Brick", "Wheat"],
    
    resource_counts : {
        "Lumber"    : 4,
        "Sheep"     : 4,
        "Ore"       : 3,
        "Brick"     : 3,
        "Wheat"     : 4
    },

    dice_weight_count : {
        "2" : {
            "count"         : 1,
            "probability"   : 1
        },
        "3" : {
            "count"         : 2,
            "probability"   : 2
        },
        "4" : {
            "count"         : 2,
            "probability"   : 3
        },
        "5" : {
            "count"         : 2,
            "probability"   : 4
        },
        "6" : {
            "count"         : 2,
            "probability"   : 5
        },
        "8" : {
            "count"         : 2,
            "probability"   : 5
        },
        "9" : {
            "count"         : 2,
            "probability"   : 4
        },
        "10" : {
            "count"         : 2,
            "probability"   : 3
        },
        "11" : {
            "count"         : 2,
            "probability"   : 2
        },
        "12" : {
            "count"         : 1,
            "probability"   : 1
        }
    },

    ports : {

    },

    generateResourceTile : function() {

        var SELF = this,
            resource_types = SELF.resource_types;

        var resourceTile = function() {
            var dice_weight = 0;
        };


    }

};