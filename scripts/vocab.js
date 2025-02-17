// View all vocabulary
function displayAllVocabulary() {

    const vocabList = JSON.parse(localStorage.getItem("vocabList")) || [];

    const vocabSet = document.getElementById("set");


    vocabSet.innerHTML = vocabList.map(({ word, meaning, example, index }) => `
<div>
<div class = "card-black"></div>
<div class="vocab-card">
<h3>${word}</h3>

<p><strong>Meaning:</strong> ${meaning}</p>

<p><strong>Example:</strong> ${example}</p>
</div>

</div>
`).join("");


}


// Ensure words load when `vocablist.html` opens
document.addEventListener("DOMContentLoaded", () => {
        displayAllVocabulary();
});
