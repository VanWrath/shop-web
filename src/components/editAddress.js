import React, { Component } from 'react'

export default class editAddress extends Component {
    constructor(props){
        super(props);

        this.state = {
            address:"",
        }
    }

    handleChange(event, value) {
        this.setState()
    }

    handleSubmit(event){
        //update user metadata for address
        event.preventDefault();
    }

    render() {
        return (
            <div className="container">
                <form>
                    <div class="form-group">
                        <label for="Country">Country</label>
                        <input type="text"
                            class="form-control" name="country" id="country" aria-describedby="helpId" placeholder="country" required/>
                        <small id="helpId" class="form-text text-muted">Input your Country</small>
                    </div>

                    <div class="form-group">
                      <label for="Address">Address</label>
                      <input type="text"
                        class="form-control" name="Address" id="address" aria-describedby="helpId" placeholder="Address" required/>
                      <small id="helpId" class="form-text text-muted">Input your address</small>
                    </div>

                    <div class="form-group">
                      <label for="city">City</label>
                      <input type="text"
                        class="form-control" name="city" id="city" aria-describedby="helpId" placeholder="city" required/>
                      <small id="helpId" class="form-text text-muted">Input your city</small>
                    </div>

                    <div class="form-group">
                      <label for="stateProvince">State/Province</label>
                      <input type="text"
                        class="form-control" name="state" id="state" aria-describedby="helpId" placeholder="state" required/>
                      <small id="helpId" class="form-text text-muted">Input your state/province</small>
                    </div>

                    <div class="form-group">
                      <label for="postalCode">Postal code</label>
                      <input type="text"
                        class="form-control" name="postal" id="postal" aria-describedby="helpId" placeholder="postal code" required/>
                      <small id="helpId" class="form-text text-muted">Enter postal code</small>
                    </div>

                    <div class="form-group">
                      <label for="phone">Telephone Number</label>
                      <input type="text"
                        class="form-control" name="phone" id="phone" aria-describedby="helpId" placeholder=""/>
                      <small id="helpId" class="form-text text-muted">Enter your phone number</small>
                    </div>

                    <button type="submit" class="btn btn-primary">Save changes</button>
                </form>
            </div>
        )
    }
}
