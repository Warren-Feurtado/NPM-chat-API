class LitFunctions {
  /**
   * Constructs the function provider object
   * @param {ShadowRoot} shadowDOM
   */
  constructor(shadowDOM) {
    this.boom = LitFunctions.boom(shadowDOM)
    this.formOutput = LitFunctions.formOutput(shadowDOM)
  }

  static boom = (shadowDom) => (event) => {
    console.log("What did you expect, an explosion?")
    console.log("Event:", event)
    console.log("Shadow", shadowDom)
    shadowDom.querySelector("#hello").textContent = "*Absolutely Tranquil*"
  }

  static formOutput = (shadowDom) => (event) => {
    shadowDom.querySelector("#hello").textContent = event.target.value
  }
}

export { LitFunctions }
