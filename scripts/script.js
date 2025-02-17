// Retrieve saved vocabulary or initialize an empty array

const vocabList = JSON.parse(localStorage.getItem("vocabList")) || [];

let currentIndex = vocabList.length - 1;

// DOM Elements
const form = document.getElementById("form");

// const input = document.querySelectorAll("input");

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

    editBtn.style.display= "none";

    prevBtn.disabled = true;
    nextBtn.disabled = true;

    return;

  }
  prevBtn.disabled = false;
    nextBtn.disabled = false;
  editBtn.style.display= "";
  const currentWord = vocabList[currentIndex];

  wordEl.innerHTML = ` <span class="label">Word:</span> 
  <span class="content">${currentWord.word}</span> `;

  meaningEl.innerHTML = `<span class="label">Meaning:</span> 
  <span class="content">${currentWord.meaning}</span>`;

  exampleEl.innerHTML = `<span class="label">Example:</span> 
  <span class="content">${currentWord.example}</span>`;

}

// Add a new word

function addNewWord(){
  const newWord = document.getElementById("new-word").value.trim();

  const newMeaning = document.getElementById("new-meaning").value.trim();

  const newExample = document.getElementById("new-example").value.trim();

  if (newWord && newMeaning && newExample) {

    vocabList.push({ word: newWord, meaning: newMeaning, example: newExample });

    localStorage.setItem("vocabList", JSON.stringify(vocabList));

    document.getElementById("new-word").value = "";

    document.getElementById("new-meaning").value = "";

    document.getElementById("new-example").value = "";
    currentIndex++;

    displayWord();

  } else {

    alert("Please fill out all fields.");

  }
}

addBtn.addEventListener("click", () => {

 addNewWord();

});

// Add event listener when form gets focus
  form.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
      event.preventDefault(); // Prevents accidental form submission
      addNewWord();
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

// Select the delete button
const deleteCurrentBtn = document.getElementById("delete");

// Function to delete the current word
function deleteCurrentWord() {
    let vocabList = JSON.parse(localStorage.getItem("vocabList")) || [];

    if (vocabList.length === 0) {
        alert("No words to delete.");
        return;
    }

    // Ask for confirmation before deleting
    const confirmDelete = confirm(`Are you sure you want to delete "${vocabList[currentIndex].word}"?`);
    if (!confirmDelete) return;

    // Remove the word at currentIndex
    vocabList.splice(currentIndex, 1);

    // Update localStorage
    localStorage.setItem("vocabList", JSON.stringify(vocabList));

    // Adjust currentIndex to avoid out-of-range errors
    if (currentIndex >= vocabList.length) {
        currentIndex = vocabList.length - 1; // Move to last available word
    }

    // Refresh display
    displayWord();
}

// Add event listener to the delete button
if (deleteCurrentBtn) {
    deleteCurrentBtn.addEventListener("click", deleteCurrentWord);
}



// Initial display

displayWord();