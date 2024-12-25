import { useState } from 'react';
import style from 'styled-components';
import s from '../css/register.module.css';
import { useNavigate } from "react-router-dom";
import { registerApi } from '../api/user';


const Register = () => {
    const navigate = useNavigate();

    const [id, setId] = useState<string>('');
    const [pw, setPw] = useState<string>('');
    const [nickName, setNickName] = useState<string>('');

    const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {
            target : { name, value }
        } = e;
        if (name === 'id') setId(value);
        else if (name === 'pw') setPw(value);
        else if (name === 'nickname') setNickName(value);
        
    }

    const enterKey = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            sendData();
        }
    }

    const sendData = async () => {
        try {
            const {success, response} = await registerApi(id, pw, nickName);
            if (!success) {
                alert(`회원가입 실패!\n이유 : ${response}`);
                return;
            } else {
                alert('회원가입 성공!');
                navigate('/');
            }
        } catch (e) {
            alert(`회원가입 실패!`);

        }
        
    }

    return (
        <>
            <div className={s.flexwrapper}>
                <Text>회원 가입</Text>
                <input type="text" name="id" placeholder="사용할 id 입력" className={s.input} value={id} onChange={handleInput} autoFocus />
                <input type="password" name="pw" className={s.input} placeholder="사용할 비밀번호, 대충 지으세요" value={pw} onChange={handleInput} />
                <input type="text" name="nickname" placeholder="사용할 닉네임 입력" className={s.input} value={nickName} onChange={handleInput} onKeyPress={enterKey} />
                <input type="submit" name="submit" value="회원가입" className={s.submit} onClick={sendData} />
            </div>
        </>
    );
}

const Text = style.div`
        @import url("https://fonts.googleapis.com/css2?family=Do+Hyeon&display=swap");
        font-family: "Do Hyeon", sans-serif;
        font-size: 5rem;

    `;

export default Register;