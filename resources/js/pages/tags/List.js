import React, { useState, useEffect, Fragment } from 'react';
import { Link } from 'react-router-dom';

const TagList = (() => {
    const [tags, setTags] = useState([]);

    useEffect(() => {
        axios.get('/tag')
            .then(response => {
                setTags(response.data.data);
            })
            .catch((error) => console.error(error));
    }, []);

    return (
        <Fragment>
            <h1>Tags</h1>
            <ul>
                {tags.map(tag => (
                    <li key={tag.id}>
                        <Link to={`/tags/${tag.slug}`}>{tag.name}</Link>
                    </li>
                ))}
            </ul>
        </Fragment>
    );
});

export default TagList;
