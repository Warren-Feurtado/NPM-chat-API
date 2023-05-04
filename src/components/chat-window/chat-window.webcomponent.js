
import { LitElement } from "lit"
import { LitFunctions } from "./chat-window.functions.js"
import { innerHtml } from "./chat-window.html.js"
import { style } from "./chat-window.style.js"

export function factory(services){
  return class ChatWindow extends LitElement {
    static styles = style

    static properties = {
      config: { type: String },
    }

    constructor() {
      super()
      this.config = "no-config"
    }

    render() {
      console.log(this.config)
      const functions = new LitFunctions(this.shadowRoot, services)
      return innerHtml(functions)
    }
  }
}