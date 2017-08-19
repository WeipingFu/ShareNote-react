/**
 * Created by fuweiping on 2017/6/7.
 */

import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import ReactDOM from 'react-dom';
import configureStore from './configureStore';

import Index from './containers/index';
import UserCenter from './containers/usercenter';
import AddNote from './containers/addNote';
import UpdateNote from './containers/updateNote';
import NoteDetail from './components/noteDetail';
import AddNotebookForm from './containers/addNotebook';
import SearchUserNotes from './components/searchUserNotes';

const store = configureStore();

export default class Root extends Component {
    checkAuth(nextState, replaceState) {
        let { userReducer } = store.getState();
        let { userlogined } = userReducer;                    //获取用户登录状态

        if(nextState.location.pathname === '/usercenter') {
            //如果用户已经登录，则允许进入
            if(userlogined || localStorage.getItem('token') != null) {
                replaceState(null, nextState.location.pathname);
            } else {
                replaceState(null, '/');
            }
        }
    }
    render() {
        return (
            <Provider store={store}>
                <Router history={browserHistory}>
                    <Route path="/" component={Index}></Route>
                    <Route path="/usercenter" component={UserCenter}></Route>
                    <Route path="/addNote" component={AddNote}></Route>
                    <Route path="/updateNote/:noteTitle" component={UpdateNote}></Route>
                    <Route path="/noteDetail/:noteTitle" component={NoteDetail}></Route>
                    <Route path="/addNotebook" component={AddNotebookForm}></Route>
                    <Route path="/searchNote" component={SearchUserNotes}></Route>
                </Router>
            </Provider>
        );
    }
}

ReactDOM.render(<Root/>, document.getElementById('AppRoot'));

