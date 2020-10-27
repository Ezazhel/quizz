import React from "react";
import { Col, Container } from "react-bootstrap";
import * as DAOEquipe from "../../core/dao/DAOEquipes";
import * as DAOQuestion from "../../core/dao/DAOQuestion";
import EquipesList from "./equipesList/EquipesList";
import ThemeList from "./themesList/ThemeList";
import GameInterface from "./gameInterface/GameInterface";

const GAME = "game";
export default class Game extends React.Component {
    constructor() {
        super();
        this.state = {
            equipes: DAOEquipe.getAll(),
            selectedEquipe: null,
            selectedTheme: null,
            questions: [],
            currentQuestionIndex: 0,
            isLoaded: false,
        };
    }

    updateStateAndSave(object) {
        this.setState({ ...object }, () => {
            localStorage.setItem(GAME, JSON.stringify(this.state));
        });
    }
    componentDidMount() {
        this.loadGameStateFromLocalStorageIfExistElseCreate();
    }
    loadGameStateFromLocalStorageIfExistElseCreate() {
        const objectGame =
            JSON.parse(localStorage.getItem(GAME)) ?? this.initialize();
        this.setState({
            isLoaded: true,
            ...objectGame,
        });
    }

    initialize = () => {
        return {
            selectedEquipe: null,
            selectedTheme: null,
            questions: [],
            currentQuestionIndex: 0,
        };
    };

    selectTheme = (theme) => {
        const themeQuestions = DAOQuestion.getQuestionByTheme(theme.id);
        const questions = Object.keys(themeQuestions).map(
            (v) => themeQuestions[v]
        );
        this.updateStateAndSave({
            selectedTheme: theme,
            questions: questions,
            currentQuestionIndex: 0,
        });
    };

    selectEquipe = (equipe) => {
        this.updateStateAndSave({ selectedEquipe: equipe });
    };

    finish = (bonneReponse = false, mode) => {
        let newState = this.setNewScore(bonneReponse, mode);
        newState = {
            ...newState,
            ...(this.state.currentQuestionIndex !==
            this.state.questions.length - 1
                ? this.changeQuestionAndRemoveQuestionFromArray()
                : this.initialize()),
        };

        this.updateStateAndSave(newState);
    };

    giveBonusOrMalusSelectedEquipe = (e) => {
        e.stopPropagation();
        console.log(e.target.dataset.idEquipe);
        let equipe = this.state.equipes[e.target.dataset.idEquipe];
        equipe.score += parseInt(e.target.dataset.value);
        this.updateStateAndSave({
            equipes: { ...this.state.equipes, [equipe.id]: equipe },
        });
    };

    setNewScore = (bonneReponse = false, mode) => {
        let equipe = this.state.equipes[this.state?.selectedEquipe?.id];
        equipe.score = bonneReponse ? equipe.score + mode.score : equipe.score;
        return {
            equipes: {
                ...this.state.equipes,
                [this.state.selectedEquipe.id]: equipe,
            },
            selectedEquipe: equipe,
        };
    };
    changeQuestionAndRemoveQuestionFromArray = () => {
        return {
            currentQuestionIndex: Math.min(
                this.state.currentQuestionIndex + 1,
                this.state.questions.length - 1
            ),
        };
    };

    render() {
        return this.state.isLoaded ? (
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
                    <Col md="3" className="d-flex rounded bg-ligth">
                        <EquipesList
                            equipes={this.state.equipes}
                            selectEquipe={this.selectEquipe}
                            selectedEquipe={this.state.selectedEquipe}
                            giveBonusOrMalusSelectedEquipe={
                                this.giveBonusOrMalusSelectedEquipe
                            }
                        />
                    </Col>
                </div>
            </Container>
        ) : (
            <h2> En chargement </h2>
        );
    }
}
