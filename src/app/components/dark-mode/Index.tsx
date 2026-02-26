'use client'

import { useDarkMode } from "./DarkModeContext";
import type { MouseEvent } from "react";

export const DarkMode = () => {
    const { toggleDarkMode } = useDarkMode();

    const handleSiteModeFun = (e: MouseEvent<HTMLDivElement>) => {
        e.stopPropagation();
        e.preventDefault();
        toggleDarkMode();
    };

    return (
        <div className="darkmode-trigger" onClick={handleSiteModeFun}>
            <label className="modeSwitch">
                <input type="checkbox" readOnly />
                <span className="icon" />
            </label>
        </div>
    );
};