import React, { useState, useEffect, useRef, Fragment } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import TextInput from "../../components/fields/TextInput";
import Notification from "../../components/Notification";
import { ICategory } from '../../category.model';
import axios from 'axios';

const CategoryForm: React.FC = () => {
    const [category, setCategory] = useState<ICategory>();
    const [originalSlug, setOriginalSlug] = useState('');
    const [errorMessage, setErrorMessage] = useState<null | string>(null);
    const [infoMessage, setInfoMessage] = useState<null | string>(null);
    const [pageTitle, setPageTitle] = useState('');
    const { action, slug } = useParams();

    let history = useHistory();
    let noCategoryMessage: string = "That category doesn't exist!";

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

    const save = (event: React.FormEvent<HTMLFormElement>) => {
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

    const handleChange = (event: React.FormEvent<HTMLInputElement> | React.FormEvent<HTMLTextAreaElement>) => {
        const e = event.currentTarget;
        category![e.name as any] = e.value;
        console.log(category);
        setCategory(category);
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
                    <h1>{pageTitle} a category: {category? category.title : 'moose'}</h1>
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
                            onChangeEvent={(
                                event: React.ChangeEvent<HTMLInputElement>
                            ): void => handleChange(event)} />
                        <TextInput
                            name={'slug'}
                            label={'URL slug'}
                            required={true}
                            help={'Slug to access the category'}
                            onChangeEvent={handleChange} />
                        <textarea name={'description'} id={'description'} onChange={handleChange} required />
                        <button className={'button button--success'} type={'submit'}>Save</button>
                    </form>
                </Fragment>
            }
        </Fragment>
    );
};

export default CategoryForm;
