import React from "react";
import { Col, Container } from "react-bootstrap";
import * as DAOEquipe from "../../core/dao/DAOEquipes";
import * as DAOQuestion from "../../core/dao/DAOQuestion";
import EquipesList from "./equipesList/EquipesList";
import ThemeList from "./themesList/ThemeList";
import GameInterface from "./gameInterface/GameInterface";

export default class Game extends React.Component {
    constructor() {
        super();
        this.state = {
            equipes: DAOEquipe.getAll(),
            selectedEquipe: null,
            selectedTheme: null,
            questions: [],
            currentQuestionIndex: 0,
        };
    }
    initialize = () => {
        this.setState({
            selectedEquipe: null,
            selectedTheme: null,
            questions: [],
            currentQuestionIndex: 0,
        });
    };

    selectTheme = (theme) => {
        const themeQuestions = DAOQuestion.getQuestionByTheme(theme.id);
        const questions = Object.keys(themeQuestions).map(
            (v) => themeQuestions[v]
        );
        this.setState({
            selectedTheme: theme,
            questions: questions,
            currentQuestion: 0,
        });
    };

    selectEquipe = (equipe) => {
        // if (this.state.selectedEquipe !== null) return;
        this.setState({
            selectedEquipe: equipe,
        });
    };

    finish = (victory = false, mode) => {
        let equipe = this.state.equipes[this.state?.selectedEquipe?.id];
        if (victory) equipe.score += mode.score;
        this.setState({
            equipes: {
                ...this.state.equipes,
                [this.state.selectedEquipe.id]: equipe,
            },
            selectedEquipe: equipe,
        });
        //check end of question (if no more questions)
        console.log(this.state.currentQuestionIndex);
        console.log(this.state.questions.length - 1);

        this.state.currentQuestionIndex !== this.state.questions.length - 1
            ? this.changeQuestionAndRemoveQuestionFromArray()
            : this.initialize();
    };

    changeQuestionAndRemoveQuestionFromArray() {
        this.setState({
            currentQuestionIndex: Math.min(
                this.state.currentQuestionIndex + 1,
                this.state.questions.length - 1
            ),
        });
    }

    render() {
        return (
            <Container fluid className="d-flex flex-column">
                <div className="d-flex flex-row justify-content-between mt-4">
                    <Col md="3" className="d-flex">
                        <ThemeList
                            selectedTheme={this.state.selectedTheme}
                            selectTheme={this.selectTheme}
                        />
                    </Col>
                    <Col>
                        <GameInterface
                            theme={this.state.theme}
                            equipe={this.state.selectedEquipe}
                            canLaunch={
                                this.state.selectedTheme !== null &&
                                this.state.selectedEquipe !== null
                            }
                            questionToDisplay={
                                this.state.questions[
                                    this.state.currentQuestionIndex
                                ]
                            }
                            finish={this.finish}
                        />
                    </Col>
                    <Col md="2" className="shadow-game d-flex rounded bg-ligth">
                        <EquipesList
                            equipes={this.state.equipes}
                            selectEquipe={this.selectEquipe}
                            selectedEquipe={this.state.selectedEquipe}
                        />
                    </Col>
                </div>
            </Container>
        );
    }
}
