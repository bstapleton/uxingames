import React, {Fragment} from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import axios from 'axios';
import Main from './Main';
import CategoryList from '../pages/categories/List';
import CategoryView from '../pages/categories/View';
import CategoryForm from '../pages/categories/Form';
import TagList from '../pages/tags/List';
import TagView from '../pages/tags/View';
import TagForm from '../pages/tags/Form';
import PostView from "../pages/posts/View";
import PostForm from "../pages/posts/Form";
import AuthForm from "../pages/auth/Form";
import Dashboard from "../pages/admin/Dashboard";

let auth = require('../../../auth.json');

axios.defaults.baseURL = 'http://localhost:8000/api';

function isLoggedIn() {
    let token = window.localStorage.getItem('ux-token');
    let user = window.localStorage.getItem('ux-user');
    let theme = window.localStorage.getItem('ux-theme');

    return !!(auth.users.includes(user) && token === auth.token);
}

const App = (() => {
    return (
        <BrowserRouter>
            <Fragment>
                <Switch>
                    <Route exact path={'/'} component={Main} />
                    <Route exact path={'/categories'} component={CategoryList} />
                    <Route exact path={'/categories/:slug'} component={CategoryView} />
                    <Route exact path={'/categories/:slug/posts/:postSlug'} component={PostView} />
                    <Route exact path={'/tags'} component={TagList} />
                    <Route path={'/tags/:slug'} component={TagView} />

                    <Route path={'/admin/login'} component={AuthForm} />
                    <Route path={'/admin/dashboard'}>
                        {isLoggedIn() ?
                            <Dashboard />
                            :
                            <Redirect to={'/'} />
                        }
                    </Route>
                    <Route path={'/admin/category/:action/:slug?'}>
                        {isLoggedIn() ?
                            <CategoryForm />
                            :
                            <Redirect to={'/'} />
                        }
                    </Route>
                    <Route path={'/admin/tag/:action/:slug?'}>
                        {isLoggedIn() ?
                            <TagForm />
                            :
                            <Redirect to={'/'} />
                        }
                    </Route>
                    <Route path={'/admin/post/:action/:slug?'}>
                        {isLoggedIn() ?
                            <PostForm />
                            :
                            <Redirect to={'/'} />
                        }
                    </Route>
                </Switch>
            </Fragment>
        </BrowserRouter>
    );
});


ReactDOM.render(<App />, document.getElementById('app'));
