import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import ErrorPage from "./error-page.tsx";

const router = createBrowserRouter([{
    path: "/",
    element: <App/>,
    errorElement: <ErrorPage/>,
    
},
], {basename: "/pokemon-guess-who/"});

ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
        <RouterProvider router={router}/>
        {/* <App /> */}
    </React.StrictMode>
);
