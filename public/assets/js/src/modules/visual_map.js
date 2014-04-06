Catan.map = {

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

        var resource_map = Catan.resource_map.get_resource_map(),
            hex_tile_size = (square_window / 5) / (2 * 0.866);

        for(var r = 0; r < resource_map.length; r++) {
            for(var c = 0; c < resource_map.length; c++) {
                var resource_tile = resource_map[r][c],
                    center_x = 0,
                    center_y = 0,
                    points = "";

                if(resource_tile === null) {
                    continue;
                }

                var scaled_r = resource_tile.scaled_rc.r,
                    scaled_c = resource_tile.scaled_rc.c;

                center_x = hex_tile_size * Math.sqrt(3) * (scaled_c + (scaled_r/2));
                center_y = hex_tile_size * 1.5 * scaled_r;

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
            }
        }

        svg.appendChild(g);
        Catan.body.appendChild(svg);

    }

};