const questions = [
    {
        question: "Which of the following is NOT a programming language?",
        answers: [
            {text:"Lotus", correct: true},
            {text:"C++", correct: false},
            {text:"Fortran", correct: false},
            {text:"Java", correct: false}
        ]
    },
    {
        question: "Which of the following programming languages is used to write queries in database applications?",
        answers: [
            {text:"SQL", correct: true},
            {text:"Fortran", correct: false},
            {text:"Java", correct: false},
            {text:"Python", correct: false}
        ]
    },
    {
        question: "Which programming paradigm emphasizes on writing code that is easy to read and maintain?",
        answers: [
            {text:"Procedural programming", correct: false},
            {text:"Functional programming", correct: false},
            {text:"Object-oriented programming", correct: true},
            {text:"Structured programming", correct: false}
        ]
    },
    {
        question: "What is the term used for a block of code that is executed repeatedly until a certain condition is met?",
        answers: [
            {text:"Function", correct: false},
            {text:"Loop", correct: true},
            {text:"Condition", correct: false},
            {text:"Variable", correct: false}
        ]
    },
    {
        question: "Which data structure is used for storing a collection of elements in a non-linear fashion?",
        answers: [
            {text:"Array", correct: false},
            {text:"Stack", correct: false},
            {text:"Queue", correct: false},
            {text:"Tree", correct: true}
        ]
    }
];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz(){
    currentQuestionIndex = 0;
    score = 0; 
    nextButton.innerHTML ="Next";
    showQuestion();
}

function showQuestion(){
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo+ ". "+currentQuestion.question;

    currentQuestion.answers.forEach(answer =>{
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        if (answer.correct) {
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);
    });
}

function resetState(){
    nextButton.style.display = "none";
    while(answerButtons.firstChild){
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

function selectAnswer(e){
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if(isCorrect){
        selectedBtn.classList.add("correct");
        score++;
    }else{
        selectedBtn.classList.add("incorrect");
    }
    Array.from(answerButtons.children).forEach(button =>{
        if(button.dataset.correct === "true"){
            button.classList.add("correct");
        }
        button.disabled = "true";
    });
    nextButton.style.display = "block";
}

function showScore(){
    resetState();
    questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`;
    nextButton.innerHTML = "Play Again";
    nextButton.style.display = "block";
}

function handleNextButton(){
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length){
        showQuestion();
    }else{
        showScore();
    }
}

nextButton.addEventListener("click",()=>{
    if(currentQuestionIndex < questions.length){
        handleNextButton();
    }
    else{
        startQuiz();
    }
});



startQuiz();