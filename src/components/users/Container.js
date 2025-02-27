import React from 'react'
import { Route } from 'react-router-dom'

import * as users from '../../api/users'

import List from './List/List'
import PostsContainer from '../posts/Container'

export default class Container extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      users: [],
      loading: true
    };
    this.refreshUsers = this.refreshUsers.bind(this);
  }

  async componentDidMount() {
    // const token =  window.localStorage.getItem('journal-app')
    // if (token) {
    //   const users = await api.getAllUsers()
    //   this.setState({ users })
    // }
    this.refreshUsers().then(() => this.setState({ loading: false }));
  }

  async refreshUsers() {
    const {response} = await users.getAllUsers();
    this.setState({ users: response });
  }

  render () {
    const { currentUserId } = this.props;
    const { users, loading } = this.state;
    if (loading) return <span />;
    return (
      <main className='container'>
        <Route path='/users' exact component={() => <List users={users} />} />
        <PostsContainer 
          currentUserId={currentUserId}
          refreshUsers={this.refreshUsers}
          users={users} />
      </main>
    );
  }
}
