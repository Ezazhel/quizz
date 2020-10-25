import React from "react";
import { Button } from "react-bootstrap";
import { LIST_CONTAINER, LIST_ITEM } from "../../../../components/StyleFile";
const QuestionsList = (props) => (
    <div>
        <h3> Question du thème</h3>
        {props.questions.length > 0 ? (
            <LIST_CONTAINER>
                {props.questions.map((value, index) => (
                    <LIST_ITEM
                        key={value.id}
                        className={
                            props.selectedQuestion?.id === value.id
                                ? "active"
                                : ""
                        }
                        onClick={() => props.editQuestion(value)}
                    >
                        <label>Question : {++index}</label>
                        <Button
                            onClick={() => props.deleteQuestion(value)}
                            variant="danger"
                        >
                            X
                        </Button>
                    </LIST_ITEM>
                ))}
            </LIST_CONTAINER>
        ) : (
            "Pas encore de Questions"
        )}
    </div>
);

export default QuestionsList;
