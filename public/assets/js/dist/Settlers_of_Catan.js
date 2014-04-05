/*!
 * Catan site controller
 */
(function(window) {

    // This project has an external dependency on JQuery v 2.1.0
    // https://ajax.googleapis.com/ajax/libs/jquery/2.1.0/jquery.min.js

    // Create the Catan Object and set SC to be an allias of Catan
    var Catan = {},
        SC = Catan;


    // Create global Catan vars
    $(document).ready(function() {
        Catan.head = document.getElementsByTagName("head")[0];
        Catan.body = document.getElementsByTagName("body")[0];
        Catan.init();
    });

    Catan.init = function() {

        $(window).resize(function() {
            Catan.cc.init();
        });

        Catan.cc.init();
    };
    Catan.ZuneView = {

        zuneCards: [],

        init: function(viewportTiles, zuneContainerId) {

            var SELF = this;

            function nextChar(c) {
                return String.fromCharCode(c.charCodeAt(0) + 1);
            }

            function ZuneElement(size, originX, originY) {
                var flipContainer = document.createElement("div"),
                    flipper = document.createElement("div"),
                    front = document.createElement("div"),
                    back = document.createElement("div"),
                    imgFront = document.createElement("img"),
                    imgBack = document.createElement("img"),
                    dimension = size * tile.width;

                flipContainer.className = "flip-container";
                flipContainer.style.width = dimension;
                flipContainer.style.height = dimension;
                flipContainer.style.top = originY;
                flipContainer.style.left = originX;

                flipper.className = "flipper";

                front.className = "front";

                back.className = "back";

                imgFront.className = "imgFront zuneImg";
                imgFront.width = dimension - 5;
                imgFront.height = dimension - 5;
                imgFront.src = SELF.getRandomImg();

                imgBack.className = "imgBack zuneImg";
                imgBack.width = dimension - 5;
                imgBack.height = dimension - 5;
                imgBack.src = SELF.getRandomImg();

                front.appendChild(imgFront);
                back.appendChild(imgBack);

                flipper.appendChild(front);
                flipper.appendChild(back);

                flipContainer.appendChild(flipper);

                var zuneCard = new SELF.ZuneCard(flipContainer, imgFront, imgBack);
                SELF.zuneCards.push(zuneCard);

                return flipContainer;
            }

            var zuneContainer = document.getElementById(zuneContainerId);
            var viewport = {
                width: zuneContainer.clientWidth,
                height: zuneContainer.clientHeight
            },
                tile = {
                    width: viewport.height / viewportTiles.height,
                    height: viewport.height / viewportTiles.height
                },
                gridChar = "A",

                renderX = 0,
                renderY = 0,
                element = null;
            viewportTiles.width = Math.floor(viewport.width / tile.width);

            //		var Xoffset = (viewport.width-(viewportTiles.width * tile.width))/2;

            var Xoffset = 0;
            var grid = new Array(viewportTiles.width);
            for (c = 0; c < viewportTiles.width; c++) {
                grid[c] = new Array(viewportTiles.height);
            }


            /* Used to ensure proper logo placement and size */
            var firstIteration = true;

            document.getElementById("wrapper").style.width = viewportTiles.width * tile.width + "px";

            // iterate over the entire grid
            for (r = 0; r < viewportTiles.height; r++) {
                for (c = 0; c < viewportTiles.width; c++) {

                    // find the first open slot in the grid
                    if (grid[c][r] !== undefined) {
                        // something exists at this grid location, continue
                        continue;
                    }

                    var size = Math.floor(Math.random() * 4) + 2,
                        gridX = c,
                        gridY = r,
                        trueSize = 0;


                    if (firstIteration)
                        size = 2;

                    // find the true size of the element
                    // check both the upper and lower bounds
                    while (trueSize < size && gridX < viewportTiles.width && grid[gridX][r] === undefined && gridY < viewportTiles.height) {
                        trueSize++;
                        gridX++;
                        gridY++;
                    }

                    // fill the true size square on the minimap
                    for (gridX = c; gridX < c + trueSize; gridX++) {
                        for (gridY = r; gridY < r + trueSize; gridY++) {
                            grid[gridX][gridY] = gridChar;
                        }
                    }

                    // we know the true size of the element, as well as the start location of where to render it
                    renderX = c * tile.width + Xoffset;
                    renderY = r * tile.height;
                    element = new ZuneElement(trueSize, renderX, renderY);
                    if (firstIteration) {
                        var zuneCard = SELF.zuneCards[0];
                        zuneCard.imgFront.src = "../assets/images/logo.png";
                        zuneCard.imgBack.src = "../assets/images/logo.png";
                        SELF.zuneCards = [];
                        firstIteration = false;
                    }

                    zuneContainer.appendChild(element);
                    gridChar = nextChar(gridChar);
                }
            }


            setInterval(function() {
                SELF.updateZuneImgs();
            }, 5000);


            /* PRINTS THE MINIMAP, for dev use only */
            /*
		for(var r = 0; r < viewportTiles.height; r++) {
			var line = "";
			for(var c = 0; c < viewportTiles.width; c++) {
				line += grid[c][r] + " ";
			}
			console.log(line);
		}
		*/
        },

        getRandomImg: function() {
            var imgNumber = Math.floor(Math.random() * 47);
            return "../assets/images/" + imgNumber + ".jpg";
        },

        updateZuneImgs: function() {
            // pick a random zune tile and random new img
            var selectionIndex = Math.floor(Math.random() * this.zuneCards.length);
            var zuneCard = this.zuneCards[selectionIndex];
            var SELF = this;

            if (zuneCard.frontVisible) {
                // front --> back transition
                zuneCard.imgBack.src = SELF.getRandomImg();
            } else {
                // back --> front transition
                zuneCard.imgFront.src = SELF.getRandomImg();
            }

            zuneCard.frontVisible = !zuneCard.frontVisible;
            zuneCard.flipContainer.classList.toggle("flip");
        },

        ZuneCard: function(flipContainer, imgElementFront, imgElementBack) {
            return {
                flipContainer: flipContainer,
                imgFront: imgElementFront,
                imgBack: imgElementBack,
                frontVisible: true
            };
        }
    };

    Catan.cc = {

        init: function() {
            // create the canvas element and insert it into the document

            // remove the old canvas if there is one
            $("#catan_canvas").remove();

            var canvas = document.createElement("canvas"),
                canvas_context = canvas.getContext('2d'),
                windowDimensions = Catan.utils.getWindowSize();

            this.canvas = canvas;
            this.canvas_context = canvas_context;

            canvas.id = "catan_canvas";
            canvas.width = 0.9 * windowDimensions.width;
            canvas.height = 0.9 * windowDimensions.height;
            canvas.style.margin = (Math.floor(0.03 * windowDimensions.height) + "px ") + (Math.floor(0.05 * windowDimensions.width) + "px");

            Catan.body.appendChild(canvas);

            canvas_context.strokeStyle = 'red';
            canvas_context.lineWidth = 2;

            // Fill the path
            canvas_context.fillStyle = "#9ea7b8";
            canvas_context.fillRect(0, 0, windowDimensions.width, windowDimensions.height);
            //can.style.opacity = '0.2';
        },

        draw: function() {
            // draw a hexagon on the canvas

            var canvas = this.canvas,
                canvas_context = this.canvas_context,
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
    Catan.utils = {
        getWindowSize: function() {
            return {
                width: window.innerWidth,
                height: window.innerHeight
            };
        }
    };

    // Initialize all the included modules

    // Expose the Catan and SC object to the window
    if (typeof window === "object") {
        window.Catan = window.SC = Catan;
    }

})(window);
