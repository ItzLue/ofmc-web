
const parseSvg = (svg: string): string => {

    return svg.replace(
        /<svg[^>]*>/g,
        "<svg xmlns='http://www.w3.org/2000/svg' stroke='white' fill='white'>")

}

export default parseSvg
