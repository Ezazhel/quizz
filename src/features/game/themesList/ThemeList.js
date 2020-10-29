import React from "react";
import { Button } from "react-bootstrap";
import * as DAOTheme from "../../../core/dao/DAOTheme";
import { LIST_ITEM, LIST_CONTAINER } from "../../../components/StyleFile";

const sortByName = (a, b, object) =>
    object[a].name > object[b].name
        ? 1
        : object[b].name > object[a].name
        ? -1
        : 0;
const ListOfThemePickable = (props) => {
    return (
        <LIST_CONTAINER>
            {Object.keys(props.themesToPickFrom)
                .sort((a, b) => sortByName(a, b, props.themesToPickFrom))
                .map((v, i) => (
                    <LIST_ITEM
                        key={v}
                        onClick={() =>
                            !props.isBuilding
                                ? props.selectTheme(props.themesToPickFrom[v])
                                : false
                        }
                    >
                        <label>{props.themesToPickFrom[v].name}</label>
                        {props.isBuilding && (
                            <Button
                                variant="danger"
                                onClick={() => props.removeThemeFromList(v)}
                            >
                                X
                            </Button>
                        )}
                    </LIST_ITEM>
                ))}
            {Object.keys(props.themesToPickFrom).length > 0 &&
                props.isBuilding && (
                    <Button
                        variant="outline-success"
                        onClick={props.finalizeBuilding}
                    >
                        Finaliser la liste
                    </Button>
                )}
        </LIST_CONTAINER>
    );
};

const BuildingList = (props) => {
    return !props.isBuilding ? (
        <Button variant="outline-primary" onClick={props.setIsBuilding}>
            Création listes des thèmes
        </Button>
    ) : (
        <select
            onChange={props.addBuildingThemes}
            value=""
            className="form-control"
        >
            <option value="" disabled>
                Au clique sur un thème, celui-ci est choisi
            </option>
            {Object.keys(props.allThemes)
                .sort((a, b) => sortByName(a, b, props.allThemes))
                .map((v, i) => (
                    <option key={v} value={v}>
                        {props.allThemes[v].name}
                    </option>
                ))}
        </select>
    );
};
export default class ThemeList extends React.Component {
    constructor(props) {
        super();
        this.state = {
            isBuilding: false,
            themesToPickFrom: {},
            choixTheme: false,
            allThemes: DAOTheme.getThemes(),
            isLoaded: false,
        };
    }
    update;
    // componentDidMount() {
    //     const objectThemeList = JSON.parse(localStorage.getItem("ThemeList"));
    //     this.setState({
    //         isLoaded: true,
    //         ...objectThemeList,
    //     });
    // }
    removeThemeFromList = (themeId) => {
        const allThemes = {
            ...this.state.allThemes,
            [themeId]: this.state.themesToPickFrom[themeId],
        };
        let newBuildingThemesArray = this.state.themesToPickFrom;
        delete newBuildingThemesArray[themeId];

        this.setState({
            themesToPickFrom: newBuildingThemesArray,
            allThemes,
        });
    };

    addBuildingThemes = (event) => {
        const themeId = event.target.value;
        this.setState(
            {
                themesToPickFrom: {
                    ...this.state.themesToPickFrom,
                    [themeId]: this.state.allThemes[themeId],
                },
            },
            () => {
                const allThemesWithoutAddedTheme = this.state.allThemes;
                delete allThemesWithoutAddedTheme[themeId];
                this.setState({
                    allThemes: allThemesWithoutAddedTheme,
                });
            }
        );
    };

    setIsBuilding = () => {
        this.setState({
            isBuilding: true,
        });
    };

    finalizeBuilding = () => {
        this.setState({
            isBuilding: false,
            choixTheme: false,
        });
    };

    displayThemes = () => {
        this.setState({
            choixTheme: true,
        });
    };

    selectTheme = (theme) => {
        delete this.state.themesToPickFrom[theme.id];
        this.setState({
            choixTheme: false,
        });
        this.props.selectTheme(theme);
    };
    render() {
        return (
            <div className="d-flex flex-column flex-grow-1 m-3 shadow-game">
                <h2 className="text-center">
                    {this.props.selectedTheme?.name ?? ""}
                </h2>
                <div className="d-flex justify-content-around">
                    {Object.keys(this.state.themesToPickFrom).length > 0 &&
                    !this.state.isBuilding ? (
                        <Button
                            variant="outline-primary"
                            onClick={this.displayThemes}
                        >
                            Selectionner un thème
                        </Button>
                    ) : (
                        <BuildingList
                            isBuilding={this.state.isBuilding}
                            setIsBuilding={this.setIsBuilding}
                            addBuildingThemes={this.addBuildingThemes}
                            allThemes={this.state.allThemes}
                        />
                    )}
                </div>
                <div>
                    {(this.state.choixTheme || this.state.isBuilding) && (
                        <ListOfThemePickable
                            validateList={this.addBuildingThemes}
                            finalizeBuilding={this.finalizeBuilding}
                            selectTheme={this.selectTheme}
                            themesToPickFrom={this.state.themesToPickFrom}
                            removeThemeFromList={this.removeThemeFromList}
                            isBuilding={this.state.isBuilding}
                        />
                    )}
                </div>
            </div>
        );
    }
}
