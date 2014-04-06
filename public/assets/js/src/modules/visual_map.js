Catan.map = {

    tileMap : {

        _graph_node : function() {
            var path_ref_1 = null,
                path_ref_2 = null,
                path_ref_3 = null;

            var renderX = 0,
                renderY = 0,
                spread = 25;
        },

        init : function() {

        }

    },

    init : function() {

        var SELF = this,
            windowDimensions = Catan.utils.getWindowSize(),
            square_window = Math.min(windowDimensions.width, windowDimensions.height),
            half_square_window = square_window / 2;

        // create the main svg element and group element
        var NS="http://www.w3.org/2000/svg",
            svg=document.createElementNS(NS,"svg"),
            g = document.createElementNS(NS, "g");

        var translate_string = 'translate(' + half_square_window + ', ' + half_square_window + ')';
        g.id = "main-group";
        g.setAttribute("transform", translate_string);

        svg.id = "main-map";
        svg.setAttribute("width", square_window);
        svg.setAttribute("height", square_window);

        var hex_tile_size = (square_window / 5) / (2 * 0.866),
            center_x = 0,
            center_y = 0,
            points = "";
        
        
        // create the hex tiles for the game
        for (var i = 0; i < 6; i++) {
            var angle = 2 * Math.PI / 6 * (i + 0.5),
                x_i = center_x + hex_tile_size * Math.cos(angle),
                y_i = center_y + hex_tile_size * Math.sin(angle);

                if(i == 5) {
                    // last iteration
                    points += x_i + "," + y_i;
                } else {
                    points += x_i + "," + y_i + " ";
                }
        }

        var polygon = document.createElementNS(NS, "polygon");
        polygon.setAttribute("points", points);
        g.appendChild(polygon);
        

        svg.appendChild(g);
        Catan.body.appendChild(svg);

    },

    hexTile : function() {

    }

};