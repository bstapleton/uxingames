import React, { useState, useEffect, Fragment } from 'react';
import {useParams, useHistory} from 'react-router-dom';
import TextInput from "../../components/fields/TextInput";
import Notification from "../../components/Notification";

const TagForm = (() => {
    const [tag, setTag] = useState({
        id: '',
        name: '',
        slug: ''
    });
    const [originalSlug, setOriginalSlug] = useState(null);
    const [errorMessage, setErrorMessage] = useState(null);
    const [infoMessage, setInfoMessage] = useState(null);
    const [pageTitle, setPageTitle] = useState(null);
    const { action, slug } = useParams();

    let history = useHistory();
    let noTagMessage = "That tag doesn't exist!";

    useEffect(() => {
        switch (action) {
            case 'edit':
                setPageTitle('Edit');
                if (slug === undefined) {
                    setErrorMessage(noTagMessage);
                } else {
                    axios.get(`/tag/${slug}`)
                        .then(response => {
                            setTag(response.data.data);
                            setOriginalSlug(response.data.data.slug);
                        })
                        .catch((error) => {
                            console.error(error);
                            setErrorMessage(noTagMessage);
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
            axios.post(`/tag`, tag)
                .then(response => {
                    if (response.status !== 200) {
                        // TODO: some kind of redirection
                    }
                })
                .catch((error) => {
                    console.error(error);
                    setErrorMessage('Creation of the tag failed.');
                });
        } else if (action === 'edit') {
            axios.put(`/tag/${originalSlug}`, tag)
                .then(response => {
                    setInfoMessage(`The tag (${response.data.name}) was edited successfully.`);
                    history.push(`/admin/tag/edit/${response.data.slug}`);
                })
                .catch((error) => console.error(error));
        }
    };

    const handleChange = (event) => {
        tag[event.target.name] = event.target.value;
        setTag(tag);
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
                    <h1>{pageTitle} tag: {tag.name}</h1>
                    {infoMessage ?
                        <Notification
                            type={'success'}
                            message={infoMessage}
                        />
                    : null}
                    <form method={action === 'create' ? 'post' : 'put'} onSubmit={save}>
                        <TextInput
                            name={'name'}
                            label={'Tag name'}
                            required={true}
                            help={'The name of the tag'}
                            onChangeEvent={handleChange}
                            defaultValue={tag.name} />
                        <TextInput
                            name={'slug'}
                            label={'URL slug'}
                            required={true}
                            help={'Slug to access the tag'}
                            onChangeEvent={handleChange}
                            defaultValue={tag.slug} />
                        <button className={'button button--success'} type={'submit'}>Save</button>
                    </form>
                </Fragment>
            }
        </Fragment>
    );
});

export default TagForm;
