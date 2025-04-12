// Set current date in Death Stranding format
document.addEventListener("DOMContentLoaded", function () {
    const now = new Date();
    const months = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];
    const conditions = ['CLEAR', 'CLEAR', 'TIMEFALL', 'LIGHT TIMEFALL', 'TIMEFALL', 'HEAVY TIMEFALL', 'CLEAR', 'CLEAR', 'LIGHT TIMEFALL', 'TIMEFALL', 'CLEAR', 'CLEAR'];

    const year = now.getFullYear();
    const month = months[now.getMonth()];
    const condition = conditions[now.getMonth()];
    const day = now.getDate();

    const dateElement = document.getElementById("current-date");
    if (dateElement) {
        dateElement.textContent = `${day}.${month}.${year} [${condition}]`;
    }
});
