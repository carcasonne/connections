// Update the timestamp on page load
document.addEventListener('DOMContentLoaded', function() {
    const dateElement = document.getElementById('current-date');
    if (dateElement) {
      const now = new Date();
      const options = { 
        year: 'numeric', 
        month: 'short', 
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        hour12: false
      };
      dateElement.textContent = now.toLocaleDateString('en-US', options);
    }
  });