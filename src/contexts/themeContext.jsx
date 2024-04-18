import { createContext, useEffect, useState } from "react"
import PropTypes from 'prop-types';
import { themes } from "./themes";

export const ThemeContext = createContext({});

export const ThemeProvider = ({children}) => {
    const themeLocal = JSON.parse(localStorage.getItem('themeKey'));
    const themeStorage = themeLocal ? themeLocal : themes.light;

    const [theme, setTheme] = useState(themeStorage);
    
    useEffect(() => {
        window.localStorage.setItem('themeKey', JSON.stringify(theme))
    }, [theme]);

    return (
        <ThemeContext.Provider value={{theme, setTheme}}>
            {children}
        </ThemeContext.Provider>
    )
}

ThemeProvider.propTypes = {
    children: PropTypes.node
}