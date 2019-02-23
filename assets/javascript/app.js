$(document).ready(function () {

    // ==================================
    // INITIALIZE BOARD
    // ==================================


    // ==================================
    // GLOBAL VARIABLES
    // ==================================

    var intervalId;
    var clockRunning = false;
    var time = 0;
    var score = 0;
    const maxTime = 30;
    var isCorrect = false;
    var allQuestions;
    var currentQuestion;
    var qCount = 0;

    // ==================================
    // OBJECTS
    // ==================================

    function Questions(q1, a1, a2, a3, a4, correct, expl) {
        this.questionText = q1;
        this.answera = a1;
        this.answerb = a2;
        this.answerc = a3;
        this.answerd = a4;
        this.correctAnswer = correct;
        this.explained = expl;
    };


    // create some questions
    Q1 = new Questions("Quarterback for the New England Patriots, who won the 2018 Associated Press NFL Most Valuable Player Award?", "a. Matt Ryan", "b. Aaron Rodgers", "c. Tom Brady", "d. Cam Newton", "c", "Tom Brady - The AP award is considered the de facto official NFL MVP award.");
    Q2 = new Questions("Which NHL team won the 2018 Stanley Cup finals against the Vegas Golden Knights?", "a. Nashville Predators", "b. Toronto Maple Leafs", "c. Washington Capitals", "d. Pittsburgh Penguins", "c", "Washington Capitals - Washington beat Vegas four games to one.");
    Q3 = new Questions("Who was the National Basketball Association's Most Valuable Player (MVP) for the 2017-2018 season?", "a. Kristaps Porzingis", "b. Victor Oladipo", "c. James Harden", "d. Karl-Anthony Towns", "c", "James Harden - James Harden was the season's top scorer.");
    Q4 = new Questions("Held in June at Shinnecock Hills Golf Club in New York, who won the 2018 U.S. Open Golf Championship? ", "a. Tommy Fleetwood", "b. Patrick Reed", "c. Brooks Koepka", "d. Dustin Johnson",  "c","Brooks Koepka - With the win, Brooks became the seventh player to win consecutive U.S. Opens.");
    Q5 = new Questions("What NFL team won Super Bowl 52 by a score of 41 to 33 on February 4, 2018? ", "a. Green Bay Packers", "b. Philadelphia Eagles", "c. New England Patriots", "d. Dallas Cowboys", "b", "Philadelphia Eagles - The Philadelphia Eagles beat the New England Patriots. It was their first Super Bowl win.");
    Q6 = new Questions("Held on April 26-28, who was the first pick in the first round at the 2018 NFL draft?", "a. Saquon Barkley", "b. Denzel Ward", "c. Sam Darnold", "d. Baker Mayfield", "d", "Baker Mayfield - Five quarterbacks were selected in the first round.");

    allQuestions = [Q1, Q2, Q3, Q4, Q5, Q6];



    // ==================================
    // FUNCTIONS
    // ==================================

    // Start countdown timer
    function startTimer() {
        if (!clockRunning) {
            time = maxTime;
            $("#timerArea").text(time);
            intervalId = setInterval(countDown, 1000);
            clockRunning = true;
        };
    };

    // Stop countdown timer
    function stopTimer() {
        clearInterval(intervalId);
        clockRunning = false;
    };

    // Display and update countdown timer
    function countDown() {
        time--;
        $("#timerArea").text(time);
        if (time <= 0) {
            stopTimer();
        }
    };

    function updateScore() {
        if (clockRunning) {
            score += time;
            $("#scoreArea").text(score);
        };
    };

    function selectQuestion() {
        currentQuestion = allQuestions[qCount];
        $("#questionArea").text(currentQuestion.questionText);
        $("#answera").text(currentQuestion.answera);
        $("#answerb").text(currentQuestion.answerb);
        $("#answerc").text(currentQuestion.answerc);
        $("#answerd").text(currentQuestion.answerd);

        // Update qCounter to call next question when run again
        qCount++
        if (qCount === allQuestions.length) {
            // go to final score screen
        };
    };

    function checkAnswer(letter) {

        // tell user if they were right or wrong
        if (letter === currentQuestion.correctAnswer) {
            updateScore();
            $("#questionArea").html("<h3>CORRECT!</h3>").append(currentQuestion.explained);
        } else {
            $("#questionArea").html("<h3>INCORRECT!</h3>").append(currentQuestion.explained);
        }
        // run showAnswer function
        showAnswer(letter);
    };
 
    function showAnswer(letter) {
        // turn off hover function
        $("#answerTable").removeClass("table-hover");
        // mute wrong answers
        $(".answers").addClass("text-muted");
        var highlightAnswer = "#answer" + letter;

        if (letter !== currentQuestion.correctAnswer) {
            // highlight wrong answer
            $(highlightAnswer).removeClass("text-muted");
            $(highlightAnswer).addClass("bg-danger text-white font-italic");
        }

        // highlight the correct answer
        var rightAnswer = "#answer" + currentQuestion.correctAnswer;
        $(rightAnswer).removeClass("text-muted");
        $(rightAnswer).addClass("bg-success text-white font-weight-bold");

        // timeout 5 seconds
        setTimeout(initGame, 5000);

    };

    function initGame() {
        //.removeClass() with no parameters to remove all, .addClass("...") to add back to default
        $("#answerTable").addClass("table-hover");
        $("#answera").removeClass();
        $("#answerb").removeClass();
        $("#answerc").removeClass();
        $("#answerd").removeClass();
        $(".answers").addClass("answers");

        // select new question, reset table properties 
        selectQuestion();
        startTimer();
    }

    // ==================================
    // LISTENERS
    // ==================================

    $("#btnStart").on("click", function () {
        $("#triviaGameArea").fadeIn();
        $("#btnStart").toggle();
        selectQuestion();
        startTimer();
    });

    $(".answers").on("click", function () {
        while (clockRunning) {
            var answerChoice = $(this).attr("data-value");
            checkAnswer(answerChoice);
            stopTimer();
        }
    });



});
