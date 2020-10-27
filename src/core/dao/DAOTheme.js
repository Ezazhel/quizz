import { Theme } from "../models/Theme";
import uuid from "react-uuid";

export const THEMES = "themes";

export const importThemeFromJsonString = (StringThemeSepartorComa) => {
    if (!StringThemeSepartorComa) return alert("Vous devez spécifier du texte");
    try {
        let importTheme = StringThemeSepartorComa.split(";");
        let themes = JSON.parse(localStorage.getItem(THEMES)) ?? {};
        importTheme.forEach((name) => {
            if (!name) {
                return alert("Le texte ne correspond pas au modèle");
            }
            let newTheme = new Theme(uuid(), name);

            themes[newTheme.id] = newTheme;
        });
        localStorage.setItem(THEMES, JSON.stringify(themes));
    } catch (e) {
        console.log(e);
        return alert("Le JSON n'est pas un objet");
    }
};
export const deleteTheme = (deletedTheme) => {
    try {
        let allThemes = getThemes();
        delete allThemes[deletedTheme.id];
        localStorage.setItem(THEMES, JSON.stringify(allThemes));
    } catch (error) {}
};

export const insertUpdateThemes = (theme) => {
    let themes = getThemes();

    let { id, name } = theme;

    let newTheme = new Theme(id ?? uuid(), name);

    themes[newTheme.id] = newTheme;
    localStorage.setItem(THEMES, JSON.stringify(themes));
};

export const getThemes = () => {
    return JSON.parse(localStorage.getItem(THEMES)) ?? {};
};
