import React, { useState, useEffect, Fragment } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const CategoryList = (() => {
    const [categories, setCategories] = useState([
        {
            title: null,
            slug: null
        }
    ]);

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
                {categories.map((category, index) => (
                    <li key={index}>
                        <Link to={`/categories/${category.slug}`}>{category.title}</Link>
                    </li>
                ))}
            </ul>
        </Fragment>
    );
});

export default CategoryList;
