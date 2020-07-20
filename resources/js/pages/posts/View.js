import React, { useState, useEffect, Fragment } from 'react';
import Moment from 'react-moment';
import { useParams, Link } from 'react-router-dom';

const PostView = (() => {
    const [post, setPost] = useState([]);
    const [category, setCategory] = useState({});
    const [tags, setTags] = useState([]);
    const { postSlug } = useParams();

    useEffect(() => {
        axios.get(`/post/${postSlug}`)
            .then(response => {
                setPost(response.data.data);
                setCategory(response.data.data.category);
                setTags(response.data.data.tags);
            })
            .catch((error) => console.error(error));
    }, []);

    return (
        <Fragment>
            <h1>{post.title}</h1>
            <p>Posted in <Link to={`/categories/${category.slug}`}>{category.title}</Link></p>
            <p>
                <Moment format={'Do MMM, YYYY'}>{post.created_at}</Moment>
                {post.updated_at !== post.created_at ?
                    <Fragment>
                        (<Moment format={'Do MMM, YYYY'}>{post.updated_at}</Moment>)
                    </Fragment>
                : null}
            </p>
            <p>{post.content}</p>
            <p>Tagged:</p>
            <ul>
                {tags.map(tag => (
                    <li key={tag.id}><Link to={`/tags/${tag.slug}`}>{tag.name}</Link></li>
                ))}
            </ul>
        </Fragment>
    );
});

export default PostView;
