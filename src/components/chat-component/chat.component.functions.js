// import { io } from "socket.io-client";
import { SOCKETAPI } from "../../environment/env";
import { SocketService } from "../../utils/socket.service"

export class ChatFunctions {
  // #socket = io(SOCKETAPI); 
  #socketService;
  // #socket;
  // #nmSpace;
  convoID;
  
  // domain = {domain: window.location.hostname};
  domain = {domain: 'test.com'};
  compNID;
  comNSP;
   newMsgHistory = [];  
   oldMsgHistory = [];
   newInMsg = '';
   newMsgObj;
  //  aclUD = localStorage.getItem('aclUD');
   metaData = {
    id: '',
     uuID: ''
   };
  

    /**
     * Constructs the function provider object
     * @param {ShadowRoot} shadowRoot
     * @param {any} services
     * 
     */
    constructor(shadowRoot) {
      this.#socketService = new SocketService;
      this.chatToggle = this.chatToggle(shadowRoot);
      this.sendMsg = this.sendMsg(shadowRoot);
      // this.msgDisplay = this.msgDisplay(shadowRoot);
      this.myData = this.myData(shadowRoot);
      this.newMsgIn = this.newMsgIn(shadowRoot);
      // this.chatOpen = this.chatOpen(shadowRoot);
      // this.newMsgOut = this.newMsgOut(this.msg); 
      
      this.myData();
      this.newMsgIn();
      this.#socketService.getNspId(shadowRoot);
        
    }
    myData = (shadowRoot) => () => {
      let aclUD = {token: localStorage.getItem('aclUD')};

      // console.log('checking if values are assigned from constructor: ', (this.#socketService));
      
      this.#socketService.visCon(this.domain);  
      this.#socketService.nspCon(aclUD);

      this.#socketService.on('visitor:reconnect', (reconData) => {
        console.log('reconnect data from Server', reconData);
      })

      this.#socketService.on('visitor:saved', (convoID) => {
        console.log('new convo started...', convoID);
        this.convoID = convoID;
      })

      this.#socketService.on('visitor:namespace_id', (nspID) => {
        console.log('got nspID in component', nspID);
        this.compNID = nspID.namespace_id;
        this.comNSP = `${SOCKETAPI}/${this.compNID}`;
        console.log('company namespace in component: ', this.comNSP);
      })

      this.#socketService.msgIn(this.comNSP, (msgData) => {
        console.log('new message from server', msgData);
      })
    }


    newMsgIn = (shadowRoot) => () => {
      
      // this.#socketService.newMsgIn((msgObj) => {
      //   console.log('new message object received in component: ', msgObj);
      //   let msgHistory = shadowRoot.querySelector('#msg_list');
      //   let listItem = document.createElement('p');
      //   this.newMsgHistory.push(msgObj.message);
      //   console.log('heres the history', this.newMsgHistory);
      //   listItem.textContent = msgObj.message;
      //   msgHistory.appendChild(listItem);
      // });
    };

  
    // TOGGLE CHAT WINDOW OPEN AND CLOSE
    chatToggle = (shadowRoot) => () => {
        const closeIcon = shadowRoot.querySelector("#closeIcon");
        const chatIcon = shadowRoot.querySelector("#chatIcon");
        const chatWindow = shadowRoot.querySelector("#chatWin");
        const newMsg = shadowRoot.querySelector("#newMsg");
    
      if (chatWindow.classList.contains("hide")) {
        chatWindow.classList.remove("hide");
        chatIcon.style.display = "none";
        closeIcon.style.display = "block";
        chatWindow.style.display = "block";
        chatWindow.classList.add("chat-open");
        this.chatOpen();
      } 
      else if (chatWindow.classList.contains("chat-open")) {
        closeIcon.style.display = "none";
        chatIcon.style.display = "block";
        chatWindow.classList.remove("chat-open");
        chatWindow.classList.add("chat-close");
        console.log(chatWindow.classList);
        newMsg.value = '';
      } 
      else if (chatWindow.classList.contains("chat-close")) {
        closeIcon.style.display = "block";
        chatIcon.style.display = "none";
        chatWindow.classList.remove("chat-close");
        chatWindow.classList.add("chat-open");
      }
    };

    sendMsg = (shadowRoot) => (event) => {
      event.preventDefault();
        
      this.msg = shadowRoot.querySelector("#newMsg");
        
      // MESSAGE FIELD VALIDATION
      if(this.msg.value == '') {
        return alert('Please type a message to send!!');
          
      } else {
        let msgOutDisplay = shadowRoot.querySelector("#msg_list");
        console.log('company namespace wen sending messsage: ', this.comNSP)
        this.#socketService.newMsgOut(this.msg.value, this.convoID, this.comNSP);
        console.log("This is the message being sent: ", this.msg.value);

        let msgEl = document.createElement('p');
        msgEl.textContent = this.msg.value;
        msgOutDisplay.appendChild(msgEl);

      }
      this.msg.value = '';
    };

    newUser() {
      let aclUD = localStorage.getItem('aclUD');
      console.log("UD before removal",  aclUD)
      localStorage.removeItem('aclUD');
      console.log("removed UD", aclUD);
    }
    
}
  