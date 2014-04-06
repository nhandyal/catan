Catan.utils = {
	getWindowSize : function() {
		return {
			width: window.innerWidth,
			height: window.innerHeight
		};
	},

    create2dArray : function(size) {
        var arr = [];

        for (var i=0; i < size; i++) {
            arr[i] = [];
        }

        return arr;
    }
};
