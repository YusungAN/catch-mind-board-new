import {
    useRef,
    useEffect,
    useState,
    forwardRef,
    useImperativeHandle,
} from "react";
import s from "./canvas.module.css";
import style from "styled-components";
import img from "../../assets/eraser.png";

interface CanvasProps {
    onChange: (address: string) => void;
    onDraw: () => void;
}

const Canvas = forwardRef((props: CanvasProps, ref) => {
    const {onChange, onDraw} = props;

    let canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D;
    const canvasRef = useRef<HTMLCanvasElement | null>(null);

    let pos = {
        drawable: false,
        x: 0,
        y: 0,
    };

    const [colorCopArr, setColorCopArr] = useState<{color: string, clicked: boolean}[]>([
        { color: "red", clicked: false },
        { color: "blue", clicked: false },
        { color: "green", clicked: false },
        { color: "yellow", clicked: false },
        { color: "black", clicked: false },
    ]);
    const [nowColor, setNowColor] = useState("");
    const [nowCanvas, setNowCanvas] = useState("");
    const [erase, setErase] = useState(false);

    useImperativeHandle(ref, () => ({
        async savePicture() {
            console.log(canvas.toDataURL());
            setNowCanvas(canvas.toDataURL());
            onChange(canvas.toDataURL());
            const image = new Image();
            image.src = canvas.toDataURL();
            ctx.drawImage(image, 0, 0);
        },
    }));

    const selectColor = async (color: string) => {
        let temp = colorCopArr.slice();
        let index: number = -1;

        for (const [i, item] of temp.entries()) {
            if (item.color === color) index = i;
        }
        for (let i in temp) {
            temp[i].clicked = false;
        }
        if (index >= 0) {
            temp[index].clicked = true;
            await setNowCanvas(canvas.toDataURL());
            setErase(false);
            setColorCopArr(temp);
            setNowColor(color);
        }
    };

    const colorCopComponents = colorCopArr.map((item, index) => {
        return (
            <div
                className={s.colorcop}
                style={{
                    backgroundColor: item.color,
                    border: item.clicked ? "2px solid black" : "none",
                }}
                key={index}
                onClick={() => selectColor(item.color)}
            />
        );
    });

    const getPosition = (e: MouseEvent) => {
        return {
            x: e.offsetX,
            y: e.offsetY,
        };
    };

    const initDraw = (e: MouseEvent) => {
        onDraw();
        ctx.beginPath();
        pos = { drawable: true, ...getPosition(e) };
        ctx.moveTo(pos.x, pos.y);
    };

    const draw = (e: MouseEvent) => {
        if (pos.drawable) {
            pos = { ...pos, ...getPosition(e) };
            ctx.lineTo(pos.x, pos.y);
            ctx.stroke();
        }
    };

    const finishDraw = () => {
        pos = { drawable: false, x: 0, y: 0 };
    };

    const selectEraser = async () => {
        await setNowCanvas(canvas.toDataURL());
        setErase(!erase);
        setNowColor("white");
    };

    const innerUseEffect = () => {
        canvas = canvasRef.current!;
        ctx = canvas.getContext("2d")!;
        ctx.strokeStyle = nowColor;
        ctx.lineWidth = erase ? 10 : 1;
        canvas.addEventListener("mousedown", initDraw);
        canvas.addEventListener("mousemove", draw);
        canvas.addEventListener("mouseup", finishDraw);
        canvas.addEventListener("mouseout", finishDraw);
        onChange(nowCanvas);
        const image = new Image();
        image.src = nowCanvas;
        ctx.drawImage(image, 0, 0);
    };

    useEffect(() => {
        innerUseEffect();
    });


    return (
        <FlexRowWrapper>
            <FlexColumnWrapper>
                <EraserBtn erase={erase} src={img} alt="지우개" onClick={selectEraser} />
            </FlexColumnWrapper>
            <canvas
                ref={canvasRef}
                width="400"
                height="400"
                className={s.canvas}
            ></canvas>
            <FlexColumnWrapper>{colorCopComponents}</FlexColumnWrapper>
        </FlexRowWrapper>
    );
});

const EraserBtn = style.img<{erase: boolean}>`
    box-sizing: border-box;
    width: 30px;
    height: 30px;
    border-radius: 50%;
    border: ${(props) => props.erase ? "2px solid black" : "none"};
    margin-bottom: 5px;
    box-shadow: -2px 2px 3px 2px rgba(0, 0, 0, 0.4);
    clip-path: circle(30px at center);
`;

const FlexColumnWrapper = style.div`
    display: flex;
    flex-direction: column;
    margin: 5px;
`;

const FlexRowWrapper = style.div`
    width: 100vw;
    display: flex;
    flex-direction: Row;
`;

export default Canvas;
