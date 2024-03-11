import { createContext, useEffect, useState } from "react"
import darkIcon from "../images/lunatoneIcon.png"
import lightIcon from "../images/solrockIcon.png"

export const themes = {
    light: {
        color: "#000000",
        secondaryColor: "#eeeeee",
        icon: lightIcon,
        logoColor: "invert(0%)",
        themeTogglerButtonStyle: {
            left: "0px"
        }
    },
    dark: {
        color: "#eeeeee",
        secondaryColor: "#000000",
        icon: darkIcon,
        logoColor: "invert(100%)",
        themeTogglerButtonStyle: {
            left: "-25px", 
            transform: "scaleX(-1)",
        }
    }
}

export const ThemeContext = createContext({});

export const ThemeProvider = (props) => {
    const themeLocal = JSON.parse(localStorage.getItem('themeKey'));
    const themeStorage = themeLocal ? themeLocal : themes.light;

    const [theme, setTheme] = useState(themeStorage);
    
    useEffect(() => {
        window.localStorage.setItem('themeKey', JSON.stringify(theme))
    }, [theme]);

    useEffect(() => {
        if (themeLocal) {
            setTheme(themeLocal);
        }
    }, []);

    return (
        <ThemeContext.Provider value={{theme, setTheme}}>
            {props.children}
        </ThemeContext.Provider>
    )
}