import React from "react";
import styled from "styled-components";
import { Form, Button } from "react-bootstrap";
import { Formik, Field } from "formik";

const CONTAINER = styled.div`
    background: #5c6a79;
    height: auto;
    width: 90%;
    border-radius: 5px;
    margin: 5em auto;
    color: snow;
    -webkit-box-shadow: 0px 0px 5px 0px rgba(0, 0, 0, 0.4);
    -moz-box-shadow: 0px 0px 5px 0px rgba(0, 0, 0, 0.4);
    box-shadow: 0px 0px 5px 0px rgba(0, 0, 0, 0.4);

    @media (min-width: 786px) {
        width: 60%;
    }

    label {
        color: #bdc3c7;
        font-size: 1.2em;
        font-weight: 400;
    }

    h1 {
        color: #bdc3c7;
        padding-top: 0.5em;
    }

    .form-group {
        margin-bottom: 2.5em;
    }
`;
const MYFORM = styled(Form)`
    width: 90%;
    text-align: left;
    padding-top: 2em;
    padding-bottom: 2em;

    @media (min-width: 786px) {
        width: 50%;
    }
`;

const BUTTON = styled(Button)`
    font-size: 1.2em;
    font-weight: 400;
`;

const QuestionForm = (props) => {
    return (
        <CONTAINER>
            <Formik
                initialValues={{
                    question: props.question?.question ?? "",
                    questionId: props.question?.id ?? null,
                    bonneReponse: props.question?.bonneReponse ?? "",
                    autreReponses: props.question?.autreReponses ?? "",
                    themeId: props.selectedTheme.id,
                }}
                enableReinitialize={true}
                onSubmit={props.submit}
            >
                {({
                    values,
                    handleChange,
                    handleBlur,
                    handleSubmit,
                    isSubmitting,
                }) => (
                    <MYFORM className="mx-auto" onSubmit={handleSubmit}>
                        <Form.Group controlId="formTheme">
                            <Form.Label>
                                <h5>Thème : {props.selectedTheme.name}</h5>
                            </Form.Label>
                        </Form.Group>
                        <Form.Group controlId="formQuestion">
                            <Form.Label>Question :</Form.Label>
                            <Form.Control
                                as="textarea"
                                name="question"
                                placeholder="Le texte de ta question, ce qui va s'afficher à l'écran des joueurs"
                                onChange={handleChange}
                                required
                                onBlur={handleBlur}
                                value={values.question}
                            />
                        </Form.Group>
                        <Form.Group controlId="formBonneReponse">
                            <Form.Label>Bonne réponse :</Form.Label>
                            <Form.Control
                                as={Field}
                                name="bonneReponse"
                                required
                                placeholder="Pas de secret, écris la bonne réponse"
                            />
                        </Form.Group>
                        <Form.Group controlId="formAutreReponses">
                            <Form.Label>Autres réponses :</Form.Label>
                            <Form.Control
                                as={Field}
                                name="autreReponses"
                                placeholder="Sépare les réponses par des ';'"
                                required
                            />
                        </Form.Group>
                        <BUTTON
                            type="submit"
                            variant="outline-success"
                            disabled={isSubmitting}
                        >
                            {values.questionId !== null
                                ? "Editer la question"
                                : "Ajouter la question au thème"}
                        </BUTTON>
                    </MYFORM>
                )}
            </Formik>
        </CONTAINER>
    );
};

export default QuestionForm;
