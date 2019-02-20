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

    function Questions(q1, a1, a2, a3, a4, correct) {
        this.questionText = q1;
        this.answera = a1;
        this.answerb = a2;
        this.answerc = a3;
        this.answerd = a4;
        this.correctAnswer = correct;
    };


    // create some questions
    Q1 = new Questions("Quarterback for the New England Patriots, who won the 2018 Associated Press NFL Most Valuable Player Award?", "a. Matt Ryan", "b. Aaron Rodgers", "c. Tom Brady", "d. Cam Newton", "c");
    Q2 = new Questions("question 2 text", "answer 1", "answer 2", "answer 3", "answer 4", 2);
    Q3 = new Questions("question 3 text", "answer 1", "answer 2", "answer 3", "answer 4", 3);
    Q4 = new Questions("question 4 text", "answer 1", "answer 2", "answer 3", "answer 4", 4);
    Q5 = new Questions("question 5 text", "answer 1", "answer 2", "answer 3", "answer 4", 1);
    Q6 = new Questions("question 6 text", "answer 1", "answer 2", "answer 3", "answer 4", 2);

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
            $("#questionArea").append("<h3>CORRECT!</h3>")
        } else {
            $("#questionArea").append("<h3>WRONG ANSWER!</h3>")
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
