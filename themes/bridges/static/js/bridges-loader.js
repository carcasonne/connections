// Bridges ID Scanning System
function createBridgesLoader() {
    // Create the loader container
    const loaderContainer = document.createElement('div');
    loaderContainer.className = 'bridges-loader';

    // Create a more authentic Death Stranding UI
    loaderContainer.innerHTML = `
      <div class="grid-overlay"></div>
      <div class="bridges-loader-content">
        <div class="bridges-ui-container">
          <div class="bridges-logo">BRIDGES</div>
          <div class="ui-header">
            <div class="ui-header-left">UCA ID VERIFICATION</div>
            <div class="ui-header-right">CHIRAL NETWORK ACTIVE</div>
          </div>
          
          <div class="scan-interface">
            <div class="scan-line"></div>
            <div class="scan-line-vertical"></div>
            <div class="scanner-reticle"></div>
            <div class="scanner-crosshair"></div>
            
            <div class="hologram-corners">
              <div class="corner corner-top-left"></div>
              <div class="corner corner-top-right"></div>
              <div class="corner corner-bottom-left"></div>
              <div class="corner corner-bottom-right"></div>
            </div>
            
            <div class="info-display">DIST: 1.5M</div>
            <div class="info-display-bottom" id="signal-strength">SIGNAL STRENGTH: 92%</div>
            
            <div class="scan-text" id="scan-text">BEGINNING SCAN</div>
            <div class="scan-info" id="scan-info">INITIALIZING VERIFICATION PROTOCOL</div>
            
            <div class="scan-progress-container">
              <div class="scan-progress" id="scan-progress"></div>
            </div>
            
            <div class="weapon-notice" id="weapon-notice">ALL WEAPONS WILL BE LOCKED UNTIL DEPARTURE</div>
            <div class="cargo-status" id="cargo-status">CARGO VERIFIED</div>
            
            <div class="data-blocks">
              <div class="data-block"></div>
              <div class="data-block"></div>
              <div class="data-block"></div>
              <div class="data-block"></div>
            </div>
          </div>
        </div>
      </div>
    `;

    document.body.appendChild(loaderContainer);

    // Animation sequence
    const scanText = document.getElementById('scan-text');
    const scanInfo = document.getElementById('scan-info');
    const scanProgress = document.getElementById('scan-progress');
    const weaponNotice = document.getElementById('weapon-notice');
    const cargoStatus = document.getElementById('cargo-status');
    const signalStrength = document.getElementById('signal-strength');

    // Initialize the fluctuating signal strength
    let baseSignalValue = 92;
    let signalInterval;

    function fluctuateSignal() {
        // Create a random fluctuation between -3 and +2
        const fluctuation = Math.floor(Math.random() * 6) - 3;
        const newValue = baseSignalValue + fluctuation;

        // Keep the value between 87% and 96% for realism
        const clampedValue = Math.max(87, Math.min(96, newValue));

        // Update the display
        signalStrength.textContent = `SIGNAL STRENGTH: ${clampedValue}%`;

        // Slightly change the color based on signal strength
        if (clampedValue < 90) {
            signalStrength.style.color = 'rgba(110, 187, 195, 0.7)';
        } else {
            signalStrength.style.color = 'rgba(110, 187, 195, 0.9)';
        }

        // Add slight "glitching" effect on very low values
        if (clampedValue <= 88) {
            signalStrength.style.textShadow = '0 0 5px rgba(110, 187, 195, 0.8)';
            setTimeout(() => {
                signalStrength.style.textShadow = 'none';
            }, 100);
        }
    }

    // Start the signal fluctuation effect
    signalInterval = setInterval(fluctuateSignal, 200);

    // Get user name from config or use default
    let userName = "SAM PORTER BRIDGES";
    try {
        // Attempt to get custom name from theme config (if available)
        const configElements = document.querySelectorAll('.bridges-id');
        if (configElements.length > 0) {
            const idText = configElements[0].textContent || '';
            const idMatch = idText.match(/[A-Z]+-\d+/);
            if (idMatch) {
                userName = idMatch[0];
            }
        }
    } catch (e) {
        console.log('Using default Porter ID');
    }

    // Define the scanning sequence steps with authentic game dialogue
    const scanSteps = [
        { text: "BEGINNING SCAN", info: "INITIALIZING VERIFICATION PROTOCOL", duration: 1500, progress: 10 },
        { text: "SCANNING BRIDGES ID", info: "VERIFYING CREDENTIALS", duration: 2000, progress: 35 },
        { text: "ALL CLEAR", info: "IDENTITY CONFIRMED", duration: 1500, progress: 60 },
        { text: "WEAPONS DETECTED", info: "SECURITY PROTOCOL ENGAGED", duration: 2000, progress: 80, showWeaponNotice: true },
        { text: "CARGO VERIFIED", info: "DELIVERY CONTENTS CONFIRMED", duration: 1500, progress: 90 },
        { text: "THANK YOU", info: `${userName}`, duration: 1800, progress: 100 }
    ];

    // Function to run a single step of the scan
    function runScanStep(index) {
        if (index >= scanSteps.length) {
            // End of sequence - hide loader with fade effect
            setTimeout(() => {
                loaderContainer.style.opacity = '0';
                // Clear the signal fluctuation interval when we're done
                clearInterval(signalInterval);
                setTimeout(() => {
                    loaderContainer.style.display = 'none';
                    document.body.classList.remove('is-loading');
                }, 1000);
            }, 500);
            return;
        }

        const step = scanSteps[index];
        scanText.textContent = step.text;

        // Update progress bar
        scanProgress.style.width = `${step.progress}%`;

        // Show weapon notice if applicable
        if (step.showWeaponNotice) {
            weaponNotice.style.opacity = '1';
            setTimeout(() => {
                weaponNotice.style.opacity = '0';
            }, step.duration - 200);
        }

        // Add a typing effect for the current step text
        let currentInfoText = '';
        const infoTextFinal = step.info;
        const infoTypingInterval = setInterval(() => {
            if (currentInfoText.length < infoTextFinal.length) {
                currentInfoText += infoTextFinal.charAt(currentInfoText.length);
                scanInfo.textContent = currentInfoText;
            } else {
                clearInterval(infoTypingInterval);
            }
        }, 30);

        // Add scanning sound effect
        playScanSound(index);

        // Move to next step after current duration
        setTimeout(() => {
            runScanStep(index + 1);
        }, step.duration);
    }

    // Simple function to play a sound effect (if you want to add sounds)
    function playScanSound(stepIndex) {
        // This is just a placeholder - you could implement actual sounds
        // For example using the Web Audio API
        console.log(`Playing sound for step ${stepIndex}`);
    }

    // Start the sequence
    document.body.classList.add('is-loading');
    setTimeout(() => {
        runScanStep(0);
    }, 500);
}

// Wait for DOM to be fully loaded before initializing
document.addEventListener('DOMContentLoaded', function () {
    // Always show the loader for authentic experience
    createBridgesLoader();
});