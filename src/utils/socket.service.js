import { io } from "socket.io-client";
import { SOCKETAPI } from "../environment/env";

export class SocketService {
    // socket = io;
    socket = io(SOCKETAPI);
    // compNID;
    compNSP;
    mgsHistory = [];


    constructor() {
        // this.newMsgIn();
        // this.getNspId();
        this.newToken();
        this.agentConn();
        
    }

    on(evName, cb) {
        this.socket.on(evName, (data) => {
            cb(data);
        })
    }
    
    // nspOn(evName, cb) {
    //     this.compNSP.on(evName, (data) => {
    //         cb(data);
    //     })
    // }
    
    // nspOn(evName, cb) {
    //     this.compNID.on(evName, (data) => {
    //         cb(data);
    //     })
    // }

    getNspId() {
        this.on('visitor:namespace_id', (nspID) => {
            let compNID = nspID.namespace_id;
            this.compNSP = io(`${SOCKETAPI}/${compNID}`);
            // this.compNSP.emit('visitor:message', testMsgObj);
            
            this.compNSP.on('visitor:new_message', (msgObj) => {
                console.log('message from my namespace received in service', msgObj);

                // let msgHistory = shadowRoot.querySelector('#msg_list');
                // let listItem = document.createElement('p');
                // this.newMsgHistory.push(msgObj.message);
                // console.log('heres the history', this.newMsgHistory);
                // listItem.textContent = msgObj.message;
                // msgHistory.appendChild(listItem);
            });

            // console.log("nspID object from server in service: ", nspID);
            // console.log("compNSP object from server in service: ", this.compNSP);
        });
        
    }

    newToken() {
        this.on('visitor:token', (token) => {
            console.log('new token object from server in service: ', token);
            localStorage.setItem('aclUD', token.clientToken);
        })
    }

    agentConn() {
        this.on('visitor:agent_connected', (data) => {
            console.log('agent connect data: ', data);
        })
    }

    // newMsgIn(cb) {
    //     this.on('visitor:new_message', (msgObj) => {
    //         cb(msgObj);
    //     })
    // }

    //"VISITOR CONNECT" EMITTER
    visCon(domain) {
        this.socket.emit("visitor:connect", domain);
        console.log('Domain sent...: ', domain);
    }

    //"NAME SPACE CONNECT" EMITTER
    nspCon(aclUD) {
        this.socket.emit('visitor:namespace_connect', aclUD);
        console.log('aclUD sent...: ', aclUD);
    }

    //MESSAGE OUT EMITTER
    newMsgOut(msg, convoID, compNSP) {
        let msgObj = {
            message: msg,
            token: localStorage.getItem('aclUD'),
            conversationID: convoID
            // namespace: this.compNSP,
        }

        io(compNSP).emit('visitor:message', msgObj);

        // this.compNSP.emit('visitor:message', msgObj);
        console.log('new message object out: ', msgObj);
    }

    msgIn(compNSP, cb) {
        io(compNSP).on('visitor:new_message', (msgObj) => {
            cb(msgObj);
        })
    }

    

    
}

//     // newMsgIn(mgsList) { 
//     //     this.#socket.on('new-msg', (data) => {
//     //     mgsList.push(data)
//     //       console.log('new message reached component thru service', data);
//     //     })
//     // }

//     // newMsgIn(socket) { 
//     //   let mgsList = [];
//     //   let newInMsg;
//     //   this.socket.on('new-msg', (data) => { 
//     //     if (!mgsList.includes(data)) {
//     //       mgsList.push(data);
//     //       newInMsg = data.message
//     //         console.log('new message reached component thru service', newInMsg);
//     //         console.log('list of messages reach component thru service', mgsList);
//     //       }
//     //       console.log('new mssg', newInMsg);
//     //       console.log('new mssg2', mgsList);
//     //       return {message: newInMsg, history: mgsList};
//     //     });
        
//     // } 


//      async newMsgIn() { 
//       // let msgData;
//       // this.socket.on('new-msg', (data) => {
//       //   msgData = data;
//       //   console.log("new message in service: ", msgData);
//       //   return msgData;
//       // });
//     } 



//     // newMsgIn() { 
//     //   // let mgsList = [];
//     //   // let newInMsg = '';
//     //   let msgObj;

//     //   this.socket.on('new-msg', (data) => { 
//     //     console.log('checking data: ', data);
//     //     this.msgData = data;
//     //     console.log('checking msgData: ', this.msgData);
//     //     console.log('this is the list BEFORE pushing: ', this.mgsList);
//     //     if (data && !this.mgsList.includes(data)) {
//     //       this.mgsList.push(data);
//     //       console.log('this is the list AFTER pushing: ', this.mgsList);

//     //       msgObj = {
//     //         message: data.message,
//     //         history: this.mgsList
//     //       };

//     //         console.log('new message reached component thru service', msgObj.message);
//     //         console.log('list of messages reach component thru service', msgObj.history);
//     //     }
//     //       // newInMsg = data.message; 
//     //       // return this.msgData = data;
//     //       console.log('new mssg2', msgObj );
//     //       return msgObj;
//     //     });
//     //     // console.log('new mssg3', msgObj );
//     //     // return msgObj;
      
//     //     // console.log('new mssg', this.newInMsg);
//     //     // console.log('new mssg2', this.mgsList);
      
//     // } 
//     // newMsgIn() { 
//     //   // let mgsList = [];
//     //   // let newInMsg = '';
//     //   this.socket.on('new-msg', (data) => { 
//     //     // console.log('checking data.msg', data);
//     //     if (!this.mgsList.includes(data)) {
//     //       console.log('this is the list before pushing: ',this.mgsList);
//     //       this.mgsList.push(data);
//     //       this.newInMsg = data.message;
//     //         console.log('new message reached component thru service', data.message);
//     //         console.log('list of messages reach component thru service', this.mgsList);
//     //       }
//     //       // newInMsg = data.message; 
//     //     });
//     //     console.log('new mssg', this.newInMsg);
//     //     console.log('new mssg2', this.mgsList);
//     //     // return newInMsg, mgsList;
//     //     return this.mgsList;
      
//     // } 



//     // newMsgIn() { 
//     //   this.socket.on('new-msg', (data) => { 
//     //     // console.log('checking data.msg', data);
//     //     if (!this.mgsList.includes(data)) {
//     //         this.newInMsg = data.message;
//     //         this.mgsList.push(data);
//     //         console.log('new message reached component thru service', data.message);
//     //         console.log('list of messages reach component thru service', this.mgsList);
//     //     }
//     //     // this.newInMsg = data.message; 
//     //     console.log('new mssg', this.newInMsg);
//     //   });
//     //   console.log('new mssg2', this.mgsList);
//     //   return this.mgsList;
//     // }
    
//     newMsgOut(msg) {
//       let msgData = {
//         message: msg
//       }
//       console.log("message in service heading for server", msgData);
//       this.socket.emit('new-msg', msgData);
//     }

// //suggested code
// //     let mgsList = [];
// // let newInMsg = '';
// //  newMsgIn() { 
// //   this.socket.on('new-msg', (data) => { 
// //     // console.log('checking data.msg', data);
// //     if (!mgsList.includes(data)) {
// //       mgsList.push(data);
// //       newInMsg = data.message;
// //       console.log('new message reached component thru service', data.message);
// //       console.log('list of messages reach component thru service', mgsList);
// //     }
// //     // newInMsg = data.message; 
// //   });
// //   console.log('new mssg', newInMsg);
// //   console.log('new mssg2', mgsList);
// //   return [newInMsg, mgsList];
// // }
// }