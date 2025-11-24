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

const saved = [];

var currentStock = "";

// Search Function
function searchStock() {
    const input = document.getElementById("stockInput").value.toUpperCase();
    const resultDiv = document.getElementById("stockResult");

    if (fakeStocks[input]) {
        const stock = fakeStocks[input];
        currentStock = stock;
        var button = document.createElement("button");
        button.setAttribute('onclick', 'saveStock()');
        button.textContent = "Save Me";
        button.id = "SaveButton";

        resultDiv.innerHTML = `
            <h2>${stock.name}</h2>
            <p><strong>Current Price:</strong> <span style="color: #20e060">${stock.price}</span></p>
            <p>High: ${stock.high} | Low: ${stock.low} | Volume: ${stock.volume}</p>
        `;
        resultDiv.appendChild(button);

    } else {
        resultDiv.innerHTML = `<p style="color:red"> Stock not found</p> <br> <a href="https://stockanalysis.com/stocks/">Click Here</a> to see a list of possible Stock Symbols to use`;
    }
}

function saveStock() {
    var stock = currentStock;
    console.log(currentStock);
    var hold = JSON.parse(sessionStorage.getItem("saved")) || [];
    for (let i=0; i<hold.length; i++) {
        if (hold[i].name == stock.name || stock=="") {
            var button = document.getElementById("SaveButton");
            button.textContent = "Already Saved";
            return;
        }
    }

    hold.push(stock);

    console.log(hold);

    var button = document.getElementById("SaveButton");
    button.textContent = "Saved Successfully";
    button.onclick = null;

    sessionStorage.setItem("saved", JSON.stringify(hold));
    console.log(sessionStorage.getItem("saved"));
}