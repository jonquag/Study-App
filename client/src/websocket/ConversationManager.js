import * as io from 'socket.io-client'
import socketEvents from './socket-events';
import { fetchConversations } from '../context/actions';

class ConversationManager {

    constructor() {
        this._socket = io({ autoConnect: false, forceNew: true });
        this._updateConversations = () => {};
        this._conversations = {};
    }

    initUpdateMessages = (updateFunc) => {
        this._updateConversations = updateFunc;
    }

    sendMessageToGroup = (groupId, message) => {
        //this._conversations[groupId].messages.push(message);
        //this._updateConversations({...this._conversations});
        this._socket.emit('messageGroup', {room: groupId, message})
    }

    startSocket = () => {
        if (!this._socket.connected) {
            socketEvents(this._socket);
            this._socket.connect({rooms: 'hello'});
            fetchConversations().then((conversations) => {
                const convos = {};
                conversations.map(c => (convos[c.group] = c));
                console.log('convos: ', convos)
                this._conversations = convos;
                this._updateConversations(convos);
            })
        }
    }

    closeSocket = () => {
        if (this._socket.connected) {
            this._socket.close();
        }
    }

}

export default ConversationManager;
