export class Test extends HTMLElement {
  constructor() {
    super()
    this.attachShadow({ mode: "open" })
    const style = document.createElement("style")
    // style.innerHTML = chatbubble_style
    const body = document.createElement("section")
    // body.innerHTML = chatbubble_html

    this.shadowRoot.appendChild(style)
    this.shadowRoot.appendChild(body)
  }

  config = this.hasAttribute("config")
    ? this.getAttribute("config")
    : "no-config"

  connectedCallback() {
    console.log(this.config)
  }
}

customElements.define("t-comp", Test)
