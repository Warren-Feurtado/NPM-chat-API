import { io } from "socket.io-client";
import { SOCKETAPI } from "../environment/env";

export class SocketService {
    // domain = {domain: 'hambala.com'};
    domain = {domain: 'test.com'};
    socket = io(SOCKETAPI);
    compNID;
    compNSP;
    convoID;
    msgObj = {
        visName: '',
        visEmail: "ABC123@gmail.com",
        // visEmail: "",
        message: '',
        token: '',
        conversationID: ''
    };
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

    // setUserNm(shadowRoot) {
    //     let u_nm = shadowRoot.querySelector('#u_name');
    //     let u_eml = shadowRoot.querySelector('#u_email');

        

    // }

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

                // DISPLAY AGENT NAME IN TOP SECTION OF MESSAGE WINDOW
                let agentNm = shadowRoot.querySelector('#agentNm');
                agentNm.textContent = reconData.agent;

                let welcScrn = shadowRoot.querySelector('.welcome');
                let msgWindow = shadowRoot.querySelector('#chatBoxArea')
                welcScrn.classList.add('hide');
                msgWindow.classList.remove('hide');
                msgWindow.classList.add('show');
                //DISPLAY EACH MESSAGE FROM HISTORY
                this.msgHistory.forEach((msgObj) => {
                    let msgDisplay = shadowRoot.querySelector('.chat_body');
                    // let listItem = document.createElement('p');
                    if(msgObj.sender === reconData.client._id) {
                        let listCon = document.createElement("div");
                        msgDisplay.appendChild(listCon);

                        let chatCon = document.createElement("div");
                        let senderCon = document.createElement("div");

                        let sender = document.createElement("p");
                        let uTag = document.createElement('p')
                        let message = document.createElement("p");
      
                        // let username = reconData.client.name;
                        let username = 'Guest'
                        sender.textContent = username;
                        uTag.textContent =  username.split("")[0];

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

                        let agentNm = shadowRoot.querySelector('#agentNm');

                        // let username = reconData.agent.name;
                        let username = 'Agent';
                        agentNm.textContent = username;
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

                let agentNm = shadowRoot.querySelector('#agentNm');
                agentNm.textContent = data;
            })

            this.compNSP.on('visitor:new_message', (msgObj) => {
                console.log('message from server: ', msgObj);
                console.log('checking agent in new message', msgObj.agent)

                let msgHistory = shadowRoot.querySelector('.chat_body');
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

    // //NEW VISITOR
    // newVis(user) {
    //     this.compNSP.emit('visitor:first_message', user);
    // }

    //"VISITOR SAVED" LISTENER / GET CONVO ID IF NEW CONVO WAS CREATED
    visSaved() {
        this.compNSP.on('visitor:saved', (convoID) => {
            console.log('new convo started...', convoID);
            this.convoID = convoID;
        })
    }

    //"VISITOR RECONNECT" LISTENER / GET CLIENT DATA IF EXISTING USER
    visRecon() {
        this.compNSP.on('visitor:reconnect', (reconData) => {
            this.convoID = reconData.client.conversations[0]._id;
            console.log('reconnect data from Server', reconData);
            console.log('convo ID on reconnect data: ', reconData.client.conversations[0]._id);
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

    //ACCEPTS A NEW USER'S CREDENTIALS AND STORES IT TEMPORARILY UNTIL THEY ARE READY TO SEND A MESSAGE
    storeUser(visName, visEmail) {
        this.msgObj.visName = visName;
        this.msgObj.visEmail = visEmail;
        console.log('Message object after storing user: ', this.msgObj);
    }
    
    //MESSAGE OUT EMITTER
    newMsgOut(msg) {
        console.log(`username and email in service from component: ${this.msgObj.name}, ${this.msgObj.email}`);
        console.log('convo id when sending a message: ', this.convoID);
        // let msgObj = {
        //     message: msg,
        //     token: localStorage.getItem('aclUD'),
        //     conversationID: this.convoID
        // }

        if(this.msgObj.visName != "" && this.msgObj.visEmail != "") {
            this.msgObj = {
                visName: this.msgObj.visName,
                visEmail: this.msgObj.visEmail,
                message: msg,
                token: localStorage.getItem('aclUD'),
                conversationID: this.convoID
            }
        } else {

            this.msgObj = {
                message: msg,
                token: localStorage.getItem('aclUD'),
                conversationID: this.convoID
            }

            this.compNSP.on('visitor:guest_name', (gstNm) => {
                console.log('Server generated guest name', gstNm);
            });
        }
        this.compNSP.emit('visitor:message', this.msgObj);
        console.log('new message object out: ', this.msgObj);
        this.msgObj.name = "";
        this.msgObj.email = ""; 

    }

    //function to scroll to the bottom of the list of messages
    scrollToBottom(shadowRoot)  {
        var chatWindow = shadowRoot.querySelector(".chat_body");
        chatWindow.scrollTop = chatWindow.scrollHeight;
        console.log("reading shadowroot");
    }


    // FileUpload
    /**
     * @param {File} file
     */
    
    fileUpload(file) {
        const fileType = file.name.split('.').pop();
        let types = [
            'pdf',
            'jpg',
            'jpeg',
            'png',
            'docx',
            'doc',
            'txt',
            'webp',
            // 'mp3',
            // 'mp4',
            // 'mkv',
            // 'ppt',
            // 'pptx',
            // 'zip',
            // 'rar',
            // 'wma',
        ];
        if (!fileType) {
        console.error('No file extension provied');
        return;
        }
        if (!types.includes(fileType)) {
        console.error('File type invalid');
        return;
        }

        let fileObj = {
            file,
            token: localStorage.getItem('aclUD'),
            conversationID: this.convoID
        }

        
        this.compNSP.emit('fileData', fileObj);
        console.log('file data sent to server: ', fileObj);
    }

}