import React from 'react';
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';

export default class Sort extends React.Component {

    handleInputChange = (event) => {
        console.log(event.target.value)
   
            
            this.props.changeSort(event.target.value)
        

    }
    render() {
        return (
            <div className="row">
            <div className="col-11 d-flex justify-content-end">
                <FormGroup>
                    <Label for="exampleSelect">Sắp xếp</Label>
                    <Input xs="3" type="select" name="select" id="exampleSelect" onChange={this.handleInputChange}>
                        <option value="1">1.Sắp xếp theo tên</option>
                        <option value="2">2.Sắp xếp theo năm</option>
                        <option  value="3">3.Sắp xếp theo lượt like</option>
                        <option  value="4">4.Sắp xếp theo mới</option>

                    </Input>
                </FormGroup>
            </div>
            </div>

        )
    }
}