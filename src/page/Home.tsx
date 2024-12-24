import { useState, useEffect } from "react";
import s from "../css/home.module.css";
import { Link, useNavigate } from "react-router-dom";
import style from "styled-components";
import {jwtDecode, JwtPayload} from 'jwt-decode';
import { isTokenExpired } from "../util/token";
import { Wrapper } from "../css/wrapper";

interface CustomPayload extends JwtPayload {
    id?: string;
    nickname?: string;
}


const Home = () => {
    const navigate = useNavigate();
    const [nickName, setNickName] = useState<string>("");
    const [isLogged, setIsLogged] = useState<boolean>(false);

    const tokenVerify = async () => {
        // const {
        //     data: {
        //         success,
        //         info: { nickname, id },
        //     },
        // } = await axios.get(
        //     `https://anyusung.team/api/check?token=${localStorage["anyusung-team-token"]}`
        // );
        // localStorage.setItem("yusungan-userid", id);
        // const {data : {response}} = await axios.get(`https://anyusung.team/api/score/${id}`);
        const token: string = localStorage['cmb-token'];
        const isLogged = !isTokenExpired(token);
        if (isLogged) {
            try {
                const userInfo = jwtDecode<CustomPayload>(token);

                setNickName(userInfo.nickname!);
                setIsLogged(true);
                return { success: true, nickname: userInfo.nickname! };
            } catch (err) {
                console.log(err);
                setIsLogged(false);
            }
        }
        return { success: false, nickname: '' };
    };

    const logout = () => {
        if (window.confirm("로그아웃하시겠습니까?")) {
            localStorage.clear();
            setIsLogged(false);
            navigate("/");
        }
    };

    const toProblem = async () => {
        try {
            if (isLogged) navigate("/problem");
            else alert("로그인 후 이용가능합니다!");
        } catch (e) {
            alert("로그인 후 이용가능합니다!");
        }
    };

    useEffect(() => {
        tokenVerify();
    }, []);

    return (
        <Wrapper>
            <FlexWrapper>
                {!isLogged ? (
                    <>
                        <FlexItem>
                            <Link to="/register">회원가입</Link>
                        </FlexItem>
                        <FlexItem>
                            <Link to="login">로그인</Link>
                        </FlexItem>
                    </>
                ) : (
                    <>
                        <FlexItem>'{nickName}'님 ㅎㅇ ||</FlexItem>
                        <FlexItem>
                            <div onClick={logout}>로그아웃</div>
                        </FlexItem>
                    </>
                )}
            </FlexWrapper>
            <div className={s.sizedbox}></div>
            <div className={s.title}>마음 잡기</div>
            <div className={s.con}>
                <Link to="/post">
                    <button className={s.psolve}>문제 풀기</button>
                </Link>
                <button className={s.pprob} onClick={toProblem}>
                    문제 내기
                </button>
                <Link to="/ranking">
                    <button className={s.pprob}>랭킹 보기</button>
                </Link>
            </div>
        </Wrapper>
    );
}

const FlexWrapper = style.div`
    display: flex;
    justify-content: flex-end;
`;

const FlexItem = style.div`
    margin-right: 10px;
`;



export default Home;
