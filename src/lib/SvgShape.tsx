import { ReactElement } from "react";
import { Geometry2d, HTMLContainer, RecordProps, Rectangle2d, ShapeUtil, T, TLBaseShape, TLGeometryOpts, resizeBox, TLResizeInfo, SvgExportContext } from "tldraw";
import 'tldraw/tldraw.css'

export type SvgShape = TLBaseShape<'svg', {
  src: string; // SVG content as a string
  w: number;   // Width of the SVG
  h: number;   // Height of the SVG
}>;

const lightFill = '#ff8888'
const darkFill = '#ffcccc'

export function removeSvgDimensions(svgString: string) {
    if(!svgString) return '';

    const parser = new DOMParser()
    const doc = parser.parseFromString(svgString, 'image/svg+xml')
    const svg = doc.querySelector('svg')
    console.log(svg)

    return new XMLSerializer().serializeToString(svg!)
}

export class SvgShapeUtils extends ShapeUtil<SvgShape> {
    static override type = 'svg' as const;
    static override props: RecordProps<SvgShape> = {
        src: T.string,
        w: T.number,
        h: T.number,
    };

    getDefaultProps(): SvgShape['props'] {
        return {
            src: '',
            w: 100,
            h: 100,
        };
    }
    override canEdit() {
        return true;
    }
    override canResize() {
        return true;
    }
    override isAspectRatioLocked() {
        return true;
    }
    getGeometry(shape: SvgShape, opts?: TLGeometryOpts): Geometry2d {
        return new Rectangle2d({
            width: shape.props.w,
            height: shape.props.h,
            isFilled: false,
        });
    }

    onResize = (shape: SvgShape, info: TLResizeInfo<SvgShape>): SvgShape => {
        return resizeBox(shape, info)
    }

    component(_shape: SvgShape) {
        return (
            <HTMLContainer
                style={{
                    padding: '4px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: 'transparent',
                    borderRadius: 8,
                    overflow: 'hidden',
                    fontSize: 'large',
                }}
            >
                <div
                className="tl-svg-shape"
                    dangerouslySetInnerHTML={{__html: _shape.props.src}}
                    style={{
                        width: '100%',
                        height: '100%',
                        display: 'block'
                    }}
                />
            </HTMLContainer>
        )
    }
    indicator(shape: SvgShape) {
        return this.getSvgRect(shape);
    }

    override toSvg(shape: SvgShape, ctx: SvgExportContext): null | Promise<null | ReactElement> | ReactElement {
        const isDarkMode = ctx.isDarkMode
        const fill = isDarkMode  ? '#ffffff' : '#000000'
        return (
            <svg
                width={shape.props.w}
                height={shape.props.h}
                xmlns="http://www.w3.org/2000/svg"
            >
                <foreignObject width={shape.props.w} height={shape.props.h}>
                    <div
                        dangerouslySetInnerHTML={{__html: shape.props.src}}
                        style={{
                            width: '100%',
                            height: '100%',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fill,
                            color: fill,
                            fontSize: 'large'
                        }}
                    />
                </foreignObject>
            </svg>
        )
    }

    getSvgRect(_shape: SvgShape, props?: { fill?: string }) {
        return(
            <rect
                width={_shape.props.w}
                height={_shape.props.h}
                fill="none"
                stroke="rgba(0,0,0,0.2)"
                strokeDasharray="4.2"
            />
        )
    }
}