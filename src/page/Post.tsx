import { useState, useEffect } from "react";
import style from "styled-components";
import PostBox from "../components/PostBox";
import PopUp from '../components/PopUp';
import { getProblems, getUserSolvedProblems } from "../api/post";
import { ProblemItem } from "../api/response";
import { Wrapper } from "../css/wrapper";

function Post() {
    const [posts, setPosts] = useState<ProblemItem[]>();
    const [selectedPost, setSelectedPost] = useState<ProblemItem>();
    const [popUpOpened, setPopUpOpened] = useState<boolean>(false);

    const getPosts = async () => {
        try {
            let problemList: ProblemItem[] = [];
            const data = await getProblems();
            const solvedData = await getUserSolvedProblems();
            const solvedProblemList = solvedData.map((item) => item.postid);

            let searchStartIndex = 0;
            for (let problem of data) {
                if (solvedProblemList.includes(problem.id, searchStartIndex)) {
                    problem.isSolved = true;
                    problemList.push(problem);
                    searchStartIndex += 1;
                } else {
                    problem.isSolved = false;
                    problemList.push(problem);
                }
            }
            setPosts(data);
        } catch (err) {
            console.log(err);
        }
    };

    // const getSolvedProblem = async () => {  
    //     try {
                
    //         setSolved(data);
    //     } catch (err) {
    //         console.log(err);
    //     }
    // }

    const openPopUp = async (problem: ProblemItem) => {
        setPopUpOpened(true);
        setSelectedPost(problem);
    }

    const closePopUp = () => {
        setPopUpOpened(false);
        setSelectedPost(undefined);
    }

    useEffect(() => {
        getPosts();
    }, []);

    return (
        <Wrapper>
            <Text>재밌는 그림들^^</Text>
            <FlexContainer>
                { posts === undefined ? "로딩중..." 
                : posts.map((item, index) => <PostBox key={index} problem={item} open={openPopUp} />)}
                <PopUp display={popUpOpened} close={closePopUp} problem={selectedPost} />
            </FlexContainer>
        </Wrapper>
    );
}

const Text = style.div`
    @import url("https://fonts.googleapis.com/css2?family=Do+Hyeon&display=swap");
    font-family: "Do Hyeon", sans-serif;
    font-size: 5rem;
    text-align: center;
    margin-top: 30px;
`;

const FlexContainer = style.div`
    display: flex;
    justify-content: center;
    margin-top: 30px;
    flex-wrap: wrap;
`;

export default Post;
