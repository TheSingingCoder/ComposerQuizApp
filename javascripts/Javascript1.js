//Object to Hold the App
var ComposerQuizApp = {};

//Array to Hold All the Questions
ComposerQuizApp.items = [];

var holder = 0;


//Write the Questions Here

ComposerQuizApp.items[0] = {
    question: "Who wrote <i>The Tales of Hoffman</i>?",
    answers: ["Jacques Offenbach", "Wolfgang Amadeus Mozart", "Johann Sebastian Bach", "Jules Massenet"],
    type: "multiple"
};

ComposerQuizApp.items[1] = {
    question: "Which composer was born in Salzburg, Austria?",
    answers: ["Wolfgang Amadeus Mozart", "Johann Sebastian Bach", "Jules Massenet", "Richard Wagner"],
    type: "multiple"
};

ComposerQuizApp.items[2] = {
    question: "Who wrote the piano concerto 'Songs Without Words'?",
    answers: ["Felix Mendelssohn", "Fredric Handel", "Richard Wagner", "Giuseppe Verdi"],
    type: "multiple"
    };

ComposerQuizApp.items[3] = {
    question: "Which composer/opera is responsible for this image? <br/> <br/> <img src='http://b.vimeocdn.com/ts/320/454/320454515_640.jpg' with='400' height='200px' /> <br/>",
    answers: ["Richard Wagner –  The Ring Cycle", "Gaetano Donizetti – <i>Maria Stuarda </i>", "Vincenzo Bellini - <i>I puritani</i>", "Jules Massenet – <i>Werther </i>"],
    type: "multiple"
};


//Question Object Constructor
ComposerQuizApp.item = function(question, answerCorrect, answerWrong1, answerWrong2, answerWrong3){
    this.question = question;
    this.answers = [answerCorrect, answerWrong1, answerWrong2, answerWrong3];
};


// Draw Table
ComposerQuizApp.questionIndex = 0;
ComposerQuizApp.drawTable = function (i) {
    //Clear Alert
    document.getElementById("alertDiv").innerHTML = "";

    //Progress Bar
    document.getElementById('progressBar').innerHTML = "<div class='progress-bar progress-bar-success' role='progressbar' aria-valuenow='60' aria-valuemin='0' aria-valuemax='100' style='width:" + (ComposerQuizApp.questionIndex) / ComposerQuizApp.items.length * 100 + "% ;>" + "<span class='sr-only'>" + "</span> </div>";

    //Create Table
    if (ComposerQuizApp.questionIndex < ComposerQuizApp.items.length) {

            var answerBank = [];
            //Create Array of answer bank questions
            answerBank[0] = "<tr>" + "<td class= 'correct' id='correctDiv'>" + "<input type='radio' id='correct1' name='answer' value = 'correct' />" + " &nbsp;&nbsp;" + ComposerQuizApp.items[i].answers[0] + "</td>" + "</tr>";
            answerBank[1] = "<tr>" + "<td id='wrong1Div'>" + "<input type='radio' id='wrong1' name='answer' value = 'wrong'/>" + " &nbsp;&nbsp;" + ComposerQuizApp.items[i].answers[1] + "</td>" + "<tr>";
            answerBank[2] = "<tr>" + "<td id='wrong2Div'>" + "<input type='radio' id='wrong2' name='answer' value='wrong'/>" + " &nbsp;&nbsp;" + ComposerQuizApp.items[i].answers[2] + "</td>";
            answerBank[3] = "<tr>" + "<td id='wrong3Div'>" + "<input type='radio' name='answer'  id='wrong3' value='wrong'/>" + " &nbsp;&nbsp;" + ComposerQuizApp.items[i].answers[3] + "</td>" + "</tr>";
            ComposerQuizApp.shuffleOrder(answerBank);

        //Draw Table
        holder = "<table>";
        // Question Row
        holder += "<tr>";
        holder += "<td>" + ComposerQuizApp.items[i].question + "</td>";
        holder += "</tr>";
        //Answer Rows
        holder += ComposerQuizApp.randomOrder[0];
        holder += ComposerQuizApp.randomOrder[1];
        holder += ComposerQuizApp.randomOrder[2];
        holder += ComposerQuizApp.randomOrder[3];
        holder += "</table>";
    }
        //End - Show Score, Ask to Create a new question
    else {
        holder = "<table>";
        holder += "<tr>" + "<td class='final'>" + "You Final Score: " + ComposerQuizApp.score() + "%" + "<br/> <br/> </td>" + "</tr>";
        holder += "<tr>" + "<td class='final'>" + "Creat your own questions.  Click start to restart the quiz with your questions added to the bank." + "<br/> <br/> </td>" + "</tr>";
        holder += "<tr>" + "<td>" + "<button class='btn btn-primary btn-large' onclick='ComposerQuizApp.modal.show()'> Create Your Own Question </button>" + "</td>" + "</tr>";
        holder += "</table>";
    }
        document.getElementById("currentQuestionDiv").innerHTML = holder;
};

// Draw Table - Showing Answer
ComposerQuizApp.drawTableAnswers = function (i) {

// Track which radio user checked
    var correct = 0;
    var wrong1 = 0;
    var wrong2 = 0;
    var wrong3 = 0;
    if (document.getElementById('wrong1').checked) {
        wrong1 = 1;
        }
    if (document.getElementById('wrong2').checked) {
        wrong2 = 1;
        }
    if (document.getElementById('wrong3').checked) {
        wrong3 = 1;
    }
    if (document.getElementById('correct1').checked) {
        correct = 1;
    }
console.log("correct:" + correct + ", wrong1: "+ wrong1 +", wrong2: " +wrong2 +", wrong3: " +wrong3);
 
//Draw Table
if (ComposerQuizApp.questionIndex < ComposerQuizApp.items.length) {

    holder = "<table id='myTable'>";
    // Question Row
    holder += "<tr>";
    holder += "<td>" + ComposerQuizApp.items[i].question +"</td>";
    holder += "</tr>";
    //Answer Rows
    holder += ComposerQuizApp.randomOrder[0];
    holder += ComposerQuizApp.randomOrder[1];
    holder += ComposerQuizApp.randomOrder[2];
    holder += ComposerQuizApp.randomOrder[3];
    holder += "</table>";
    ComposerQuizApp.questionIndex++
}
else {
    holder = "<div well well-lg>" + "You Final Score: " + ComposerQuizApp.score() + "%" + "</div>";
}
document.getElementById("currentQuestionDiv").innerHTML = holder;

    //Change Background Colors
document.getElementById('correctDiv').style.backgroundColor = "#6CDA6C";
if (correct === 1) {
    document.getElementById('correct1').checked = "checked";
}
if (wrong1 === 1) {
    document.getElementById('wrong1Div').style.backgroundColor = "#FF8566";
    document.getElementById('wrong1').checked = "checked";
 }
 if (wrong2 === 1) {
     document.getElementById('wrong2Div').style.backgroundColor = "#FF8566";
     document.getElementById('wrong2').checked = "checked";
 }
 if (wrong3 === 1) {
     document.getElementById('wrong3Div').style.backgroundColor = "#FF8566";
     document.getElementById('wrong3').checked = "checked";
 }
};


//Running Total of Number of Correct Questions
ComposerQuizApp.runningTotal = 0;
ComposerQuizApp.evaluateAnswer = function (i) {
        var valueSelected = "";
        //Get Radio Elements by Name document.getElementByName("answer")
        var radioAnswers = document.getElementsByName('answer');
        //Create to Find which radio button is checked
        for (var i in radioAnswers) {
            if (radioAnswers[i].checked) {
                valueSelected = radioAnswers[i].value
            }
        }
        console.log("New Value Selected " + valueSelected);
        //Compare radio button array id to correct answer
        if (valueSelected === "correct") {
            ComposerQuizApp.runningTotal += 1;
            document.getElementById("alertDiv").innerHTML = "<br/> <div class='alert alert-info alert-dismissible' role='alert'>" + "<button type='button' class='close' data-dismiss='alert'><span aria-hidden='true'>&times;</span><span class='sr-only'>Close</span></button>" + "<strong> Correct! </strong> Current Score: " + ComposerQuizApp.runningTotal + "/" + ComposerQuizApp.items.length + " " + "</div>";
        }
        else {
            document.getElementById("alertDiv").innerHTML = "<br/> <div class='alert alert-warning alert-dismissible' role='alert'>" + "<button type='button' class='close' data-dismiss='alert'><span aria-hidden='true'>&times;</span><span class='sr-only'>Close</span></button>" + "<strong> Incorrect! </strong> Current Score: " + ComposerQuizApp.runningTotal + "/" + ComposerQuizApp.items.length + " " + "</div>";
        }
        console.log("Running Total: " + ComposerQuizApp.runningTotal);
        ComposerQuizApp.score();
        console.log("Running Score: " + ComposerQuizApp.score());
        console.log("Question Number: " + ComposerQuizApp.questionIndex);
};

//Grading Function
ComposerQuizApp.score = function () {
    if (ComposerQuizApp.runningTotal !== 0) {
        return ComposerQuizApp.runningTotal / ComposerQuizApp.items.length * 100;
    }
    else {
        return 0;
    }
};

//Function to Randomize the Questions: Fisher Yates Shuffle
ComposerQuizApp.randomOrder = [];
ComposerQuizApp.shuffleOrder = function shuffle(array) {
    var m = array.length, t, i;

    // While there remain elements to shuffle…
    while (m) {

        // Pick a remaining element…
        i = Math.floor(Math.random() * m--);

        // And swap it with the current element.
        t = array[m];
        array[m] = array[i];
        array[i] = t;
    }
    ComposerQuizApp.randomOrder = array;
    return array;
};

ComposerQuizApp.modal = {
    //Show modal
    show: function() {
    $('#modal').modal();
    },

    //Hide modal and generate new question
    hide: function() {
        var newQuestion = new ComposerQuizApp.item(document.getElementById('newQuestion').value, document.getElementById('correctAnswer').value, document.getElementById('wrongAnswer1').value, document.getElementById('wrongAnswer2').value, document.getElementById('wrongAnswer3').value);
        console.log(newQuestion);
        ComposerQuizApp.items.push(newQuestion);
        $('#modal').modal("hide");
        //Clear Input Boxes
        document.getElementById('newQuestion').value = '';
        document.getElementById('correctAnswer').value = '';
        document.getElementById('wrongAnswer1').value = '';
        document.getElementById('wrongAnswer2').value = '';
        document.getElementById('wrongAnswer3').value= '';
    }
};

//Function to Start the Quiz Over
ComposerQuizApp.startOver = function () {
    ComposerQuizApp.questionIndex = 0;
    ComposerQuizApp.drawTable(0);
    ComposerQuizApp.runningTotal = 0;
};
