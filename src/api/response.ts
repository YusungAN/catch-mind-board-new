
export interface APIResponse<T> {
    success: boolean;
    response: string | undefined;
    data: T;
}

export interface LoginResponse {
    token?: string;
    reason?: string;
}

export interface ProblemItem {
    id: number;
    imgdata: string;
    hint: string;
    author: string;
    isSolved?: boolean;
}

export interface PostRankingItem {
    author: string;
    cnt: number;
}

export interface ScoreRankingItem {
    userid: string;
    cnt: number;
}