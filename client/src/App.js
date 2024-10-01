import {
  Route,
  Routes,
  BrowserRouter
} from "react-router-dom";
import Authors from "./components/author/Authors";
import RegisterAuthor from "./components/author/RegisterAuthor";
import LoginAuthor from "./components/author/LoginAuthor";
import CreatePost from "./components/dashboard/post/CreatePost";
import Index from "./components/home/Index";
import IndexPost from "./components/post/IndexPost";


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="" element={<Index/>} />
        <Route path="/register" element={<RegisterAuthor/>} />
        <Route path="/author" element={<Authors/>} />
        <Route path="/login" element={<LoginAuthor/>} />

        <Route path="post/create" element={<CreatePost/>} />
        <Route path="/post/:id" element={<IndexPost/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
