import { createStore } from 'redux';

const initialState = {
orders: [],
};

const pizzaReducer = (state = initialState, action) => {
switch (action.type) {
case 'PLACE_ORDER':
return {
...state,
orders: [
...state.orders,
{ ...action.payload, stage: 0, startTime: new Date() },
],
};
case 'MOVE_TO_NEXT_STAGE':
const { orderId } = action.payload;
const orders = state.orders.map((order) =>
order.id === orderId
? {
...order,
stage: order.stage + 1,
readyTime: order.stage === 1 ? new Date() : order.readyTime,
previousStage: order.stage, // Store previous stage information
}
: order
);
return {
...state,
orders,
};
case 'CANCEL_ORDER':
return {
...state,
orders: state.orders.filter((order) => order.id !== action.payload),
};
default:
return state;
}
};

export const store = createStore(pizzaReducer);