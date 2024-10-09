import React, { useEffect, useState } from 'react';
import { useParams, Link } from "react-router-dom";
import axios from "axios";

const BlogPostDetail = () => {
    const { id } = useParams();
    const [post, setPost] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchPost = async () => {
            setLoading(true);
            setError('');
            try {
                const response = await axios.get(`http://localhost:3000/posts/${id}`);
                setPost(response.data);
                console.log("Fetched post:", response.data);
            } catch (err) {
                console.error("Error fetching post:", err.message);
                setError("Er is een probleem met het ophalen van de post. Probeer het later opnieuw.");
            } finally {
                setLoading(false);
            }
        };
        fetchPost();
    }, [id]);

    return (
        <>
            <h1>Post Detail</h1>
            {loading && <p>Loading...</p>}
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {post ? (
                <div>
                    <h2>{post.title}</h2>
                    <h3>{post.subtitle}</h3>
                    <p>{post.content}</p>
                    <p>Geschreven door {post.author}</p>
                    <p>Aangemaakt op: {new Date(post.created).toLocaleDateString()}</p>
                    <p>Leestijd: {post.readTime} minuten</p>
                    <p>{post.comments} reacties - {post.shares} keer gedeeld</p>
                    <Link to="/Overzicht">Terug naar de overzichtspagina</Link>
                </div>
            ) : (
                !loading && <p>Geen post beschikbaar.</p>
            )}
        </>
    );
};

export default BlogPostDetail;
