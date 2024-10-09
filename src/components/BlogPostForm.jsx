import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './blogpostform.css';

const BlogPostForm = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();

    // Helper function to calculate read time
    const calculateReadTime = (content) => {
        const words = content.trim().split(/\s+/).length;
        const minutes = Math.ceil(words / 100 * 0.3);
        return minutes || 1;
    };

    const onSubmit = async (data) => {
        const currentDate = new Date().toISOString();
        const readTime = calculateReadTime(data.content);
        const formattedData = {
            ...data,
            created: currentDate,
            readTime: readTime,
            comments: 0,
            shares: 0,
        };

        try {

            const response = await axios.post('http://localhost:3000/posts', formattedData);
            console.log("Response:", response.data);


            setSuccessMessage(`De blogpost is succesvol toegevoegd. Je kunt deze hier bekijken: <a href="/blogpost/${response.data.id}">Bekijk Post</a>`);
            setErrorMessage('');
        } catch (error) {
            console.error("Error adding post:", error.message);
            setErrorMessage("Er ging iets mis bij het toevoegen van de blogpost. Probeer het opnieuw.");
            setSuccessMessage('');
        }
    };

    return (
        <div>
            {successMessage ? (
                <div dangerouslySetInnerHTML={{ __html: successMessage }} />
            ) : (
                <form onSubmit={handleSubmit(onSubmit)} className="blog-post-form">
                    <div className="form-group">
                        <label htmlFor="title">Titel:</label>
                        <input
                            type="text"
                            id="title"
                            {...register('title', { required: true })}
                        />
                        {errors.title && <span className="error">Dit veld is verplicht</span>}
                    </div>
                    <div className="form-group">
                        <label htmlFor="subtitle">Subtitel:</label>
                        <input
                            type="text"
                            id="subtitle"
                            {...register('subtitle', { required: true })}
                        />
                        {errors.subtitle && <span className="error">Dit veld is verplicht</span>}
                    </div>
                    <div className="form-group">
                        <label htmlFor="author">Auteur:</label>
                        <input
                            type="text"
                            id="author"
                            {...register('author', { required: true })}
                        />
                        {errors.author && <span className="error">Dit veld is verplicht</span>}
                    </div>
                    <div className="form-group">
                        <label htmlFor="content">Bericht:</label>
                        <textarea
                            id="content"
                            {...register('content', { required: true, minLength: 300, maxLength: 2000 })}
                        />
                        {errors.content && (
                            <span className="error">
                                Dit veld is verplicht en moet tussen 300 en 2000 karakters zijn
                            </span>
                        )}
                    </div>
                    <button type="submit">Verzend</button>
                    {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
                </form>
            )}
        </div>
    );
};

export default BlogPostForm;
