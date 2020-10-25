import { Theme } from "../models/Theme";
import uuid from "react-uuid";

export const THEMES = "themes";

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
