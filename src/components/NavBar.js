import React from "react";
import { Navbar, NavDropdown } from "react-bootstrap";
import Nav from "react-bootstrap/Nav";
import { Link } from "react-router-dom";
const HeaderNavigation = (props) => (
    <>
        <Navbar bg="dark" variant="dark">
            <Navbar.Brand as={Link} to="/">
                {" "}
                Rift's Quizz{" "}
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto">
                    <NavDropdown title="Admin" id="admin-dropdown">
                        <NavDropdown.Item as={Link} to="/admin/themesQuestions">
                            {" "}
                            Thèmes et Questions{" "}
                        </NavDropdown.Item>
                        <NavDropdown.Item as={Link} to="/admin/equipes">
                            {" "}
                            Equipes{" "}
                        </NavDropdown.Item>
                    </NavDropdown>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    </>
);
export default HeaderNavigation;
