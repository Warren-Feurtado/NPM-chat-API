
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
    this.validateEmail = this.validateEmail(shadowRoot);
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
      this.#socketService.scrollToBottom(shadowRoot);
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
      this.#socketService.scrollToBottom(shadowRoot);
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
      let msgOutDisplay = shadowRoot.querySelector(".chat_body");
      console.log('company namespace wen sending messsage: ', this.compNSP)
      // this.#socketService.newMsgOut(this.msg.value, this.convoID, this.compNSP);
      this.#socketService.newMsgOut(this.msg.value);
      console.log("This is the message being sent: ", this.msg.value);

      // let msgEl = document.createElement('p');
      // msgEl.textContent = `Me: ${this.msg.value}`;
      // msgOutDisplay.appendChild(msgEl);
      let listCon = document.createElement("div");
      msgOutDisplay.appendChild(listCon);

      let chatCon = document.createElement("div");
      let senderCon = document.createElement("div");

      let sender = document.createElement("p");
      let uTag = document.createElement('p')
      let message = document.createElement("p");
      
      let username = 'Guest'
      sender.textContent = username;
      uTag.textContent =  username.split("")[0]

      message.textContent = this.msg.value;

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
      this.#socketService.scrollToBottom(shadowRoot)
    }
    this.msg.value = '';
  };

  newUser() {
    let aclUD = localStorage.getItem('aclUD');
    console.log("UD before removal",  aclUD)
    localStorage.removeItem('aclUD');
    console.log("removed UD", aclUD);
  }

  validateEmail = (shadowRoot) => (event) => {
    event.preventDefault();

    let userName = shadowRoot.querySelector("#u_name")
    let userEmail = shadowRoot.querySelector("#u_email")
    let welcomeBox = shadowRoot.querySelector(".welcome")
    let chatBoxArea = shadowRoot.querySelector("#chatBoxArea")

    var pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Regular expression pattern for email validation
    let formVal = pattern.test(userEmail.value);     // Test the email against the pattern

    if (userName.value == "" || !formVal) {
      alert("Please Provide Valid Name and Email")
    } else {
      // alert(`Welcome,  ${userName.value}`)
      welcomeBox.style.display = "none"
      chatBoxArea.classList.remove('hide')
      chatBoxArea.style.display = "block"
      // chatBoxArea.classList.add('show')
    }

  }



  
}
  