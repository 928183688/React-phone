// eslint-disable-next-line no-unused-vars
import React, { Component } from 'react';
import { List, TextareaItem } from 'antd-mobile';
import { Button, WhiteSpace } from 'antd-mobile';
class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            mobile: '',
            email: ''
        }
    }
    componentDidMount() {
    }
    render() {
        return (
            //注册页
            <List>
                <TextareaItem
                    title="受控组件"
                    placeholder="controlled"
                />
                <TextareaItem
                    title="密码"
                    placeholder="请输入密码"
                />
                <TextareaItem
                    title="邮箱"
                    placeholder="请输入邮箱"
                />
                <TextareaItem
                    title="电话"
                    placeholder="请输入电话"
                />
                <Button type="warning">注册</Button><WhiteSpace />
            </List>
        );
    }
}


export default Register;