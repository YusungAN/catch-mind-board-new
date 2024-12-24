import { getData } from '.';
import { PostRankingItem, ScoreRankingItem } from './response';

const getPostRanking = async () => {
    const res = await getData<PostRankingItem[]>('/ranking/postranking');
    if (res.success) {
        return res.data;
    } else {
        throw Error('get postranking fail');
    }
}

const getScoreRanking = async () => {
    const res = await getData<ScoreRankingItem[]>('/ranking/scoreranking');
    if (res.success) {
        return res.data;
    } else {
        throw Error('get postranking fail');
    }
}

export {
    getPostRanking,
    getScoreRanking
}