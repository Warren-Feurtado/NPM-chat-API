import { html, TemplateResult } from "lit"
import { LitFunctions } from "./lit-component.functions"

const innerHtml =
  /**
   * Produces the html template of the component
   * @param {LitFunctions} litFunctions
   * @returns {TemplateResult}
   */
  (litFunctions) =>
    html`
      <p id="hello" @click="${litFunctions.boom}">Hello World!</p>
      <input @change="${litFunctions.formOutput}" type="text" name="test" />
    `

export { innerHtml }
