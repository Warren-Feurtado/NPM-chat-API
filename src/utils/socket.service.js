import { io } from "socket.io-client";
import { SOCKETAPI } from "../environment/env";

export class SocketService {
    #socket = io(SOCKETAPI);
    mgsList2 = "Call from socket service";

    constructor() {
        // this.newMsgIn(this.mgsList);
    }

    // newMsgIn(mgsList) { 
    //     this.#socket.on('new-msg', (data) => {
    //     mgsList.push(data)
    //       console.log('new message reached component thru service', data);
    //     })
    // }


    newMsgIn(mgsList) { 
      this.#socket.on('new-msg', (data) => {
        if (!mgsList.includes(data)) {
          mgsList.push(data);
          console.log('new message reached component thru service', data);
        }
      });
    }
    
    newMsgOut(msg) {
      let msgData = {
        message: msg
      }
      console.log("message in service heading for server", msgData);
      this.#socket.emit('new-msg', msgData);
    }


}