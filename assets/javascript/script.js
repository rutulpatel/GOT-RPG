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
        score: "",
        imgUrl: "assets/images/blank.jpg",
        index: 0
    }
    var jonObj = {
        name: "Jon Snow",
        score: "140",
        imgUrl: "assets/images/jon-snow.jpg",
        index: 1
    };
    var khaleesiObj = {
        name: "Khaleesi",
        score: "150",
        imgUrl: "assets/images/khaleesi.jpg",
        index: 2
    };
    var jamieObj = {
        name: "Jamie",
        score: "120",
        imgUrl: "assets/images/jamie.jpg",
        index: 3
    };
    var whiteObj = {
        name: "White Walker",
        score: "160",
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
            //playerObj = characterObjArray[selectionIndex];
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
            //opponentObj = characterObjArray[selectionIndex];
            opponentObj = jQuery.extend({}, characterObjArray[selectionIndex]);
            loadContainer(opponentContainerClass, opponentObj);
            $(this).hide();
            $(msgID).text("FIGHT... (by clicking attack button)");
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
            console.log(opponentObj);
            opponentObj.score = 0;
            console.log(jamieObj);
            $(opponentContainerClass).find(scoreClass).text(opponentObj.score);
        }

        if (opponentObj.score === 0) {
            $(msgID).text("You destroyed your opponent!!!, select your next opponent");

            if (opponentObjIndexArray.length <= 1) {
                $(msgID).text("Congrats!!! you won :)");
                $(".reset-container").show();
                opponentObjIndexArray.splice((opponentObjIndexArray.indexOf(opponentObj.index)), 1);
            } else {
                console.log(opponentObj);
                opponentObjIndexArray.splice((opponentObjIndexArray.indexOf(opponentObj.index)), 1);
            }

            opponentObj = {};
            loadContainer(opponentContainerClass, placeHolerObj);

        }

        console.log(opponentObjIndexArray);


    });

    reset();
});