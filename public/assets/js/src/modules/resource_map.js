Catan.resource_map = {

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

        var resource_types = Catan.game_params.resource_types,
            resource_counts = Catan.game_params.resource_counts,
            dice_weights = Catan.game_params.dice_weight;


        SELF._map_radius = map_radius;

        // initialize the resource map
        for(var scaled_r = -map_radius; scaled_r <= map_radius ; scaled_r++) {
            for(var scaled_c = -map_radius; scaled_c <= map_radius; scaled_c++) {
                if(SELF._is_valid_axial_coord(scaled_r, scaled_c)) {
                    SELF._set_map(scaled_r, scaled_c, getResourceTile);
                }
                else {
                    SELF._set_map(scaled_r, scaled_c, null);
                }
            }
        }

        var getResourceTile = function() {
            var resource_index = null,
                resource_type = null,
                dice_weight_index = null,
                dice_weight = null;

            // pick the resource
            while(true) {
                resource_index = Catan.utils.generateRandomNumber(0, (resource_types.length - 1));
                resource_type = resource_types[resource_index];

                if(resource_counts[resource_type] === 0) {
                    continue;
                }

                resource_counts[resource_type] --;
                break;
            }

            //pick the dice weight count
            while(true) {
                dice_weight_index = Catan.utils.generateRandomNumber(2, 12);
                dice_weight = dice_weights[dice_weight_index];
                
                if(dice_weight_index == 7) {
                    continue;
                }
                if(dice_weight.count === 0) {
                    continue;
                }

                dice_weights[dice_weight_index].count --;
                break;
            }

            var tile_params = {
                "adjacent_vertices" : [],
                "resource_type" : resource_type,
                "dice_weight" : dice_weight,
                "dice_weight_probability" : dice_weight.probability
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

            var adjacent_vertices = tile_params.adjacent_vertices,
                resource_type = tile_params.resource_type,
                dice_weight = tile_params.dice_weight,
                dice_weight_probability = tile_params.dice_weight_probability,
                robber_present = false;

            return this;
        };
    }

};