//Create Connection

var connectionUserCount = new signalR.HubConnectionBuilder().withUrl("/hubs/userCount").build()

//Connect to methods that hub invokes  aka receives  notification from hub
connectionUserCount.on("updateTotalViews",(value)=> {
    var newCountSpan = document.getElementById("totalViewsCounter");
    newCountSpan.innerText = value.toString();
})

connectionUserCount.on("updateTotalUsers", (value) => {
    var newCountSpan = document.getElementById("totalUsersCounter");
    newCountSpan.innerText = value.toString();
})






//invoke hub methods  aka send notification to hub
function newWindowLoadedOnClient() {
    connectionUserCount./*send*/invoke("NewWindowLoaded").then((value)=>console.log(value));
}
//start connection
function fullfilled() {
    console.log("Connection to user hub successful");
    newWindowLoadedOnClient();
}
function rejected()
{
    //Rejected logs
}
connectionUserCount.start().then(fullfilled, rejected);