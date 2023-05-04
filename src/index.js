import { factory as CWFactory }   from "./components/chat-window/chat-window.webcomponent";
import { factory as CBFactory } from "./components/chat-bubble/chat-bubble.webcomponent";
import { chatFactory } from "./components/chat-component/chat.component.webcomponent"
// import { SocketUtil } from "./utils/socket.util";
import { SocketService } from "./utils/socket.service";

const socketService = new SocketService();


// customElements.define("lit-chat-window", CWFactory({ socketService }));

// customElements.define("lit-chat-bubble", CBFactory({ socketService }));
customElements.define("lit-chat-widget", chatFactory({ socketService }));

// TODO Remember to fill in the factories above
