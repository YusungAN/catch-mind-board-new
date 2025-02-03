import { useState, } from "react";
import { useNavigate } from "react-router-dom";
import style from "styled-components";
import s from "../css/register.module.css";
import { loginApi } from "../api/user";
import useLoading from "../hook/useLoading";
import { BeatLoader } from "react-spinners";

const Login = () => {
    const navigate = useNavigate();

    const [id, setId] = useState<string>("");
    const [pw, setPw] = useState<string>("");

    const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {
            target: { name, value },
        } = e;
        
        if (name === "id") setId(value);
        else if (name === "pw") setPw(value);
    };

    const enterKey = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            handleLogin();
        }
    }

    const sendData = async () => {
        try {
            const { token, reason } = await loginApi(id, pw);
            if (token === undefined || reason !== undefined) {
                alert(`로그인 실패!\n${reason}`);
            } else {
                localStorage.setItem("cmb-token", token!);
                alert("로그인 성공!");
                navigate("/");
            }
        } catch (err) {
            alert(`로그인 실패!\n${err}`);
        }
    };

    const [isLoading, handleLogin] = useLoading(sendData);

    return (
        <>
            <div className={s.flexwrapper}>
                <Text>로그인</Text>
                <input
                    type="text"
                    name="id"
                    placeholder="id"
                    className={s.input}
                    value={id}
                    onChange={handleInput}
                    autoFocus
                />
                <input
                    type="password"
                    name="pw"
                    className={s.input}
                    placeholder="비밀번호"
                    value={pw}
                    onChange={handleInput}
                    onKeyPress={enterKey}
                />
                <button
                    type="submit"
                    name="submit"
                    className={s.submit}
                    style={{ marginTop: 20 }}
                    onClick={handleLogin}
                >
                    <span>로그인</span>
                    {isLoading ? <BeatLoader size={10}></BeatLoader> : <></>}
                </button>
            </div>
        </>
    );
}

const Text = style.div`
    @import url("https://fonts.googleapis.com/css2?family=Do+Hyeon&display=swap");
    font-family: "Do Hyeon", sans-serif;
    font-size: 5rem;
`;

export default Login;
