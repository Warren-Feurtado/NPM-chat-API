import { io } from "socket.io-client";
import { SOCKETAPI } from "../../environment/env";

export class ChatFunctions {
  #socket = io(SOCKETAPI); 
  #snmsp;
  
  // domain = window.location.hostname;
  domain = {domain: 'test.com'};
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
      // this.services = services;
      // this.newMsgObj = this.services.socketService.msgObj;
      // console.log("new msgObj in component constructor: ", this.newMsgObj);
      this.chatToggle = this.chatToggle(shadowRoot);
      this.sendMsg = this.sendMsg(shadowRoot);
      this.newMsgIn = this.newMsgIn(shadowRoot);
      this.chatOpen = this.chatOpen(shadowRoot);
      // this.newMsgOut = this.newMsgOut(this.msg); 
      
      this.myData();
      this.newMsgIn();
        
       
    }

    myData() {
      let aclUD = localStorage.getItem('aclUD');
      

      this.#socket.emit('client:connect', this.domain);
      console.log("here's the domain im connecting from", this.domain);

      this.#socket.on('nsps_id', (data) => {
        this.#snmsp = io(`${SOCKETAPI}/${data.nsps_id}`);
        console.log('nsps_id object from server: ', data);
        console.log('new name space in function: ', this.#snmsp);
      })
      console.log('new name space outside function: ', this.#snmsp);

      

      this.#socket.emit('aclUD', aclUD);
      
      this.#socket.on('myData', (myData) => {
        console.log('here is my metadata from server: ', myData);
        if(aclUD === null) {
          console.log('NO aclUD found: ', aclUD);
          this.metaData = myData;
          console.log('local storage was empty... setting new metadata: ' , this.metaData); 
          localStorage.setItem('aclUD', this.metaData.uuID);
          console.log('new aclUD set in Local storage: ', localStorage.getItem('aclUD'));

          // this.#socket.on('new-convo', (convoData) => {
          //   console.log('new convo data created', convoData);
          // })
          
        } else {
          this.metaData = myData;
          console.log('aclUD already exists: ', aclUD); 
          console.log('metadata with existing aclUD', this.metaData); 

          // this.#socket.on('convo-history', (convoData) => {
          //   console.log('user convo found', convoData);
          // })
        }

        console.log('current metadata after processing', this.metaData);

      })
    }

    chatOpen = (shadowRoot) => () => {
      let sender = localStorage.getItem('aclUD');
      // convoData.seenBy.push(localStorage.getItem('aclUD'));
      console.log('Chat window opened by: ', sender);

      this.#socket.emit('chatOpen', sender);

      this.#socket.on('chat-history', (history) => {
        let msgHistory = shadowRoot.querySelector("#msg_list");

        this.oldMsgHistory = history;
        console.log('oldMsgHistory', this.oldMsgHistory);

        this.oldMsgHistory.forEach((msg) => {
          let listItem = document.createElement('p');
          listItem.textContent = msg.message;
          msgHistory.appendChild(listItem);
        })
      })

      
    }


    newMsgIn = (shadowRoot) => () => {
    
      this.#socket.on('new-msg', (data) => {
        let msgHistory = shadowRoot.querySelector("#msg_list");


        console.log("new message in component: ", data);
        this.newMsgHistory.push(data.message.message);
        console.log('heres the history', this.newMsgHistory);
        let listItem = document.createElement('p');
        listItem.textContent = data.message.message;
        msgHistory.appendChild(listItem);


        // this.newMsgHistory.forEach(msgObject => {
        //       let listItem = document.createElement('p')
        //       listItem.textContent = msgObject.message;
        //   //     console.log('heres the msg object:', msgObject);
        //   //     console.log('message object.message', msgObject.message);
        //   //     listItem.textContent = msgObject.message;
        //   mgsHistory.appendChild(listItem);
        // });
        
      });
    };

    newMsgOut(msg) {
      let msgData = {
        message: msg,
        // chatID: ''
      }
      console.log("message heading for server from component", msgData);
      this.#socket.emit('new-msg', msgData);
    }

  
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

        // this.mgsHistory = shadowRoot.querySelector("#msg_list");

        // let msg_List = shadowRoot.querySelector("#msg_list")

        // MESSAGE FIELD VALIDATION
        if(this.msg.value == '') {
          return alert('Please type a message to send!!');

        } else {
          this.newMsgOut(this.msg.value);
          console.log("This is the message being sent: ", this.msg.value);

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
  