
import { SocketService } from "../../utils/socket.service"

export class ChatFunctions {
  #socketService;

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
    this.#socketService.getNspId(shadowRoot);
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
      // this.chatOpen();
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

  //SEND A MESSAGE TO SERVER ON SOCKEET NAMESPACE
  sendMsg = (shadowRoot) => (event) => {
    event.preventDefault();
    this.msg = shadowRoot.querySelector("#newMsg");
        
    // MESSAGE FIELD VALIDATION
    if(this.msg.value == '') {
      return alert('Please type a message to send!!');
          
    } else {
      let msgOutDisplay = shadowRoot.querySelector("#msg_list");
      console.log('company namespace wen sending messsage: ', this.compNSP)
      // this.#socketService.newMsgOut(this.msg.value, this.convoID, this.compNSP);
      this.#socketService.newMsgOut(this.msg.value);
      console.log("This is the message being sent: ", this.msg.value);

      let msgEl = document.createElement('p');
      msgEl.textContent = `Me: ${this.msg.value}`;
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
  