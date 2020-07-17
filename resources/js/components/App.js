import React, {Fragment} from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom'
import axios from 'axios';
import Main from './Main';
import Categories from '../pages/Categories';
import Category from '../pages/Category';
import Tags from '../pages/Tags';
import Tag from '../pages/Tag';
import Post from "../pages/Post";
// import Header from './layout/Header'
// import Login from '../pages/Login';
// import Register from '../pages/Register';
// import ViewSection from "../pages/section/ViewSection";
// import CreateSection from '../pages/section/CreateSection';
// import ViewTopic from "../pages/topic/ViewTopic";
// import CreateTopic from "../pages/topic/CreateTopic";
// import CreatePost from "../pages/post/CreatePost";
// import WebFont from 'webfontloader';
// import { getCurrentUser } from '../utils';

axios.defaults.baseURL = 'http://localhost:8000/api';

const App = (() => {
    return (
        <BrowserRouter>
            <Fragment>
                <Switch>
                    <Route exact path={'/'} component={Main} />
                    <Route exact path={'/categories'} component={Categories} />
                    <Route exact path={'/categories/:slug'} component={Category} />
                    <Route exact path={'/categories/:slug/posts/:postSlug'} component={Post} />
                    <Route exact path={'/tags'} component={Tags} />
                    <Route path={'/tags/:slug'} component={Tag} />
                </Switch>
            </Fragment>
        </BrowserRouter>
    );
});


ReactDOM.render(<App />, document.getElementById('app'));
