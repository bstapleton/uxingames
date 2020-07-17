import React, { useState, useEffect, Fragment } from 'react';
import { Link } from 'react-router-dom'

const Categories = (() => {
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        axios.get('/category')
            .then(response => {
                setCategories(response.data.data);
            })
            .catch((error) => console.error(error));
    }, []);

    return (
        <Fragment>
            <h1>Categories</h1>
            <ul>
                {categories.map(category => (
                    <li key={category.slug}>
                        <Link to={`/categories/${category.slug}`}>{category.title}</Link>
                    </li>
                ))}
            </ul>
        </Fragment>
    );
});

export default Categories;
