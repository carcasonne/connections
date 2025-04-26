// Improved column distributor for multi-column layout
document.addEventListener('DOMContentLoaded', function() {
    // Get the content container and the columns container
    const originalContent = document.querySelector('.article-content-original');
    const columnsContainer = document.querySelector('.article-columns-container');
    
    if (!originalContent || !columnsContainer) {
      console.error("Could not find original content or columns container");
      return;
    }
  
    // Create a wrapper div for the CSS multi-column layout
    const columnWrapper = document.createElement('div');
    columnWrapper.className = 'column-wrapper';
    
    // Get all content from the original container
    const content = originalContent.innerHTML;
    
    // Set the content directly to ensure proper flow
    columnWrapper.innerHTML = content;
    
    // Clear the columns container first (in case of reloads)
    columnsContainer.innerHTML = '';
    
    // Add the wrapper to the columns container
    columnsContainer.appendChild(columnWrapper);
    
    // Ensure column-wrapper has proper width and is visible
    columnWrapper.style.width = '100%';
    columnWrapper.style.display = 'block';
    
    // Force column-count to ensure it's applied
    columnWrapper.style.columnCount = '4';
    columnWrapper.style.columnGap = '1.5rem';
    columnWrapper.style.columnRule = '1px solid var(--border-color)';
    
    // Hide the original content
    originalContent.style.display = 'none';
    
    // Log dimensions for debugging
    console.log("Column wrapper created with dimensions:", 
                columnWrapper.offsetWidth, "x", columnWrapper.offsetHeight);
    console.log("Column count property:", getComputedStyle(columnWrapper).columnCount);
});