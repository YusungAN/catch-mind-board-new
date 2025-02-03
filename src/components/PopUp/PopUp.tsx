import React, { useState } from "react";
import style from "styled-components";
import { ProblemItem } from "../../api/response";
import { checkAnswer } from "../../api/post";
import useLoading from "../../hook/useLoading";
import { BeatLoader } from "react-spinners";

interface PopUpProps {
    display: boolean;
    close: () => void;
    problem: ProblemItem | undefined;
}

function PopUp(props: PopUpProps) {

    const {display, close, problem} = props;

    const [isCor, setIsCor] = useState<boolean | undefined>(undefined);
    const [answer, setAnswer] = useState<string>("");
    const [bgColor, setBgColor] = useState<string>("lightgrey");

    const PopUpStyle: React.CSSProperties = {
        position: "fixed",
        top: "100px",
        left: "50%",
        width: "400px",
        height: "600px",
        backgroundColor: bgColor,
        display: display ? "flex" : "none",
        borderRadius: "25px",
        marginLeft: "-200px",
        flexDirection: "column",
        alignItems: "center",
    };

    const Input = {
        width: "300px",
        height: "30px",
        borderRadius: "50px",
        paddingLeft: "10px",
        marginTop: "10px",
    };

    const inputAnswer = (e: React.ChangeEvent<HTMLInputElement>) => {
        setAnswer(e.target.value);
    };

    const enterKey = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            handleSubmit();
        }
    }

    const checkCorrect = async () => {
        try {
            const {data: {isCorrect} } = await checkAnswer(problem!.id, answer);

            if (isCorrect) {
                setIsCor(true);
                setBgColor("green");
                setTimeout(() => {
                    setIsCor(undefined);
                    setAnswer("");
                    setBgColor("lightgrey");
                    close();
                }, 1000);
            } else {
                setIsCor(false);
                setBgColor('tomato');
                setTimeout(() => {
                    setIsCor(undefined);
                    setAnswer("");
                    setBgColor("lightgrey");
                }, 1000);
            }
        } catch (e) {
            console.log(e);
            alert(`정답 확인에 실패했어요`);
        }
    };

    const [isLoading, handleSubmit] = useLoading(checkCorrect);

    return (
        <>
            <LightBox display={display} onClick={close} />
            <div style={PopUpStyle}>
                {problem ? (
                    <>
                        <div>{problem.id}</div>
                        <div
                            style={{
                                width: 350,
                                height: 350,
                                backgroundColor: "white",
                            }}
                        >
                            <img
                                src={problem.imgdata}
                                width="350"
                                height="350"
                                alt="그림 준비중"
                            />
                        </div>
                        <div>힌트: {problem.hint}</div>
                        <input
                            type="text"
                            name="correct"
                            style={Input}
                            value={answer}
                            onChange={inputAnswer}
                            placeholder="정답을 입력하세요"
                            onKeyPress={enterKey}
                        />
                        <input
                            type="submit"
                            name="submit"
                            value="정답 확인"
                            onClick={handleSubmit}
                        />
                        {isLoading ? <BeatLoader size={10} /> : <></>}
                        <div>{isCor ? "정답!!!" : (isCor === false ? '오답!!!!' : '')}</div>
                    </>
                ) : (
                    <BeatLoader />
                )}
            </div>
        </>
    );
}

const LightBox = style.div<{display: boolean}>`
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100vh;
        display: ${props => props.display ? "block" : "none"};
        background: rgba(0, 0, 0, 0.7);
    `;

export default PopUp;
