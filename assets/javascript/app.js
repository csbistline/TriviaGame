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
        this.answer1 = a1;
        this.answer2 = a2;
        this.answer3 = a3;
        this.answer4 = a4;
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
        score += time;
        $("#scoreArea").text(score);
    };

    function selectQuestion() {
        currentQuestion = allQuestions[qCount];
        $("#questionArea").text(currentQuestion.questionText);
        $("#answer1").text(currentQuestion.answer1);
        $("#answer2").text(currentQuestion.answer2);
        $("#answer3").text(currentQuestion.answer3);
        $("#answer4").text(currentQuestion.answer4);

        // Update qCounter to call next question when run again
        qCount++
        if (qCount === allQuestions.length) {
            // go to final score screen
        };
    };

    function checkAnswer(letter) {
        if (letter === currentQuestion.correctAnswer) {
            updateScore();
        };
        // run showAnswer function
        // showAnswer(letter);
    };

    function showAnswer(letter) {
        // highlight correct answer (letter)
        // tell user if they were right or wrong
        // mute wrong answers
        // turn off hover function
        // turn off click events
        // timeout 5 seconds
        // select new question, start over
    };

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
        var answerChoice = $(this).attr("data-value");
        checkAnswer(answerChoice);
    });



});
