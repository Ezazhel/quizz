import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";

window.onbeforeunload = function (e) {
    e = e || window.event;

    // For IE and Firefox prior to version 4
    if (e) {
        e.returnValue = "Sure?";
    }

    // For Safari
    return "Sure?";
};

ReactDOM.render(
    <React.StrictMode>
        <BrowserRouter basename="quizzdiscord">
            <App />
        </BrowserRouter>
    </React.StrictMode>,
    document.getElementById("root")
);
