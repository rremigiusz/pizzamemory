var tr;
var trud = 0;
var serca = 3;
var choosenaddon = 0;
var count10 = 11;
var count1 = 2;
var count3 = 4;
var score = 0;
var addonsdivs = ["_wp1", "_wp2", "_wp3", "_wp4"];
var addonsdivs2 = ["_wp1", "_wp2", "_wp3", "_wp4", "_wp5"];
var resetaddonsdivs = ["_mp1", "_mp2", "_mp3", "_mp4"];
var resetaddonsdivs2 = ["_mp1", "_mp2", "_mp3", "_mp4", "_mp5"];
var correctaddons = ["a", "b", "c", "d"];
var correctaddons2 = ["a", "b", "c", "d", "e"];
var timeout1;
var timeout3;
var timeout10;

$("document").ready(function () {
    $("#sgbutton").click(function () {
        serca = 3;
        $(".sg").css("display", "none");
        $("#sgbutton").css("display", "none");
        $(".trudnosc").css("display", "none");
        startgame();
        document.getElementById("hd1").style.backgroundImage = "url('serce.png')"
        document.getElementById("hd2").style.backgroundImage = "url('serce.png')"
        document.getElementById("hd3").style.backgroundImage = "url('serce.png')"
        if (tr != "tniemozliwy") {
            $("#_wp5").css("visibility", "hidden");
            $("#_mp5").css("visibility", "hidden");
        }
    });

    $(".trudnosc").click(function () {
        tr = this.id;
        $("#tniemozliwy").css("background-color", "black");
        $("#ttrudny").css("background-color", "red");
        $("#tsredni").css("background-color", "orange");
        $("#tlatwy").css("background-color", "green");
        $(this).css("background-color", "royalblue");
        $("#sgbutton").css("visibility", "visible");
        $("#_trdiv").css("visibility", "visible");

        switch (tr) {
            case "tniemozliwy":
                document.getElementById("_trdiv").innerHTML = "<span style='color: white; background-color: black;'>Niemożliwy</span> - 5 składników, 1 sekunda na zapamiętanie";
                break;
            case "ttrudny":
                document.getElementById("_trdiv").innerHTML = "<span style='color: white; background-color: red;'>Trudny</span> - 4 składniki, 1 sekunda na zapamiętanie";
                break;
            case "tsredni":
                document.getElementById("_trdiv").innerHTML = "<span style='color: black; background-color: yellow;'>Średni</span> - 4 składniki, 2 sekundy na zapamiętanie";
                break;
            case "tlatwy":
                document.getElementById("_trdiv").innerHTML = "<span style='color: white; background-color: green;'>Łatwy</span> - 4 składniki, 3 sekundy na zapamiętanie";
                break;
        };
        count1 = parseInt(this.value) + 1;
        trud = count1;
    });

    $(".adddiv").click(function () {
        choosenaddon = this.value;
        $(".adddiv").css("background-color", "rgb(78, 39, 0)");
        $(this).css("background-color", "rgb(204, 115, 27)");
    });

    $("#skiptime").click(function () {
        clearTimeout(timeout1);
        clearTimeout(timeout3);
        clearTimeout(timeout10);
        checkifcorrect();
    });

    $("#endbutton").click(function () {
        clearTimeout(timeout1);
        clearTimeout(timeout3);
        clearTimeout(timeout10);
        $(".alldiv").css("display", "none");
        $("#heartsdiv").css("display", "none");
        $("#skiptime").css("display", "none");
        $("#endbutton").css("display", "none");
        $("#endgamediv").css("display", "block");
        $("#restartgamebutton").css("display", "block");
        $("#endgamediv").text("Koniec gry!");
        document.getElementById("wyn").innerHTML = "score 0"
        document.getElementById("endgamediv").innerHTML += "<br>Twój wynik: " + score;
        score = 0;
    });

    $("#restartgamebutton").click(function () {
        resetgame();
        $("#sgbutton").css("display", "inline-block");
        $(".sg").css("display", "inline-block");
        $("#sgbutton").css("visibility", "hidden");
        $(".trudnosc").css("display", "inline-block");
        $("#endgamediv").css("display", "none");
        $("#restartgamebutton").css("display", "none");
        $("#tniemozliwy").css("background-color", "black");
        $("#ttrudny").css("background-color", "red");
        $("#tsredni").css("background-color", "orange");
        $("#tlatwy").css("background-color", "green");
        $("#_trdiv").css("visibility", "hidden");
    });

    $("._mpbutton").click(function () {
        switch (choosenaddon) {
            case '1':
                $(this).css("background-image", "url('pomidor.png')");
                $(this).val("1");
                break;

            case '2':
                $(this).css("background-image", "url('pieczarka.png')");
                $(this).val("2");
                break;

            case '3':
                $(this).css("background-image", "url('ananas.png')");
                $(this).val("3");
                break;

            case '4':
                $(this).css("background-image", "url('oliwka.png')");
                $(this).val("4");
                break;

            case '5':
                $(this).css("background-image", "url('papryka.png')");
                $(this).val("5");
                break;

            case '6':
                $(this).css("background-image", "url('salami.png')");
                $(this).val("6");
                break;
        }
    });
});

function startgame() {
    document.getElementById("addonsdiv").style.display = "grid";
    $("#whatpizzadiv").css("display", "grid");
    $("#heartsdiv").css("display", "grid");
    $("#wyn").css("display", "block");
    $("#timerdiv").css("display", "block");
    $("#endbutton").css("display", "block");
    $("#skiptime").css("display", "block");
    $("#skiptime").attr("disabled", "disabled");
    randomaddons()
    timer1();
}

function resetgame() {
    correctaddons2 = ["a", "b", "c", "d", "e"];
    correctaddons = ["a", "b", "c", "d"];
    count10 = 11;
    count1 = trud;
    count3 = 4;
    if (tr == "tniemozliwy") {
        for (var i = 0; i < 5; i++) {
            document.getElementById(resetaddonsdivs2[i]).style.backgroundImage = "none"
        }
    } else {
        for (var i = 0; i < 4; i++) {
            document.getElementById(resetaddonsdivs[i]).style.backgroundImage = "none"
        }
    }
}

function randomaddons() {
    if (tr == "tniemozliwy") {
        $("#_wp5").css("visibility", "visible");
        $("#_mp5").css("visibility", "visible");
        for (var i = 0; i < 5; i++) {
            var randomAdd = Math.floor(Math.random() * (7 - 1) + 1);
            correctaddons2[i] = randomAdd;

            if (randomAdd == 1) {
                document.getElementById(addonsdivs2[i]).style.backgroundImage = "url('pomidor.png')"
            }

            if (randomAdd == 2) {
                document.getElementById(addonsdivs2[i]).style.backgroundImage = "url('pieczarka.png')"
            }

            if (randomAdd == 3) {
                document.getElementById(addonsdivs2[i]).style.backgroundImage = "url('ananas.png')"
            }

            if (randomAdd == 4) {
                document.getElementById(addonsdivs2[i]).style.backgroundImage = "url('oliwka.png')"
            }

            if (randomAdd == 5) {
                document.getElementById(addonsdivs2[i]).style.backgroundImage = "url('papryka.png')"
            }

            if (randomAdd == 6) {
                document.getElementById(addonsdivs2[i]).style.backgroundImage = "url('salami.png')"
            }
        }
    } else {
        for (var i = 0; i < 4; i++) {
            var randomAdd = Math.floor(Math.random() * (7 - 1) + 1);
            correctaddons[i] = randomAdd;

            if (randomAdd == 1) {
                document.getElementById(addonsdivs[i]).style.backgroundImage = "url('pomidor.png')"
            }

            if (randomAdd == 2) {
                document.getElementById(addonsdivs[i]).style.backgroundImage = "url('pieczarka.png')"
            }

            if (randomAdd == 3) {
                document.getElementById(addonsdivs[i]).style.backgroundImage = "url('ananas.png')"
            }

            if (randomAdd == 4) {
                document.getElementById(addonsdivs[i]).style.backgroundImage = "url('oliwka.png')"
            }

            if (randomAdd == 5) {
                document.getElementById(addonsdivs[i]).style.backgroundImage = "url('papryka.png')"
            }

            if (randomAdd == 6) {
                document.getElementById(addonsdivs[i]).style.backgroundImage = "url('salami.png')"
            }
        }
    }
}

function checkifcorrect() {
    var _1 = document.getElementById("_mp1").value;
    var _2 = document.getElementById("_mp2").value;
    var _3 = document.getElementById("_mp3").value;
    var _4 = document.getElementById("_mp4").value;
    var _5 = document.getElementById("_mp5").value;

    if (tr == "tniemozliwy") {
        if (_1 == correctaddons2[0] && _2 == correctaddons2[1] && _3 == correctaddons2[2] && _4 == correctaddons2[3] && _5 == correctaddons2[4]) {
            score++;
            document.getElementById("wyn").innerHTML = "score " + score;
            resetgame();
            startgame();
        } else {
            serca = serca - 1;
            if (serca == 2) {
                document.getElementById("hd3").style.backgroundImage = "url('puste.png')"
            }

            if (serca == 1) {
                document.getElementById("hd2").style.backgroundImage = "url('puste.png')"
            }

            if (serca == 0) {
                clearTimeout(timeout1);
                clearTimeout(timeout3);
                clearTimeout(timeout10);
                $(".alldiv").css("display", "none");
                $("#skiptime").css("display", "none");
                $("#endbutton").css("display", "none");
                $("#endgamediv").css("display", "block");
                $("#restartgamebutton").css("display", "block");
                $("#heartsdiv").css("display", "none");
                $("#endgamediv").text("Koniec gry!");
                document.getElementById("wyn").innerHTML = "score 0"
                document.getElementById("endgamediv").innerHTML += "<br>Twój wynik: " + score;
                score = 0;
            } else {
                resetgame();
                startgame();
            }
        }
    } else {
        if (_1 == correctaddons[0] && _2 == correctaddons[1] && _3 == correctaddons[2] && _4 == correctaddons[3]) {
            score++;
            document.getElementById("wyn").innerHTML = "score " + score;
            resetgame();
            startgame();
        } else {
            serca = serca - 1;
            console.log(serca);
            if (serca == 2) {
                document.getElementById("hd3").style.backgroundImage = "url('puste.png')"
                console.log("hd2 pusteserce");
            }

            if (serca == 1) {
                document.getElementById("hd2").style.backgroundImage = "url('puste.png')"
                console.log("hd2 pusteserce");
            }

            if (serca == 0) {
                clearTimeout(timeout1);
                clearTimeout(timeout3);
                clearTimeout(timeout10);
                $(".alldiv").css("display", "none");
                $("#skiptime").css("display", "none");
                $("#endbutton").css("display", "none");
                $("#endgamediv").css("display", "block");
                $("#restartgamebutton").css("display", "block");
                $("#heartsdiv").css("display", "none");
                $("#endgamediv").text("Koniec gry!");
                document.getElementById("wyn").innerHTML = "score 0"
                document.getElementById("endgamediv").innerHTML += "<br>Twój wynik: " + score;
                score = 0;
            } else {
                resetgame();
                startgame();
            }
        }
    }
    console.log(_1,_2,_3,_4,_5);
    console.log(correctaddons2);
}

function timer10() {
    if (count10 > 0) {
        count10--;
        document.getElementById("timerdiv").innerHTML = count10;
        timeout10 = setTimeout(timer10, 1000);
    } else if (count10 == 0) {
        checkifcorrect();
    }
}

function timer3() {
    $("#cdtopizzadiv").css("display", "grid");
    if (count3 > 1) {
        count3--;
        document.getElementById("cdtopizzadiv").innerHTML = count3;
        timeout3 = setTimeout(timer3, 1000);
    } else if (count3 == 1) {
        $("#cdtopizzadiv").css("display", "none");
        $("#makepizzadiv").css("display", "grid");
        $("#skiptime").removeAttr("disabled");
        timer10();
    }
}

function timer1() {
    $("#whatpizzadiv").css("display", "grid");
    if (count1 > 1) {
        count1--;
        document.getElementById("timerdiv").innerHTML = count1;
        timeout1 = setTimeout(timer1, 1000);
        document.getElementById("timerdiv").innerHTML = "";
    } else if (count1 == 1) {
        $("#whatpizzadiv").css("display", "none");
        $("#makepizzadiv").css("display", "none");
        timer3();
    }
}