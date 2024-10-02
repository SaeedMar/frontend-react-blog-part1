import React from 'react';
import { useParams, Link } from "react-router-dom";
import Posts from "../constants/data.json";
import {dateFormatter} from "../Helpers/dateFormatter.js";

const BlogPostDetail = () => {
    const { id } = useParams();
    // Convert id from string to number for comparison
    const post = Posts.find(post => post.id === Number(id));

    if (!post) {
        return <h2>Post Not Found</h2>;
    }

    return (
        <div>
            <h1>{post.title} ({post.readTime} minuten)</h1>
            <h2>{post.subtitle}</h2>
            <p>Geschreven door {post.author} op {dateFormatter(post.created)}</p>
            <p>{post.content}</p>
            <p>{post.comments} reacties - {post.shares} keer gedeeld</p>
            <Link to="/Overzicht">Terug naar de overzichtspagina</Link>
        </div>
    );
};

export default BlogPostDetail;
