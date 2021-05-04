import React, { Component } from 'react';
import { ROOT_API } from '../statics';
import axios from "../axios";
import { Container, Form, FormGroup, Label, Input, Button } from 'reactstrap';
import NavBar from "../Components/NavBar";
import Loading from "./Loading";
class SignUp extends Component {

    state = {
        name: '',
        email: '',
        hashPassword: '',
        avatar: '',
        intro: '',
        review: [],
        loading: false
    }

    handleSubmit = (event) => {
        this.setState({
            loading: true,

        });
        event.preventDefault();
        const userData = {
            name: this.state.name,
            email: this.state.email,
            password: this.state.password,
            avatar: this.state.avatar,
            intro: this.state.intro,
            review: this.state.review
        }
        axios
            .post(`${ROOT_API}/api/users`, userData)
            .then(response => {
                console.log(response.data);
                if (response.data.success) {

                    this.setState({
                        visible: true,
                        loading: false
                    });
                    window.location.href = "/";
                }
            })
            .catch(err => console.log(err))
    }

    handleInputChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    render() {
        const {loading} = this.state;
        return (
            <div>

                <NavBar
                    onSearchChanged={this._onSearchChanged}
                    onNameSignin={this.props.onNameSignin}
                    onCMTSignin={this.props.onCMTSignin}
                    username={this.props.username}
                    onLogin={this.props.onLogin}
                />
                {loading ? <div className="text-center"><Loading /></div>
                    :
                    <Container>

                        <h3 className="mt-5 ml-2">Add user Information: </h3>
                        <Form className="mt-2" onSubmit={this.handleSubmit}>
                            <FormGroup>
                                <Label>Name: </Label>
                                <Input name="name" placeholder="Enter name" onChange={this.handleInputChange} />
                            </FormGroup>
                            <FormGroup>
                                <Label>Email: </Label>
                                <Input name="email" placeholder="Enter email" onChange={this.handleInputChange} />
                            </FormGroup>
                            <FormGroup>
                                <Label> Password: </Label>
                                <Input name="password" type="text" placeholder="Enter pass" onChange={this.handleInputChange} />
                            </FormGroup>
                            <FormGroup>
                                <Label>Introduction: </Label>
                                <Input name="intro" type="text" placeholder="About yourself" onChange={this.handleInputChange} />
                            </FormGroup>
                            <div className="d-flex justify-content-center">
                                <Button color="primary">Submit</Button>
                            </div>
                        </Form>
                    </Container>
                }
            </div>
        );
    }
}

export default SignUp;