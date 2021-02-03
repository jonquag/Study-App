const removeListeners = (socket) => {
    socket.off('connect');
    socket.off('disconnect');
    socket.off('connect_error');
}

const socketEvents = (socket) => {
    socket.on('connect', () => {
        console.log('connected to socket server');
    })

    socket.on('group message', (data) => {
        console.log(data);
    })
    
    socket.on('disconnect', () => {
        removeListeners(socket);
        console.log('disconnected from socket server');
    })
    socket.on('connect_error', () => {
        console.log('Error connecting to socket');
    })
};

export default socketEvents;
