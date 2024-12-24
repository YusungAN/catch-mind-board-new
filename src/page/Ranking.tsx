import { useState, useEffect } from "react";
import RankingBlock from "../components/RankingBlock";
import style from "styled-components";
import { PostRankingItem, ScoreRankingItem } from "../api/response";
import { getPostRanking, getScoreRanking } from "../api/ranking";

function Ranking() {
    const [ranking, setRanking] = useState<PostRankingItem[] | ScoreRankingItem[]>();
    const [isContRank, setIsContRank] = useState<boolean>(true);

    const changeTab = () => {
        if (isContRank === false) {
            setRanking([]);
            getRanking('postranking'); 
            setIsContRank(true); 
        } else {
            setRanking([]);
            setIsContRank(false)
            getRanking('scoreranking');
        }

    }

    const getRanking = async (rankingStr: 'postranking' | 'scoreranking') => {
        try {
            let data: PostRankingItem[] | ScoreRankingItem[];
            if (rankingStr === 'postranking') {
                data = await getPostRanking();
            } else {
                data = await getScoreRanking();
            }
            setRanking(data);
        } catch (e) {
            console.log(e);
            setRanking(undefined);
        }
    };

    useEffect(() => {
        getRanking('postranking');
    }, []);

    return (
        <Wrapper>
            <RowWrapper>
                <button onClick={changeTab}>
                    {isContRank ? '정답 랭킹 보기' : '문제 출제 랭킹 보기'}
                </button>
            </RowWrapper>
            {isContRank ? (
                <Text>사이트의 일등공신들</Text>
            ) : (
                <Text>정답 많이 맞춘 사람</Text>
            )}
            {ranking ? ranking!.map((item, index) => {
                return (
                    <RankingBlock
                        key={index}
                        color={index}
                        author={isContRank ? item.author : item.userid}
                        num={isContRank ? item.cnt : item.cnt*10}
                        nowTab={isContRank}
                    />
                );
            }): <div>로딩중...</div>}
        </Wrapper>
    );
}

const Text = style.div`
    font-size: 7rem;
    font-family: "Do Hyeon", sans-serif;
    text-align: center;
    margin-bottom: 50px;
`;

const Wrapper = style.div`
    display: flex;
    width: 100vw;
    flex-direction: column;
    align-items: center;
`;

const RowWrapper = style.div`
    display: flex;
    flex-direction: row;
    align-items: center;
`;

export default Ranking;
