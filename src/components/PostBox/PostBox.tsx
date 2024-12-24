import style from "styled-components";
import { ProblemItem } from "../../api/response";


const PostBox = (props: {problem: ProblemItem, open: (problem: ProblemItem) => void}) => {
    const {id, imgdata, author, hint, isSolved} = props.problem;

    return (
        <>
            <PostBoxElement color={isSolved!} onClick={() => props.open(props.problem)}>
                <div>{id}</div>
                <div
                    style={{
                        width: 145,
                        height: 145,
                        backgroundColor: "white",
                    }}
                >
                    <img
                        src={imgdata}
                        width="145"
                        height="145"
                        alt="그림 준비중"
                    />
                </div>
                <div>출제자: {author}</div>
            </PostBoxElement>
        </>
    );
}

const PostBoxElement = style.div<{color: boolean}>`
    width: 200px;
    height: 200px;
    background-color: ${props => props.color ? "green" : "grey"};
    border-radius: 30px;
    box-shadow: 2px 2px 3px 2px rgba(0, 0, 0, 0.4);
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-left: 30px;
    margin-right: 30px;
    margin-bottom: 30px;
`;

export default PostBox;
