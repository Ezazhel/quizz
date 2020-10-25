import React from "react";
import { Route, Switch } from "react-router-dom";
import Equipes from "./equipes/Equipes";
import ThemeQuestion from "./themeQuestions/ThemeQuestion";

export default () => (
    <>
        <Switch>
            <Route
                exact
                path="/admin/themesQuestions"
                component={ThemeQuestion}
            />
            <Route exact path="/admin/equipes" component={Equipes} />
        </Switch>
    </>
);
