import { getData, postData } from '.';
import { ProblemItem } from './response';

const getProblems = async () => {
    const res = await getData<ProblemItem[]>('/post/getposts');
    if (res.success) {
        return res.data;
    } else {
        throw Error('get posts fail');
    }
}

const getUserSolvedProblems = async () => {
    const res = await getData<{postid: number}[]>('/post/getsolved');
    if (res.success) {
        return res.data;
    } else {
        throw Error('get solved problems');
    }
}

const submitProblem = async (answer: string, hint: string, imgdata: string) => {
    const res = await postData('/post/problemsubmit', {
        answer: answer,
        hint: hint,
        imgdata: imgdata,
    });

    return res;
}

const checkAnswer = async (problemId: number, answer: string) => {
    const res = await postData<{isCorrect: boolean}>(`/post/checkanswer/${problemId}`, {input: answer});
    if (res.success) {
        return res;
    } else {
        throw Error('check answer fail');
    }
}

export {
    getProblems,
    getUserSolvedProblems,
    submitProblem,
    checkAnswer
}