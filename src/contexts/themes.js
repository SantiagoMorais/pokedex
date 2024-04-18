import darkIcon from "../assets/lunatoneIcon.png"
import lightIcon from "../assets/solrockIcon.png"

export const themes = {
    light: {
        color: "#000000",
        secondaryColor: "#eeeeee",
        icon: lightIcon,
        logoColor: "invert(0%)",
        themeTogglerButtonStyle: {
            left: "0px"
        },
        footerColor: "#B6BBC4",
    },
    dark: {
        color: "#eeeeee",
        secondaryColor: "#000000",
        icon: darkIcon,
        logoColor: "invert(100%)",
        themeTogglerButtonStyle: {
            left: "-25px",
            transform: "scaleX(-1)",
        },
        footerColor: "#040D12",
    }
}