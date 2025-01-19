const trafficInput = document.getElementById("traffic-input");
const amountInput = document.getElementById("amount-input");
const wordCountInput = document.getElementById("word-count-input");
const generateBtn = document.getElementById("generate-btn");
const outputP = document.getElementById("output-p");

const WEIGHTS = [0.5, 0.3, 0.2];
const TOTAL_WEIGHT = 1.0;

function CalculateValue(traffic, amount, wordCount) {
    let traffic_neg = -traffic;
    return (traffic_neg * WEIGHTS[0] + amount * WEIGHTS[1] + wordCount * WEIGHTS[2]) / TOTAL_WEIGHT;
}

generateBtn.addEventListener("click", () => {
    let val = CalculateValue(
        parseInt(trafficInput.value),
        parseInt(amountInput.value),
        parseInt(wordCountInput.value)
    );
    outputP.innerText = `Estimated scholarship value: ${val}`;
});

async function TestOpenPageRank() {
    const URL = "https://openpagerank.com/api/v1.0/getPageRank";

    const response = await fetch(URL);
}


window.onload = async () => {
    await TestOpenPageRank();
};