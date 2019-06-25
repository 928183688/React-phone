import React, { Component,Fragment } from 'react';
import MyLayout from './component/MyLayout';
import Home from './pages/Home';
import Cart from './pages/Cart';
import GoodsDetail from './pages/GoodsDetail';
import Mine from './pages/Mine';
import Login from './pages/Login';
import Register from './pages/Register';
//引入路由
import { HashRouter as Router, Route } from 'react-router-dom';
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {}
  }
  render() {
    return (
      <Fragment>
      <Router>
        <Route path="/" exact render={(props) => <MyLayout {...props}><Home /></MyLayout>} />
        <Route path="/cart" render={(props) => <MyLayout {...props}><Cart /></MyLayout>} />
        <Route path="/mine" render={(props) => <MyLayout {...props}><Mine /></MyLayout>} />
        <Route path="/goodsdetail/:id" component={GoodsDetail}></Route>
        <Route path="/login" component={Login} />
        <Route path="/register" component={Register} />
      </Router>
      </Fragment>
    )
  }
}


export default App;
