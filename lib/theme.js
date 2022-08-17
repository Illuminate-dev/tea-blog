
import { createContext, useContext, useEffect, useState } from "react";

const Context = createContext();


export function ThemeProvider({ children }) {

    let localTheme;    

    if (typeof window !== "undefined") {
        localTheme = window.localStorage.getItem("theme");
        if (localTheme === null) {
            localTheme = "light";
            window.localStorage.setItem("theme", localTheme);
        }
    }

    const [theme, setTheme] = useState(localTheme);
    

    return (
        <Context.Provider value={{ theme, setTheme}}>{children}</Context.Provider>
    )

}

export function useThemeContext() {
    return useContext(Context);
}