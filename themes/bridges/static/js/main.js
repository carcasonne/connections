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

// Optional: Theme switcher functionality
function createThemeSwitcher() {
    const container = document.getElementById('container');
    if (!container) return;

    const switcherDiv = document.createElement('div');
    switcherDiv.classList.add('timefall-switcher');
    switcherDiv.innerHTML = `
      <div class="timefall-label">Environment:</div>
      <div class="timefall-options">
        <button class="timefall-btn active" data-theme="normal">Normal</button>
        <button class="timefall-btn" data-theme="timefall">Timefall</button>
        <button class="timefall-btn" data-theme="bt-territory">BT Zone</button>
      </div>
    `;

    container.appendChild(switcherDiv);

    const themeButtons = document.querySelectorAll('.timefall-btn');
    themeButtons.forEach(button => {
        button.addEventListener('click', function () {
            const selectedTheme = this.getAttribute('data-theme');

            // Update active button
            themeButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');

            // Apply theme effects
            const timefall = document.querySelector('.timefall');
            if (selectedTheme === 'timefall') {
                document.body.style.backgroundColor = '#1a2025';
                document.body.style.color = '#8eadc3';
                if (timefall) timefall.style.opacity = '0.8';
            } else if (selectedTheme === 'bt-territory') {
                document.body.style.backgroundColor = '#0a0a0b';
                document.body.style.color = '#a0a0a0';
            } else {
                document.body.style.backgroundColor = '';
                document.body.style.color = '';
                if (timefall) timefall.style.opacity = '0.3';
            }
        });
    });
}

// Only create theme switcher if enabled in config (you can add this option to config.toml)
document.addEventListener("DOMContentLoaded", function () {
    // Check if theme switcher is enabled (you would set this in your config.toml)
    const themeSwitcherEnabled = true; // This should come from config
    if (themeSwitcherEnabled) {
        createThemeSwitcher();
    }
});