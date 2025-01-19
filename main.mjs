window.onload = async () => {
    const siteUrlInput = document.getElementById("site-input");
    const amountInput = document.getElementById("amount-input");
    const wordCountInput = document.getElementById("word-count-input");
    const generateBtn = document.getElementById("generate-btn");
    let enableOutputDisplay = false;
    const outputSection = document.getElementById("output-section");
    const scholarshipValueH2 = document.getElementById("scholarship-value-span");


    const WEIGHTS = [0.6, 0.2, 0.2];

    // GetPageRank(url: string) -> number
    async function GetPageRank(url) {
        const myHeaders = new Headers();
        myHeaders.append("API-OPR", "ck8kgo4408k0wkko0s84csoogkks448w8g4skco4");
        myHeaders.append("Access-Control-Allow-Origin", "*");

        const myInit = {
            method: "GET",
            headers: myHeaders,
        };

        const BASE_URL = 'https://openpagerank.com/api/v1.0/getPageRank';
        const FULL_URL = `${BASE_URL}?domains[]=${url}`;
        console.log("URL:", FULL_URL);

        const corsProxy = 'https://cors-anywhere.herokuapp.com/';
        // const corsProxy = "https://crossorigin.me/";
        // const corsProxy = "https://thingproxy.freeboard.io/fetch/";
        // const FINAL_URL = "http://localhost:3000/api/v1.0/getPageRank?domain=google.com";
        const FINAL_URL = corsProxy + FULL_URL;
        console.log("URL:", FINAL_URL);
        const response = await fetch(FINAL_URL, myInit);
        const resJson = await response.json();
        console.log(resJson);

        return await resJson["response"]["0"]["page_rank_decimal"];
    }

    // CalculateValue(siteUrl: string, amount: number, wordCount: number) -> number
    async function CalculateValue(siteUrl, amount, wordCount) {
        let traffic = await GetPageRank(siteUrl);
        console.log("Traffic:", traffic);
        const TRAFFIC_MAX = 10;
        const AMOUNT_MAX = 50000;
        // return (traffic_neg * WEIGHTS[0] + amount * WEIGHTS[1] + wordCount * WEIGHTS[2]) / TOTAL_WEIGHT;
        
        const WordCount = (wc) => {
            let coeff = 1 / (166.67 * 0.00239361 * Math.sqrt(2 * Math.PI));
            let num = Math.exp(-Math.pow(wc - 500, 2) / (2 * (166.67 * 166.67)));
            return coeff * num;
        };

        return (
            WEIGHTS[0] * (1 - (traffic / TRAFFIC_MAX))
                + WEIGHTS[1] * (amount / AMOUNT_MAX)
                + WEIGHTS[2] * WordCount(wordCount)
        )
    }

    generateBtn.addEventListener("click", async () => {
        let val = await CalculateValue(
            siteUrlInput.value,
            parseInt(amountInput.value),
            parseInt(wordCountInput.value)
        );
        if (!enableOutputDisplay) enableOutputDisplay = true;
        if (enableOutputDisplay) {
            outputSection.style.display = "block";
        }
        let v = val.toFixed(2) * 10;
        scholarshipValueH2.innerText = `${v.toLocaleString("en", { minimumFractionDigits: 1 })}`;
    });
};