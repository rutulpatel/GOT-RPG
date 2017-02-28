$(document).ready(function() {

    //variables
    var playerRandomAdder = 0;
    //classes variables
    var playerContainerClass = ".player-container";
    var nameClass = ".name";
    var scoreClass = ".score";
    var opponentContainerClass = ".opponent-container";
    var characterContainerClass = ".character-container";
    //ID variables
    var jonContainerID = "#jonContainer";
    var khaleesiContainerID = "#khaleesiContainer";
    var jamieContainerID = "#jamieContainer";
    var whiteContainerID = "#whiteContainer";
    var resetButtonID = "#resetButton";
    var msgID = "#msgId";
    var attackButtonID = "#attackButton";
    var placeHolerObj = {
        name: "",
        score: "", //health points
        attackPower: 0,
        counterAttackPower: 0,
        imgUrl: "assets/images/blank.jpg",
        index: 0
    }
    var jonObj = {
        name: "Jon Snow",
        score: "130",
        attackPower: 6,
        counterAttackPower: 8,
        imgUrl: "assets/images/jon-snow.jpg",
        index: 1
    };
    var khaleesiObj = {
        name: "Khaleesi",
        score: "150",
        attackPower: 6,
        counterAttackPower: 10,
        imgUrl: "assets/images/khaleesi.jpg",
        index: 2
    };
    var jamieObj = {
        name: "Jamie",
        score: "100",
        attackPower: 4,
        counterAttackPower: 12,
        imgUrl: "assets/images/jamie.jpg",
        index: 3
    };
    var whiteObj = {
        name: "White Walker",
        score: "180",
        attackPower: 5,
        counterAttackPower: 15,
        imgUrl: "assets/images/white-walker.jpg",
        index: 4
    };
    var characterObjArray = [placeHolerObj, jonObj, khaleesiObj, jamieObj, whiteObj];
    var playerObj = {};
    var opponentObjIndexArray = [];
    var opponentObj = {};


    /**
     * Loads the values inside the image container
     */
    function loadContainer(selector, playerObj) {
        $(selector).find(nameClass).text(playerObj.name);
        $(selector).find(scoreClass).text(playerObj.score);
        $(selector).find("img").attr("src", playerObj.imgUrl);
        $(selector).find("img").attr("alt", playerObj.name);
        $(selector).attr("index", playerObj.index);
    }

    /**
     * resets the content to start a new game
     */
    function reset() {
        playerObj = {};
        opponentObj = {};
        loadContainer(playerContainerClass, placeHolerObj);
        loadContainer(opponentContainerClass, placeHolerObj);
        loadContainer(jonContainerID, jonObj);
        loadContainer(khaleesiContainerID, khaleesiObj);
        loadContainer(jamieContainerID, jamieObj);
        loadContainer(whiteContainerID, whiteObj);
        $(".reset-container").hide();
        $("#msgId").text("Select your player!");
        $("#attackMsg1").text("");
        $("#attackMsg2").text("");
    }


    /** when reset button is pressed 
     * clear placeholder containers
     * hide reset button
     * */
    $(resetButtonID).on("click", function() {
        reset();
        $(characterContainerClass).show();
    });


    /** select player */
    $(characterContainerClass).on("click", function() {
        var selectionIndex = $(this).attr("index");
        var isPlayerObjEmpty = $.isEmptyObject(playerObj);
        var isOpponentObjEmpty = $.isEmptyObject(opponentObj);
        console.log($.isEmptyObject(playerObj));

        if (isPlayerObjEmpty) {
            playerObj = jQuery.extend({}, characterObjArray[selectionIndex]);
            loadContainer(playerContainerClass, playerObj);
            for (var i = 1; i < characterObjArray.length; i++) {
                if (i !== parseInt(selectionIndex)) {
                    opponentObjIndexArray.push(characterObjArray[i].index);
                }
            }
            $(msgID).text("Select your opponent");
            $(this).hide();
            console.log(opponentObjIndexArray);
        } else if ((!isPlayerObjEmpty && isOpponentObjEmpty)) {
            opponentObj = jQuery.extend({}, characterObjArray[selectionIndex]);
            loadContainer(opponentContainerClass, opponentObj);
            $(this).hide();
            $(msgID).text("FIGHT...");
        } else if ((!isPlayerObjEmpty && !isOpponentObjEmpty)) {
            $(msgID).text("You first have to defeat your selected opponent completely");
        }

    });


    /**
     * Attack the opponent when this button is clicked
     */
    $(attackButtonID).on("click", function() {
        console.log("clicked");
        if (!$.isEmptyObject(opponentObj)) {
            opponentObj.score -= playerObj.attackPower;
            playerObj.score -= opponentObj.counterAttackPower;
            $("#attackMsg1").text(playerObj.name + " attacked " + opponentObj.name + " for " + playerObj.attackPower + " damage");
            $("#attackMsg2").text(opponentObj.name + " attacked back for " + opponentObj.counterAttackPower + " damage");

            if (playerObj.score < 0) {
                $(playerContainerClass).find(scoreClass).text("DEAD!!!");
            } else {
                $(playerContainerClass).find(scoreClass).text(playerObj.score);
            }

            if (opponentObj.score < 0) {
                $(opponentContainerClass).find(scoreClass).text("DEAD!!!");
            } else {
                $(opponentContainerClass).find(scoreClass).text(opponentObj.score);
            }
            playerObj.attackPower += characterObjArray[playerObj.index].attackPower;

        }


        if (opponentObj.score <= 0 || playerObj.score <= 0) {

            if (opponentObj.score <= 0) {
                $(msgID).text("You defeated " + opponentObj.name + " !!!, select your next opponent");
                if (opponentObjIndexArray.length <= 1) {
                    $(msgID).text("Congrats!!! you won :)");
                    $(".reset-container").show();
                    $("#attackMsg1").text("");
                    $("#attackMsg2").text("");
                    opponentObjIndexArray.splice((opponentObjIndexArray.indexOf(opponentObj.index)), 1);
                } else {
                    //console.log(opponentObj);
                    opponentObjIndexArray.splice((opponentObjIndexArray.indexOf(opponentObj.index)), 1);
                }
                opponentObj = {};
                $(opponentContainerClass).css("background : red;");
                //loadContainer(opponentContainerClass, placeHolerObj);
            } else {
                $(msgID).text(opponentObj.name + " killed you, Game over!!! Press replay button to play another game...");
                $(".reset-container").show();
                $("#attackMsg1").text("");
                $("#attackMsg2").text("");
                playerObj = {};
                opponentObj = {};
            }


        }

        console.log(opponentObjIndexArray);


    });

    reset();
});