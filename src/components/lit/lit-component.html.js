import { html } from "lit"
import { boom } from "./lit-component.functions"

const innerHtml = html`<p @click="${boom}">Hello World!</p>`

export { innerHtml }
