// src/app/utils/utils.ts

export const addTradingViewWidget = (
    widgetId: string,
    config: Record<string, unknown>,
    srcFile: string
): (() => void) | undefined => {
    const widgetElement = document.getElementById(widgetId);

    if (!widgetElement) {
        console.error(`Element with ID ${widgetId} not found.`);
        return;
    }

    const script = document.createElement('script');
    script.src = srcFile;
    script.async = true;
    script.innerHTML = JSON.stringify(config);
    widgetElement.appendChild(script);

    return () => {
        const currentWidgetElement = document.getElementById(widgetId);
        if (currentWidgetElement && currentWidgetElement.contains(script)) {
            currentWidgetElement.removeChild(script);
        }
    };
};