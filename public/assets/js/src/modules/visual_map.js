Catan.map = {

    init : function() {

        var SELF = this,
            windowDimensions = Catan.utils.getWindowSize(),
            square_window = Math.min(windowDimensions.width, windowDimensions.height),
            half_square_window = square_window / 2;

        // create the main svg element and group element
        var NS_SVG = "http://www.w3.org/2000/svg",
            NS_XLINK = "http://www.w3.org/1999/xlink",
            svg = document.createElementNS(NS_SVG,"svg"),
            master_group = document.createElementNS(NS_SVG, "g");

        var master_transform_string = 'translate(' + half_square_window + ', ' + half_square_window + ')';
        master_group.id = "main-group";
        svg.id = "main-map";

        // set svg attributes
        svg.setAttribute('xmlns:xlink', NS_XLINK);
        svg.setAttribute("width", square_window);
        svg.setAttribute("height", square_window);
        master_group.setAttribute("transform", master_transform_string);

        var resource_map = Catan.resource_map.get_resource_map(),
            hex_tile_size = (square_window / 5) / (2 * 0.866),
            hex_tile_height = hex_tile_size * 2,
            hex_tile_width = hex_tile_height * (Math.sqrt(3)/2);

        for(var r = 0; r < resource_map.length; r++) {
            for(var c = 0; c < resource_map.length; c++) {
                var resource_tile = resource_map[r][c];

                if(resource_tile === null) {
                    continue;
                }

                // create local svg resources
                var local_group = document.createElementNS(NS_SVG, "g"),
                    polygon = document.createElementNS(NS_SVG, "polygon"),
                    resource_image = document.createElementNS(NS_SVG, "image");

                var scaled_r = resource_tile.scaled_rc.r,
                    scaled_c = resource_tile.scaled_rc.c;

                var center_x = hex_tile_size * Math.sqrt(3) * (scaled_c + (scaled_r/2)),
                    center_y = hex_tile_size * 1.5 * scaled_r,
                    local_transform_string = 'translate(' + center_x + ', ' + center_y + ')';



                // center the group

                // create the hexagon
                var points = "";
                for (var i = 0; i < 6; i++) {
                    var angle = 2 * Math.PI / 6 * (i + 0.5),
                        x_i = hex_tile_size * Math.cos(angle),
                        y_i = hex_tile_size * Math.sin(angle);

                    if(i == 5) {
                        // last iteration
                        points += x_i + "," + y_i;
                    } else {
                        points += x_i + "," + y_i + " ";
                    }
                }

                // set the local svg attributes
                local_group.setAttribute("transform", local_transform_string);

                polygon.setAttribute("points", points);

                resource_image.setAttribute("width", hex_tile_width);
                resource_image.setAttribute("height",  hex_tile_height);
                resource_image.setAttributeNS(NS_XLINK, "href", resource_tile.resource_img_asset);
                resource_image.setAttribute("x", -(hex_tile_width / 2));
                resource_image.setAttribute("y", -(hex_tile_height / 2));
                

                local_group.appendChild(polygon);
                local_group.appendChild(resource_image);
                master_group.appendChild(local_group);
            }
        }

        svg.appendChild(master_group);
        Catan.body.appendChild(svg);

    }

};