import {
  Route,
  Routes,
  BrowserRouter
} from "react-router-dom";
import Authors from "./components/author/Authors";
import Login from "./components/author/Login";
import RegisterAuthor from "./components/author/RegisterAuthor";
import LoginAuthor from "./components/author/LoginAuthor";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/register" element={<RegisterAuthor/>} />
        <Route path="/author" element={<Authors/>} />
        <Route path="/login" element={<LoginAuthor/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
