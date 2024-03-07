import { createContext, useState } from "react"
import backgroundImage from "../images/background.jpg"
import darkIcon from "../images/lunatoneIcon.png"
import lightIcon from "../images/solrockIcon.png"

export const themes = {
    light: {
        color: "#000000",
        secondaryColor: "#eeeeee",
        icon: lightIcon,
    },
    dark: {
        color: "#eeeeee",
        secondaryColor: "#000000",
        icon: darkIcon,
    }
}

export const ThemeContext = createContext({});

export const ThemeProvider = (props) => {
    const [theme, setTheme] = useState(themes.light)

    return (
        <ThemeContext.Provider value={{theme, setTheme}}>
            {props.children}
        </ThemeContext.Provider>
    )
}