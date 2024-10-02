import React, {useEffect} from 'react';
import {Link} from 'react-router-dom';
import postsData from '/src/constants/data.json'



const Overzicht = () => {
    const [posts, setPosts] = React.useState([]);

    useEffect(() => {
        setPosts(postsData);
    }, []);
    return (
        <div>
            <h1>Overzichtspagina </h1>
            <p>Aantal posts : {posts.length}</p>
            <ul>
                {posts.map((post) => (
                    <li key={post.id}>
                        <Link to={`/blogpost/${post.id}`}>
                            {post.title} ({post.author})
                        </Link>
                        <p>
                            {post.comments} reacties - {post.shares} keer gedeeld
                        </p>
                    </li>

                ))}
            </ul>
        </div>
    );
};

export default Overzicht;