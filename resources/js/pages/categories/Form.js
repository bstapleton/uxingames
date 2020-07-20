import React, {Fragment, useState} from 'react';

const CategoryForm = (() => {
    const [verb, setVerb] = useState('Create');
    const [category, setCategory] = useState({
        title: '',
        slug: '',
        description: ''
    });

    const save = (event) => {
        event.preventDefault();
        console.log(category);
        axios.post(`/category`, category)
            .then(response => {
                if (response.status === 200) {
                    console.log('done');
                }
            })
            .catch((error) => console.error(error));
    };

    const handleChange = (event) => {
        category[event.target.name] = event.target.value;
        setCategory(category);
    }

    return (
        <Fragment>
            <h1>{verb} a post</h1>
            <form method={'post'} onSubmit={save}>
                <input type={'text'} name={'title'} id={'title'} onChange={handleChange} required />
                <input type={'text'} name={'slug'} id={'slug'} onChange={handleChange} required />
                <textarea name={'description'} id={'description'} onChange={handleChange} required />
                <button type={'submit'}>Save</button>
            </form>
        </Fragment>
    );
});

export default CategoryForm;
