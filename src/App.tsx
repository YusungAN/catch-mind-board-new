import { BrowserRouter, Routes, Route } from 'react-router-dom';
import * as Pages from './page';


const App = () => {
    return (
        <>
            <BrowserRouter>
                <Routes>
                  <Route path={"/"} element={<Pages.Home />} />
                  <Route path={"/problem"} element={<Pages.Problem />} />
                  <Route path={"/register"} element={<Pages.Register />} />
                  <Route path={"/login"} element={<Pages.Login />} />
                  <Route path={"/post"} element={<Pages.Post />} />
                  <Route path={"/ranking"} element={<Pages.Ranking />} />
                </Routes>
            </BrowserRouter>
        </>
    );
}

export default App;