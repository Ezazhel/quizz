import uuid from "react-uuid";
import { Equipes } from "../models/Equipes";
export const EQUIPES = "equipes";

export const insertOrUpdate = (equipePUT) => {
    let equipes = getAll();
    equipePUT = new Equipes({
        id: equipePUT?.id ?? uuid(),
        name: equipePUT.name,
    });
    equipes = {
        ...equipes,
        [equipePUT.id]: equipePUT,
    };
    localStorage.setItem(EQUIPES, JSON.stringify(equipes));
};

export const deleteEquipe = (id) => {
    let equipes = getAll();
    delete equipes[id];
    localStorage.setItem(EQUIPES, JSON.stringify(equipes));
};

export const getAll = () => {
    return JSON.parse(localStorage.getItem(EQUIPES)) ?? {};
};
