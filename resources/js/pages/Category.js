import React, { useState, useEffect, Fragment } from 'react';
import {Link, useParams} from 'react-router-dom';

const Category = (() => {
    const [category, setCategory] = useState({});
    const [posts, setPosts] = useState([]);
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
                {posts.map(post => (
                    <li><Link to={`/categories/${category.slug}/posts/${post.slug}`}>{post.title}</Link></li>
                ))}
            </ul>
        </Fragment>
    );
});

export default Category;
