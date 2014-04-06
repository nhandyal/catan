Catan.resources = {

    resource_types : ["Lumber", "Sheep", "Ore", "Brick", "Wheat", "Desert"],
    
    resource_counts : {
        "Lumber"    : 4,
        "Sheep"     : 4,
        "Ore"       : 3,
        "Brick"     : 3,
        "Wheat"     : 4,
        "Desert"    : 1
    },

    dice_weight_count : {
        2 : {
            "count"         : 1,
            "probability"   : 1
        },
        3 : {
            "count"         : 2,
            "probability"   : 2
        },
        4 : {
            "count"         : 2,
            "probability"   : 3
        },
        5 : {
            "count"         : 2,
            "probability"   : 4
        },
        6 : {
            "count"         : 2,
            "probability"   : 5
        },
        8 : {
            "count"         : 2,
            "probability"   : 5
        },
        9 : {
            "count"         : 2,
            "probability"   : 4
        },
        10 : {
            "count"         : 2,
            "probability"   : 3
        },
        11 : {
            "count"         : 2,
            "probability"   : 2
        },
        12 : {
            "count"         : 1,
            "probability"   : 1
        }
    },

    ports : [
        {
            "type" : "Lumber",
            "conversion_rate" : 2
        },
        {
            "type" : "Sheep",
            "conversion_rate" : 2
        },
        {
            "type" : "Ore",
            "conversion_rate" : 2
        },
        {
            "type" : "Brick",
            "conversion_rate" : 2
        },
        {
            "type" : "Wheat",
            "conversion_rate" : 2
        },
        {
            "type" : "any",
            "conversion_rate" : 3
        },
        {
            "type" : "any",
            "conversion_rate" : 3
        },
        {
            "type" : "any",
            "conversion_rate" : 3
        },
        {
            "type" : "any",
            "conversion_rate" : 3
        }
    ],

    resource_map : {

        _map : null,
        _map_radius : 0,

        _convert_cube_to_axial : function(x, y, z) {
            return {
                'r' : z,
                'c' : x
            };
        },

        _convert_axial_to_cube : function(r, c) {
            return {
                x : c,
                z : r,
                y : (-c - r)
            };
        },

        _is_valid_axial_coord : function(r, c) {

            var cube_cord = this._convert_axial_to_cube(r, c);
            return Math.abs(cube_cord.y) <= this._map_radius;

        },

        _set_map : function(scaled_r, scaled_c, value) {
            var SELF = this,
                map = SELF._map,
                map_radius = SELF._map_radius;

                map[scaled_r + map_radius][scaled_c + map_radius] = value;
        },

        _get_map : function(scaled_r, scaled_c) {
            return map[scaled_r + map_radius][scaled_c + map_radius];
        },

        init : function(map_radius) {

            var SELF = this;
                SELF._map = map = Catan.utils.create2dArray((map_radius * 2) + 1);

            SELF._map_radius = map_radius;

            // initialize the entire resource map to null values
            var ch = "A",
                nextChar = function(c) {
                    return String.fromCharCode(c.charCodeAt(0) + 1);
                };

            for(var scaled_r = -map_radius; scaled_r <= map_radius ; scaled_r++) {
                for(var scaled_c = -map_radius; scaled_c <= map_radius; scaled_c++) {
                    if(SELF._is_valid_axial_coord(scaled_r, scaled_c)) {
                        SELF._set_map(scaled_r, scaled_c, ch);
                        ch = nextChar(ch);
                    }
                    else {
                        SELF._set_map(scaled_r, scaled_c, null);
                    }
                }
            }
        },

        resourceTile : function() {
            
        }
    },

    generateResourceTile : function() {

        var SELF = this,
            resource_types = SELF.resource_types,
            resource_counts = SELF.resource_counts,
            dice_weight_count = SELF.dice_weight_count,
            ports = SELF.ports;



        var resourceTile = function() {

            var buildable = true,
                render_x = 0,
                render_y = 0,
                spread = 25,
                settlment = null,

                path_ref1 = null,
                path_ref2 = null,
                path_ref3 = null,

                port = null,
                dice_weight = 0;

            //var dice_weight = 0;
        };


    }

};