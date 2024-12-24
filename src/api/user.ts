import { postData } from '.';
import { LoginResponse } from './response';

const loginApi = async (id: string, pw: string) => {
    const res = await postData<LoginResponse>('/user/login', {id: id, pw: pw});
    if (res.success) {
        return res.data;
    } else {
        throw Error(res.response);
    }
}

const registerApi = async (id: string, pw: string, nickname: string) => {
    const res = await postData('/user/register', {id: id, pw: pw, nickname: nickname});
    
    return res;
}



export {
    loginApi,
    registerApi
}