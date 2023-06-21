

import { SocketService } from "../../utils/socket.service"

export class ChatFunctions {
  #socketService;
  visName;
  visEmail;
  userOpt;
  otpInputs = ['', '', '', '', '', ''];  //FOR STORING OTP INPUT VALUES

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
    this.checkActive = this.checkActive(shadowRoot);
    this.displayBoxC = this.displayBoxC(shadowRoot);
    this.logSessResume = this.logSessResume(shadowRoot);
    this.attatchFile = this.attatchFile(shadowRoot);
    this.upload = this.upload(shadowRoot);
    

    // this.otpInputs = ['', '', '', '', '', ''];  //FOR STORING OTP INPUT VALUES
    this.currIndex = 0;  //INDEX OF CURRENTLY FOCUSED OTP INPUT 
  }
  
  // TOGGLE CHAT WINDOW OPEN AND CLOSE
  chatToggle = (shadowRoot) => () => {
      const closeIcon = shadowRoot.querySelector("#closeIcon");
      const chatIcon = shadowRoot.querySelector("#chatIcon");
      const chatWindow = shadowRoot.querySelector("#chatWin");
      const newMsg = shadowRoot.querySelector("#newMsg");
      // const overlayCon = shadowRoot.querySelector("#overlayCon")

    
    if (chatWindow.classList.contains("hide")) {
      chatWindow.classList.remove("hide");
      chatWindow.classList.add("chat-open");
      chatIcon.classList.add("hide");
      closeIcon.classList.add("show");
      // overlayCon.style.display = "none"
      this.#socketService.scrollToBottom(shadowRoot);
      // shadowRoot.querySelectorAll(`.otpInput`).setAttribute('disabled', 'true');
      shadowRoot.querySelector(`.otpInput:nth-child(${this.currIndex + 1})`).removeAttribute('disabled');
      shadowRoot.querySelector(`.otpInput:nth-child(${this.currIndex + 1})`).focus();
      // shadowRoot.querySelector(`.otpInput:nth-child(${this.currIndex + 1})`).style.border="2px solid darkblue";
      shadowRoot.querySelector(`.otpInput:nth-child(${this.currIndex + 1})`).classList.remove("otpInputdisbl");
      shadowRoot.querySelector(`.otpInput:nth-child(${this.currIndex + 1})`).classList.add("otpInputActv");
      // this.startTimer();
      
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

  //FOR THE USERS WHO CHOOSE TO LOG IN AS A GUEST
  guestLogin = (shadowRoot) => (event) => {
    let welcomeBox = shadowRoot.querySelector(".welcome")
    let chatBoxArea = shadowRoot.querySelector("#chatBoxArea")

    welcomeBox.classList.add('hide');
    chatBoxArea.classList.remove('hide');
    chatBoxArea.classList.add('show');
    // this.addId()

  }

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
      // this.startTimer();

      this.visName = userName.value;
      this.visEmail = userEmail.value;
      
      // let user = {
      //   name: userName.value,
      //   email:userEmail.value
      // };

      this.#socketService.storeUser(userName.value, userEmail.value);

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


  evPrev = (shadowRoot) => (event) => {
    event.preventDefault();
  }

  
  otpKeydown = (shadowRoot) => (event) => {
    if(event.key === 'Backspace' && event.target.value === '') {
      this.toPrevField(shadowRoot);
    } else if(event.key === 'Backspace' && shadowRoot.querySelector(`.otpInput:nth-child(${this.currIndex + 1})`).value !== '') {
      shadowRoot.querySelector(`.otpInput:nth-child(${this.currIndex + 1})`).value = '';
    }
  }
  
  changeField = (shadowRoot) => (index) => (event) => {
    // return (event) => {
      const { value } = event.target;
      this.otpInputs[index] = value;

      if(value !== '') {
        this.toNxtField(shadowRoot);
      }
    // }
  }

  toPrevField = (shadowRoot) => (event) => {
    if(this.currIndex > 0) {
      this.currIndex--;
      // this.requestUpdate();
      // shadowRoot.querySelector(`.otpInput`).setAttribute('disabled');
      shadowRoot.querySelector(`.otpInput:nth-child(${this.currIndex + 1})`).removeAttribute('disabled');
      shadowRoot.querySelector(`.otpInput:nth-child(${this.currIndex + 1})`).focus();
      shadowRoot.querySelector(`.otpInput:nth-child(${this.currIndex + 2})`).setAttribute('disabled', 'true');
      shadowRoot.querySelector(`.otpInput:nth-child(${this.currIndex + 2})`).classList.remove("otpInputActv");
      shadowRoot.querySelector(`.otpInput:nth-child(${this.currIndex + 2})`).classList.add("otpInputdisbl");
      console.log('current Index:', this.currIndex + 1);
    }
  }

  toNxtField = (shadowRoot) => (event) => {
    if(this.currIndex < this.otpInputs.length - 1) {
      this.currIndex++;
      // this.requestUpdate();
      // shadowRoot.querySelectorAll(`.otpInput`).setAttribute('disabled', 'true');
      shadowRoot.querySelector(`.otpInput:nth-child(${this.currIndex + 1})`).removeAttribute('disabled');
      shadowRoot.querySelector(`.otpInput:nth-child(${this.currIndex + 1})`).focus();
      shadowRoot.querySelector(`.otpInput:nth-child(${this.currIndex})`).setAttribute('disabled', 'true');
      shadowRoot.querySelector(`.otpInput:nth-child(${this.currIndex + 1})`).classList.remove("otpInputdisbl");
      shadowRoot.querySelector(`.otpInput:nth-child(${this.currIndex + 1})`).classList.add("otpInputActv");
      // if(!shadowRoot.querySelector(`.otpInput:nth-child(${this.currIndex + 1})`)) {
      //   shadowRoot.querySelector(`.otpInput`).setAttribute('disabled');
      // } else {
      //   shadowRoot.querySelector(`.otpInput:nth-child(${this.currIndex + 1})`).removeAttribute('disabled');
      //   shadowRoot.querySelector(`.otpInput:nth-child(${this.currIndex + 1})`).setAttribute('enabled');
      // }
    }
  }

  verifyOtp(event) {
    // this.evPrev();
    event.preventDefault();
    // const otp = this.otpInputs.join('');
    console.log('otp ready for verification: ', this.otpInputs);
  }

    //EXAMPLE THAT THEY GAVE
   timeoutId; //Global variable

    startTimer() {
    this.timeoutId = setTimeout(this.displayBoxC, 5000);
    console.log('timer Started...') // 5 seconds
    console.log("msgObj from service", this.#socketService.msgObj, "webpack working");
    }

    resetTimer() {
      console.log('timer Reset....')
    clearTimeout(this.timeoutId);
    this.startTimer();
    }

    displayBoxC = (shadowRoot) => (event) =>{
    let overlayCon = shadowRoot.querySelector('#overlayCon');
    let welcome = shadowRoot.querySelector('.welcome');
    let logSessExp = shadowRoot.querySelector(".logSessExp"); 
    let guestSessExp = shadowRoot.querySelector(".guestSessExp"); 
    let logSessOTP = shadowRoot.querySelector(".logSessOTP"); 
    let msgObj =  this.#socketService.msgObj;
    console.log("msgObj from service: ", msgObj);
    // msgObj.visEmail = "ABC123@gmail.com";
    // console.log("msgObj after assigning email: ", msgObj);

      //getbutton events
    // let affirmBtn = shadowRoot.querySelector('#affirm');
    // let denyBtn = shadowRoot.querySelector('#deny');

    // affirmBtn.addEventListener('click', (event) => { 
    //   let clickedButton = event.target
    //   console.log("button clicked", clickedButton);
    // })
    // denyBtn.addEventListener('click', (event) => {     
    //   let clickedButton = event.target
    //   console.log("button clicked", clickedButton);
    // })

    overlayCon.style.display = 'flex';
    
    if(msgObj.visEmail !== "") {     //placeholder
      logSessExp.classList.remove('hide');
      // guestSessExp.classList.add('') = 'none';
      // logSessOTP.classList.add('') = 'none';
      // if(this.userOtp === true) { //placeholder
      //   logSessExp.style.display = 'none';
      //   guestSessExp.style.display = 'none';
      //   logSessOTP.style.display = 'block';
      // } else {
      //   overlayCon.style.display = 'none';
      //   welcome.style.display = 'block';

      //   //delete local storage uuid
      // }
    } else {
      guestSessExp.classList.remove('hide');
      //delete local storage uuid
    }
    }

    checkActive = (shadowRoot) => (event) =>{
      let chatArea = shadowRoot.getElementById("chatWin");

      chatArea.addEventListener('keydown', this.resetTimer);
      chatArea.addEventListener('mousemove', this.resetTimer);
      this.startTimer()
    }

    logSessResume = (shadowRoot) => () => {
      //send OTP to server
      //show OTP window
      let logSessExp = shadowRoot.querySelector(".logSessExp"); 
      let logSessOTP = shadowRoot.querySelector(".logSessOTP");
      this.userOpt = true
      console.log('yes clicked', this.userOpt);

      //HIDE LOG-SESS-EXP
      logSessExp.classList.remove('show');
      logSessExp.classList.add('hide');

      //DISPLAY LOG-SESS-OTP
      logSessOTP.classList.remove('hide');
      logSessOTP.classList.add('show');
      
      // this.#socketService.sendOtp();

    }

    sessEnd() {
      this.userOpt = false
      console.log('No clicked... Session Ended', this.userOpt);
    }

    attatchFile = (shadowRoot) => (event) => {
      let fileInpt = shadowRoot.querySelector('.fileInpt');
      // let paperClip = shadowRoot.querySelector('.paperClip');  

      fileInpt.click();
    }

    // File upload`
    upload = (shadowroot) => (event) => {
      console.log('upload event triggered!: ', event.target.files[0]);
      this.#socketService.fileUpload(event.target.files[0]);
    }
    
  

  
}
  