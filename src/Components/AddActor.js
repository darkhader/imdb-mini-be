import React, { Component } from 'react';
import axios from "../axios";
import axiosNative from 'axios';
import { Container, Form, FormGroup, Label, Input, Button } from 'reactstrap';
import "../App.css";
import { ROOT_API } from '../statics';
import NavBar from "../Components/NavBar";
import S3 from 'react-aws-s3';
const config = {
    bucketName: 'imdb-mini',
    region: 'ap-southeast-1',
    accessKeyId: 'AKIASQJBPNK4TQQOGS66',
    secretAccessKey: '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',
}
const ReactS3Client = new S3(config);
class AddActor extends Component {

    constructor(props) {
        super(props);
        this.state = {
            name: '',
            file: '',
            image: '',
            dob: '',
            nationality: ''

        }

    }
    handleSubmit = (event) => {
        event.preventDefault();
        const actorData = {
            name: this.state.name,

            image: this.state.image,
            dob: this.state.dob,

            nationality: this.state.nationality
        }
        let formData = new FormData();
        console.log(this.state.file)
        formData.append("file", this.state.file);

        ReactS3Client
        .uploadFile(this.state.file)
        .then(response => {
            let imgUrl = response.location;
            actorData.image = imgUrl;
            axios
                .post(`${ROOT_API}/api/actors`, actorData)
                .then(response => {

                    console.log(response.data);
                    if (response.data.success) {
                        window.location.href = "https://imdb-mini.xyz/addNew";
                    }
                })
                .catch(err => console.log(err))
        })



    }

    handleInputChange = (event) => {
        console.log(event.target)
        if (event.target.files) {
            console.log(event.target.files)
            this.setState({
                [event.target.name]: event.target.files[0]
            })
        } else this.setState({
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



                    <h1 className="row12 col-12 text-light">Add New Actor's Information: </h1>
                    <Form className="row32 col-6 text-light" onSubmit={this.handleSubmit}>
                        <FormGroup>
                            <Label>Actor's Name: </Label>
                            <Input name="name" placeholder="Enter name" onChange={this.handleInputChange} />
                        </FormGroup>

                        <FormGroup>
                            <Label> Image: </Label>
                            <Input name="file" type="file" placeholder="Enter a link" onChange={this.handleInputChange} />
                        </FormGroup>
                        <FormGroup>
                            <Label>Date of Birth: </Label>
                            <Input name="dob" type="text" onChange={this.handleInputChange} />
                        </FormGroup>
                        <FormGroup>
                            <Label>Nationality: </Label>
                            <Input name="nationality" type="text" onChange={this.handleInputChange} />
                        </FormGroup>
                        <div className="d-flex justify-content-center">
                            <Button color="primary">Submit</Button>
                        </div>
                    </Form>
                </Container>
            </div>
        );
    }
}

export default AddActor;  