import { LitElement } from "lit"
import { LitFunctions } from "./lit-component.functions.js"
import { innerHtml } from "./lit-component.html.js"
import { style } from "./lit-component.style.js"

export class Demo extends LitElement {
  static styles = style

  static properties = {
    config: { type: String },
  }

  constructor() {
    super()
    this.config = "no-config"
  }

  render() {
    const functions = new LitFunctions(this.shadowRoot)
    return innerHtml(functions)
  }
}

customElements.define("lit-test", Demo)
