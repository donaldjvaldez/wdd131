const yearSpan = document.querySelector("#currentyear");
const today = new Date();
yearSpan.textContent = today.getFullYear();


const lastModifiedSpan = document.querySelector("#lastModified");
lastModifiedSpan.textContent = `Last Modified: ${document.lastModified}`;

const mainnav = document.querySelector('.navigation')
const hambutton = document.querySelector('#menu');

// Add a click event listender to the hamburger button and use a callback function that toggles the list element's list of classes.
hambutton.addEventListener('click', () => {
    mainnav.classList.toggle('show');
    hambutton.classList.toggle('show');
});

// ====== PLANNER PAGE LOGIC ======
document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("budgetForm");
    const budgetList = document.getElementById("budgetList");
    const totalIncomeEl = document.getElementById("totalIncome");
    const totalExpensesEl = document.getElementById("totalExpenses");
    const balanceEl = document.getElementById("balance");

    if (form && budgetList && totalIncomeEl && totalExpensesEl && balanceEl) {
        let entries = JSON.parse(localStorage.getItem("budgetEntries")) || [];

        const formatCurrency = (amount) =>
            `RD$${Number(amount).toLocaleString("es-DO", {
                minimumFractionDigits: 0,
            })}`;

        function renderEntries() {
            budgetList.innerHTML = "";
            entries.forEach((entry, index) => {
                const li = document.createElement("li");
                li.classList.add("budget-item", entry.type);
                li.innerHTML = `
          <span>${entry.type === "income" ? "💰" : "🛒"} ${entry.category} - ${formatCurrency(entry.amount)}</span>
          <span>${entry.date}</span>
          <button class="delete-btn" aria-label="Delete entry">✖</button>
        `;
                li.querySelector(".delete-btn").addEventListener("click", () => deleteEntry(index));
                budgetList.appendChild(li);
            });
            updateSummary();
        }

        function updateSummary() {
            const totalIncome = entries
                .filter((e) => e.type === "income")
                .reduce((sum, e) => sum + e.amount, 0);

            const totalExpenses = entries
                .filter((e) => e.type === "expense")
                .reduce((sum, e) => sum + e.amount, 0);

            const balance = totalIncome - totalExpenses;

            totalIncomeEl.textContent = formatCurrency(totalIncome);
            totalExpensesEl.textContent = formatCurrency(totalExpenses);
            balanceEl.textContent = formatCurrency(balance);
        }

        form.addEventListener("submit", (event) => {
            event.preventDefault();

            const type = document.querySelector('input[name="type"]:checked').value;
            const category = document.getElementById("category").value.trim();
            const amount = parseFloat(document.getElementById("amount").value);
            const date = document.getElementById("date").value;

            if (!category || !amount || !date) {
                alert("Please fill in all fields.");
                return;
            }

            const newEntry = { type, category, amount, date };
            entries.push(newEntry);
            localStorage.setItem("budgetEntries", JSON.stringify(entries));

            form.reset();
            document.getElementById("type-income").checked = true;
            renderEntries();
        });

        function deleteEntry(index) {
            if (confirm("Are you sure you want to delete this entry?")) {
                entries.splice(index, 1);
                localStorage.setItem("budgetEntries", JSON.stringify(entries));
                renderEntries();
            }
        }

        renderEntries();
    }
});

// ====== REPORTS PAGE LOGIC ======
document.addEventListener("DOMContentLoaded", () => {
    const incomeEl = document.querySelector("#total-income");
    const expenseEl = document.querySelector("#total-expenses");
    const balanceEl = document.querySelector("#balance");
    const transactionListEl = document.querySelector("#transaction-list");
    const filterForm = document.querySelector("#filter-form");
    const chartCanvas = document.querySelector("#budgetChart");

    // Ensure this code runs only on the reports page
    if (!incomeEl || !expenseEl || !transactionListEl) return;

    let transactions = JSON.parse(localStorage.getItem("budgetEntries")) || [];

    let budgetChart;

    renderReport(transactions);

    if (filterForm) {
        filterForm.addEventListener("submit", (e) => {
            e.preventDefault();
            const month = document.querySelector("#month").value;
            const year = document.querySelector("#year").value;
            const filtered = filterTransactions(transactions, month, year);
            renderReport(filtered);
        });
    }

    function renderReport(data) {
        const income = data
            .filter((t) => t.type === "income")
            .reduce((sum, t) => sum + parseFloat(t.amount), 0);
        const expenses = data
            .filter((t) => t.type === "expense")
            .reduce((sum, t) => sum + parseFloat(t.amount), 0);
        const balance = income - expenses;

        incomeEl.textContent = `RD$${income.toLocaleString("es-DO")}`;
        expenseEl.textContent = `RD$${expenses.toLocaleString("es-DO")}`;
        balanceEl.textContent = `RD$${balance.toLocaleString("es-DO")}`;

        renderTransactions(data);
        renderChart(income, expenses);
    }

    function renderTransactions(data) {
        transactionListEl.innerHTML = "";

        if (data.length === 0) {
            transactionListEl.innerHTML = "<li>No transactions found.</li>";
            return;
        }

        data.forEach((t) => {
            const li = document.createElement("li");
            li.classList.add(t.type);
            li.innerHTML = `
        <span>${t.category} (${t.date})</span>
        <span>${t.type === "income" ? "+" : "-"}RD$${parseFloat(t.amount).toLocaleString("es-DO")}</span>
      `;
            transactionListEl.appendChild(li);
        });
    }

    function renderChart(income, expenses) {
        const ctx = chartCanvas.getContext("2d");

        if (budgetChart) budgetChart.destroy();

        budgetChart = new Chart(ctx, {
            type: "doughnut",
            data: {
                labels: ["Income", "Expenses"],
                datasets: [
                    {
                        data: [income, expenses],
                        backgroundColor: ["#2ecc71", "#e74c3c"],
                        borderWidth: 1,
                    },
                ],
            },
            options: {
                plugins: {
                    legend: {
                        position: "bottom",
                        labels: { color: "#333", font: { family: "Roboto" } },
                    },
                },
            },
        });
    }

    function filterTransactions(data, month, year) {
        return data.filter((t) => {
            const date = new Date(t.date);
            const matchesMonth = month ? date.getMonth() + 1 === parseInt(month) : true;
            const matchesYear = year ? date.getFullYear() === parseInt(year) : true;
            return matchesMonth && matchesYear;
        });
    }
});
