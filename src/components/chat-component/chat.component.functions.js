export class ChatFunctions {

    /**
     * Constructs the function provider object
     * @param {ShadowRoot} shadowRoot
     * @param {any} services
     */
    constructor(shadowRoot, services) {
      
      this.services = services;
      const msgsList = this.services.socketService.mgsList;
      this.chatToggle = this.chatToggle(shadowRoot);
      this.sendMsg = this.sendMsg(shadowRoot)
      console.log(msgsList);
    }
  
    // TOGGLE CHAT WINDOW OPEN AND CLOSE
    chatToggle = (shadowRoot) => () => {
        const chatBub = shadowRoot.querySelector("#chatBub");
        const chatWindow = shadowRoot.querySelector("#chatWin");
        const newMsg = shadowRoot.querySelector("#newMsg");
    
      if (chatWindow.classList.contains("hide")) {
        chatWindow.classList.remove("hide");
        chatBub.style.display = "none";
        chatWindow.style.display = "block";
        chatWindow.classList.add("chat-open");

      } 
      else if (chatWindow.classList.contains("chat-open")) {
        chatBub.style.display = "block";
        chatWindow.classList.remove("chat-open");
        chatWindow.classList.add("chat-close");
        console.log(chatWindow.classList);
        newMsg.value = '';
      } 
      else if (chatWindow.classList.contains("chat-close")) {
        chatBub.style.display = "none";
        chatWindow.classList.remove("chat-close");
        chatWindow.classList.add("chat-open");
      }
    };

      sendMsg = (shadowRoot) => (event) => {
        event.preventDefault();
    
        this.msg = shadowRoot.querySelector("#newMsg");

        // MESSAGE FIELD VALIDATION
        if(this.msg.value == '') {
          alert('Please type a message to send!!');
          return
        } else {
          this.services.socketService.newMsgOut(this.msg.value);
        }

        console.log("This is the message being sent: ", this.msg.value);
        this.msg.value = '';
      };

}
  