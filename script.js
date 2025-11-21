// Fake Stock Data (Temporary)
const fakeStocks = {
    "AAPL": {
        name: "AAPL (Apple Inc.)",
        price: "$150.00",
        high: "$153.00",
        low: "$148.50",
        volume: "210M"
    },
    "TSLA": {
        name: "TSLA (Tesla Motors)",
        price: "$720.00",
        high: "$735.00",
        low: "$700.00",
        volume: "300M"
    },
    "AMZN": {
        name: "AMZN (Amazon)",
        price: "$3300.00",
        high: "$3400.00",
        low: "$3250.00",
        volume: "120M"
    }
};

// Search Function
function searchStock() {
    const input = document.getElementById("stockInput").value.toUpperCase();
    const resultDiv = document.getElementById("stockResult");

    if (fakeStocks[input]) {
        const stock = fakeStocks[input];
        resultDiv.innerHTML = `
            <h2>${stock.name}</h2>
            <p><strong>Current Price:</strong> <span style="color: #20e060">${stock.price}</span></p>
            <p>High: ${stock.high} | Low: ${stock.low} | Volume: ${stock.volume}</p>
        `;
    } else {
        resultDiv.innerHTML = `<p style="color:red">❌ Stock not found. Try AAPL, TSLA, AMZN.</p>`;
    }
}
