import React from "react";
import { Badge } from "react-bootstrap";
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
                    .map((v, i) => (
                        <LIST_ITEM
                            key={props.equipes[v].name}
                            onClick={() => props.selectEquipe(props.equipes[v])}
                            className={
                                props.selectedEquipe?.id === v ? "active" : ""
                            }
                        >
                            <label>
                                <span>{props.equipes[v].name}</span>
                                <Badge
                                    variant="warning"
                                    className="p-2 align-middle"
                                >
                                    {props.equipes[v].score}
                                </Badge>
                            </label>
                        </LIST_ITEM>
                    ))}
            </LIST_CONTAINER>
        </div>
    );
};
