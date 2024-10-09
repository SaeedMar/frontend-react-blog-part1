import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from "axios";

const Overzicht = () => {
    const [posts, setPosts] = React.useState([]);
    const [loading, setLoading] = React.useState(false);
    const [error, setError] = React.useState(""); // Gebruik een lege string in plaats van false

    useEffect(() => {
        const fetchPosts = async () => {
            setLoading(true);
            setError("");
            try {
                const response = await axios.get(`http://localhost:3000/posts`);
                setPosts(response.data);
                console.log(response.data);
            } catch (err) {
                console.error("Error fetching post:", err.message);
                setError("Er is een probleem met het laden van je posts, oepsie!");
            } finally {
                setLoading(false);
            }
        };
        fetchPosts();
    }, []);

    return (
        <div>
            <h1>Overzichtspagina</h1>
            {loading && <p>Loading...</p>}
            {error && <p style={{ color: 'red' }}>{error}</p>} {/* Foutmelding in het rood */}
            <p>Aantal posts: {posts.length}</p>
            {posts.length > 0 ? ( // Controleer of er posts zijn
                <ul>
                    {posts.map((post) => (
                        <li key={post.id}>
                            <Link to={`/blogpost/${post.id}`}>
                                <p>{post.title} ({post.author})</p> {/* Sluit de haakjes correct */}
                            </Link>
                            <p>
                                {post.comments} reacties - {post.shares} keer gedeeld
                            </p>
                        </li>
                    ))}
                </ul>
            ) : (
                !loading && <p>Geen posts beschikbaar.</p> // Toon deze melding als er geen posts zijn en niet aan het laden
            )}
        </div>
    );
};

export default Overzicht;
