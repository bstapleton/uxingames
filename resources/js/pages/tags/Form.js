import React, {useState, useEffect, Fragment} from 'react';
import { useParams } from 'react-router-dom';

const TagForm = (() => {
    const [tag, setTag] = useState({
        name: '',
        slug: ''
    });
    const [message, setMessage] = useState(null);
    const [pageTitle, setPageTitle] = useState(null);
    const { action, slug } = useParams();

    let noTagMessage = "That tag doesn't exist!";

    useEffect(() => {
        switch (action) {
            case 'edit':
                setPageTitle('Edit');
                if (slug === undefined) {
                    setMessage(noTagMessage);
                } else {
                    axios.get(`/tag/${slug}`)
                        .then(response => {
                            setTag(response.data.data);
                        })
                        .catch((error) => {
                            console.error(error);
                            setMessage(noTagMessage);
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
        axios.post(`/tag`, tag)
            .then(response => {
                if (response.status !== 200) {
                    // TODO: some kind of redirection, or stay on this page?
                }
            })
            .catch((error) => console.error(error));
    };

    const handleChange = (event) => {
        tag[event.target.name] = event.target.value;
        setTag(tag);
    }

    return (
        <Fragment>
            {message ?
                <p>{message}</p>
            :
                <Fragment>
                    <h1>{pageTitle} a tag</h1>
                    <form method={'post'} onSubmit={save}>
                        <input type={'text'} name={'name'} id={'name'} onChange={handleChange} defaultValue={tag.name} required />
                        <input type={'text'} name={'slug'} id={'slug'} onChange={handleChange} defaultValue={tag.slug} required />
                        <button type={'submit'}>Save</button>
                    </form>
                </Fragment>
            }
        </Fragment>
    );
});

export default TagForm;
