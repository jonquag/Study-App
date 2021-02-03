import * as io from 'socket.io-client'
import socketEvents from './socket-events';
import { fetchConversations } from '../context/actions';

class ConversationManager {

    constructor() {
        this._socket = io({ autoConnect: false });
        socketEvents(this._socket, this.handleReceiveMessage);
        this._updateConversations = () => {};
        this._conversations = {};
    }

    init = (updateConversations) => {
        this._updateConversations = updateConversations;
    };

    getConversations = () => {
        return this._conversations;
    };

    handleReceiveMessage = (data) => {
        this._conversations[data.room].messages.push(data.message);
        this._updateConversations({...this._conversations});  
    };

    sendMessageToGroup = (groupId, message) => {
        this._socket.emit('messageGroup', {room: groupId, message})
    }

    startSocket = (groupNames) => {
        if (!this._socket.connected) {
            this._socket.io.opts.query = 'rooms=' + groupNames;
            this._socket.connect();
            this.updateConversations();
        }
    }

    updateRooms = (groups) => {
        const groupNames = groups.map(group => group._id);
        this._socket.emit('updateRooms', groupNames);
        this.updateConversations();
    }

    updateConversations = () => {
        fetchConversations().then((conversations) => {
            const convos = {};
            conversations.map(c => (convos[c.group] = c));
            this._conversations = convos;
            this._updateConversations(convos);
        })
    }

    closeSocket = () => {
        if (this._socket.connected) {
            this._updateConversations = () => {};
            this._socket.disconnect();
        }
    }
}

export default ConversationManager;
