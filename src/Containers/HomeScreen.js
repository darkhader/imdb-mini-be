import React, { Component } from "react";

import axios from "../axios";
import { ROOT_API } from '../statics';

import MainContent from "../Components/MainContent";
import Page from "../Components/Page";
import Sort from "../Components/Sort";
import NavBar from "../Components/NavBar";
class HomeScreen extends Component {
    state = {
        movies: [],
        searchString: "",
        addActor: "",
        pageNumber: 1,
        sortNumber: 1,
        total: 0
    };
  
    componentDidMount() {
        // this.setState({ searchString: this.props.onSearchChanged });
       

        axios
            .get(`${ROOT_API}/api/movies?page=${this.state.pageNumber}&sort=${this.state.sortNumber}`)
            .then(response => {
                
                this.setState({
                    movies: response.data.movies,
                    total: response.data.total,
                    
                });

            })
            .catch(err => console.error(err));
    }

  



    changePage = (pageNumber) => {
        axios
            .get(`${ROOT_API}/api/movies?page=${pageNumber}&sort=${this.state.sortNumber}`)
            .then(response => {
                this.setState({
                    movies: response.data.movies,
                    pageNumber
                });
            })
            .catch(err => console.error(err));
    }
    changeSort = (sortNumber) => {
        axios
            .get(`${ROOT_API}/api/movies?page=${this.state.pageNumber}&sort=${sortNumber}`)
            .then(response => {
                this.setState({
                    movies: response.data.movies,
                    sortNumber
                });
              

            })
            .catch(err => console.error(err));
    }
    _onSearchChanged = text => this.setState({ searchString: text });
    render() {
       

        const displayedMovieImages = this.state.movies.filter(
            movie =>
                movie.title.toLowerCase().includes(this.state.searchString) ||
                movie.description.toLowerCase().includes(this.state.searchString) ||
                movie.year.includes(this.state.searchString)
        );



        return (
            <div >
                <NavBar

                    onSearchChanged={this._onSearchChanged}
                    onNameSignin={this.props.onNameSignin}
                    onCMTSignin={this.props.onCMTSignin}
                    username={this.props.username}
                    onLogin={this.props.onLogin}
                />
                <Sort changeSort={this.changeSort} />
                <MainContent
                    addActor={this.addActor}
                    movies={displayedMovieImages} />
                {/* <MainContent movies={this.state.movies} /> */}
                <Page total={this.state.total} currentPage={this.state.pageNumber} changePage={this.changePage} />
            </div>
        );
    }
}


export default HomeScreen;