import React, {useState, useEffect, Fragment} from 'react';
import { useParams } from 'react-router-dom';

const CategoryForm = (() => {
    const [category, setCategory] = useState({
        title: '',
        slug: '',
        description: ''
    });
    const [message, setMessage] = useState(null);
    const [pageTitle, setPageTitle] = useState(null);
    const { action, slug } = useParams();

    let noCategoryMessage = "That category doesn't exist!";

    useEffect(() => {
        switch (action) {
            case 'edit':
                setPageTitle('Edit');
                if (slug === undefined) {
                    setMessage(noCategoryMessage);
                } else {
                    axios.get(`/category/${slug}`)
                        .then(response => {
                            setCategory(response.data.data);
                        })
                        .catch((error) => {
                            console.error(error);
                            setMessage(noCategoryMessage);
                            // TODO: probably want to handle the status code messages from the API rather than the front-end
                        });
                }
                break;
            case 'create':
                setPageTitle('Create');
                break;
            default:
                setMessage('Invalid URL');
                break;
        }
        // TODO: a redirect if not authed
    }, []);

    const save = (event) => {
        event.preventDefault();
        axios.post(`/category`, category)
            .then(response => {
                if (response.status !== 200) {
                    // TODO: some kind of redirection, or stay on this page?
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
            {message ?
                <p>{message}</p>
            :
                <Fragment>
                    <h1>{pageTitle} a post</h1>
                    <form method={'post'} onSubmit={save}>
                        <input type={'text'} name={'title'} id={'title'} onChange={handleChange} defaultValue={category.title} required />
                        <input type={'text'} name={'slug'} id={'slug'} onChange={handleChange} defaultValue={category.slug} required />
                        <textarea name={'description'} id={'description'} onChange={handleChange} defaultValue={category.description} required />
                        <button type={'submit'}>Save</button>
                    </form>
                </Fragment>
            }
        </Fragment>
    );
});

export default CategoryForm;
