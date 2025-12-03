📈 Stock Market Web App

A simple front-end stock search + watchlist simulator connected to a Flask API.

📌 Overview

This project is a frontend stock market mini-app where users can:

Search for real stock symbols (AAPL, TSLA, etc.)

View price data fetched from the Flask backend

Save stocks to a watchlist

“Buy” stocks using virtual money stored in sessionStorage

View saved stocks and owned stocks on separate pages

The app is designed to look like a clean dashboard with a sidebar and multiple pages.

🗂 Features
🔍 1. Stock Search

Users enter a symbol (e.g., “AAPL”).

The frontend fetches real stock price data from:

GET /stocks


Results show:

Current price

Last updated date

Buttons for Save and Buy

⭐ 2. Saved Stocks

Saved stocks are stored in the browser’s sessionStorage.

Displayed on:

watchlist.html


Clean card layout showing symbol and price.

💰 3. Owned Stocks

Buying a stock reduces the user’s virtual money.

Owned stocks are tracked in:

sessionStorage → bought[]


Displayed in the Owned Stocks section of the watchlist.

👤 4. User Info (from backend)

The frontend loads the user’s info from:

GET /user/1


This sets:

Username

Starting cash

Dashboard balance

🧩 Project Structure
/project-root
│
├── index.html          → Dashboard
├── search.html         → Stock search page
├── watchlist.html      → Saved + owned stocks
├── script.js           → Main JavaScript (all logic)
├── style.css           → Styling
├── api.py              → Flask backend API
│
└── sim/                → Backend market + database code

🔗 Frontend → Backend Connection

The app uses Fetch API to talk to your Flask backend:

Load user:

GET http://127.0.0.1:5000/user/1


Load all stocks:

GET http://127.0.0.1:5000/stocks


These results fill in:

Stock search data

User balance

Real-time stock cards

🛠 Tech Used

HTML / CSS / JavaScript

Session Storage for saving and owning stocks

Flask (Python) as backend API

SQLite + SQLAlchemy for real price data

Responsive Layout + simple dashboard design

🚀 How to Run the App
1️⃣ Start the backend:
source .venv/bin/activate
python3 api.py


You should see:

Running on http://127.0.0.1:5000

2️⃣ Open any HTML file in the browser:

index.html

search.html

watchlist.html

Everything connects automatically.
