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
import {useState} from "react";
import axios from "axios";

function App() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    async function fetchData() {
        setLoading(true);
        setError("");
        try {
            const response = await axios.get("http://localhost:3000/posts");
            console.log(response);
            console.log(response.data);

        } catch (err) {
            console.error("Error fetching message:", err.message);
            setError(err.message);
        } finally {
            setLoading(false);
        }
    }
    async function fetchPostById(id) {
        setLoading(true);
        setError('')
        try {
            const response = await axios.get(`http://localhost:3000/posts/${id}`);
            console.log(response.data);
        }catch(err) {
            console.error("Error fetching post:", err.message);
            setError(err.message);
        }finally {
            setLoading(false);
        }
    }

    async function addPost() {
        setLoading(true);
        setError('')
        const newPost = {
            "title": "Wat gebruiker heeft ingevuld",
            "subtitle": "Wat gebruiker heeft ingevuld",
            "content": "Wat gebruiker heeft ingevuld, in dit geval minder dan 100 woorden",
            "author": "Voornaam achternaam",
            "created": "2023-09-21T09:30:00Z",
            "readTime": 1,
            "comments": 0,
            "shares": 0

        };
        try {
            const response = await axios.post("http://localhost:3000/posts", newPost);
            console.log("Post added successfully " ,response.data);

        } catch (err) {
            console.error("Error adding post:", err.message);
            setError(err.message);

        }finally {
            setLoading(false);
        }

    }

    async function deletePost(id) {
        try {
            const response = await axios.delete(`http://localhost:3000/posts/${id}`);
            console.log("post deleted succesfully", response.data);
        }catch(err) {
            console.error("Error deleting post:", err.message);
        }
    }
    async function firstPost(id) {
        try {
            const updatedPost = {
                id: 1,  // Zorg ervoor dat dit het juiste id is
                title: "De Smaken van Italië",
                subtitle: "Nieuwe subtitel",  // Dit is het veld dat je wijzigt
                content: "Italië, het land van heerlijke pasta...",
                author: "Anna de Kok",
                created: "2023-09-21T09:30:00Z",
                readTime: 5,
                comments: 12,
                shares: 8
            };

            const response = await axios.put(`http://localhost:3000/posts/${id}`, updatedPost);
            console.log('Post updated:', response.data);
        } catch (err) {
            console.error('Error updating post:', err.message);
        }
    }

    return (
        <>
            <Navigation />
            <Routes>
                <Route path="/" element={<Home/>} />
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
            <h2>React App</h2>
            {loading && <p>Loading...</p>}
            {error && <p>Er is iets misgegaan: {error}</p>}
            <h2>Data</h2>
            <button onClick={fetchData} type="button">
                Fetch Posts
            </button>
            <button onClick={() => fetchPostById(6)}>
                Fetch post ID 6
            </button>
            <button onClick={addPost} type="button">
                Add post

            </button>
            <button onClick={() => deletePost(6)} type="button">
                Delete post ID 6
            </button>
            <button onClick={() => firstPost(1)} type="button">
                change the subtitle of the 1st post
            </button>

        </>

    )
}

export default App
