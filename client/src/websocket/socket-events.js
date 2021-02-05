const socketEvents = (socket, handleReceiveMessage) => {
    socket.on('connect', () => {
        console.log('connected to socket server');
    });

    socket.on('rooms updated', (data) => {
        console.log('connected to rooms: ', data);
    });

    socket.on('group message', (data) => {
        handleReceiveMessage(data);
    })
    
    socket.on('disconnect', () => {
        console.log('disconnected from socket server');
    })
    socket.on('connect_error', () => {
        console.log('Error connecting to socket');
    })
};

export default socketEvents;
