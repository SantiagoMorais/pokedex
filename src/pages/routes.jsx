import { BrowserRouter, Route, Routes } from "react-router-dom"
import { PageHome } from "./pageHome"

export const AppRoutes = () => {
    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route exact path="/" element={<PageHome/>}/>
                </Routes>
            </BrowserRouter>
        </>
    )
}