// Initialize all the included modules

// Expose the Catan and SC object to the window
if (typeof window === "object") {
    window.Catan = window.SC = Catan;
}

})(window);
