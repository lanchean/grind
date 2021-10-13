var Resources = {
    "Wood": {
        Amount: 0,
        Recipe: {}
    }
};

function Craft(ResourceName){
    var Resource = Resources[ResourceName];

    if(Resource.Recipe){
        //TODO: Check if player can afford, else, draw it.
    }
}