import { PokemonListsProvider } from "./contexts/pokemonListsContext"
import { ThemeProvider } from "./contexts/themeContext"
import { AppRoutes } from "./pages/routes"

export const App = () => {
  return (
    <>
      <ThemeProvider>
        <PokemonListsProvider>
          <AppRoutes />
        </PokemonListsProvider>
      </ThemeProvider>
    </>
  )
}

