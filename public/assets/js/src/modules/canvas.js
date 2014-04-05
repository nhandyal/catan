Catan.cc = {

    init : function() {
        // create the canvas element and insert it into the document

        // remove the old canvas if there is one
        $("#catan_canvas").remove();
        
        var SELF = this,
            canvas = document.createElement("canvas"),
            canvas_context = canvas.getContext('2d'),
            windowDimensions = Catan.utils.getWindowSize();

        SELF.canvas = canvas;
        SELF.canvas_context = canvas_context;

        canvas.id = "catan_canvas";
        canvas.width = 0.9 * windowDimensions.width;
        canvas.height = 0.9 * windowDimensions.height;
        canvas.style.margin = (Math.floor(0.03 * windowDimensions.height) + "px ") + (Math.floor(0.05 * windowDimensions.width) + "px");

        Catan.body.appendChild(canvas);

        canvas_context.strokeStyle = 'red';
        canvas_context.lineWidth = 2;

        // Fill the path
        canvas_context.fillStyle = "#9ea7b8";
        canvas_context.fillRect(0,0,windowDimensions.width,windowDimensions.height);
        //can.style.opacity = '0.2';
    },

    draw : function() {
        // draw a hexagon on the canvas

        var SELF = this,
            canvas = SELF.canvas,
            canvas_context = SELF.canvas_context,
            C = 200,
            A = 0.5 * C,
            B = 0.866 * C;


        var draw_north_south = function() {
            // draw from point 1 -> 2
            canvas_context.moveTo(0, A + C);
            canvas_context.lineTo(0, A);
            canvas_context.stroke();

            // draw from point 2 -> 3
            canvas_context.moveTo(0, A);
            canvas_context.lineTo(B, 0);
            canvas_context.stroke();

            // draw from point 3 -> 4
            canvas_context.moveTo(B, 0);
            canvas_context.lineTo(2 * B, A);
            canvas_context.stroke();

            // draw from point 4 -> 5
            canvas_context.moveTo(2 * B, A);
            canvas_context.lineTo(2 * B, A + C);
            canvas_context.stroke();

            // draw from point 5 -> 6
            canvas_context.moveTo(2 * B, A + C);
            canvas_context.lineTo(B, 2 * C);
            canvas_context.stroke();

            // draw from point 6 -> 1
            canvas_context.moveTo(B, 2 * C);
            canvas_context.lineTo(0, A + C);
            canvas_context.stroke();

        };

        draw_north_south();

    }

};