import { BrowserRouter, Route, Routes } from "react-router-dom"
import { PageHome } from "./pageHome"
import { PagePokemonDetails } from "./pagePokemonDetails"

export const AppRoutes = () => {
    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route exact path="/" element={<PageHome/>}/>
                    <Route exact path="/pokemon/:id" element={<PagePokemonDetails />}/>
                </Routes>
            </BrowserRouter>
        </>
    )
}