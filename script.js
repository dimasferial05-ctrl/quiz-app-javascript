// 1. Data Pertanyaan (Format array of objects)
const quizData = [
  {
    question: "Tag HTML mana yang digunakan untuk membuat tautan (link)?",
    options: ["<a>", "<link>", "<href>", "<ul>"],
    correctIndex: 0,
  },
  {
    question:
      "Properti CSS apa yang digunakan untuk membuat teks menjadi tebal?",
    options: ["font-style", "text-weight", "font-weight", "text-style"],
    correctIndex: 2,
  },
  {
    question:
      "Dalam Flexbox, properti apa yang mengatur elemen secara horizontal di tengah?",
    options: ["align-items", "justify-content", "text-align", "flex-center"],
    correctIndex: 1,
  },
  {
    question: "Manakah yang BUKAN merupakan tipe data primitif di JavaScript?",
    options: ["String", "Boolean", "Object", "Number"],
    correctIndex: 2,
  },
];

// 2. Deklarasi State (Variabel yang berubah-ubah)
let currentQuestionIndex = 0;
let score = 0;
let timeLeft = 60;
let timerInterval;

// 3. Mengambil Elemen DOM
const startScreen = document.getElementById("start-screen");
const quizScreen = document.getElementById("quiz-screen");
const resultScreen = document.getElementById("result-screen");

const questionText = document.getElementById("question-text");
const optionsContainer = document.getElementById("options-container");
const questionTracker = document.getElementById("question-tracker");
const timerElement = document.getElementById("timer");
const nextBtn = document.getElementById("next-btn");

// 4. Fungsi-fungsi Logika
document.getElementById("start-btn").addEventListener("click", startQuiz);
nextBtn.addEventListener("click", () => {
  currentQuestionIndex++;
  if (currentQuestionIndex < quizData.length) {
    loadQuestion();
  } else {
    showResults();
  }
});
document.getElementById("restart-btn").addEventListener("click", () => {
  location.reload(); // Refresh halaman untuk mengulang
});

function startQuiz() {
  startScreen.classList.remove("active");
  quizScreen.classList.add("active");
  currentQuestionIndex = 0;
  score = 0;
  loadQuestion();
}

function loadQuestion() {
  // Reset state UI untuk pertanyaan baru
  nextBtn.classList.add("hide");
  optionsContainer.innerHTML = "";
  timeLeft = 60;
  timerElement.textContent = `Waktu: ${timeLeft}s`;

  const currentQuiz = quizData[currentQuestionIndex];
  questionTracker.textContent = `Pertanyaan ${currentQuestionIndex + 1} / ${quizData.length}`;
  questionText.textContent = currentQuiz.question;

  // Render pilihan jawaban
  currentQuiz.options.forEach((option, index) => {
    const button = document.createElement("button");
    button.textContent = option;
    button.classList.add("option-btn");
    button.addEventListener("click", () => selectAnswer(index, button));
    optionsContainer.appendChild(button);
  });

  startTimer();
}

function startTimer() {
  clearInterval(timerInterval);
  timerInterval = setInterval(() => {
    timeLeft--;
    timerElement.textContent = `Waktu: ${timeLeft}s`;

    if (timeLeft <= 0) {
      clearInterval(timerInterval);
      handleTimeOut();
    }
  }, 1000);
}

function selectAnswer(selectedIndex, selectedButton) {
  clearInterval(timerInterval); // Hentikan waktu saat dijawab

  const currentQuiz = quizData[currentQuestionIndex];
  const buttons = optionsContainer.querySelectorAll(".option-btn");

  // Nonaktifkan semua tombol
  buttons.forEach((btn) => (btn.disabled = true));

  // Cek Benar/Salah
  if (selectedIndex === currentQuiz.correctIndex) {
    selectedButton.classList.add("correct");
    score++;
  } else {
    selectedButton.classList.add("wrong");
    // Tunjukkan mana yang benar
    buttons[currentQuiz.correctIndex].classList.add("correct");
  }

  nextBtn.classList.remove("hide");
}

function handleTimeOut() {
  const currentQuiz = quizData[currentQuestionIndex];
  const buttons = optionsContainer.querySelectorAll(".option-btn");

  // Kurangi skor jika tidak dijawab (Sesuai instruksi challenge)
  score--;

  buttons.forEach((btn, index) => {
    btn.disabled = true;
    if (index === currentQuiz.correctIndex) {
      btn.classList.add("correct"); // Tetap tunjukkan jawaban benar
    }
  });

  nextBtn.classList.remove("hide");
}

function showResults() {
  quizScreen.classList.remove("active");
  resultScreen.classList.add("active");
  document.getElementById("final-score").textContent = score;
}
