import React, { useState, useEffect, Fragment } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import TextInput from "../../components/fields/TextInput";
import Notification from "../../components/Notification";

const CategoryForm = (() => {
    const [category, setCategory] = useState({
        id: '',
        title: '',
        slug: '',
        description: ''
    });
    const [originalSlug, setOriginalSlug] = useState(null);
    const [errorMessage, setErrorMessage] = useState(null);
    const [infoMessage, setInfoMessage] = useState(null);
    const [pageTitle, setPageTitle] = useState(null);
    const { action, slug } = useParams();

    let history = useHistory();
    let noCategoryMessage = "That category doesn't exist!";

    useEffect(() => {
        switch (action) {
            case 'edit':
                setPageTitle('Edit');
                if (slug === undefined) {
                    setErrorMessage(noCategoryMessage);
                } else {
                    axios.get(`/category/${slug}`)
                        .then(response => {
                            setCategory(response.data.data);
                            setOriginalSlug(response.data.data.slug);
                        })
                        .catch((error) => {
                            console.error(error);
                            setErrorMessage(noCategoryMessage);
                            // TODO: probably want to handle the status code messages from the API rather than the front-end
                        });
                }
                break;
            case 'create':
                setPageTitle('Create');
                break;
            default:
                setErrorMessage('Invalid URL');
                break;
        }
        // TODO: a redirect if not authed
    }, []);

    const save = (event) => {
        event.preventDefault();
        if (action === 'create') {
            axios.post(`/category`, category)
                .then(response => {
                    if (response.status !== 200) {
                        // TODO: some kind of redirection
                    }
                })
                .catch((error) => {
                    console.error(error);
                    setErrorMessage('Creation of the category failed.')
                });
        } else if (action === 'edit') {
            axios.put(`/category/${originalSlug}`, category)
                .then(response => {
                    setInfoMessage(`The category (${response.data.title}) was edited successfully.`);
                    history.push(`/admin/category/edit/${response.data.slug}`);
                })
                .catch((error) => console.error(error));
        }
    };

    const handleChange = (event) => {
        category[event.target.name] = event.target.value;
        setCategory({ ...category, [event.target.name] : [event.target.value] });
    }

    return (
        <Fragment>
            {errorMessage ?
                <Notification
                    type={'failure'}
                    message={errorMessage}
                />
            :
                <Fragment>
                    <h1>{pageTitle} a category: {category.title}</h1>
                    <form method={action === 'create' ? 'post' : 'put'} onSubmit={save}>
                        {infoMessage ?
                            <Notification
                                type={'success'}
                                message={infoMessage}
                            />
                        : null}
                        <TextInput
                            name={'title'}
                            label={'Category name'}
                            required={true}
                            help={'The title of the category'}
                            onChangeEvent={handleChange}
                            defaultValue={category.title} />
                        <TextInput
                            name={'slug'}
                            label={'URL slug'}
                            required={true}
                            help={'Slug to access the category'}
                            onChangeEvent={handleChange}
                            defaultValue={category.slug} />
                        <textarea name={'description'} id={'description'} onChange={handleChange} defaultValue={category.description} required />
                        <button className={'button button--success'} type={'submit'}>Save</button>
                    </form>
                </Fragment>
            }
        </Fragment>
    );
});

export default CategoryForm;
