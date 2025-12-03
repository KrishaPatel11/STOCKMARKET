// ==============================
// Backend Connection (User + Stocks)
// ==============================

// Will hold backend stock data like REAL_STOCKS["AAPL"] = {symbol, price, date}
let REAL_STOCKS = {};

let money = parseFloat(sessionStorage.getItem("money"));
if (isNaN(money)) money = 100000;


// Load user from backend
async function getUserData() {
    try {
        const res = await fetch("http://127.0.0.1:5000/user/1");
        const data = await res.json();
        console.log("User Data:", data);

        // Update name/cash ONLY if elements exist
        const nameEl = document.getElementById("userName");
        const cashEl = document.getElementById("userCash");

        if (nameEl) nameEl.innerText = data.name;
        if (cashEl) cashEl.innerText = "$" + data.cash.toFixed(2);

        money = data.cash;
        sessionStorage.setItem("money", money);
        seeMoney();
    } catch (error) {
        console.error("Error loading user:", error);
    }
}


// Load stocks from backend
async function loadStocks() {
    try {
        const res = await fetch("http://127.0.0.1:5000/stocks");
        const data = await res.json();
        console.log("Loaded stocks:", data);

        const stocks = data.stocks || [];
        stocks.forEach(s => {
            REAL_STOCKS[s.symbol.toUpperCase()] = s;
        });
    } catch (error) {
        console.error("Error loading stock list:", error);
    }
}


// App initializer
async function initApp() {
    await getUserData();
    await loadStocks();
    seeMoney();
}

document.addEventListener("DOMContentLoaded", initApp);


// ==============================
// Money Helpers
// ==============================

function gainMoney() {
    money += 100;
    sessionStorage.setItem("money", money);
    seeMoney();
}

function seeMoney() {
    const box = document.getElementById("seeMoney");
    if (!box) return;
    box.innerHTML = `<p>Amount of money left: $${money.toFixed(2)}</p>`;
    return box.innerHTML;
}


// ==============================
// Stock Search + Buy + Save
// ==============================

let currentStock = null;

// Search stock from backend data
async function searchStock() {
    const input = document.getElementById("stockInput").value.toUpperCase();
    const resultDiv = document.getElementById("stockResult");

    const stock = REAL_STOCKS[input];

    if (!stock) {
        resultDiv.innerHTML = `
            <p style="color:red">Stock not found</p>
            <a href="https://stockanalysis.com/stocks/" target="_blank">Click Here</a>
            to see a list of stock symbols.
        `;
        return;
    }

    currentStock = stock;

    resultDiv.innerHTML = `
        <h2>${stock.symbol}</h2>
        <p><strong>Current Price:</strong>
            <span style="color:#20e060">$${Number(stock.price).toFixed(2)}</span>
        </p>
        <p>Date: ${stock.date || "N/A"}</p>
        <button id="SaveButton" onclick="saveStock()">Save</button>
        <button id="BuyButton" onclick="buyStock()">Buy 1 Stock</button>
    `;
}


// Buy 1 share of current stock
function buyStock() {
    if (!currentStock) return;

    const stock = currentStock;
    const price = parseFloat(stock.price);

    if (money < price) {
        const buy = document.getElementById("BuyButton");
        if (buy) buy.textContent = "Not enough funds";
        return;
    }

    money -= price;
    sessionStorage.setItem("money", money);
    seeMoney();

    let hold = JSON.parse(sessionStorage.getItem("bought")) || [];

    // Check if we already own this stock
    let found = false;
    for (let i = 0; i < hold.length; i++) {
        if (hold[i].symbol === stock.symbol) {
            hold[i].amount = String((parseInt(hold[i].amount) || 0) + 1);
            found = true;
            break;
        }
    }

    if (!found) {
        hold.push({
            symbol: stock.symbol,
            price: stock.price,
            date: stock.date,
            amount: "1"
        });
    }

    sessionStorage.setItem("bought", JSON.stringify(hold));
    console.log("Updated bought list:", hold);

    // ⭐ REFRESH OWNED STOCKS LIVE
    renderOwnedStocks();
}


// Save stock to watchlist
function saveStock() {
    if (!currentStock) return;

    const stock = currentStock;
    let saved = JSON.parse(sessionStorage.getItem("saved")) || [];

    // Avoid duplicates
    for (let i = 0; i < saved.length; i++) {
        if (saved[i].symbol === stock.symbol) {
            const btn = document.getElementById("SaveButton");
            if (btn) btn.textContent = "Already Saved";
            return;
        }
    }

    saved.push({
        symbol: stock.symbol,
        price: stock.price,
        date: stock.date
    });

    sessionStorage.setItem("saved", JSON.stringify(saved));

    const btn = document.getElementById("SaveButton");
    if (btn) {
        btn.textContent = "Saved Successfully";
        btn.onclick = null;
    }

    console.log("Saved list:", saved);
}


// ==============================
// Render Saved + Owned Stocks
// ==============================

// Dashboard (index.html)
function renderSavedOnDashboard() {
    const container = document.getElementById("savedStocksContainer");
    if (!container) return;

    const saved = JSON.parse(sessionStorage.getItem("saved")) || [];

    if (saved.length === 0) {
        container.innerHTML = `<p>You don't have any saved stocks yet.</p>`;
        return;
    }

    let html = "";
    saved.forEach(s => {
        html += `
            <div class="stock-card">
                <h3>${s.symbol}</h3>
                <p><strong>Price:</strong> $${Number(s.price).toFixed(2)}</p>
                <p>Date: ${s.date}</p>
            </div>
        `;
    });

    container.innerHTML = html;
}


// watchlist.html — OWNED stocks
function renderOwnedStocks() {
    const container = document.getElementById("ownedStocksContainer");
    if (!container) return;

    const owned = JSON.parse(sessionStorage.getItem("bought")) || [];

    if (owned.length === 0) {
        container.innerHTML = `<p>You don't own any stocks yet.</p>`;
        return;
    }

    let html = "";
    owned.forEach(s => {
        html += `
            <div class="stock-card">
                <h3>${s.symbol}</h3>
                <p><strong>Shares Owned:</strong> ${s.amount}</p>
                <p><strong>Last Buy Price:</strong> $${Number(s.price).toFixed(2)}</p>
                <p>Date: ${s.date}</p>
            </div>
        `;
    });

    container.innerHTML = html;
}


// Auto-render depending on page
document.addEventListener("DOMContentLoaded", () => {
    renderSavedOnDashboard();
    renderOwnedStocks();
});
