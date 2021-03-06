var Enum = {
    Type: {
        Item: 'ITEMTYPE',
        Tool: 'TOOLTYPE'
    },
    ToolType: {
        Pickaxe: 'PICKAXE',
        Shovel: 'SHOVEL',
        Axe: 'AXE',
        Sword: 'SWORD'
    }
}

var Resources = {
    "OakWood": {
        Type: Enum.Type.Item,
        Amount: 1,
        CraftingAmount: 1,
        Recipe: []
    },
    "OakPlanks": {
        Type: Enum.Type.Item,
        Amount: 0,
        CraftingAmount: 4,
        Recipe: ["OakWood", 1]
    },
    'Stick': {
        Type: Enum.Type.Item,
        Amount: 0,
        CraftingAmount: 4,
        Recipe: ['OakPlanks', 2]
    },
    'CraftingTable': {
        Type: Enum.Type.Item,
        Amount: 0,
        CraftingAmount: 1,
        Recipe: ['OakPlanks', 4]
    },
    'WoodenAxe': {
        Type: Enum.Type.Tool,
        Amount: 0,
        CraftingAmount: 1,
        Recipe: ['Stick', 2, 'OakPlanks', 3, 'CraftingTable', 0]
    }
};
var Generators = {
    'Overworld': {
        Resources: {
            //IMPORTANT: WHEN ADDING NEW RESOURCES, ORDER BY PROBABILITY (LEAST TO GREATEST)
            'CraftingTable': {
                Probability: 25,
                MinVein: 1,
                MaxVein: 2,
                ClicksToBreak: 3
            },
            'OakWood': {
                Probability: 100,
                MinVein: 3,
                MaxVein: 5,
                ClicksToBreak: 2
            }
        },
        CurrentResource: 'None',
        CurrentTools: {
            Axe: 0
        },
        CurrentClicks: 0,
        BlocksInVein: 0
    }
};

//Saved html
var slotDiv = "<div id = 'placeholder' class = 'newSlot'><img class = 'newSlotImage' src = 'Assets/Images/icon.png' alt = 'Slot Image' width = '100' height = '100'><p id = '1' class = 'newAmountLabel'>99999</p></div>"
var generatorDiv = "<div class = 'newGenerator'><h3 class = 'newGeneratorText'></h3><img class = 'newGeneratorImage' alt = 'Resource Gen'></div>"


//Function to render slots (has multi-class capability)
function DrawSlot(parentId, slotId, resourceName, slotText, onClickMethod){
    function bind(event) {
        onClickMethod(event.data.param1);
    }

    $('#' + parentId).append(slotDiv);

    $('.newSlotImage').attr('src', 'Assets/Images/items/' + resourceName.toLowerCase() + '.png');
    $('.newSlotImage').attr('class', 'slotImage');

    //Check if we're rendering text (we might just be rendering health bars)
    if(slotText){
        $('.newAmountLabel').text(slotText);
    }else{
        $('.newAmountLabel').css({'display': 'none'});
    }

    $('.newAmountLabel').attr('id', resourceName + 'Label')    
    $('.newAmountLabel').attr('class', 'amountLabel');

    $('.newSlot').attr('id', slotId);
    $('.newSlot').click({param1: resourceName}, bind);
    $('.newSlot').attr('class', 'slot inventory');
}

function Give(ResourceName, amount){
    Resources[ResourceName].Amount += amount
    $('#' + ResourceName + 'Label').text(Resources[ResourceName].Amount);
}

function Craft(ResourceName){
    var Resource = Resources[ResourceName];

    if(Resource.Recipe && Resource.Recipe.length > 0){
        var canAfford = true;

        //Check if they can afford the item
        for (var i = 0; i < Resource.Recipe.length / 2; i++){
            console.log(canAfford);
            var selectedResource = Resource.Recipe[i * 2];
            var selectedAmount = Resource.Recipe[i * 2 + 1];
            
            if (selectedAmount === 0 && Resources[selectedResource].Amount < 1) {
                canAfford = false;
            }

            if (Resources[selectedResource].Amount < selectedAmount) {
                canAfford = false;
            }
        }

        if (canAfford) {
            console.log('Can afford.');
            //They can, give them the item
            for(var i = 0; i < Resource.Recipe.length / 2; i++){
                Give(Resource.Recipe[i *  2], 0 - Resource.Recipe[i *  2 + 1]);
            }

            Give(ResourceName, Resource.CraftingAmount)
            //Add a tool if we need to
            if(Resource.Type == Enum.ToolType.Tool){
                Tools[Tools.length] = {
                    Type: ResourceName,
                    Durability: Resource.Durability,
                    MaxDurability: Resource.Durabilty
                }
            }
        }
    }
}

//Restock resource generator
function FillResourceGenerator(generator){
    //Roll the dice for which resource they get
    var rand = 65 + Math.random() * 30;
    var generatorName = generator;
    var generator = Generators[generator];
    var chosenResource;

    for(var resource in generator.Resources){
        if (rand <= generator.Resources[resource].Probability){
            chosenResource = resource;
            break;
        }
    }

    var minVein = generator.Resources[chosenResource].MinVein;
    var maxVein = generator.Resources[chosenResource].MaxVein;
    var vein = minVein + Math.round(Math.random() * (maxVein - minVein));


    Generators[generatorName].CurrentResource = chosenResource;
    Generators[generatorName].CurrentClicks = generator.Resources[chosenResource].ClicksToBreak;
    Generators[generatorName].BlocksInVein = vein;
    $('#' + generatorName + 'GenImage').attr('src', 'Assets/Images/items/' + chosenResource.toLowerCase() +'.png');
}

function ClickResourceGenerator(generator){
    Generators[generator].CurrentClicks -= 1;

    var generatorName = generator;
    var generator = Generators[generator];

    if(generator.CurrentClicks < 1){
        Give(generator.CurrentResource, 1);
        Generators[generatorName].CurrentClicks = Generators[generatorName].Resources[generator.CurrentResource].ClicksToBreak;
        Generators[generatorName].BlocksInVein -= 1;
    }

    if(Generators[generatorName].BlocksInVein === 0){
        FillResourceGenerator(generatorName);
    }
}

//Handles what the game should do when the web page loads
function Init(){
    function Draw(){
        //JQuery binds their events late when you pass it in as function(){stuff}, so you have to do it like this, else items would craft to the last resource looped through
        function craftItemBind(event){
            Craft(event.data.param1);
        }

        //Loop through each resource, and draw a slot for it
        for(var name in Resources){
            DrawSlot('resources', name + 'Slot', name, Resources[name].Amount.toString(), Craft);
        }

        //Loop through each generator, and draw it
        //Why are we using a different name? Because jQuery is delayed in applying the event, so using the var name will cause for an error. \(.__.)/
        for (var genName in Generators){
            $('#generators').append(generatorDiv);

            $('.newGeneratorText').attr('id', genName + 'GenText');
            $('.newGeneratorText').html(genName);
            $('.newGeneratorText').attr('class', 'generatorText');
            $('.newGeneratorImage').attr('id', genName + 'GenImage');
            $('.newGeneratorImage').attr('class', 'generatorImage');
            $('.newGenerator').attr('id', genName + 'Gen');
            $('.newGenerator').click(function(){ClickResourceGenerator(genName)});
            $('.newGenerator').attr('class', 'generator');

            FillResourceGenerator(genName);
        }
        
    }

    Draw();
}
