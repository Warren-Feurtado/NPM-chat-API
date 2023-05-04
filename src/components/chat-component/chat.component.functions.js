export class ChatFunctions {

  
   mgsList = []; 

    /**
     * Constructs the function provider object
     * @param {ShadowRoot} shadowRoot
     * @param {any} services
     * 
     */
    constructor(shadowRoot, services) {
      this.services = services;
      
      this.chatToggle = this.chatToggle(shadowRoot);
      this.sendMsg = this.sendMsg(shadowRoot)
      this.mgList = this.services.socketService.mgsList2
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

        this.mgsHistory = shadowRoot.querySelector("#msg_list");


        // MESSAGE FIELD VALIDATION
        if(this.msg.value == '') {
          return alert('Please type a message to send!!');
          
        } else {
          this.services.socketService.newMsgOut(this.msg.value);
          this.services.socketService.newMsgIn(this.mgsList);
          
          // let msgArray = this.services.socketService.newMsgIn(this.mgsList);
          
          // this.mgsList.forEach((mgsItem) => {
          //  let new_Msg = document.createElement('div');

          //  if (!mgsList.includes(mgsItem)) {
          //   console.log('new message reached component thru service', data);
          // }

          //  new_Msg.innerHTML = mgsItem.message
          // this.mgsHistory.appendChild(new_Msg)
          // }) 

          console.log("messages reached component level", this.mgsList);
          console.log("service list checked", this.mgList);
        }

        console.log("This is the message being sent: ", this.msg.value);
        this.msg.value = '';
      };


    
}
  