export class LitFunctions {
  /**
   * Constructs the function provider object
   * @param {ShadowRoot} shadowRoot
   * @param {any} services
   */
  constructor(shadowRoot, services) {
    this.services = services;
    this.chatToggle = this.chatToggle(shadowRoot);
  }

  chatToggle = (shadowRoot) => (event) => {
    const chatWindow = shadowRoot
      .querySelector(".chatWin");
    const chatClose = shadowRoot
      .querySelector("#chatClose");
    const chatBub = shadowRoot.querySelector("#chatBub");

    if (chatWindow.style.display == "none" || chatWindow.style.display == "") {
      chatBub.style.display = "none";
      chatWindow.style.display = "block";
      chatClose.addEventListener("click", this.chatToggle);
      chatWindow.classList.add("chat-open");
    } else if (chatWindow.classList.contains("chat-open")) {
      chatBub.style.display = "block";
      chatWindow.classList.remove("chat-open");
      chatWindow.classList.add("chat-close");
    } else if (chatWindow.classList.contains("chat-close")) {
      chatBub.style.display = "none";
      chatWindow.classList.remove("chat-close");
      chatWindow.classList.add("chat-open");
    }
  };
  // chatToggle = (shadowRoot) => (event) => {
  //   const chatWindow = shadowRoot
  //     .querySelector("#chatWind")
  //     .shadowRoot.querySelector(".chatWin");
  //   const chatClose = shadowRoot
  //     .querySelector("#chatWind")
  //     .shadowRoot.querySelector("#chatClose");
  //   const chatBub = shadowRoot.querySelector("#chatBub");

  //   if (chatWindow.style.display == "none" || chatWindow.style.display == "") {
  //     chatBub.style.display = "none";
  //     chatWindow.style.display = "block";
  //     chatClose.addEventListener("click", this.chatToggle);
  //     chatWindow.classList.add("chat-open");
  //   } else if (chatWindow.classList.contains("chat-open")) {
  //     chatBub.style.display = "block";
  //     chatWindow.classList.remove("chat-open");
  //     chatWindow.classList.add("chat-close");
  //   } else if (chatWindow.classList.contains("chat-close")) {
  //     chatBub.style.display = "none";
  //     chatWindow.classList.remove("chat-close");
  //     chatWindow.classList.add("chat-open");
  //   }
  // };
}
