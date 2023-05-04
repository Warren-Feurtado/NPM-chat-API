
export class LitFunctions{
  /**
   * Constructs the function provider object
   * @param {ShadowRoot} shadowRoot
   * @param {any} services
   */
  constructor(shadowRoot, services) {
    this.services = services;
    this.sendMsg = this.sendMsg(shadowRoot)
  }

  sendMsg = (shadowRoot) => (event) => {
    shadowRoot.querySelector("#chatBox").addEventListener(event).preventDefault();
    let msg = shadowRoot.querySelector("#newMsg");
    
    this.services.SocketUtil.msg(msg.value);
    console.log("This is the message being sent: ", msg.value);
  };
}
