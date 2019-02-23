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
    var rightCount = 0;
    var wrongCount = 0;
    const maxTime = 15;
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
    Q1 = new Questions("Quarterback for the New England Patriots, who won the 2018 Associated Press NFL Most Valuable Player Award?", "a. Matt Ryan", "b. Tom Brady", "c. Aaron Rodgers", "d. Cam Newton", "b", "The AP award is considered the de facto official NFL MVP award.");
    Q2 = new Questions("Which NHL team won the 2018 Stanley Cup finals against the Vegas Golden Knights?", "a. Washington Capitals", "b. Nashville Predators", "c. Toronto Maple Leafs", "d. Pittsburgh Penguins", "a", "Washington beat Vegas four games to one.");
    Q3 = new Questions("Who was the National Basketball Association's Most Valuable Player for the 2017-2018 season?", "a. Kristaps Porzingis", "b. Victor Oladipo", "c. James Harden", "d. Karl-Anthony Towns", "c", "Harden was also the season's top scorer.");
    Q4 = new Questions("Held in June at Shinnecock Hills Golf Club in New York, who won the 2018 U.S. Open Golf Championship? ", "a. Tommy Fleetwood", "b. Patrick Reed", "c. Brooks Koepka", "d. Dustin Johnson", "c", "With the win, Koepka became the seventh player to win consecutive U.S. Opens.");
    Q5 = new Questions("What NFL team won Super Bowl 52 by a score of 41 to 33 on February 4, 2018? ", "a. Green Bay Packers", "b. Philadelphia Eagles", "c. New England Patriots", "d. Dallas Cowboys", "b", "The Philadelphia Eagles beat the New England Patriots. It was their first Super Bowl win.");
    Q6 = new Questions("Held on April 26-28, who was the first pick in the first round at the 2018 NFL draft?", "a. Saquon Barkley", "b. Denzel Ward", "c. Sam Darnold", "d. Baker Mayfield", "d", "Mayfield was among five quarterbacks selected in the first round.");

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
            checkAnswer();
        }
    };

    //update the player's score
    function updateScore() {
        if (clockRunning) {
            score += time;
            $("#scoreArea").text(score);
        };
    };

    // select the next question in the list
    function selectQuestion() {
        console.log(qCount+1, allQuestions.length)

        if (qCount > allQuestions.length - 1) {
            // go to final score screen
            finalScreen();
        } else {
            // show the next question
            currentQuestion = allQuestions[qCount];
            $("#questionArea").text(currentQuestion.questionText);
            $("#answera").text(currentQuestion.answera);
            $("#answerb").text(currentQuestion.answerb);
            $("#answerc").text(currentQuestion.answerc);
            $("#answerd").text(currentQuestion.answerd);
            startTimer();
        }
        // Update qCounter to call next question when run again
        qCount++

    };

    // check if answer is correct
    function checkAnswer(letter) {

        // tell user if they were right or wrong
        if (letter === currentQuestion.correctAnswer) {
            updateScore();
            rightCount++;
            $("#questionArea").html("<h3>CORRECT!</h3>").append(currentQuestion.explained);
        } else {
            wrongCount++;
            $("#questionArea").html("<h3>INCORRECT!</h3>").append(currentQuestion.explained);
        }
        // run showAnswer function
        showAnswer(letter);
    };

    // show the correct and incorrect answers
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

        // timeout 5 seconds, move on to next question
        setTimeout(resetAnswer, 4000);

    };

    // clear shading from answersArea, select new question and restart the clock
    function resetAnswer() {
        //.removeClass() with no parameters to remove all, .addClass("...") to add back to default
        $("#answerTable").addClass("table-hover");
        $("#answera").removeClass();
        $("#answerb").removeClass();
        $("#answerc").removeClass();
        $("#answerd").removeClass();
        $(".answers").addClass("answers");

        // select new question, reset table properties 
        selectQuestion();
    }

    function finalScreen() {
        // create 3 divs and insert them into the correct places in the HTML
        $("#finalHead").html("SPORTS TRIVIA RESULTS");
        
        var finalRight = $("<div>");
        finalRight.html(rightCount + "<p>CORRECT</p>");
        $("#finalCorrect").html(finalRight);

        var finalWrong = $("<div>");
        finalWrong.html(wrongCount + "<p>INCORRECT</p>");
        $("#finalIncorrect").html(finalWrong);

        var finalScore = $("<div>");
        finalScore.html(score + "<p>FINAL SCORE</p>");
        $("#finalScore").html(finalScore);

        $("#triviaGameArea").hide();
        $("#finalArea").fadeIn();


        stopTimer();        

    }

    // ==================================
    // LISTENERS
    // ==================================

    $(".btnStart").on("click", function () {

        // reset global variables
        clockRunning = false;
        time = 0;
        score = 0;
        rightCount = 0;
        wrongCount = 0;
        qCount = 0;
        $("#scoreArea").text(score);
        $("#triviaGameArea").fadeIn();
        $("#finalArea").toggle();
        // $(".btnStart").toggle();
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
