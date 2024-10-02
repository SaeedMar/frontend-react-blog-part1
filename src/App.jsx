import './App.css'
// import logo from './assets/logo-white.png'
import Navigation from "./components/Navigation.jsx";
import {Routes, Route} from "react-router-dom";
import Home from "./pages/home/Home.jsx";
import Fault from "./pages/fault/Fault.jsx";
import NewPost from "./pages/newPostPage/NewPost.jsx";
import Overzicht from "./pages/overZicht/Overzicht.jsx";
import BlogPost from "./pages/BlogPost.jsx";
import BlogPostDetail from "./components/BlogPostDetail.jsx";
import BlogPostForm from "./components/BlogPostForm.jsx";

function App() {
    return (
        <>
            <Navigation />
            <Routes>
                <Route path="/home" element={<Home/>} />
                <Route path="/fault" element={<Fault/>} />
                <Route path="/newPost" element={<NewPost />} />
                <Route path="*" element={<Fault/>} />,
                <Route path="/posts/:id" element={<BlogPostDetail/>}/>
                <Route path="/blogpost" component={<BlogPost/>}/>
                <Route path="/Overzicht" element={<Overzicht/>}/>

            </Routes>
            <div className="page-container">
                <BlogPostForm/>
                {/*<img src={logo} alt="Company logo"/>*/}

                <h1>Begin hier met het maken van jouw blog-applicatie!</h1>
            </div>
        </>

    )
}

export default App
