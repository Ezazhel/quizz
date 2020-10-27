import { Field, Formik } from "formik";
import React from "react";
import { Button, Form, ListGroup } from "react-bootstrap";
import { LIST_CONTAINER, LIST_ITEM } from "../../../components/StyleFile";
const ThemesList = (props) => (
    <div>
        <h3> Listes des Thèmes </h3>{" "}
        <Button onClick={props.importThemes}> Importation des thèmes</Button>
        <div>
            <Formik initialValues={{ theme: "" }} onSubmit={props.addTheme}>
                {({ handleSubmit, isSubmitting }) => (
                    <Form onSubmit={handleSubmit} inline className="m-4">
                        <Form.Group>
                            <Form.Control
                                as={Field}
                                name="theme"
                                className="ml-2 mr-2"
                                placeholder="Nom du thème"
                                required
                            />
                        </Form.Group>
                        <Button
                            disabled={isSubmitting}
                            type="submit"
                            variant="outline-success"
                        >
                            Ajouter un Thème
                        </Button>
                    </Form>
                )}
            </Formik>
        </div>
        <LIST_CONTAINER>
            {Object.keys(props.themes).map((themeId) => (
                <ThemeItem
                    theme={props.themes[themeId]}
                    key={themeId}
                    isActive={
                        props.selectedTheme !== null &&
                        props.selectedTheme.id === themeId
                    }
                    selectTheme={() => props.selectTheme(props.themes[themeId])}
                    deleteTheme={props.deleteTheme}
                />
            ))}
        </LIST_CONTAINER>
        <ListGroup as="ul"></ListGroup>
    </div>
);

const ThemeItem = (props) => (
    <LIST_ITEM
        className={` ${props.isActive ? "active" : ""}`}
        onClick={props.selectTheme}
    >
        <label>{props.theme.name}</label>
        <Button
            className="align-self-end"
            variant="danger"
            onClick={(e) => props.deleteTheme(props.theme, e)}
        >
            X
        </Button>
    </LIST_ITEM>
);

export default ThemesList;
