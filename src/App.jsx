import { ThemeProvider } from "./contexts/themeContext"
import { AppRoutes } from "./pages/routes"

export const App = () => {
  return (
    <>
      <ThemeProvider>
        <AppRoutes />
      </ThemeProvider>
    </>
  )
}

