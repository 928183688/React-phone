import React, { Component } from 'react';
import { List, TextareaItem } from 'antd-mobile';
import { Button, WhiteSpace } from 'antd-mobile';
class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }
    componentDidMount() {
        this.autoFocusInst.focus();
    }
    //跳转注册页面
    register = () => {
        this.props.history.push('/register')
    }
    render() {
        return (
            //    登录和注册页
            <List>
                <TextareaItem
                    title="用户名"
                    placeholder="请输入用户名"
                    ref={el => this.autoFocusInst = el}
                />
                <TextareaItem
                    title="密码"
                    placeholder="请输入密码"
                />
                <Button type="primary">登录</Button><WhiteSpace />
                <Button type="warning" onClick={this.register}>注册</Button><WhiteSpace />
            </List>
        );
    }
}

export default Login;