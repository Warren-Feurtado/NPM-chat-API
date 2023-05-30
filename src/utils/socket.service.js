import { io } from "socket.io-client";
import { SOCKETAPI } from "../environment/env";

export class SocketService {
    domain = {domain: 'test.com'}
    socket = io(SOCKETAPI);
    compNID;
    compNSP;
    convoID;
    msgHistory = [];
    connectedAgent;


    constructor() {
        //---- EMITTERS ----//
        this.sendDom(this.domain);
        
    }

    on(evName, cb) {
        this.socket.on(evName, (data) => {
            cb(data);
        })
    }

    onNSP(evName, cb) {
        this.compNSP.on(evName, (data) => {
            cb(data);
        })
    }

    //"VISITOR NAMSPACE ID" LISTENER / GET ID OF COMPANY TO BE USED TO CONNECT TO NAMESPACE
    getNspId(shadowRoot) {
        this.socket.on('visitor:namespace_id', (nspID) => {
            console.log("nspID object from server in service: ", nspID);
            this.compNID = nspID.namespace_id;
            this.compNSP = io(`${SOCKETAPI}/${this.compNID}`);

            this.aclUDSend(); 
            
            this.compNSP.on('visitor:reconnect', (reconData) => {
                this.convoID = reconData.client.conversations[0]._id;
                this.msgHistory = reconData.client.conversations[0].messages;
                // console.log('reconnect data from Server', this.msgHistory);
                console.log('reconnect data from Server', reconData);
                console.log('convo ID on reconnect data: ', reconData.client.conversations[0]._id);
                
                this.msgHistory.forEach((msgObj) => {
                    let msgDisplay = shadowRoot.querySelector('#msg_list');
                    // let listItem = document.createElement('p');
                    if(msgObj.sender === reconData.client._id) {
                        // console.log();
                        let listCon = document.createElement("div");
                        msgDisplay.appendChild(listCon);

                        let chatCon = document.createElement("div");
                        let senderCon = document.createElement("div");

                        let sender = document.createElement("p");
                        let uTag = document.createElement('p')
                        let message = document.createElement("p");
      
                        let username = 'Guest'
                        sender.textContent = username;
                        uTag.textContent =  username.split("")[0]

                        message.textContent = msgObj.message;
                        
                        listCon.appendChild(chatCon);
                        chatCon.appendChild(senderCon);
                        senderCon.appendChild(uTag);
                        senderCon.appendChild(sender);
                        chatCon.appendChild(message);
                        
                        chatCon.classList.add('chatBubble_Me', 'position_Me' )
                        senderCon.classList.add('sender_Con', 'position_Me',)
                        sender.classList.add('sender_Me')
                        uTag.classList.add('user_Tag_Me')
                        message.classList.add('message_Me', 'position_Me', 'bkg_change_me')
                        // this.scrollToBottom(shadowRoot);
                        
                    } else {
                        let listCon = document.createElement("div");
                        
                        let chatCon = document.createElement("div");
                        let senderCon = document.createElement("div");
                        
                        let sender = document.createElement("p");
                        let uTag = document.createElement('p')
                        let message = document.createElement("p");

                        let username = 'Agent'
                        sender.textContent = username;
                        uTag.textContent =  username.split("")[0]
                        
                        msgDisplay.appendChild(listCon);
                        message.textContent = msgObj.message;
                        
                        listCon.appendChild(chatCon);
                        chatCon.appendChild(senderCon);
                        senderCon.appendChild(uTag);
                        senderCon.appendChild(sender);
                        chatCon.appendChild(message);
                        
                        chatCon.classList.add('chatBubble_Me' )
                        senderCon.classList.add('sender_Con')
                        sender.classList.add('sender_Me')
                        uTag.classList.add('user_Tag_Me')
                        message.classList.add('message_Me')
                        
                        // this.scrollToBottom(shadowRoot);
                    }
                    // msgHistory.appendChild(listItem);
                })
               
                this.scrollToBottom(shadowRoot);
            })

            this.compNSP.on('visitor:saved', (convoID) => {
                console.log('new convo started...', convoID);
                this.convoID = convoID;
            })

            this.compNSP.on('visitor:agent_connected', (data) => {
                console.log('agent connect data: ', data);
            })

            this.compNSP.on('visitor:new_message', (msgObj) => {
                console.log('message from server: ', msgObj);
                console.log('checking agent in new message', msgObj.agent)

                let msgHistory = shadowRoot.querySelector('#msg_list');
                // let listItem = document.createElement('p');
                // console.log('heres the history', this.newMsgHistory);
                // listItem.textContent = `Agent: ${msgObj.message}`;
                // msgHistory.appendChild(listItem);

                let listCon = document.createElement("div");
                msgHistory.appendChild(listCon);
          
                let chatCon = document.createElement("div");
                let senderCon = document.createElement("div");
          
                let sender = document.createElement("p");
                let uTag = document.createElement('p')
                let message = document.createElement("p");
                sender.textContent = msgObj.message.agent_firstname;                ;
                uTag.textContent = msgObj.message.agent_firstname.split("")[0];
                message.textContent = msgObj.message.message;
          
                listCon.appendChild(chatCon);
                chatCon.appendChild(senderCon);
                senderCon.appendChild(uTag);
                senderCon.appendChild(sender);
                chatCon.appendChild(message);
          
                chatCon.classList.add('chatBubble_Me' )
                senderCon.classList.add('sender_Con')
                sender.classList.add('sender_Me')
                uTag.classList.add('user_Tag_Me')
                message.classList.add('message_Me')

                this.scrollToBottom(shadowRoot);

            })

            this.compNSP.on('visitor:token', (token) => {
                console.log('new token object from server in service: ', token);
                localStorage.setItem('aclUD', token.clientToken);
            })
        });
        
    }

    //"VISITOR RECONNECT" LISTENER / GET CLIENT DATA IF EXISTING USER
    visRecon() {
        this.compNSP.on('visitor:reconnect', (reconData) => {
            this.convoID = reconData.client.conversations[0]._id;
            console.log('reconnect data from Server', reconData);
            console.log('convo ID on reconnect data: ', reconData.client.conversations[0]._id);
        })
    }

    //"VISITOR SAVED" LISTENER / GET CONVO ID IF NEW CONVO WAS CREATED
    visSaved() {
        this.compNSP.on('visitor:saved', (convoID) => {
            console.log('new convo started...', convoID);
            this.convoID = convoID;
        })
    }

    //NEW TOKEN LISTENER / GET NEW TOKEN IF EXPIRED TOKEN OR NEW USER
    newToken() {
        this.on('visitor:token', (token) => {
            console.log('new token object from server in service: ', token);
            localStorage.setItem('aclUD', token.clientToken);
        })
    }

    //AGENT CONNECT LISTENER / GET USER DATA OF AGENT WHO ACCEPTED CONVO
    agentConn() {
        this.on('visitor:agent_connected', (data) => {
            console.log('agent connect data: ', data);
        })
    }

    //"VISITOR CONNECT" EMITTER / SEND DOMAIN
    sendDom(domain) {
        this.socket.emit("visitor:connect", domain);
        console.log('Domain sent...: ', domain);
    }

    //LOCAL STORAGE TOKEN EMITTER
    aclUDSend() {
        let aclUD = {token: localStorage.getItem('aclUD')};
        this.compNSP.emit('visitor:namespace_connect', aclUD);
        console.log('aclUD sent...: ', aclUD);
    }

    //MESSAGE OUT EMITTER
    newMsgOut(msg) {
        console.log('convo id when sending a message: ', this.convoID);
        let msgObj = {
            message: msg,
            token: localStorage.getItem('aclUD'),
            conversationID: this.convoID
        }
        this.compNSP.emit('visitor:message', msgObj);
        console.log('new message object out: ', msgObj);
    }

    //function to scroll to the bottom of the list of messages
    scrollToBottom(shadowRoot)  {
        var chatWindow = shadowRoot.querySelector(".chat_body");
        chatWindow.scrollTop = chatWindow.scrollHeight;
        console.log("reading shadowroot");
    }

}