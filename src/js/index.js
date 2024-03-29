// The following code starts Mock Service Worker tool which allows you to simulate a backend (an API) for building your apps that talk to a remote service. You can visit https://mswjs.io for details on this utility and check src/api/routes.js for a sample API route that you can edit/create as needed to simulate a real world API. This simulated backend will not be part of the completed application (built edition) and you must use a real world backend built using Node.js + Express or Java + Spring Boot to provide such a service.

// If you do not require a simulated backend, you can remove the code shown below.
if (process.env.NODE_ENV === 'development') {
  const apiStatus = document.querySelector('#api-status');
  import('../api/browser')
    .then(({ worker }) => worker.start())
    .then(() => fetch('/'))
    .then((res) => res.json())
    .then((res) => (apiStatus.innerText = res.message));
}
const topicSelect = document.querySelector("#topic-select");
const startQuizBtn = document.querySelector("#start-quiz-btn");
const questionContainer = document.querySelector(".question-container");
const question = document.querySelector(".question");
const options = document.querySelectorAll(".option");
const nextQuestionBtn = document.querySelector("#next-question-btn");
const scoreContainer = document.querySelector(".score-container");
const score = document.querySelector("#score");
const resultContainer = document.querySelector("  .score-container");
const result = document.querySelector("#score");

let currentQuestion = 0;
let questions = [];
let totalScore = 0;

const historyQuestions = [
  {
    question: "What is the capital of France?",
    options: ["Paris", "London",   "Rome"],
    correctOption: "Paris"
  },
  {
    question: "Who was the first President of the United States?",
    options: ["George Washington", "Thomas Jefferson", "Benjamin Franklin"],
    correctOption: "George Washington"
  },
  {
    question: "What was the main cause of World War II?",
    options: ["Economic crisis", "Political tensions", "Military aggression"],
    correctOption: "Military aggression"
  }
];

const geographyQuestions = [
  {
    question: "What is the largest ocean in the world?",
    options: ["Atlantic Ocean", "Pacific Ocean", "Indian Ocean"],
    correctOption: "Pacific Ocean"
  },
  {
    question: "What is the highest mountain in the world?",
    options: ["Mount Everest", "Mount Kilimanjaro", "Mount Denali"],
    correctOption: "Mount Everest"
  },
  {
    question: "What is the longest river in the world?",
    options: ["Nile River", "Amazon River", "Yangtze River"],
    correctOption: "Nile River"
  }
];

const scienceQuestions = [
  {
    question: "What is the smallest planet in our solar system?",
    options: ["Earth", "Mars", "Mercury"],
    correctOption: "Mercury"
  },
  {
    question: "What is the largest mammal in the world?",
    options: ["Elephant", "Whale", "Giraffe"],
    correctOption: "Whale"
  },
  {
    question: "What is the main source of energy for the Earth?",
    options: ["Wind", "Coal", "Sun"],
    correctOption: "Sun"
  }
];

function displayQuestion() {
 question.innerHTML = questions[currentQuestion].question;
 for (let i = 0; i < options.length; i++) {
   options[i].innerHTML = `<input type="radio" name="option${currentQuestion}" value="${questions[currentQuestion].options[i]}">${questions[currentQuestion].options[i]}`;
 }
}


startQuizBtn.addEventListener("click", function() {
  if (!topicSelect.value) {
    alert("Please select a topic");
    return;
  }
  switch (topicSelect.value) {
    case "history":
      questions = historyQuestions;
      break;
    case "geography":
      questions = geographyQuestions;
      break;
    case "science":
      questions = scienceQuestions;
      break;
  }
  questionContainer.style.display = "block";
  displayQuestion(currentQuestion);
});


nextQuestionBtn.addEventListener("click", function() {
  let selectedOption = "";

  for (let i = 0; i < options.length; i++) {
    if (options[i].children[0].checked) {
      selectedOption = options[i].children[0].value;
      break;
    }
  }
  if (!selectedOption) {
    alert("Please select an option");
    return;
  }
  if (selectedOption === questions[currentQuestion].correctOption) {
    totalScore++;
  }
  currentQuestion++;
  if (currentQuestion === questions.length) {
    questionContainer.style.display = "none";
    resultContainer.style.display = "block";
    result.innerHTML = "Total Score: " + totalScore + "/" + questions.length;
    return;
  }
  displayQuestion(currentQuestion);
 });

