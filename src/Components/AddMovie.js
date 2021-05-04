import React, { Component } from 'react';
import axios from "../axios";
import { Container, Form, FormGroup, Label, Input, Button } from 'reactstrap';
import "../App.css";
import { ROOT_API } from '../statics';
import NavBar from "../Components/NavBar";
import axiosNative from 'axios';
class AddMovie extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: '',
            description: '',
            image: '',
            duration: '',
            year: '',
            review: [],
            actor: []
        }
    }
    handleSubmit = (event) => {
        event.preventDefault();
        const movieData = {
            title: this.state.title,
            description: this.state.description,
            image: this.state.image,
            duration: this.state.duration,
            year: this.state.year,
            review: this.state.review,
            actor: this.state.actor
        }
        let formData = new FormData();
        formData.append("file", this.state.file);
        axiosNative({
            url: "https://upload.techkids.vn/upload",
            method: "POST",
            data: formData
        }).then(response => {
            let imgUrl = response.data;
            movieData.image = imgUrl;
            axios
                .post(`${ROOT_API}/api/movies`, movieData)
                .then(response => {
                    console.log(response.data);
                    if (response.data.success) {
                        window.location.href = "https://imdb-mini.xyz/createNew";
                    }
                })
                .catch(err => console.log(err))
        })
    }

    handleInputChange = (event) => {
        if (event.target.files) {
            console.log(event.target.files)
            this.setState({
                [event.target.name]: event.target.files[0]
            })
        } else
            this.setState({
                [event.target.name]: event.target.value
            })
    }

    render() {
        return (
            <div>
                <NavBar
                    onSearchChanged={this._onSearchChanged}
                    onNameSignin={this.props.onNameSignin}
                    onCMTSignin={this.props.onCMTSignin}
                    username={this.props.username}
                    onLogin={this.props.onLogin}
                />
                <Container>



                    <h1 className="row12 col-12 text-light">Add New Movie's Information: </h1>
                    <Form className="row32 col-6 text-light" onSubmit={this.handleSubmit}>
                        <FormGroup>
                            <Label>Movie's Name: </Label>
                            <Input name="title" placeholder="Enter title" onChange={this.handleInputChange} />
                        </FormGroup>
                        <FormGroup>
                            <Label>Description: </Label>
                            <Input name="description" placeholder="tell me" onChange={this.handleInputChange} />
                        </FormGroup>
                        <FormGroup>
                            <Label> Image: </Label>
                            <Input name="file" type="file" placeholder="Enter a link" onChange={this.handleInputChange} />
                        </FormGroup>
                        <FormGroup>
                            <Label>Duration: </Label>
                            <Input name="duration" type="text" onChange={this.handleInputChange} />
                        </FormGroup>
                        <FormGroup>
                            <Label>Year: </Label>
                            <Input name="year" type="number" onChange={this.handleInputChange} />
                        </FormGroup>
                        <div className="d-flex justify-content-center">
                            <Button color="primary">Submit</Button>
                        </div>
                    </Form>
                </Container>
            </div >
        );
    }
}

export default AddMovie;  