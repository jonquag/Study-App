import * as io from 'socket.io-client'
import socketEvents from './socket-events';
import { fetchConversations } from '../context/actions';

class ConversationManager {

    constructor() {
        this._socket = io({ autoConnect: false });
        socketEvents(this._socket, this.handleReceiveMessage);
        this._updateNotifications = () => {};
        this._conversations = {};
        this._notifications = {};
    }

    init = (updateNotifications) => {
        this._updateNotifications = updateNotifications;
    };

    getConversations = () => {
        return this._conversations;
    };

    handleReceiveMessage = (data) => {
        this._conversations[data.room].messages.push(data.message);
        this._notifications[data.room] += 1;
        this._updateNotifications({...this._notifications});  
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
            const notifications = {};
            conversations.forEach(c => {
                convos[c.group] = c;
                notifications[c.group] = 0;
            });
            this._conversations = convos;
            this._notifications = notifications;
            this._updateNotifications(notifications);
        })
    }

    clearNotifications = (groupId) => {
        if (this._notifications[groupId] > 0) {
            this._notifications[groupId] = 0
            this._updateNotifications({...this._notifications});
        }
    }

    closeSocket = () => {
        if (this._socket.connected) {
            this._updateConversations = () => {};
            this._socket.disconnect();
        }
    }
}

export default ConversationManager;
