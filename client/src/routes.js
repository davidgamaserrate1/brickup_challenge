import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom"
import  {Home} from "./screens/Home";

export function RoutesApplication (){
    return(
        <BrowserRouter>
       
            <Routes>
                <Route path='/' element={<Home/>}> </Route>
            </Routes>
        </BrowserRouter>
    )
}