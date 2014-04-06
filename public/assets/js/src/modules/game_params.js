Catan.game_params = {

    resource_types : ["Lumber", "Sheep", "Ore", "Brick", "Wheat", "Desert"],
    
    resource_counts : {
        "Lumber"    : 4,
        "Sheep"     : 4,
        "Ore"       : 3,
        "Brick"     : 3,
        "Wheat"     : 4,
        "Desert"    : 1
    },

    dice_weight_count : {
        2 : {
            "count"         : 1,
            "probability"   : 1
        },
        3 : {
            "count"         : 2,
            "probability"   : 2
        },
        4 : {
            "count"         : 2,
            "probability"   : 3
        },
        5 : {
            "count"         : 2,
            "probability"   : 4
        },
        6 : {
            "count"         : 2,
            "probability"   : 5
        },
        8 : {
            "count"         : 2,
            "probability"   : 5
        },
        9 : {
            "count"         : 2,
            "probability"   : 4
        },
        10 : {
            "count"         : 2,
            "probability"   : 3
        },
        11 : {
            "count"         : 2,
            "probability"   : 2
        },
        12 : {
            "count"         : 1,
            "probability"   : 1
        }
    },

    ports : [
        {
            "type" : "Lumber",
            "conversion_rate" : 2
        },
        {
            "type" : "Sheep",
            "conversion_rate" : 2
        },
        {
            "type" : "Ore",
            "conversion_rate" : 2
        },
        {
            "type" : "Brick",
            "conversion_rate" : 2
        },
        {
            "type" : "Wheat",
            "conversion_rate" : 2
        },
        {
            "type" : "any",
            "conversion_rate" : 3
        },
        {
            "type" : "any",
            "conversion_rate" : 3
        },
        {
            "type" : "any",
            "conversion_rate" : 3
        },
        {
            "type" : "any",
            "conversion_rate" : 3
        }
    ]

};