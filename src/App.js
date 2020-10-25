import React from "react";
import { Route, Switch } from "react-router-dom";
import HeaderNavigation from "./components/NavBar";
import Administration from "./features/admin/Admin";
import Game from "./features/game/Game";

function App() {
    return (
        <div className="d-flex flex-column flex-grow-1">
            <HeaderNavigation />
            <Switch>
                <Route path="/admin" component={Administration} />
                <Route component={Game} />
            </Switch>
        </div>
    );
}

export default App;
