var gameID = "4", userID, time, lastGameLastLevel, currentdate, sessionData, preloader, centerX = 540/2, centerY = 960/2, picsArray=[];

memoGame.preloader = function () {};
memoGame.preloader.prototype = {
    preload: function(){
        currentdate = new Date();
        sessionData = "";
        lastGameLastLevel = 0;
        time = "";

        game.load.spritesheet('preloader', '../assets/allGames/spriteSheets/preloader.png', 120, 120, 100);
        game.load.image('header', '../assets/memoGame/backgrounds/header.jpg');

    }, 
    create: function(){

        game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        game.stage.backgroundColor = '#F9EFDD';
        gameHeader = game.add.sprite(0, 0, 'header');
        preloader = game.add.sprite(centerX, centerY, 'preloader');
        preloader.anchor.set(0.5);
        preloader.animations.add('load', [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60,61,62,63,64,65,66,67,68,69,70,71,72,73,74,75,76,77,78,79,80,81,82,83,84,85,86,87,88,89,90,91,92,93,94,95,96,97,98,99]);
        preloader.animations.play('load', 20, true);

        setTimeout(fromServer, 1500);
    },
    update: function(){

    }
};

//****************************************FROM SERVER*********************************************

function fromServer() {

    //preparing to call server side page
    var xmlhttp = new XMLHttpRequest();

    //PLEASE VERIFY THAT PORT NUMBER IS CORRECT	
    // *****************************************************************

    var url = "http://project-most.herokuapp.com/userIdandLevel/" + gameID;

    // *****************************************************************

    xmlhttp.onreadystatechange = function () {
        // וידוא שניתן לקרוא את הפונקציה
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            myFunction(xmlhttp.responseText);
        }
    }

    xmlhttp.open("GET", url, true);
    xmlhttp.send();

    //this function retreives information received from server side. received information is inside 'response'
    function myFunction(response) {
        console.log("response: " + response);
        var responseArray = response.split("$");     
        console.log("response array after split: " + responseArray);

        userID = responseArray[0];
        lastGameLastLevel = responseArray[1];

        picsFromServer();

        // creates new JSON structure
        time = currentdate.getDate() + "/" + (currentdate.getMonth() + 1) + "/" + currentdate.getFullYear() + " - " + currentdate.getHours() + ":" + currentdate.getMinutes() + ":" + currentdate.getSeconds();
        sessionData = '{ "gameID": ' + gameID + ',"time": "' + time + '","userID": ' + userID + ',"data": {"levels": [';
        game.state.start('memoGameTutorial');
    }
}

function picsFromServer() {

    //preparing to call server side page
    var xmlhttp = new XMLHttpRequest();

    //PLEASE VERIFY THAT PORT NUMBER IS CORRECT	
    // *****************************************************************
    var url = "http://project-most.herokuapp.com/user/" + userID + "/getimages";
    // *****************************************************************

    xmlhttp.onreadystatechange = function () {
        // וידוא שניתן לקרוא את הפונקציה
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            myFunction(xmlhttp.responseText);
        }
    }

    xmlhttp.open("GET", url, true);
    xmlhttp.send();

    //this function retreives information received from server side. received information is inside 'response'
    function myFunction(response) {
        var responseString = response; 
        if (responseString == "[]"){
            picsArray = [];
        }else{
            responseString = responseString.substring(1, responseString.length - 1);
            responseString = responseString.replace(/"| /gi, "");
            console.log("responseString = " + responseString);
            picsArray = responseString.split(","); 
        }
        console.log("picsArray = " + picsArray);
    }
}

//function fromServer() {
//    userID = 8;
//    lastGameLastLevel = 6; 
////    lastGameLastLevel = 0; 
//    game.state.start('memoGameTutorial');
//
//}