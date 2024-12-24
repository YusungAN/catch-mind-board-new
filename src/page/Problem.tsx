import { useState, useRef } from "react";
import Canvas from "../components/Canvas";
import s from "../css/problem.module.css";
import { useNavigate } from "react-router-dom";
import { submitProblem } from "../api/post";


const Problem = () => {
    const navigate = useNavigate();

    const childRef = useRef<HTMLCanvasElement>(null);
    const [is, setIs] = useState<boolean>(false);

    const [correct, setCorrect] = useState<string>("");
    const [hint, setHint] = useState<string>("");
    const [picture, setPicture] = useState<string>("");

    const sendData = async () => {
        console.log(picture);
        try {
            const {success, response} = await submitProblem(correct, hint, picture);

            if (success) {
                alert("문제 올리기 성공!");
                navigate("/");
            } else {
                throw Error(response);
            }
        } catch (err) {
            alert(`문제 올리기에 실패했어요\n${err}`);
            navigate("/");
        }
    };

    const handleCorInput = async (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!is) {
            childRef.current?.savePicture();
            setIs(true);
        }
        const {
            target: { value },
        } = e;
        setCorrect(value);
    };

    const handleHintInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!is) {
            childRef.current?.savePicture();
            setIs(true);
        }
        const {
            target: { value },
        } = e;
        setHint(value);
    };

    const pictureAddress = async (address: string) => {
        await setPicture(address);
    };

    return (
        <>
            <div className={s.title}>당신의 창의력을 표현하세요</div>
            <div className={s.con}>
                <div>
                    *너무 빠르게 그리면 뻗을 수 있으니 주의! (개발자 역량 부족)
                </div>
                <Canvas onChange={pictureAddress} onDraw={() => {setIs(false)}} ref={childRef} />
                <input
                    type="text"
                    name="correct"
                    placeholder="정답 입력"
                    className={s.input1}
                    value={correct}
                    onChange={handleCorInput}
                />
                <input
                    type="text"
                    name="hint1"
                    placeholder="힌트 입력"
                    className={s.input2}
                    value={hint}
                    onChange={handleHintInput}
                />
                <input
                    type="submit"
                    value="문제 내기"
                    className={s.submit}
                    onClick={sendData}
                />
            </div>
        </>
    );
}

export default Problem;
