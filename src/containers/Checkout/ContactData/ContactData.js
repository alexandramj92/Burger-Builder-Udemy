import React, {Component} from 'react';

import Button from '../../../components/UI/Button/Button';
import axios from '../../../axios-orders';
import Spinner from '../../../components/UI/Spinner/Spinner';

import classes from './ContactData.css';

class ContactData extends Component {
    state = {
        name: '',
        email: '',
        address: {
            street: '',
            postalCode: ''
        },
        loading: false
    }

    orderHandler = (event) => {
        event.preventDefault();
        console.log(this.props.ingredients);
        this.setState({loading: true});
        const order = {
            ingredients: this.props.ingredients,
            price: this.state.price,
            customer: {
                name: 'Alexandra Jackson',
                address: {
                    street: 'Test Street',
                    zipCode: '90212',
                    country: 'United States'
                },
                email: 'test@gmail.com'
            },
            deliveryMethod: 'fastest'
        }
        axios.post('/orders.json', order)
            .then(response => {
                this.setState({loading: false});
                this.props.history.push('/');
            } )
            .catch(error => {
                this.setState({loading: false});
            } );
    }

    render () {
        let form = (
            <form>
            <input className={classes.Input} type="text" name="name" placeholder="Your name"></input>
            <input className={classes.Input} type="email" name="email" placeholder="Your mail"></input>
            <input className={classes.Input} type="text" name="street" placeholder="Street"></input>
            <input className={classes.Input} type="text" name="postal" placeholder="Postal code"></input>
            <Button btnType="Success" clicked={this.orderHandler}>ORDER</Button>
            </form>
        );
        if (this.state.loading) {
            form = <Spinner />;
        }
        return (
            <div className={classes.ContactData}>
                <h4>Enter your Contact Data</h4>
                   {form}
            </div>
        )
    }
}



export default ContactData;