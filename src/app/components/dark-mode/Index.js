export const DarkMode = ({ handleSiteMode }) => {
    const handleSiteModeFun = (e) => {
      e.stopPropagation();
      e.preventDefault(); // Added to prevent any default behavior
      handleSiteMode();
    };
  
    return (
      <div className="darkmode-trigger" onClick={handleSiteModeFun}>
        <label className="modeSwitch">
          <input type="checkbox" />
          <span className="icon" />
        </label>
      </div>
    );
  };
  