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

//Saved html
var slotDiv = "<div id = 'placeholder' class = 'newSlot'><img class = 'newSlotImage' src = 'Assets/Images/icon.png' alt = 'Slot Image'><p id = '1' class = 'newAmountLabel'>99999</p></div>"

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

                //TODO: Add the slot
                var newSlot = $('#placeholder').html();
            }
        }
    }
}

//Handles what the game should do when the web page loads
function Init(){
    $('#news').html('o');

    function Draw(){
        //Loop through each resource, and draw a slot for it
        for(var i = 1; i < Resources.length; i++){
            $('h1').html('Drawing resource...');
            var keys = Object.keys(Resources);
            var name = keys[i].toLowerCase();

            $('#resources').append(slotDiv);

            $('.newSlot').attr('id', name + 'slot');
            $('.newSlot').attr('class', 'slot');
            $('.newSlotImage').attr('id', name + 'image');
            $('.newSlotImage').attr('src', 'Assets/Images/' + name + '.png');
            $('.newSlotImage').attr('class', 'slotImage')
            $('.newAmountLabel').attr('id', name + 'label');
            $('.newAmountLabel').html(Resources[i].Amount);
            $('.newAmountLabel').attr('class', 'amountLabel');
        }
    }

    Draw();
}