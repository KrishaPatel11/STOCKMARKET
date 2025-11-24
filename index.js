function showStocks() {
    const resultDiv = document.getElementById("SavedList");

    const saved = JSON.parse(sessionStorage.getItem("saved"));

    if (saved.length==0) {
        resultDiv.innerHTML = '<p> You have no stocks currently saved D;</p>';
        return;
    }
    for (let i=0; i<saved.length; i++) {
        const stock = saved[i];
        var button = document.createElement("button");
        button.setAttribute('onclick', 'unSave()');
        button.textContent = "Remove from saved list";
        button.id = "unSave"+i;
        resultDiv.innerHTML += `
            <h2>${stock.name}</h2>
            <p><strong>Current Price:</strong> <span style="color: #20e060">${stock.price}</span></p>
            <p>High: ${stock.high} | Low: ${stock.low} | Volume: ${stock.volume}</p>
        `;
        resultDiv.appendChild(button);
    }
}

function unSave() {
    var id = event.srcElement.id;
    var index = parseInt(id.substring(6));
    var hold = JSON.parse(sessionStorage.getItem("saved")) || [];
    if (index<hold.length) {
        hold.splice(index,1);
    }
    else {
        return;
    }

    sessionStorage.setItem("saved", JSON.stringify(hold));
    showStocks();
}