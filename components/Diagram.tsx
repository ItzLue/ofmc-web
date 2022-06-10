import Image from 'next/image'
import { NextPage } from 'next'
import parseSvg from '@/helpers/parseSvg'

type IProps = {
    svg: string
}

const Diagram: NextPage<IProps> = ({svg}) => {

    const formattedSVG = parseSvg(svg)

    return (
        <Image
            src={`data:image/svg+xml;utf8,${formattedSVG}`}
            alt='Attack trace diagram'
            layout='fixed'
            width='900'
            height='600'
        />
    )
}
export default Diagram
