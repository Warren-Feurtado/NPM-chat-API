import { LitElement } from "lit";
import { ChatFunctions } from "./chat.component.functions";
import { innerHtml } from "./chat.component.html";
import { style } from "./chat.component.css";

export function chatFactory(services) {
  return class ChatComponent extends LitElement {
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
      const functions = new ChatFunctions(this.shadowRoot, services);
      return innerHtml(functions);
    }
  };
}
