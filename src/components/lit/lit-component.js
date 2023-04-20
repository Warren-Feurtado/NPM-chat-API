import { LitElement } from "lit"
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
    return innerHtml
  }
}

customElements.define("lit-test", Demo)
