import { Button } from "react-bootstrap";
import styled from "styled-components";

export const LIST_CONTAINER = styled.div`
    display: flex;
    flex-direction: column;
    flex-grow: 1;

    label {
        color: #24b9b6;
        font-size: 1.2em;
        font-weight: 400;
    }
`;

export const LIST_ITEM = styled.div`
    display: flex;
    justify-content: space-between;
    margin: 0.2em 0.2em;
    border-radius: 5px;
    background-color: #5c6a79;
    -webkit-box-shadow: 0px 0px 5px 0px rgba(127, 140, 141, 0.4);
    -moz-box-shadow: 0px 0px 5px 0px rgba(127, 140, 141, 0.4);
    box-shadow: 0px 0px 5px 0px rgba(127, 140, 141, 0.4);

    &:hover {
        cursor: pointer;
        label {
            color: #aeb2b7;
        }
        background-color: #005b50;
    }
    &.active {
        label {
            color: #ecf0f1;
        }
        background-color: #005b50;
    }

    label {
        color: #bdc3c7;
        margin-left: 1.2em;
        font-size: 1.2em;
        font-weigth: 400;
        display: flex;
        flex-grow: 1;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 0px;
    }
    button {
        display: flex;
    }
`;

export const GAMEMODE = styled(Button)`
    border: none;
    &.cash {
        background: #7e349d;
    }
    &.duo {
        background: #f1c40f;
    }
    &.carre {
        background: #c0392b;
    }
`;

export const QUESTION_INTERFACE = styled.div`
    display: flex;
    flex-direction: column;
    flex-grow: 2;
    border-radius: 5px;
    min-height: 50vh;

    -webkit-box-shadow: 0px 0px 5px 0px rgba(0, 0, 0, 0.4);
    -moz-box-shadow: 0px 0px 5px 0px rgba(0, 0, 0, 0.4);
    box-shadow: 0px 0px 5px 0px rgba(0, 0, 0, 0.4);

    .initialize {
        margin: auto;
    }
`;
