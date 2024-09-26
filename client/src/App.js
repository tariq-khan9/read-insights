import {
  Route,
  Routes,
  BrowserRouter
} from "react-router-dom";
import CreateAuthor from "./components/author/CreateAuthor";
import Authors from "./components/author/Authors";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<CreateAuthor />} />
        <Route path="/author" element={<Authors/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
