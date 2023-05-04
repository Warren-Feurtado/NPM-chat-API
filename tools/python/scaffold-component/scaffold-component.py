import os
import sys


# Main function
def main():
    component_name = sys.argv[1]

    try:
        os.mkdir("./src")
    except:
        print("src exists")
    try:
        os.mkdir("./src/components")
    except:
        print("src/components exists")
    directory = f"./src/components/{component_name}"
    files: list[str] = [f"{component_name}.webcomponent.js", f"{component_name}.html.js", f"{component_name}.style.js",
                        f"{component_name}.functions.js"]
    try:
        os.mkdir(directory)
    except:
        print(f"src/components/{component_name} exists")

    # Create files
    for file in files:
        if file == f"{component_name}.webcomponent.js":
            f = open(os.path.normpath(os.path.join(directory, file)), "w")
            f.write(
                '\n'
                'import { LitElement } from "lit"\n' +
                ('import { LitFunctions } from "./' + f'{component_name}' + '.functions.js"\n') +
                ('import { innerHtml } from "./' + f'{component_name}' + '.html.js"\n') +
                ('import { style } from "./' + f'{component_name}' + '.style.js"\n') +
                '\n' +
                'export function factory(services){\n' +
                ('  return class ' + f'{component_name.upper()}' + ' extends LitElement {\n') +
                '    static styles = style\n'
                '\n'
                '    static properties = {\n'
                '      config: { type: String },\n'
                '    }\n'
                '\n'
                '    constructor() {\n'
                '      super()\n'
                '      this.config = "no-config"\n'
                '    }\n'
                '\n'
                '    render() {\n'
                '      console.log(this.config)\n'
                '      const functions = new LitFunctions(this.shadowRoot, services)\n'
                '      return innerHtml(functions)\n'
                '    }\n'
                '  }\n'
                '}'
            )
            f.close()
            continue

        if file == f"{component_name}.html.js":
            f = open(os.path.normpath(os.path.join(directory, file)), "w")
            f.write(
                '\n'
                'import { html, TemplateResult } from "lit"\n'
                '\n'
                'const innerHtml =\n'
                '   /**\n'
                '   * Produces the html template of the component\n'
                '   * @param {LitFunctions} litFunctions\n'
                '   * @returns {TemplateResult}\n'
                '   */\n'
                '   (litFunctions) =>\n'
                '    html`\n'
                '       <section id="self">\n'
                '       </section>\n'
                '    `\n'
                '\n'
                'export { innerHtml }\n'
                '                '
            )
            f.close()
            continue

        if file == f"{component_name}.functions.js":
            f = open(os.path.normpath(os.path.join(directory, file)), "w")
            f.write(
                '\n'
                'export class LitFunctions{\n'
                '  /**\n'
                '   * Constructs the function provider object\n'
                '   * @param {ShadowRoot} shadowRoot\n'
                '   * @param {any} services\n'
                '   */\n'
                '  constructor(shadowRoot, services) {\n'
                '    this.services = services\n'
                '    this.test = this.test(shadowRoot)\n'
                '  }\n'
                '\n'
                '  test = (shadowRoot) => (event) => {\n'
                '    console.log("Tested")\n'
                '  }\n'
                '}\n'
            )
            f.close()
            continue

        if file == f"{component_name}.style.js":
            f = open(os.path.normpath(os.path.join(directory, file)), "w")
            f.write(
                '\n'
                'import {css} from "lit"\n'
                '\n'
                'const style = css `\n'
                '#self {\n'
                '  width: 100%;\n'
                '  height: 100%;\n'
                '  background: black;\n'
                '}\n'
                '`\n'
                'export { style }\n'
            )
            f.close()
            continue
    f = open(os.path.normpath(os.path.join(directory, '../../../src/index.js')), "a")
    f.write(f'\ncustomElements.define("lit-{component_name}", /*factory*/)')


# Script entry point
if __name__ == "__main__":

    # print(cmd_path)
    try:
        main()
    except KeyboardInterrupt:
        print("\033[93m\n\nUnexpected Exit\n\033[0m")
        exit(0)
