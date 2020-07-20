import React, { useState, useEffect, Fragment } from 'react';
import { useParams, Link } from 'react-router-dom';

const TagView = (() => {
    const [tag, setTag] = useState({});
    const [posts, setPosts] = useState([]);
    const { slug } = useParams();

    useEffect(() => {
        axios.get(`/tag/${slug}`)
            .then(response => {
                setTag(response.data.data);
                setPosts(response.data.data.posts);
            })
            .catch((error) => console.error(error));
    }, []);

    return (
        <Fragment>
            <h1>{tag.name} ({tag.post_count})</h1>
            <ul>
                {posts.map(post => (
                    <li key={post.id}>
                        <Link to={`/categories/${post.category.slug}/posts/${post.slug}`}>{post.title}</Link>
                    </li>
                ))}
            </ul>
        </Fragment>
    );
});

export default TagView;
