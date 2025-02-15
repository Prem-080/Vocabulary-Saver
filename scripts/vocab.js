// View all vocabulary
const vocabList = JSON.parse(localStorage.getItem("vocabList")) || [];

const vocabSet = document.getElementById("set");

vocabSet.innerHTML = vocabList.map(({ word, meaning, example }) => `

<div class = "card-black"></div>
<div class="vocab-card">
  <h3>${word}</h3>

  <p><strong>Meaning:</strong> ${meaning}</p>

  <p><strong>Example:</strong> ${example}</p>

</div>

`).join("");