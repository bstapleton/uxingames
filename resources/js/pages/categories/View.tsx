import React, { useState, useEffect, Fragment } from 'react';
import {Link, useParams} from 'react-router-dom';
import axios from 'axios';

const CategoryView = (() => {
    const [category, setCategory] = useState({
        title: null,
        slug: null,
        post_count: 0,
        description: null,
    });
    const [posts, setPosts] = useState([
        {
            title: null,
            slug: null
        }
    ]);
    const { slug } = useParams();

    useEffect(() => {
        axios.get(`/category/${slug}`)
            .then(response => {
                setCategory(response.data.data);
                setPosts(response.data.data.posts);
            })
            .catch((error) => console.error(error));
    }, []);

    return (
        <Fragment>
            <h1>{category.title} ({category.post_count})</h1>
            <p>{category.description}</p>
            <ul>
                {posts.map((post, index) => (
                    <li key={index}><Link to={`/categories/${category.slug}/posts/${post.slug}`}>{post.title}</Link></li>
                ))}
            </ul>
        </Fragment>
    );
});

export default CategoryView;
