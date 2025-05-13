var cloakSpan = document.getElementById("cloakCounter");
var stoneSpan = document.getElementById("stoneCounter");
var wandSpan = document.getElementById("wandCounter");


//Create Connection

var connectionDeathlyHallows = new signalR.HubConnectionBuilder().withUrl("/hubs/deathlyhallows").build()

//Connect to methods that hub invokes  aka receives  notification from hub
connectionDeathlyHallows.on("updateDeathlyHallowCount", (cloak, stone, wand) => {
    cloakSpan.innerText = cloak.toString();
    stoneSpan.innerText = stone.toString();
    wandSpan.innerText  = wand.toString();
})


//start connection
function fullfilled()
{
    connectionDeathlyHallows.invoke("GetRaceStatus").then((raceCounter) => {
        cloakSpan.innerText = raceCounter.cloak.toString();
        stoneSpan.innerText = raceCounter.stone.toString();
        wandSpan.innerText = raceCounter.wand.toString();

    })
    
}
function rejected()
{
    //Rejected logs
}
connectionDeathlyHallows.start().then(fullfilled, rejected);