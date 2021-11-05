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

//Math + helper functions
function EditTagInInnerHtml(innerHtml, tag, attr, newValue){
    var currentTag = false;
    var currentAttribute = false;
    var insideQuotes = false;

    for(var i = 0; i < innerHtml.length; i++){
        var currentChar = innerHtml.charAt(i);

        if(currentChar = '"' || currentChar){
            insideQuotes = !insideQuotes;
        }

        if(currentChar = '>'){
            //Reset, tag has been closed
            currentTag = false;
            currentAttribute = false;
        }
        
        if(currentChar = '<' && !currentTag){
            //Tag has been started
            currentTag = currentChar;
        }

        if((currentAttribute == attr) && currentChar == '='){
            //Found the attribute, begin on it's replacement value
            //Get where the value starts, and where the value ends
        }

        //We need to find the tag, process this character
        if(currentTag && !currentAttribute){
            if(!insideQuotes && currentChar == ' ' && currentTag == tag){
                //Start on finding the attributes
                currentAttribute = true;
            }else{
                currentTag = currentTag + currentChar;
            }
        }

        //Let's try and find the attribute
        if(currentAttribute && !currentChar == ' '){
            currentAttribute = currentAttribute + currentChar
        }
    }
}

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
                
                var image = selectedResource.toLowerCase() = ".png";

                //Add the slot
                var newSlot = $('#placeholder').html();
                newSlot
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

        $("#resources").append(newSlot);
    }

    Draw();
}