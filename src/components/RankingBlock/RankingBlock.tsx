import style from 'styled-components';

interface RankingBlock {
    color: number;
    author: string;
    num: number;
    nowTab: boolean;
}

const RankingBlock = (props: RankingBlock) => {
    const {color, author, num, nowTab} = props;

    return (
        <Wrapper>
            <UpperItem color={color}>{color+1}등 | {author}</UpperItem>
            <BelowItem color={color}>{nowTab ? `제출한 문제: ${num === undefined ? '' : num}개` : `점수: ${num === undefined ? '' : num}점`}</BelowItem>
        </Wrapper>
    );
}

const colorArr = ['gold', '#c0c0c0', 'brown'];

const Wrapper = style.div`
    @import url("https://fonts.googleapis.com/css2?family=Do+Hyeon&display=swap");
    display: flex;
    flex-direction: column;
    font-family: "Do Hyeon", sans-serif;
    text-align: center;
`;

const UpperItem = style.div<{color: number}>`
    width: ${props => props.color <= 2 ? '800px' : '500px'};
    height: ${props => props.color <= 2 ? '200px' : '120px'};
    background-color: ${props => props.color <= 2 ? colorArr[props.color] : 'cyan'};
    line-height: ${props => props.color <= 2 ? '200px' : '120px'};
    font-size: ${props => props.color <= 2 ? '70px' : '40px'};
    overflow: auto;
`;

const BelowItem = style.div<{color: number}>`
    width: ${props => props.color <= 2 ? '800px' : '500px'};
    height: ${props => props.color <= 2 ? '200px' : '120px'};
    line-height: ${props => props.color <= 2 ? '200px' : '120px'};
    font-size: ${props => props.color <= 2 ? '60px' : '35px'};
`;

export default RankingBlock;