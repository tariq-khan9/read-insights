import {
  Route,
  Routes,
  BrowserRouter
} from "react-router-dom";
import { AuthProvider } from "./services/AuthContext";
import ProtectedRoute from "./services/ProtectedRoutes";
import RegisterAuthor from "./components/author/RegisterAuthor";
import LoginAuthor from "./components/author/LoginAuthor";
import CreatePost from "./components/dashboard/CreatePost";
import Navbar from "./components/Navbar";
import Index from "./components/home/Index";
import IndexPost from "./components/post/IndexPost";
import IndexDash from "./components/dashboard/IndexDash";


function App() {
  return (
    <BrowserRouter>
       <AuthProvider>

      
       <Navbar/>
       <div className='max-w-[2400px] min-h-screen bg-gradient-to-r from-sky-600 to-fuchsia-700 mx-auto px-4 mt-12'>
      <Routes>
        <Route path="/" element={<Index/>} />
        <Route path="/register" element={<RegisterAuthor/>} />
        <Route path="/login" element={<LoginAuthor/>} />
        <Route path="/post/:id" element={<IndexPost/>} />
        <Route path="/category/:id" element={<Index/>} />
        <Route path="/author/:id" element={<Index/>} />

        <Route element={<ProtectedRoute />}>
            <Route path="post/create" element={<CreatePost/>} />
            <Route path="/my-posts/:id" element={<IndexDash/>} />
        </Route>

        

     
        
      </Routes>
      </div>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
