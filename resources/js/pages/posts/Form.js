import React, { useState, useEffect, Fragment } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import TextInput from "../../components/fields/TextInput";
import Notification from "../../components/Notification";

const PostForm = (() => {
    const [post, setPost] = useState({
        id: '',
        title: '',
        slug: '',
        category: {},
        description: '',
        content: '',
        tags: [],
    });
    const [categories, setCategories] = useState([]);
    const [tags, setTags] = useState([]);
    const [selectedTags, setSelectedTags] = useState([]);
    const [originalSlug, setOriginalSlug] = useState(null);
    const [errorMessage, setErrorMessage] = useState(null);
    const [infoMessage, setInfoMessage] = useState(null);
    const [pageTitle, setPageTitle] = useState(null);
    const { action, slug } = useParams();

    let history = useHistory();
    let noPostMessage = "That post doesn't exist!";

    useEffect(() => {
        axios.get(`/category`)
            .then(response => {
                response.data.data.sort((a, b) => (a.title > b.title) ? 1 : -1);
                setCategories(response.data.data);
            })
            .catch((error) => {
                console.error(error);
            });

        axios.get(`/tag`)
            .then(response => {
                response.data.data.sort((a, b) => (a.name > b.name) ? 1 : -1);
                setTags(response.data.data);
            })
            .catch((error) => {
                console.error(error);
            });
        switch (action) {
            case 'edit':
                setPageTitle('Edit');
                if (slug === undefined) {
                    setErrorMessage(noPostMessage);
                } else {
                    axios.get(`/post/${slug}`)
                        .then(response => {
                            console.log(response.data.data);
                            setPost(response.data.data);
                            setOriginalSlug(response.data.data.slug);
                        })
                        .catch((error) => {
                            console.error(error);
                            setErrorMessage(noPostMessage);
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
        post.tags = selectedTags;
        if (action === 'create') {
            axios.post(`/post`, post)
                .then(response => {
                    if (response.status !== 200) {
                        // TODO: some kind of redirection
                    }
                })
                .catch((error) => {
                    console.error(error);
                    setErrorMessage('Creation of the post failed.')
                });
        } else if (action === 'edit') {
            axios.put(`/post/${originalSlug}`, post)
                .then(response => {
                    console.log(post, response);
                    setInfoMessage(`The post (${response.data.title}) was edited successfully.`);
                    history.push(`/admin/post/edit/${response.data.slug}`);
                })
                .catch((error) => console.error(error));
        }
    };

    const handleChange = (event) => {
        post[event.target.name] = event.target.value;
        setPost(post);
    }

    const handleTagChange = (event) => {
        let options = event.target.options;
        let value = [];
        for (let i = 0, l = options.length; i < l; i++) {
            if(options[i].selected) {
                value.push(options[i].value);
            }
        }
        setSelectedTags(value);
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
                    <h1>{pageTitle} a post: {post.title}</h1>
                    <form method={action === 'create' ? 'post' : 'put'} onSubmit={save}>
                        {infoMessage ?
                            <Notification
                                type={'success'}
                                message={infoMessage}
                            />
                        : null}
                        <TextInput
                            name={'title'}
                            label={'Post title'}
                            required={true}
                            help={'The title of the post'}
                            onChangeEvent={handleChange}
                            defaultValue={post.title} />
                        <TextInput
                            name={'slug'}
                            label={'URL slug'}
                            required={true}
                            help={'Slug to access the post'}
                            onChangeEvent={handleChange}
                            defaultValue={post.slug} />
                        <div className={'field field--select'}>
                            <label className={'field__label'} htmlFor={'category_id'}>Category</label>
                            <div className={'field__main'}>
                                <select className={'field__input'} name={'category_id'} id={'category_id'} onChange={handleChange}>
                                    <option value={''}>Please select...</option>
                                    {categories.map(category => (
                                        post.category.id === parseInt(category.id) ?
                                            <option key={category.id} value={category.id} selected>{category.title}</option>
                                            :
                                            <option key={category.id} value={category.id}>{category.title}</option>
                                    ))}
                                </select>
                                <div className={'field__validationIndicator'} />
                            </div>
                        </div>
                        <div className={'field field--textarea field--required'}>
                            <label className={'field__label'} htmlFor={'description'}>Description</label>
                            <div className={'field__main'}>
                                <textarea className={'field__input'} name={'description'} id={'description'} onChange={handleChange} defaultValue={post.description} required />
                                <div className={'field__validationIndicator'} />
                            </div>
                            <div className={'field__help'}>An introduction to the post - shown on post list pages.</div>
                        </div>
                        <div className={'field field--textarea field--required'}>
                            <label className={'field__label'} htmlFor={'content'}>Content</label>
                            <div className={'field__main'}>
                                <textarea className={'field__input'} name={'content'} id={'content'} onChange={handleChange} defaultValue={post.content} required />
                                <div className={'field__validationIndicator'} />
                            </div>
                        </div>
                        <div className={'field field--required'}>
                            <label className={'field__label'} htmlFor={'tags'}>Tags</label>
                            <div className={'field__main'}>
                                <select className={'field__input'} name={'tags'} id={'tags'} multiple onChange={handleTagChange} defaultValue={post.tags}>
                                    {tags.map(tag => (
                                        post.tags.find(x => x.slug === tag.slug) ?
                                            <option key={tag.id} value={tag.id} selected>{tag.name}</option>
                                            :
                                            <option key={tag.id} value={tag.id}>{tag.name}</option>
                                    ))}
                                </select>
                                <div className={'field__validationIndicator'} />
                            </div>
                        </div>
                        <button className={'button button--success'} type={'submit'}>Save</button>
                    </form>
                </Fragment>
            }
        </Fragment>
    );
});

export default PostForm;
