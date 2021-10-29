var Resources = {
    "OakWood": {
        Amount: 0,
        CraftingAmount: 1,
        Recipe: []
    },
    "OakPlanks": {
        Amount: 0,
        CraftingAmount: 4,
        Recipe: ["OakWood", 4]
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
        }else{
            //TODO: Draw recipe
            //Append all the necessary slots
            for(var i = 1; i < Resource.Recipe.length / 2; i++){
                var selectedResource = Resource.Recipe[i * 2];
                var selectedAmount = Resource.Recipe[i * 2 + 1];
                
            }
        }
    }
}

//Handles what the game should do when the web page loads
function Init(){
    function Draw(){
        //Loop through each resource, and draw a slot for it
        var newSlot = $(".slot").html();
        newSlot.id = "hello";

        $("#resources").append($("#hello"));
    }

    Draw();
}