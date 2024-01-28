export const orderReadyaction = (orderId, readyTime) => ({
    type: 'ORDER_READY',
    payload: { orderId, readyTime },
    });
    
    
    store.dispatch(orderReady(orderId, new Date()));