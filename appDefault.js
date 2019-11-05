const STORE = {
    questions: [{
// QUESTION 1
    question: 'Which artist IS NOT a member of The Beatles?',
    answers: ['John Lennon','George Harrison','Paul McCartney','James Taylor'],
    correctAnswer: 'James Taylor'
},
{
// QUESTION 2
    question: 'Which member of the band grew up in Liverpool, near Strawberry Fields?',
    answers: ['Paul McCartney', 'John Lennon', 'Ringo Starr', 'George Harrison'],
    correctAnswer: 'John Lennon'
},
{
// QUESTION 3
    question: `What is Ringo Starr's real name?`,
    answers: ['Ricky Bentley', 'Richard Starr', 'Ringo Starr', 'Richard Starkey'],
    correctAnswer: 'Richard Starkey'

},
{
// QUESTION 4
    question: 'How many #1 hits did the Beatles have?',
    answers: ['14', '23', '17', '27'],
    correctAnswer: '17'
},
{
// QUESTION 5
    question: `Roughly, how many times has the Beetles hit single 'Yesterday' offically covered by other artists (it is still regarded as the most covered song of all-time)?`,
    answers: ['< 1500 times', '> 2200 times', '3500 times','> 3500 times'],
    correctAnswer: '> 2200 times'
},
{
// QUESTION 6
    question: 'Out of the top 10 covered songs of all time, how many tracks are The Beatles responsible for(including the solo careers of the 4 members)?',
    answers: ['2', '3', '4', '5'],
    correctAnswer: '5'
},
{
// QUESTION 7
    question: 'What album is regarded as The Beatles best selling album of their tenure?',
    answers: [`Sgt. Pepper's Lonely Hearts Club Band`, 'Abbey Road', 'The White Album', 'Yellow Submarine'],
    correctAnswer: 'The White Album'
    },
{
// QUESTION 8
    question: 'How many weeks cumulatively have The Beatles spent on the Billboard charts? They are the only band in history to twice knock themselves off the top spot on the charts.',
    answers: ['1,278', '892', '1649', '1140'],
    correctAnswer: '1,278'
    },
{
// QUESTION 9
    question: 'Approximately, how many albums have The Beatles sold?',
    answers: ['100,000,000', '400,000,000', '1,000,000,000', 'over 2,000,000,000'],
    correctAnswer: 'over 2,000,000,000'
    },
{
// QUESTION 10
    question: `What was the name of John Lennon's second wife? For some time, until recent interviews, she was considered to be the reason The Beatles broke up in 1970.`,
    answers: ['Cynthia Lennon', 'Olivia Lennon', 'Yoko Ono', 'Pattie Lennon'],
    correctAnswer: 'Yoko Ono'
 },
],
currentQuestion: 0,
currentScore: 0
}

// function to Start the Quiz 

function beginQuiz (){
    $('#start').on('click', function (event){
        generateQuestion();
    });
}


// function to display the current Question Number and Score
function displayCurrentQuestionNumberAndScore (){
    const currentQuestion= $(` <ul>
    <li id='question-number'>Question: ${STORE.currentQuestion + 1} /${STORE.questions.length}</li>
    <li id='score'> Score: ${STORE.currentScore} /${STORE.questions.length}</li>
    </ul>`);
    $('.scorebox').html(currentQuestion);
}


// function to generate the html for the question form & display the question.
function generateQuestion (){
    console.log(STORE);
    let questionInd = STORE.questions[STORE.currentQuestion];
    displayCurrentQuestionNumberAndScore();
    let generateFormHTML = $(`<form id='js-question-box' class='question_box'><div class ='cs-questions'>
    <fieldset>
        <legend class='questions'>${questionInd.question}</legend><section class ='js-results'></section></div><button type='submit' class ='submitButton'>Submit</button></fieldset></form>`);
    $('.quizBox').html(generateFormHTML);
    generateAnswers();
    $('.image').hide();
}


// function to generate the possible answers associated with the specific question in my form
function generateAnswers (){
let questionInd = STORE.questions[STORE.currentQuestion];
for(let i=0;i<questionInd.answers.length;i++){
    $('.js-results').append(`<p><input class = 'choices button'type='radio' tabindex = '${i+1}' id ='answers${i+1}' value ='${questionInd.answers[i]}' name='answers' required>
    <label class = 'choices label'for='answers${i+1}'>${questionInd.answers[i]}</label></p>`
    )};
}


// function that allows the user to submit an answer, and then checks our STORE for the correct answer
// this function will also call the appropriate correctAnswer or wrongAnswer functions
function submitAndCheck (){
$('body').on('submit', '#js-question-box', function (event){
    event.preventDefault();
    $('#js-question-box').hide();
    $('.js-response').show();
    let selectedAnswer = $('input:checked').val();
    let right = STORE.questions[STORE.currentQuestion].correctAnswer;
    if(selectedAnswer !== right){
        wrongAnswer();
    }else{
        STORE.currentScore++;
        $('#score').text(`Score: ${STORE.currentScore}/${STORE.questions.length}`);
        correctAnswer();
    }
    STORE.currentQuestion++;
   });
}


// function to generate/display the correct answer html 
function correctAnswer (){
    $('.js-response').html(`<h2>Yay! You Selected the correct Answer!</h2>
    <img class='correct' src='Images/beatlesCorrect.jpg' alt='Happy Beatles'/>
    <button type ='button' class ='next'>Next</button>`);
    $('.quizBox').hide();
}


// function to generate/display the wrong answer html
function wrongAnswer (){
    $('.js-response').html(`<h2>Oops! You Selected the Wrong Answer...</h2>
        <img class='wrong' src='Images/wrongBeatles.jpg' alt='Crying Beatles'/>
        <p>The correct answer was:</p>
        <p>${STORE.questions[STORE.currentQuestion].correctAnswer}</p>
        <button type ='button' class ='next'>Next</button>`)
    $('.quizBox').hide();
}


// function to generate the next question
function nextQuestion (){
    $('.js-response').on('click', '.next', function(event){
        $('.js-response').hide();
        $('.quizBox').show();
        if(STORE.currentQuestion === STORE.questions.length){
            goodJobBadJob();
        }else{
            generateQuestion();
        }
    });
}


// function that writes the html & the appropriate feedback based on the final score
function goodJobBadJob (){
    let good = `<h2>Congratulations, you are now the honorary 5th member of The Beatles</h2>
            <img class='end' src='Images/EndofGame.jpg' alt='The Beatles, The End'/>
            <p>Your Score was : ${STORE.currentScore} /${STORE.questions.length}</p>
            <button type ='button' class ='restart'>Try Again</button>`
    let bad = `<h2>Sorry, you are not the honorary 5th member of The Beatles</h2>
    <img class='end' src='Images/abbeyRd.jpg' alt='The Beatles, The End'/>
    <p>Your Score was : ${STORE.currentScore} /${STORE.questions.length}</p>
    <button type ='button' class ='restart'>Try Again</button>`
    if(STORE.currentScore >= 7){
        $('.final-results').html(good);
    }else{
        $('.final-results').html(bad);
    }
}

// function to restart the quiz 
function restartQuiz (){
    $('body').on('click','.restart',()=>{
        STORE.currentQuestion = 0;
        STORE.currentScore = 0;
        goodJobBadJob();
        generateQuestion();
        $('.final-results').hide();
    });
}


//function to call/run the above functions
function quizRunner (){
    beginQuiz();
    submitAndCheck();
    nextQuestion();
    restartQuiz();
}


$(quizRunner);