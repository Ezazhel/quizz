import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import QuestionForm from "./QuestionForm";
import QuestionsList from "./questionList/QuestionDisplay";
import ThemesList from "./ThemesList";
import * as DaoQuestion from "../../../core/dao/DAOQuestion";
import * as DaoTheme from "../../../core/dao/DAOTheme";

class ThemeQuestion extends React.Component {
    constructor() {
        super();
        this.state = {
            themes: DaoTheme.getThemes(),
            questions: [],
            selectedQuestion: null,
            selectedTheme: null,
        };
    }

    addTheme = (values, actions) => {
        DaoTheme.insertUpdateThemes({
            name: values.theme,
            id: this.state.themes.length,
        });
        this.setState({
            themes: DaoTheme.getThemes(),
        });
        actions.setSubmitting(false);
        actions.resetForm();
    };

    addQuestionToTheme = (values, actions) => {
        DaoQuestion.insertUpdateQuestion({
            themeId: values.themeId,
            id: values.questionId,
            question: values.question,
            bonneReponse: values.bonneReponse,
            autreReponses: values.autreReponses,
        });
        this.setState({
            questions: [...DaoQuestion.getQuestionByTheme(values.themeId)],
            selectedQuestion: null,
        });
        actions.setSubmitting(false);
        actions.resetForm();
    };

    selectTheme = (selectedTheme) => {
        this.setState({
            selectedQuestion:
                this.state.selectedQuestion?.themeId !== selectedTheme.id
                    ? null
                    : this.state.selectedQuestion,
            selectedTheme:
                selectedTheme.id === this.state.selectedTheme?.id
                    ? null
                    : selectedTheme,
            questions: [...DaoQuestion.getQuestionByTheme(selectedTheme.id)],
        });
    };

    editQuestion = (selectedQuestion) => {
        this.setState({
            selectedQuestion:
                this.state.selectedQuestion?.id === selectedQuestion.id
                    ? null
                    : selectedQuestion,
        });
    };

    deleteQuestion = (deletedQuestion) => {
        console.log(deletedQuestion);
        DaoQuestion.deleteQuestionOfTheme(deletedQuestion);
        this.setState({
            questions: DaoQuestion.getQuestionByTheme(deletedQuestion.themeId),
            selectedQuestion:
                deletedQuestion.id === this.state?.selectedQuestion?.id
                    ? null
                    : this.state.selectedQuestion,
        });
    };

    deleteTheme = (deleteTheme, event) => {
        event.stopPropagation();
        DaoTheme.deleteTheme(deleteTheme);
        DaoQuestion.deleteAllQuestionOfTheme(deleteTheme.id);
        this.setState({
            themes: DaoTheme.getThemes(),
            selectedQuestion:
                this.state.selectedQuestion?.themeId === deleteTheme.id
                    ? null
                    : this.state.selectedQuestion,
            selectedTheme:
                deleteTheme.id === this.state.selectedTheme?.id
                    ? null
                    : this.state.selectedTheme,
        });
    };

    render() {
        return (
            <Container fluid className="p-3">
                <Row>
                    <Col md={"3"} className="mx-auto">
                        <ThemesList
                            importThemes={this.importThemes}
                            selectedTheme={this.state.selectedTheme}
                            themes={this.state.themes}
                            selectTheme={this.selectTheme}
                            addTheme={this.addTheme}
                            deleteTheme={this.deleteTheme}
                        ></ThemesList>
                    </Col>
                    {this.state.selectedTheme !== null && (
                        <>
                            <Col className="d-flex justify-content-center">
                                <QuestionForm
                                    submit={this.addQuestionToTheme}
                                    selectedTheme={this.state.selectedTheme}
                                    question={this.state.selectedQuestion}
                                ></QuestionForm>
                            </Col>
                            <Col md="2">
                                <QuestionsList
                                    selectedQuestion={
                                        this.state.selectedQuestion
                                    }
                                    editQuestion={this.editQuestion}
                                    deleteQuestion={this.deleteQuestion}
                                    questions={this.state.questions}
                                ></QuestionsList>
                            </Col>
                        </>
                    )}
                </Row>
            </Container>
        );
    }
}

export default ThemeQuestion;
