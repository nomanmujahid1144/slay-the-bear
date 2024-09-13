import { useDarkMode } from "./DarkModeContext";


export const DarkMode = () => {
  const { toggleDarkMode } = useDarkMode(); // Use the context

  const handleSiteModeFun = (e) => {
    e.stopPropagation();
    e.preventDefault();
    toggleDarkMode(); // Use the context function to toggle mode
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
