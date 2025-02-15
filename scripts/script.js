// Retrieve saved vocabulary or initialize an empty array

const vocabList = JSON.parse(localStorage.getItem("vocabList")) || [];

let currentIndex = vocabList.length - 1;

// DOM Elements

const wordEl = document.getElementById("word");

const meaningEl = document.getElementById("meaning");

const exampleEl = document.getElementById("example");

const addBtn = document.getElementById("add-btn");

const nextBtn = document.getElementById("next-btn");

const prevBtn = document.getElementById("prev-btn");

const editBtn = document.getElementById("edit-btn");

const viewAllBtn = document.getElementById("view-all-btn");

const modal = document.getElementById("edit-modal");

const editWordEl = document.getElementById("edit-word");

const editMeaningEl = document.getElementById("edit-meaning");

const editExampleEl = document.getElementById("edit-example");

const saveEditBtn = document.getElementById("save-edit-btn");

const cancelEditBtn = document.getElementById("cancel-edit-btn");

// Function to display a word

function displayWord() {

  if (vocabList.length === 0) {

    wordEl.textContent = "No words added yet.";

    meaningEl.textContent = "";

    exampleEl.textContent = "";

    return;

  }

  const currentWord = vocabList[currentIndex];

  wordEl.textContent = currentWord.word;

  meaningEl.textContent = `Meaning: ${currentWord.meaning}`;

  exampleEl.textContent = `Example: ${currentWord.example}`;

}

// Add a new word

addBtn.addEventListener("click", () => {

  const newWord = document.getElementById("new-word").value.trim();

  const newMeaning = document.getElementById("new-meaning").value.trim();

  const newExample = document.getElementById("new-example").value.trim();

  if (newWord && newMeaning && newExample) {

    vocabList.push({ word: newWord, meaning: newMeaning, example: newExample });

    localStorage.setItem("vocabList", JSON.stringify(vocabList));

    document.getElementById("new-word").value = "";

    document.getElementById("new-meaning").value = "";

    document.getElementById("new-example").value = "";

    alert("Word added successfully!");

    displayWord();

  } else {

    alert("Please fill out all fields.");

  }

});

// Navigation buttons

nextBtn.addEventListener("click", () => {

  currentIndex = (currentIndex + 1) % vocabList.length;

  displayWord();

});

prevBtn.addEventListener("click", () => {

  currentIndex = (currentIndex - 1 + vocabList.length) % vocabList.length;

  displayWord();

});

// Open edit modal

editBtn.addEventListener("click", () => {

  if (vocabList.length === 0) {

    alert("No words to edit.");

    return;

  }

  const currentWord = vocabList[currentIndex];

  editWordEl.value = currentWord.word;

  editMeaningEl.value = currentWord.meaning;

  editExampleEl.value = currentWord.example;

  modal.style.display = "flex";

});

// Save edits

saveEditBtn.addEventListener("click", () => {

  vocabList[currentIndex] = {

    word: editWordEl.value,

    meaning: editMeaningEl.value,

    example: editExampleEl.value,

  };

  localStorage.setItem("vocabList", JSON.stringify(vocabList));

  modal.style.display = "none";

  displayWord();

});

// Cancel edits

cancelEditBtn.addEventListener("click", () => {

  modal.style.display = "none";

});

// View all vocabulary
viewAllBtn.addEventListener("click", () => {

  const vocabWindow = window.open("", "_blank");

  vocabWindow.document.write(`

    <!DOCTYPE html>

    <html lang="en">

    <head>

      <meta charset="UTF-8">

      <meta name="viewport" content="width=device-width, initial-scale=1.0">

      <title>All Vocabulary</title>

      <link rel="stylesheet" href="styles.css">

    </head>

    <body>

      <div class="all-vocab-container">

        <h1>All Vocabulary</h1>

        <div class="vocab-set">

          ${vocabList.map(({ word, meaning, example }) => `

            <div class="vocab-card">

              <h3>${word}</h3>

              <p><strong>Meaning:</strong> ${meaning}</p>

              <p><strong>Example:</strong> ${example}</p>

            </div>

          `).join("")}

        </div>

      </div>

    </body>

    </html>

  `);

});

// Initial display

displayWord();