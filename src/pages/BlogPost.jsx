import React from 'react';
import {useParams} from "react-router-dom";

function BlogPost() {
    const { id } = useParams();



    return (
        <div>
            <h1>
                {id}
            </h1>
        </div>
    );
}

export default BlogPost;