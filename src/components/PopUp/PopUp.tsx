import React, { useState } from "react";
import style from "styled-components";
import { ProblemItem } from "../../api/response";
import { checkAnswer } from "../../api/post";

interface PopUpProps {
    display: boolean;
    close: () => void;
    problem: ProblemItem | undefined;
}

function PopUp(props: PopUpProps) {

    const {display, close, problem} = props;

    const [isCor, setIsCor] = useState<string>("");
    const [correct, setCorrect] = useState<string>("");

    const PopUpStyle: React.CSSProperties = {
        position: "fixed",
        top: "100px",
        left: "50%",
        width: "400px",
        height: "600px",
        backgroundColor: "lightgrey",
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

    const inputCorrect = (e: React.ChangeEvent<HTMLInputElement>) => {
        setCorrect(e.target.value);
    };

    const enterKey = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            checkCorrect();
        }
    }

    const checkCorrect = async () => {
        try {
            setIsCor("엄...");
            // console.log(Logged, id);
            const { response, data: {isCorrect} } = await checkAnswer(problem!.id, correct);

            if (isCorrect) {
                setIsCor("정답!!!!!!");
                setTimeout(() => {
                    setIsCor("");
                    setCorrect("");
                }, 1000);
            } else  {
                setIsCor(response === '' || response === undefined ? "땡!!!!!!!!!!" : response!);
                setTimeout(() => {
                    setIsCor("");
                    setCorrect("");
                }, 1000);
            }
        } catch (e) {
            console.log(e);
            setIsCor("정답 확인에 실패했어요. 로그인은 하셨나요?");
            setTimeout(() => setIsCor(""), 1000);
        }
    };

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
                            value={correct}
                            onChange={inputCorrect}
                            placeholder="정답을 입력하세요"
                            onKeyPress={enterKey}
                        />
                        <input
                            type="submit"
                            name="submit"
                            value="정답 확인"
                            onClick={checkCorrect}
                        />
                        <div>{isCor}</div>
                    </>
                ) : (
                    <div>로딩중...</div>
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
