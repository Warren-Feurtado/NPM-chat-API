
import { SocketService } from "../../utils/socket.service"

export class ChatFunctions {
  #socketService;
  visName;
  visEmail;

  /**
   * Constructs the function provider object
   * @param {ShadowRoot} shadowRoot
   * @param {any} services
   * 
   */

  constructor(shadowRoot) {
    this.#socketService = new SocketService;
    this.#socketService.getNspId(shadowRoot);
    this.chatToggle = this.chatToggle(shadowRoot);
    this.sendMsg = this.sendMsg(shadowRoot);
    this.validateEmail = this.validateEmail(shadowRoot);
    this.guestLogin = this.guestLogin(shadowRoot);
    this.evPrev = this.evPrev(shadowRoot);
    this.toNxtField = this.toNxtField(shadowRoot);
    this.toPrevField = this.toPrevField(shadowRoot);
    this.otpKeydown = this.otpKeydown(shadowRoot);
    this.changeField = this.changeField(shadowRoot);

    this.otpInputs = ['', '', '', '', '', ''];  //FOR STORING OTP INPUT VALUES
    this.currIndex = 0;  //INDEX OF CURRENTLY FOCUSED OTP INPUT 
  }
  
  // TOGGLE CHAT WINDOW OPEN AND CLOSE
  chatToggle = (shadowRoot) => () => {
      const closeIcon = shadowRoot.querySelector("#closeIcon");
      const chatIcon = shadowRoot.querySelector("#chatIcon");
      const chatWindow = shadowRoot.querySelector("#chatWin");
      const newMsg = shadowRoot.querySelector("#newMsg");
    
    if (chatWindow.classList.contains("hide")) {
      chatWindow.classList.remove("hide");
      chatWindow.classList.add("chat-open");
      chatIcon.classList.add("hide");
      closeIcon.classList.add("show");
      this.#socketService.scrollToBottom(shadowRoot);
    } 
    else if (chatWindow.classList.contains("chat-open")) {
      closeIcon.classList.remove("show");
      closeIcon.classList.add("hide");
      chatIcon.classList.remove('hide');
      chatIcon.classList.add('show');
      chatWindow.classList.remove("chat-open");
      chatWindow.classList.add("chat-close");

      console.log(chatWindow.classList);
      newMsg.value = '';
    } 
    else if (chatWindow.classList.contains("chat-close")) {
      closeIcon.classList.add('show');
      closeIcon.classList.remove('hide');
      chatIcon.classList.add("hide");
      chatIcon.classList.remove("show");
      chatWindow.classList.remove("chat-close");
      chatWindow.classList.add("chat-open");
      this.#socketService.scrollToBottom(shadowRoot);
    }
  };

  validateEmail = (shadowRoot) => (event) => {
    event.preventDefault();

    let userName = shadowRoot.querySelector("#u_name")
    let userEmail = shadowRoot.querySelector("#u_email")
    let welcomeBox = shadowRoot.querySelector(".welcome")
    let chatBoxArea = shadowRoot.querySelector("#chatBoxArea")

    var pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Regular expression pattern for email validation
    let formVal = pattern.test(userEmail.value);     // Test the email against the pattern

    // this.visName = userName.value;
    // this.visEmail = userEmail.value;

    if (userName.value == "" || userEmail.value == "" || !formVal) {
      alert("Please Provide Valid Name and Email or continue as a guest.")
    } else {
      // alert(`Welcome,  ${userName.value}`)
      welcomeBox.classList.add('hide');
      chatBoxArea.classList.remove('hide');
      chatBoxArea.classList.add('show');

      this.visName = userName.value;
      this.visEmail = userEmail.value;
      
      // let user = {
      //   name: userName.value,
      //   email:userEmail.value
      // };

      // this.#socketService.storeUser(userName.value, userEmail.value);

      // this.#socketService.newVis(user);
      // chatBoxArea.classList.add('show')
    }

  }

  //SEND A MESSAGE TO SERVER ON SOCKET NAMESPACE
  sendMsg = (shadowRoot) => (event) => {
    event.preventDefault();
    this.msg = shadowRoot.querySelector("#newMsg");
        
    // MESSAGE FIELD VALIDATION
    if(this.msg.value == '') {
      return alert('Please type a message to send!!');
          
    } else {
      let msgOutDisplay = shadowRoot.querySelector(".chat_body");
      console.log('company namespace wen sending messsage: ', this.compNSP)
      
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

      console.log('visitor name in component: ', this.visName);
      
      // let username = this.visName ? this.visName != '' : 'GUEST';
      let username;

      if(this.visName != '') {
        username = this.visName;
      } else {
        username = 'GUEST';
      }

      console.log();

      sender.textContent = username;
      uTag.textContent =  username.split("")[0];

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

  //SHORTCUT TO CLEAR ACLUD FROM LOCAL STORAGE
  newUser() {
    let aclUD = localStorage.getItem('aclUD');
    console.log("UD before removal",  aclUD)
    localStorage.removeItem('aclUD');
    console.log("removed UD", aclUD);
  }

  

  //FOR THE USERS WHO CHOOSE TO LOG IN AS A GUEST
  guestLogin = (shadowRoot) => (event) => {
    let welcomeBox = shadowRoot.querySelector(".welcome")
    let chatBoxArea = shadowRoot.querySelector("#chatBoxArea")

    welcomeBox.classList.add('hide');
    chatBoxArea.classList.remove('hide');
    chatBoxArea.classList.add('show');
  }

  
}
  