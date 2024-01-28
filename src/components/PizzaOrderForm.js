
import React, { useState } from 'react';
import { connect } from 'react-redux';
import '../componentStyles/OrderYourPizza.css';

const PizzaOrderForm = ({ handlePlaceOrder }) => {
    const [newOrder, setNewOrder] = useState({
        type: 'Veg',
        size: 'Medium',
        base: 'Thin',
    });
    
    const handleChange = (e) => {
        setNewOrder({
            ...newOrder,
            [e.target.name]: e.target.value,
        });
    };
    
    const handleSubmit = (e) => {
        e.preventDefault();
        handlePlaceOrder(newOrder);
    };
    
    return (
        <div className="pizza-order-form">
            <h2>Place a Pizza Order</h2>
            <form onSubmit={handleSubmit}>
                <label>
                    Type:
                    <select name="type" value={newOrder.type} onChange={handleChange} className="order-select">
                        <option value="Veg">Veg</option>
                        <option value="Non-Veg">Non-Veg</option>
                    </select>
                </label>
                <br />
                <label>
                    Size:
                    <select name="size" value={newOrder.size} onChange={handleChange} className="order-select">
                        <option value="Small">Small</option>
                        <option value="Medium">Medium</option>
                        <option value="Large">Large</option>
                    </select>
                </label>
                <br />
                <label>
                    Base:
                    <select name="base" value={newOrder.base} onChange={handleChange} className="order-select">
                        <option value="Thin">Thin</option>
                        <option value="Thick">Thick</option>
                    </select>
                </label>
                <br />
                <button type="submit" className="order-button">Place Order</button>
            </form>
        </div>
    );
};

const mapDispatchToProps = (dispatch) => ({
    handlePlaceOrder: (newOrder) => dispatch({ type: 'PLACE_ORDER', payload: { ...newOrder, id: new Date().getTime() } }),
});

export default connect(null, mapDispatchToProps)(PizzaOrderForm);
