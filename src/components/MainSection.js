import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { store } from '../redux';
import OrderForm from './PizzaOrderForm';
import '../componentStyles/OrderYourPizza.css';

const MainSection = ({ orders, totalDelivered }) => {
    const [currentTime, setCurrentTime] = useState(new Date());
    
    const calculateMakingTime = (size) => {
        const makingTimes = {
            small: 3 * 60 * 1000, // 3 minutes
            medium: 4 * 60 * 1000, // 4 minutes
            large: 5 * 60 * 1000, // 5 minutes
        };
        
        return makingTimes[size] || 0;
    };
    
    const calculateTimeSpent = (startTime, stage, order) => {
        if (stage === 3) {
            if (order.previousStage === 2) {
                const timeDiff = order.readyTime - startTime;
                const minutes = Math.floor(timeDiff / 60000);
                const seconds = Math.floor((timeDiff % 60000) / 1000);
                return `${minutes} min ${seconds} sec`;
            } else {
                return '';
            }
        }
        
        let makingTime = 0;
        
        if (order.size) {
            makingTime = calculateMakingTime(order.size);
        }
        
        const timeDiff = currentTime - startTime + makingTime;
        const minutes = Math.floor(timeDiff / 60000);
        const seconds = Math.floor((timeDiff % 60000) / 1000);
        return `${minutes} min ${seconds} sec`;
    };
    
    const handleMoveToNextStage = (orderId) => {
        const order = orders.find((order) => order.id === orderId);
        
        if (order) {
            let makingTime = 0;
            
            if (order.size) {
                makingTime = calculateMakingTime(order.size);
            }
            
            store.dispatch({
                type: 'MOVE_TO_NEXT_STAGE',
                payload: { orderId, makingTime },
            });
        }
    };
    
    const handleCancelOrder = (orderId) => {
        const canceledOrder = orders.find((order) => order.id === orderId);
        
        if (canceledOrder && canceledOrder.stage !== 3) {
            store.dispatch({ type: 'CANCEL_ORDER', payload: orderId });
        }
    };
    
    useEffect(() => {
        const intervalId = setInterval(() => {
            setCurrentTime(new Date());
        }, 1000);
        return () => clearInterval(intervalId);
    }, []);
    
    const ordersByStages = {
        0: orders.filter((order) => order.stage === 0),
        1: orders.filter((order) => order.stage === 1),
        2: orders.filter((order) => order.stage === 2),
        3: orders.filter((order) => order.stage === 3),
    };
    
    const canHandleMoreOrders = orders.filter((order) => order.stage >= 0 && order.stage <= 2).length < 10;
    
    return (
        <div className="main-container">
            {canHandleMoreOrders ? (
                <div className="order-form-section">
                    <OrderForm />
                </div>
            ) : (
                <p id="message">Not taking any order for now. Maximum orders reached.</p>
            )}
            
            <div className="stage-container">
                {Array.from({ length: 4 }, (_, stage) => (
                    <div key={stage} className={`stage-col stage-${stage}`}>
                        <h3>
                            {stage === 0 && 'Order Placed'}
                            {stage === 1 && 'Order in Making'}
                            {stage === 2 && 'Order Ready'}
                            {stage === 3 && 'Order Picked'}
                        </h3>
                        {ordersByStages[stage].map((order) => {
                            const timeSpent = calculateTimeSpent(order.startTime, order.stage, order);
                            
                            return (
                                <div
                                    key={order.id}
                                    className={`stage-card ${
                                        order.stage === 3 ? 'picked' : ''
                                    } ${
                                        order.stage !== 3 && timeSpent > '3 min' ? 'red-card' : ''
                                    }`}
                                >
                                    <div>
                                        <span>{`Order ${order.id}`}</span>
                                        <br />
                                        {order.stage === 3 && <span>picked</span>}
                                        <span>{`Time Spent: ${timeSpent}`}</span>
                                        <br />
                                        {order.stage !== 3 ? (
                                            <button onClick={() => handleMoveToNextStage(order.id)}>Next</button>
                                        ) : (
                                            <p>Picked</p>
                                        )}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                ))}
            </div>
            
            <div className="main-section">
                <h2>Order Details</h2>
                <table>
                    <thead>
                        <tr>
                            <th>Order Id</th>
                            <th>Stage</th>
                            <th>Total time spent</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders.map((order) => (
                            <tr key={order.id}>
                                <td>{order.id}</td>
                                <td>{`Order ${
                                    order.stage === 0
                                        ? 'Placed'
                                        : order.stage === 1
                                        ? 'In Making'
                                        : order.stage === 2
                                        ? 'Ready'
                                        : 'Picked'
                                }`}</td>
                                <td>{calculateTimeSpent(order.startTime, order.stage, order)}</td>
                                <td>
                                    {order.stage === 3 ? (
                                        <p>Picked</p>
                                    ) : (
                                        <button onClick={() => handleCancelOrder(order.id)}>Cancel Button</button>
                                    )}
                                </td>
                            </tr>
                        ))}
                        <tr>
                            <td>Total order delivered {totalDelivered}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
};

const mapStateToProps = (state) => ({
    orders: state.orders,
    totalDelivered: state.orders.filter((order) => order.stage === 3).length,
});

export default connect(mapStateToProps)(MainSection);
