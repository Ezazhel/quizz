import React from "react";
import Reponses from "./Reponses";
import { Button, ProgressBar } from "react-bootstrap";
import { QUESTION_INTERFACE } from "../../../components/StyleFile";
import { GAMEMODE } from "../../../components/StyleFile";

const Mode = [
    { name: "cash", score: 4 },
    { name: "carre", score: 2 },
    { name: "duo", score: 1 },
];

const SelectionGameMode = (props) => {
    const percent = (props.timer / props.baseTimer) * 100;
    return (
        <div className="d-flex flex-column">
            <ProgressBar
                animated
                variant={
                    percent <= 50
                        ? percent <= 25
                            ? "danger"
                            : "warning"
                        : "success"
                }
                now={percent}
                style={{ minWidth: "100%", height: "5vh" }}
                label={`${props.timer}s`}
            ></ProgressBar>
            <div className="d-flex justify-content-around m-3">
                {Object.keys(Mode).map((v, i) => (
                    <GAMEMODE
                        className={Mode[v].name}
                        key={Mode[v].name}
                        onClick={() => props.setMode(Mode[v])}
                    >
                        {Mode[v].name.toUpperCase()}
                    </GAMEMODE>
                ))}
                {percent === 0 && (
                    <Button
                        data-bonne-reponse={false}
                        variant="outline-danger"
                        onClick={props.skip}
                    >
                        {" "}
                        Passer{" "}
                    </Button>
                )}
            </div>
        </div>
    );
};
export default class GameInterface extends React.Component {
    constructor(props) {
        super();
        this.state = {
            timer: 5,
            baseTimer: 5,
            isAnswered: false,
            questionPose: false,
            mode: null,
        };
    }
    setMode = (mode) => {
        this.setState({
            mode,
        });
        clearTimeout(this.timeout);
        clearInterval(this.interval);
    };

    launchTimer = () => {
        this.setState({
            questionPose: true,
        });
        this.interval = setInterval(() => {
            this.setState({
                timer: this.state.timer - 1,
            });
        }, 1000);
        this.timeout = setTimeout(() => {
            clearInterval(this.interval);
        }, this.state.baseTimer * 1000);
    };

    answer = (e) => {
        const bonneReponse = e.target.dataset.bonneReponse === "true";

        this.props.finish(bonneReponse, this.state.mode);
        this.setState({
            mode: null,
            answer: false,
            questionPose: false,
            timer: 5,
        });
    };

    render() {
        return (
            <QUESTION_INTERFACE>
                {!this.state.questionPose && (
                    <div className="initialize">
                        {this.props.canLaunch ? (
                            <Button
                                style={{
                                    height: "auto",
                                    width: "150px",
                                    minHeight: "100px",
                                    fontSize: "1.5rem",
                                }}
                                variant="outline-info"
                                onClick={this.launchTimer}
                            >
                                Lancer
                            </Button>
                        ) : (
                            <h2 className="text-danger">
                                Selectionne une équipe et un thème !
                            </h2>
                        )}
                    </div>
                )}
                {this.state.questionPose &&
                    this.props.questionToDisplay !== null && (
                        <div className="text-center">
                            <h2>{this.props.questionToDisplay?.question}</h2>
                        </div>
                    )}
                {this.state.mode === null && this.state.questionPose && (
                    <SelectionGameMode
                        baseTimer={this.state.baseTimer}
                        timer={this.state.timer}
                        setMode={this.setMode}
                        skip={this.answer}
                    />
                )}

                {this.state.mode !== null && (
                    <Reponses
                        answer={this.answer}
                        mode={this.state.mode}
                        isAnswered={this.state.isAnswered}
                        question={this.props.questionToDisplay}
                    />
                )}
            </QUESTION_INTERFACE>
        );
    }
}
