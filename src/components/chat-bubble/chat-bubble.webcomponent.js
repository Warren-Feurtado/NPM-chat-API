import { LitElement } from "lit";
import { LitFunctions } from "./chat-bubble.functions.js";
import { innerHtml } from "./chat-bubble.html.js";
import { style } from "./chat-bubble.style.js";

export function factory(services) {
  return class ChatBubble extends LitElement {
    static styles = style;

    static properties = {
      config: { type: String },
    };

    constructor() {
      super();
      this.config = "no-config";
    }

    render() {
      console.log(this.config);
      const functions = new LitFunctions(this.shadowRoot, services);
      return innerHtml(functions);
    }
  };
}
