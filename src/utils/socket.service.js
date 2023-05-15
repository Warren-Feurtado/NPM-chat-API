// import { io } from "socket.io-client";
// import { SOCKETAPI } from "../environment/env";

// export class SocketService {
//     socket = io(SOCKETAPI); 
//     mgsList = [];
//     newInMsg = '';
//     msgObj;
//     // msgObj = {message: String, history: Array};
//     // msgObj = {message, history};
//     msgData;


//     constructor() {
//         // this.newMsgIn();
        
//     }

//     // newMsgIn(mgsList) { 
//     //     this.#socket.on('new-msg', (data) => {
//     //     mgsList.push(data)
//     //       console.log('new message reached component thru service', data);
//     //     })
//     // }

//     // newMsgIn() { 
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