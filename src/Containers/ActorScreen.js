import React, { Component } from "react";

import axios from "../axios";
import { ROOT_API } from '../statics';
import Page from "../Components/Page";
import Sort from "../Components/Sort";
import NavBar from "../Components/NavBar";
import ActorContent from "../Components/ActorContent";

class ActorScreen extends Component {
    state = {
        actors: [],
        searchString: "",

        pageNumber: 1,
        sortNumber: 1,
        total: 0
    };

    componentDidMount() {
        axios
            .get(`${ROOT_API}/api/actors?page=${this.state.pageNumber}&sort=${this.state.sortNumber}`)
            .then(response => {
                console.log(response.data);
                this.setState({
                    actors: response.data.actors,
                    total: response.data.total
                });
            })
            .catch(err => console.error(err));
    }
    changePage = (pageNumber) => {
        axios
            .get(`${ROOT_API}/api/actors?page=${pageNumber}&sort=${this.state.sortNumber}`)
            .then(response => {
                this.setState({
                    actors: response.data.actors,
                    pageNumber
                });
            })
            .catch(err => console.error(err));
    }
    changeSort = (sortNumber) => {
        axios
            .get(`${ROOT_API}/api/actors?page=${this.state.pageNumber}&sort=${sortNumber}`)
            .then(response => {
                this.setState({
                    actors: response.data.actors,
                    sortNumber
                });
                console.log(this.state.sortNumber);

            })
            .catch(err => console.error(err));
    }
    _onSearchChanged = text => this.setState({ searchString: text });

    render() {
        const displayedActorImages = this.state.actors.filter(
            actor =>

                actor.name.toLowerCase().includes(this.state.searchString)
                ||
                actor.nationality.toLowerCase().includes(this.state.searchString) ||
                actor.dob.includes(this.state.searchString)
        );


        return (
            <div>
                <NavBar

                    onSearchChanged={this._onSearchChanged}
                    onNameSignin={this.props.onNameSignin}
                    onCMTSignin={this.props.onCMTSignin}
                    username={this.props.username}
                    onLogin={this.props.onLogin}
                />
                <Sort changeSort={this.changeSort} />
                <ActorContent actors={displayedActorImages} />
                <Page
                    total={this.state.total}
                    currentPage={this.state.pageNumber} changePage={this.changePage} />
                {/* <ActorContent actors={this.state.actors} /> */}
            </div>
        );
    }
}

export default ActorScreen;