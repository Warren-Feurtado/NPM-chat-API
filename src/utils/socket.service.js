import { io } from "socket.io-client";
import { SOCKETAPI } from "../environment/env";

export class SocketService {
    #socket = io(SOCKETAPI);
    mgsList = [];

    constructor() {
        this.newMsgIn(this.mgsList);
    }

    newMsgIn(mgsList) { //
        this.#socket.on('new-msg', (data) => {
        mgsList.push(data)
          console.log('new message received', data);
          console.log('messages list', mgsList);
        })
    }
    
    newMsgOut(msg) {
      let msgData = {
        message: msg
      }
      console.log("message type in socket service", msgData);
      this.#socket.emit('new-msg', msgData);
    }


}