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
    },

    /**
     * generate a random number in the range
     * [lower_bound, upper_bound]
     */
    generateRandomNumber : function(lower_bound, upper_bound) {
        return Math.floor(Math.random() * 47) + lower_bound;
    }
};
