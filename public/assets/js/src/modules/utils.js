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
        if(upper_bound < lower_bound) {
            return 0;
        }
        
        var range = (upper_bound - lower_bound);

        return Math.floor(Math.random() * range) + lower_bound;
    }
};
