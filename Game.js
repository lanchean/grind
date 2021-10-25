var Resources = {
    "Wood": {
        Amount: 0,
        CraftingAmount: 1,
        Recipe: {}
    }
};

function Craft(ResourceName){
    var Resource = Resources[ResourceName];

    if(Resource.Recipe){
        var canAfford = true;

        //Check if they can afford the item
        for(var i = 0; i < Resource.Recipe.length / 2; i++){
            var selectedResource = Resource.Recipe[i * 2];
            var selectedAmount = Resource.Recipe[i * 2 + 1];

            if(!Resource[selectedResource].Amount >= selectedAmount){
                canAfford = false;
                break;
            }
        }

        if(canAfford){
            //They can, give them the item
            for(var i = 0; i < Resource.Recipe.length / 2; i++){
                Resources[Resource.Recipe[i * 2]].Amount -= Resources[Resource.Recipe[i * 2 + 1]]
            }

            Resources[ResourceName].Amount += Resource.CraftingAmount
        }
    }
}

//Handles what the game should do when the web page loads
function Init(){
    
}