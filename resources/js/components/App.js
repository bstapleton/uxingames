import React, {Fragment} from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import axios from 'axios';
import Main from './Main';
import CategoryList from '../pages/categories/List';
import CategoryView from '../pages/categories/View';
import CategoryForm from '../pages/categories/Form';
import TagList from '../pages/tags/List';
import TagView from '../pages/tags/View';
import TagForm from '../pages/tags/Form';
import PostView from "../pages/posts/View";

axios.defaults.baseURL = 'http://localhost:8000/api';

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

                    <Route path={'/admin/category/:action/:slug?'} component={CategoryForm} />
                    <Route path={'/admin/tag/:action/:slug?'} component={TagForm} />
                </Switch>
            </Fragment>
        </BrowserRouter>
    );
});


ReactDOM.render(<App />, document.getElementById('app'));
