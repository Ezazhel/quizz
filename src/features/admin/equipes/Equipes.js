import React from "react";
import { Field, Formik } from "formik";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import * as DAOEquipe from "../../../core/dao/DAOEquipes";
import { LIST_CONTAINER, LIST_ITEM } from "../../../components/StyleFile";
const EquipesForm = (props) => {
    return (
        <div>
            <h3> Listes des équipes </h3>
            <Formik
                initialValues={{
                    name: props.equipe?.name ?? "",
                    id: props.equipe?.id ?? null,
                }}
                enableReinitialize={true}
                onSubmit={props.submit}
            >
                {({ values, handleSubmit, isSubmitting }) => (
                    <Form onSubmit={handleSubmit} inline className="m-4">
                        <Form.Group>
                            <Form.Label>Nom de l'équipe</Form.Label>
                            <Form.Control
                                as={Field}
                                name="name"
                                required
                                className="ml-2 mr-2"
                            ></Form.Control>
                        </Form.Group>
                        <Button
                            disabled={isSubmitting}
                            type="submit"
                            variant="outline-success"
                        >
                            {values.id === null ? "Créer" : "Editer"}
                        </Button>
                    </Form>
                )}
            </Formik>
        </div>
    );
};

const EquipesList = (props) => {
    return (
        <LIST_CONTAINER>
            {Object.keys(props.equipes).map((id) => (
                <EquipeItem
                    equipe={props.equipes[id]}
                    key={id}
                    isActive={props.selectedEquipe?.id === id}
                    deleteEquipe={props.deleteEquipe}
                    selectEquipe={props.selectEquipe}
                />
            ))}
        </LIST_CONTAINER>
    );
};

const EquipeItem = (props) => {
    return (
        <LIST_ITEM
            className={props.isActive ? "active" : ""}
            onClick={() => props.selectEquipe(props.equipe)}
        >
            <label>{props.equipe.name}</label>
            <Button
                variant="danger"
                type="button"
                onClick={(event) => props.deleteEquipe(props.equipe.id, event)}
            >
                X
            </Button>
        </LIST_ITEM>
    );
};

class EquipePage extends React.Component {
    constructor() {
        super();
        this.state = {
            equipes: DAOEquipe.getAll(),
            selectedEquipe: null,
        };
    }

    createOrUpdateEquipe = (values, action) => {
        DAOEquipe.insertOrUpdate(values);
        this.setState({
            equipes: DAOEquipe.getAll(),
            selectedEquipe: null,
        });
        action.setSubmitting(false);
        action.resetForm();
    };

    deleteEquipe = (id, event) => {
        event.stopPropagation();
        DAOEquipe.deleteEquipe(id);
        this.setState({
            equipes: DAOEquipe.getAll(),
            selectedEquipe:
                id === this.state.selectedEquipe?.id
                    ? null
                    : this.state.selectedEquipe,
        });
    };
    selectEquipe = (equipe) => {
        this.setState({
            selectedEquipe:
                equipe.id === this.state.selectedEquipe?.id ? null : equipe,
        });
    };

    render() {
        return (
            <>
                <Container>
                    <Row>
                        <Col>
                            <EquipesForm
                                equipe={this.state.selectedEquipe}
                                submit={this.createOrUpdateEquipe}
                            />
                            <EquipesList
                                selectedEquipe={this.state.selectedEquipe}
                                equipes={this.state.equipes}
                                deleteEquipe={this.deleteEquipe}
                                selectEquipe={this.selectEquipe}
                            />
                        </Col>
                    </Row>
                </Container>
            </>
        );
    }
}
export default EquipePage;
