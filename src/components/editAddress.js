import React, { Component } from 'react';
import HttpService from '../services/http-service';
import { useHistory } from "react-router-dom";

const http = new HttpService();


export default class editAddress extends Component {
    constructor(props){
        super(props);

        this.state = {
            address : "", 
            city: "",
            state: "",
            postal: "",
            country: ""
        }
        
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
        if(this.props.location.state.userMetadata){
            const {address, city, state, postal, country} = this.props.location.state.userMetadata.address;
            this.setState({ address, city, state, postal, country});
        }
    }

    handleChange(e) {
        const {name, value} = e.target
        this.setState({[name]: value});
    }

    handleSubmit(e){ 
        //let history = useHistory();
        e.preventDefault();
        //update user metadata for address
        http.updateMetadata(this.state);
        //history.push("/profile");
    }

    render() {
        return (
            <div className="container p-5">
                <form onSubmit={this.handleSubmit}>
                    <div className="form-group">
                        <label for="Country">Country</label>
                        <input type="text"
                            className="form-control" name="country" id="country" value={this.state.country} onChange={this.handleChange} aria-describedby="helpId" placeholder="country" required/>
                        
                    </div>

                    <div className="form-group">
                      <label for="Address">Address</label>
                      <input type="text"
                        className="form-control" name="address" id="address" value={this.state.address} onChange={this.handleChange} aria-describedby="helpId" placeholder="Address" required/>
                      
                    </div>

                    <div className="form-group">
                      <label for="city">City</label>
                      <input type="text"
                        className="form-control" name="city" id="city" value={this.state.city} onChange={this.handleChange} aria-describedby="helpId" placeholder="city" required/>
                      
                    </div>

                    <div className="form-group">
                      <label for="stateProvince">State/Province</label>
                      <input type="text"
                        className="form-control" name="state" id="state" value={this.state.state} onChange={this.handleChange} aria-describedby="helpId" placeholder="state" required/>
                      
                    </div>

                    <div className="form-group">
                      <label for="postalCode">Postal code</label>
                      <input type="text"
                        className="form-control" name="postal" id="postal" value={this.state.postal} onChange={this.handleChange} aria-describedby="helpId" placeholder="postal code" required/>
                     
                    </div>

                    <div className="form-group">
                      <label for="phone">Telephone Number</label>
                      <input type="text"
                        className="form-control" name="phone" id="phone" value={this.state.phone} onChange={this.handleChange} aria-describedby="helpId" placeholder=""/>
                     
                    </div>

                    <button type="submit" className="btn btn-primary">Save changes</button>
                </form>
            </div>
        )
    }
}
