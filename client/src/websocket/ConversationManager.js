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

    //Initialize ConversationManager with update functions
    init = (updateNotifications) => {
        this._updateNotifications = updateNotifications;
    };

    // Connect to socket server and joins rooms
    startSocket = (groupNames) => {
        if (!this._socket.connected) {
            this._socket.io.opts.query = 'rooms=' + groupNames;
            this._socket.connect();
            this.updateConversations();
        }
    }

    //Get list of conversations of the form {groupId: Conversation}
    getConversations = () => {
        return this._conversations;
    };

    //Adds data.messages to conversation.messages and increases notification
    // counter by 1
    handleReceiveMessage = (data) => {
        this._conversations[data.room].messages.push(data.message);
        this._notifications[data.room] += 1;
        this._updateNotifications({...this._notifications});  
    };

    sendMessageToGroup = (groupId, message) => {
        this._socket.emit('messageGroup', {room: groupId, message})
    }

    //Updates socket rooms on changes to user groups
    updateRooms = (groups) => {
        const groupNames = groups.map(group => group._id);
        this._socket.emit('updateRooms', groupNames);
        this.updateConversations();
    }

    //fetches new list of conversations and initializes
    // conversations and notifications
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

    //Clears the notifications for a specific conversation by groupId
    clearNotifications = (groupId) => {
        if (this._notifications[groupId] > 0) {
            this._notifications[groupId] = 0
            this._updateNotifications({...this._notifications});
        }
    }

    //Disconnect from socket server
    closeSocket = () => {
        if (this._socket.connected) {
            this._updateConversations = () => {};
            this._socket.disconnect();
        }
    }
}

export default ConversationManager;
