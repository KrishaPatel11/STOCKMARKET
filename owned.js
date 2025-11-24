function ownedStocks() {
    const resultDiv = document.getElementById("StockList");

    const saved = JSON.parse(sessionStorage.getItem("bought"));

    resultDiv.innerHTML =`
    <h1>My Saved Stocks</h1>
    <div class="result-box">
            <button onclick="ownedStocks()"> See the stocks you own</button>
    </div>`;
    if (saved.length==0) {
        resultDiv.innerHTML += '<p> you own 0 stocks D;</p>';
        return;
    }
    for (let i=0; i<saved.length; i++) {
        const stock = saved[i];
        var button = document.createElement("button");
        button.setAttribute('onclick', 'sell()');
        button.textContent = "Sell Stock";
        button.id = "sell"+i;
        resultDiv.innerHTML += `
            <h2>${stock.name}</h2>
            <p><strong>Current Price:</strong> <span style="color: #20e060">${stock.price}</span></p>
            <p>High: ${stock.high} | Low: ${stock.low} | Volume: ${stock.volume} | Amount Owned: ${stock.amount}</p>
        `;
        resultDiv.appendChild(button);
    }
}

function sell() {
    var id = event.srcElement.id;
    var index = parseInt(id.substring(4));
    var hold = JSON.parse(sessionStorage.getItem("bought")) || [];

    var stock = hold[index];
    var money = parseFloat(sessionStorage.getItem("money"));
    var price = parseFloat(stock.price.substring(1));
    money += price;
    sessionStorage.setItem("money", money);

    if (stock["amount"]=="1") {
        hold.splice(index,1);
    }
    else {
        stock["amount"] = parseInt(stock["amount"])-1;
    }


    sessionStorage.setItem("bought",JSON.stringify(hold));
    ownedStocks();
}