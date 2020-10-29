import React from "react";
import { Badge, Button } from "react-bootstrap";

const BUTTON_BONUS = ({ idEquipe, value, ...props }) => (
    <Button
        data-id-equipe={idEquipe}
        data-value={value}
        className="m-2"
        {...props}
    >
        {value > 0 ? `+${value}` : value}
    </Button>
);
export default (props) => {
    return (
        <div className="d-flex flex-column flex-grow-1">
            {Object.keys(props.equipes)
                .sort((a, b) => props.equipes[b].score - props.equipes[a].score)
                .map((idEquipe, i) => (
                    <div
                        key={props.equipes[idEquipe].name}
                        onClick={() =>
                            props.selectEquipe(props.equipes[idEquipe])
                        }
                        className={`${
                            props.selectedEquipe?.id === idEquipe
                                ? "bg-dark "
                                : " "
                        } shadow-game m-3 rounded
                        `}
                        style={{ display: "flex", flexDirection: "column" }}
                    >
                        <div className="text-center">
                            <label>
                                <span>{props.equipes[idEquipe].name}</span>
                            </label>
                        </div>
                        <div className="d-flex align-self-center align-items-center">
                            <BUTTON_BONUS
                                value="1"
                                idEquipe={idEquipe}
                                variant="outline-success"
                                onClick={props.giveBonusOrMalusSelectedEquipe}
                            />
                            <Badge
                                variant="warning"
                                className="p-2 align-middle"
                            >
                                {props.equipes[idEquipe].score}
                            </Badge>
                            <BUTTON_BONUS
                                value="-1"
                                idEquipe={idEquipe}
                                onClick={props.giveBonusOrMalusSelectedEquipe}
                                variant="outline-danger"
                            />
                        </div>
                    </div>
                ))}
        </div>
    );
};
