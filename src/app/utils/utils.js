export const addTradingViewWidget = (widgetId, config, srcFile) => {
    const widgetElement = document.getElementById(widgetId);
  
    if (!widgetElement) {
      console.error(`Element with ID ${widgetId} not found.`);
      return;
    }
  
    // Create and add the script element
    const script = document.createElement('script');
    script.src = srcFile;
    script.async = true;
    script.innerHTML = JSON.stringify(config);
    widgetElement.appendChild(script);
  
    // Cleanup function to remove the script
    return () => {
      const currentWidgetElement = document.getElementById(widgetId); // Get element again to ensure it's still in DOM
  
      if (currentWidgetElement && currentWidgetElement.contains(script)) { // Check if script is still a child
        currentWidgetElement.removeChild(script);
      }
    };
  };
  