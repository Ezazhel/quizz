import React from "react";
import { Badge, Button } from "react-bootstrap";
import { LIST_ITEM, LIST_CONTAINER } from "../../../components/StyleFile";

export default (props) => {
    return (
        <div className="d-flex flex-column flex-grow-1 align-content-center p-3">
            <LIST_CONTAINER>
                {Object.keys(props.equipes)
                    .sort(
                        (a, b) =>
                            props.equipes[b].score - props.equipes[a].score
                    )
                    .map((idEquipe, i) => (
                        <LIST_ITEM
                            key={props.equipes[idEquipe].name}
                            onClick={() =>
                                props.selectEquipe(props.equipes[idEquipe])
                            }
                            className={
                                props.selectedEquipe?.id === idEquipe
                                    ? "active"
                                    : ""
                            }
                        >
                            <label>
                                <span>{props.equipes[idEquipe].name}</span>
                                <Badge
                                    variant="warning"
                                    className="p-2 align-middle"
                                >
                                    {props.equipes[idEquipe].score}
                                </Badge>
                            </label>
                            {[1, -1].map((value) => (
                                <Button
                                    key={value}
                                    data-id-equipe={idEquipe}
                                    data-value={value}
                                    variant={
                                        value > 0
                                            ? "outline-success"
                                            : "outline-danger"
                                    }
                                    onClick={
                                        props.giveBonusOrMalusSelectedEquipe
                                    }
                                >
                                    {idEquipe > 0 ? "+" : ""}+1
                                </Button>
                            ))}
                        </LIST_ITEM>
                    ))}
            </LIST_CONTAINER>
        </div>
    );
};
