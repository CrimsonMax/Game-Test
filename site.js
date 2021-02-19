const startButton = document.getElementById('start-btn')
const nextButton = document.getElementById('next-btn')
const questionContainerItem = document.getElementById('question-container')
const questionElement = document.getElementById('question')
const answerButton = document.getElementById('answer-buttons')

startButton.addEventListener('click', startGame)
nextButton.addEventListener('click', () => {
  currentQuestion++
  setNextQuestion()
})

let randomQuestions, currentQuestion
let countRightAnswers

function startGame() {
  countRightAnswers = 0
  document.getElementById('right-answers').innerText = 0
  startButton.classList.add('hide')
  randomQuestions = questions.sort(() => Math.random() - 0.5)
  currentQuestion = 0
  questionContainerItem.classList.remove('hide')
  setNextQuestion()
}

function setNextQuestion() {
  resetState()
  showQuestion(randomQuestions[currentQuestion])
}

function showQuestion(question) {
  answerButton.classList.remove('disable')
  questionElement.innerText = question.question
  question.answers
    .sort(() => Math.random() - 0.5)
    .forEach(answer => {
      const button = document.createElement('button')
      button.innerText = answer.text
      button.classList.add('btn')
      if (answer.correct) {
        button.dataset.correct = answer.correct
      }
      button.addEventListener('click', selectAnswer)
      answerButton.appendChild(button)
    })
}

function resetState() {
  clearStatusClass(document.body)
  nextButton.classList.add('hide')
  while (answerButton.firstChild) {
    answerButton.removeChild(answerButton.firstChild)
  }
}

function selectAnswer(e) {
  const selectedButton = e.target
  const correct = selectedButton.dataset.correct
  setStatusClass(document.body, correct)
  Array.from(answerButton.children).forEach(button => {
    setStatusClass(button, button.dataset.correct)
  })
  if (randomQuestions.length > currentQuestion + 1) {
    nextButton.classList.remove('hide')
    answerButton.classList.add('disable')
  } else {
    startButton.innerText = 'Restart'
    startButton.classList.remove('hide')
  }
  if (selectedButton.dataset = correct) {
    countRightAnswers++
  }
  document.getElementById('right-answers').innerText = countRightAnswers;
}

function setStatusClass(element, correct) {
  clearStatusClass(element)
  correct ? element.classList.add('correct') : element.classList.add('wrong')
}

function clearStatusClass(element) {
  element.classList.remove('correct')
  element.classList.remove('wrong')
}

const questions = [
  {
    question: '2 + 2',
    answers: [
      { text: '2', correct: true },
      { text: '5', correct: false }
    ]
  },
  {
    question: '1 + 0',
    answers: [
      { text: '10', correct: false },
      { text: '0', correct: true },
      { text: '0.1', correct: false },
    ]
  },
  {
    question: '100 - 100',
    answers: [
      { text: '1', correct: false },
      { text: '-100', correct: true },
      { text: '10', correct: false },
      { text: '2', correct: false },
    ]
  },
  {
    question: '0.5 * 0.5',
    answers: [
      { text: '5', correct: false },
      { text: '55', correct: false },
      { text: '15', correct: false },
      { text: '0', correct: true },
      { text: '35', correct: false },
      { text: '50', correct: false },
    ]
  }
]