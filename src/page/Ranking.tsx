import { useState, useEffect } from "react";
import RankingBlock from "../components/RankingBlock";
import style from "styled-components";
import { PostRankingItem, ScoreRankingItem } from "../api/response";
import { getPostRanking, getScoreRanking } from "../api/ranking";

function Ranking() {
    const [postRanking, setPostRanking] = useState<PostRankingItem[]>();
    const [scoreRanking, setScoreRanking] = useState<ScoreRankingItem[]>();
    const [isContRank, setIsContRank] = useState<boolean>(true);

    const changeTab = () => {
        if (isContRank === false) {
            // setRanking([]);
            // getRanking('postranking'); 
            setIsContRank(true); 
        } else {
            // setRanking([]);
            setIsContRank(false)
            // getRanking('scoreranking');
        }

    }

    const getRanking = async () => {
        try {
            const postRankingData = await getPostRanking();
            const scoreRankingData = await getScoreRanking();
            setPostRanking(postRankingData);
            setScoreRanking(scoreRankingData);
        } catch (e) {
            console.log(e);
            setPostRanking(undefined);
            setScoreRanking(undefined);
        }
    };

    useEffect(() => {
        getRanking();
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
            {(isContRank && postRanking) ? postRanking!.map((item, index) => {
                return (
                    <RankingBlock
                        key={index}
                        color={index}
                        author={item.author}
                        num={item.cnt}
                        nowTab={isContRank}
                    />
                );
            }): (
                (!isContRank && scoreRanking) ? scoreRanking!.map((item, index) => {
                    return (
                        <RankingBlock
                            key={index}
                            color={index}
                            author={item.userid}
                            num={item.cnt}
                            nowTab={isContRank}
                        />
                    );
                }): <div>로딩중...</div>
            )}
        </Wrapper>
    );
}

const Text = style.div`
    font-size: 7rem;
    font-family: "Do Hyeon", sans-serif;
    text-align: center;
    margin-bottom: 50px;
    @media (max-width: 800px) {
        font-size: 3rem;
    }
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
