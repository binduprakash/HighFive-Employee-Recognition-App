import React, { Component } from "react";
import { Button, FormGroup, FormControl, FormLabel } from "react-bootstrap";
import API from '../api';
require('../styles/login.css')

export default class Login extends Component {
    constructor(props) {
        super(props);
  
        this.state = {
            email: "",
            password: "",
        };
    }
  
    validateForm() {
        return this.state.email.length > 0 && this.state.password.length > 0;
    }
  
    handleChange = event => {
        this.setState({
            [event.target.id]: event.target.value
        });
    }
  
    handleSubmit = async event => {
        event.preventDefault();
        try {
            const response = await API.post('authenticate', {
                email: this.state.email,
                password: this.state.password
            });
            if (response.data['isAuthenticated']){
                this.props.userHasAuthenticated(
                    response.data['isAuthenticated'],
                    response.data['employee_id'],
                    response.data['img_url'],
                    {
                        firstName: response.data['first_name'],
                        lastName: response.data['last_name'],
                        title: response.data['title'],
                        department:  response.data['department'],
                    }
                );
                this.props.history.push("/");
            }  
        } catch (e) {
            alert(e.message);
        }
    }
  
    render() {
        return (
            <div className="Login">
                <form onSubmit={this.handleSubmit}>
                    <FormGroup controlId="email" bssize="large">
                        <FormLabel>Email</FormLabel>
                        <FormControl
                            autoFocus
                            type="email"
                            value={this.state.email}
                            onChange={this.handleChange}
                        />
                    </FormGroup>
                    <FormGroup controlId="password" bssize="large">
                        <FormLabel>Password</FormLabel>
                        <FormControl
                            value={this.state.password}
                            onChange={this.handleChange}
                            type="password"
                        />
                    </FormGroup>
                    <Button
                        block
                        bssize="large"
                        disabled={!this.validateForm()}
                        type="submit"
                    >
                        Login
                    </Button>
                </form>
            </div>
        );
    }
}