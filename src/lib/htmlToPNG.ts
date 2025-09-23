import { liteAdaptor } from 'mathjax-full/js/adaptors/liteAdaptor.js'
import { TeX } from 'mathjax-full/js/input/tex.js'
import { SVG } from 'mathjax-full/js/output/svg.js'
import { mathjax } from 'mathjax-full/js/mathjax.js'
import { RegisterHTMLHandler } from 'mathjax-full/js/handlers/html.js'

export default function convertLatexToSVG (input: string) {
    const adaptor = liteAdaptor()
    RegisterHTMLHandler(adaptor)
    const tex = new TeX({packages: ['base']})
    const svg = new SVG({fontCache: 'none'})
    const mathDocument = mathjax.document('', {InputJax: tex, OutputJax: svg})

    const mathNode = mathDocument.convert(input, {display: true})
    const svgString = adaptor.outerHTML(mathNode)

    const width = mathNode.attributes.width ? parseFloat(mathNode.attributes.width) : 200
    const height = mathNode.attributes.height ? parseFloat(mathNode.attributes.height) : 80

    return {svgString, width, height}
}