import * as io from 'socket.io-client'
import socketEvents from './socket-events';

class SocketManager {

    constructor() {
        this.socket = io({ autoConnect: false, forceNew: true });
    }

    startSocket = () => {
        if (!this.socket.connected) {
            socketEvents(this.socket);
            this.socket.connect();
        }
    }

    closeSocket = () => {
        if (this.socket.connected) {
            this.socket.close();
        }
    }

}

export default SocketManager;
