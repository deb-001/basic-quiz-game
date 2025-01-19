const questions = [
  {
    question: "What does HTML stand for?",
    image: "images/html.jpg",
    options: [
      "Hyper Trainer Marking Language",
      "Hyper Text Markup Language",
      "Hyperlinks and Text Markup Language",
      "High Tech Modern Language",
    ],
    correct: 1,
    explanation:
      "HTML stands for HyperText Markup Language, the standard markup language for creating web pages.",
  },
  {
    question:
      "Which programming language is known as the 'language of the web'?",
    image: "images/jsf.jpg",
    options: ["Python", "Java", "JavaScript", "PHP"],
    correct: 2,
    explanation:
      "JavaScript is known as the language of the web because it's the primary language used for client-side web development.",
  },
  {
    question: "What does CSS stand for?",
    image: "images/css.png",
    options: [
      "Computer Style Sheets",
      "Creative Style System",
      "Cascading Style Sheets",
      "Colorful Style Sheets",
    ],
    correct: 2,
    explanation:
      "CSS stands for Cascading Style Sheets, which is used to style and layout web pages.",
  },
  {
    question: "Which of these is a version control system?",
    image: "images/vc.jpg",
    options: ["Docker", "Git", "Jenkins", "Kubernetes"],
    correct: 1,
    explanation:
      "Git is a distributed version control system for tracking changes in source code during software development.",
  },
  {
    question: "What is the primary purpose of a REST API?",
    image: "images/REST.webp",
    options: [
      "Database Management",
      "Server Configuration",
      "Data Exchange",
      "File Storage",
    ],
    correct: 2,
    explanation:
      "REST APIs are designed to enable data exchange between different systems using HTTP protocols.",
  },
];

let currentQuestionIndex = 0;
let score = 0;
let timer;
let timeLeft = 30;

const questionContainer = document.getElementById("question-container");
const nextBtn = document.getElementById("next-btn");
const scoreContainer = document.getElementById("score-container");
const scoreDisplay = document.getElementById("score");
const progressBar = document.getElementById("progress");
const timeDisplay = document.getElementById("time");

function startTimer() {
  timeLeft = 30;
  clearInterval(timer);
  timer = setInterval(() => {
    timeLeft--;
    timeDisplay.textContent = timeLeft;
    if (timeLeft <= 0) {
      clearInterval(timer);
      nextQuestion();
    }
  }, 1000);
}

function updateProgress() {
  const progress = ((currentQuestionIndex + 1) / questions.length) * 100;
  progressBar.style.width = `${progress}%`;
}

function loadQuestion() {
  const currentQuestion = questions[currentQuestionIndex];
  questionContainer.innerHTML = `
        <img src="${
          currentQuestion.image
        }" alt="Question Image" class="question-image">
        <h2>${currentQuestion.question}</h2>
        ${currentQuestion.options
          .map(
            (option, index) =>
              `<div class="option" onclick="selectOption(${index})">${option}</div>`
          )
          .join("")}
        <div class="feedback hide"></div>
    `;
  updateProgress();
  startTimer();
  nextBtn.classList.add("hide");

  // Change button text to "Submit" if it's the last question
  if (currentQuestionIndex === questions.length - 1) {
    nextBtn.textContent = "Submit";
  } else {
    nextBtn.textContent = "Next Question";
  }
}

function selectOption(selectedIndex) {
  clearInterval(timer);
  const options = document.querySelectorAll(".option");
  const currentQuestion = questions[currentQuestionIndex];
  const feedback = questionContainer.querySelector(".feedback");

  options.forEach((option) => option.classList.add("disabled"));

  if (selectedIndex === currentQuestion.correct) {
    options[selectedIndex].classList.add("correct");
    score++;
    feedback.textContent = "Correct! " + currentQuestion.explanation;
  } else {
    options[selectedIndex].classList.add("incorrect");
    options[currentQuestion.correct].classList.add("correct");
    feedback.textContent = "Incorrect. " + currentQuestion.explanation;
  }

  feedback.classList.remove("hide");
  nextBtn.classList.remove("hide");
}

function nextQuestion() {
  currentQuestionIndex++;
  if (currentQuestionIndex < questions.length) {
    loadQuestion();
  } else {
    displayScore();
  }
}

function displayScore() {
  questionContainer.innerHTML = "";
  nextBtn.classList.add("hide");
  scoreContainer.classList.remove("hide");
  scoreDisplay.textContent = `${score} out of ${questions.length}`;

  const feedback = document.getElementById("feedback");
  const percentage = (score / questions.length) * 100;

  if (percentage === 100) {
    feedback.textContent = "Perfect score! You're a tech genius! 🏆";
  } else if (percentage >= 80) {
    feedback.textContent = "Great job! You really know your stuff! 🌟";
  } else if (percentage >= 60) {
    feedback.textContent = "Good effort! Keep learning! 📚";
  } else {
    feedback.textContent = "Keep practicing! You'll get better! 💪";
  }
}

function restartQuiz() {
  currentQuestionIndex = 0;
  score = 0;
  scoreContainer.classList.add("hide");
  loadQuestion();
}

nextBtn.addEventListener("click", nextQuestion);
loadQuestion();
