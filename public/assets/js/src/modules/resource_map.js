Catan.resource_map = {

    _map : null,
    _map_radius : 0,
    count : 19,

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

    _convert_scaled_to_abs_rc : function(scaled_r, scaled_c) {
        var map_radius = this._map_radius;

        return {
            r : scaled_r + map_radius,
            c : scaled_c + map_radius
        };
    },

    _convert_abs_to_scaled_rc : function(abs_r, abs_c) {
        var map_radius = this._map_radius;
        
        return {
            r : abs_r - map_radius,
            c : abs_c - map_radius
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

        var resources = Catan.game_params.resources,
            possible_dice_rolls = Catan.game_params.possible_dice_rolls;

        SELF._map_radius = map_radius;

        var generateResourceTile = function(scaled_r, scaled_c) {
            var resource = null,
                dice_roll = null;

            // pick the resource
            while(true) {
                var resource_index = Catan.utils.generateRandomNumber(0, (resources.length - 1));
                resource = resources[resource_index];

                if(resource.available === 0) {
                    resources.splice(resource_index, 1);
                    continue;
                }

                resources[resource_index].available --;
                break;
            }

            if(resource.type != "Desert") {
                //pick the dice weight count
                while(true) {
                    var dice_roll_index = Catan.utils.generateRandomNumber(0, (possible_dice_rolls.length - 1));
                    dice_roll = possible_dice_rolls[dice_roll_index];
                    
                    if(dice_roll.available === 0) {
                        possible_dice_rolls.splice(dice_roll_index, 1);
                        continue;
                    }


                    possible_dice_rolls[dice_roll_index].available --;
                    break;
                }
            } else {
                dice_roll = {
                    value : "N/A",
                    probability : 0
                };
            }

            var tile_params = {
                "adjacent_vertices" : [],
                "resource_type" : resource.type,
                "dice_roll" : dice_roll.value,
                "dice_roll_probability" : dice_roll.probability,
                "scaled_rc" : {
                    r : scaled_r,
                    c : scaled_c
                },
                "abs_rc" : SELF._convert_scaled_to_abs_rc(scaled_r, scaled_c),
                "cubic_cord" : SELF._convert_axial_to_cube(scaled_r, scaled_c)
            };

            return new resourceTile(tile_params);
            
        };

        var resourceTile = function(tile_params) {
            // 6 adjacent vertices : [<vertex>]
            // resource type : string
            // dice weight count : int
            // dice weight probability : int
            // port : <port>
            // robber present : boolean

            this.adjacent_vertices = tile_params.adjacent_vertices;
            this.resource_type = tile_params.resource_type;
            this.dice_roll = tile_params.dice_roll;
            this.dice_roll_probability = tile_params.dice_roll_probability;
            this.scaled_rc = tile_params.scaled_rc;
            this.abs_rc = tile_params.abs_rc;
            this.cubic_cord = tile_params.cubic_cord;
            this.robber_present = false;

            return this;
        };

        // initialize the resource map
        for(var scaled_r = -map_radius; scaled_r <= map_radius ; scaled_r++) {
            for(var scaled_c = -map_radius; scaled_c <= map_radius; scaled_c++) {
                if(SELF._is_valid_axial_coord(scaled_r, scaled_c)) {
                    SELF._set_map(scaled_r, scaled_c, generateResourceTile(scaled_r, scaled_c));
                }
                else {
                    SELF._set_map(scaled_r, scaled_c, null);
                }
            }
        }
    },

    get_resource_map : function() {
        return this._map;
    }

};