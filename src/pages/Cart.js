/* eslint-disable jsx-a11y/accessible-emoji */
/* eslint-disable no-unused-expressions */
import React, { Component, Fragment } from 'react';
import { NavBar, Icon, SwipeAction, List, Checkbox, Modal } from 'antd-mobile';
import { withRouter } from 'react-router-dom';
//连接器
import { connect } from 'react-redux';
//购物车派发任务
import { cart_one_check, cart_all_check, cart_all_num, cart_one_delete } from '../store/actionCreator';
//单选框
const CheckboxItem = Checkbox.CheckboxItem;
//弹窗
const alert = Modal.alert;
class Cart extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }
    render() {
        return (
            <Fragment>
                {/* 导航栏开始 */}
                <NavBar
                    mode="dark"
                    icon={<Icon type="left" />}
                    onLeftClick={() => this.props.history.go(-1)}
                >购物车</NavBar>
                {/* 导航栏结束 */}
                {/* 购物车商品 开始 */}
                <div className="cart_content">
                    {this.props.cartList.map(v =>
                        <div className="cart_item" key={v.id}>
                            <List>
                                {/* 滑动操作 */}
                                <SwipeAction
                                    style={{ backgroundColor: 'gray' }}
                                    autoClose
                                    right={[
                                        {
                                            text: '取消',
                                            onPress: () => console.log('cancel'),
                                            style: { backgroundColor: '#ddd', color: 'white' },
                                        },
                                        {
                                            text: '删除',
                                            onPress: () => { this.props.handleOneDel(v.id) },
                                            style: { backgroundColor: '#F4333C', color: 'white' },
                                        },
                                    ]}
                                >


                                    <div className="cart_all">
                                        {/* 复选框开始 */}
                                        <div className="cart_check_warp">
                                            <CheckboxItem checked={v.isChecked} onChange={() => this.props.handleOneChecked(v.id)}></CheckboxItem>
                                        </div>
                                        {/* 复选框结束 */}
                                        {/* 图片开始 */}
                                        <div className="cart_img_warp">
                                            <img src={v.img_url} alt=""></img>
                                        </div>
                                        {/* 图片结束 */}
                                        {/* 商品信息开始 */}
                                        <div className="cart_goods_warp">
                                            <div className="cart_title">{v.good_name}</div>
                                            <div className="cart_price">💴{v.price}</div>
                                        </div>
                                        {/* 商品信息结束 */}
                                        {/* 数量开始 */}
                                        <div className="cart_num_warp">
                                            <span className="iconfont icon-minus" onClick={() => this.props.handleAllNum(v.id, -1, v.num)}></span>
                                            <span className="item_num">{v.num}</span>
                                            <span className="iconfont icon-plus" onClick={() => this.props.handleAllNum(v.id, 1, v.num)}></span>
                                        </div>

                                        {/* 数量结束 */}
                                    </div>
                                </SwipeAction>
                            </List>

                        </div>
                    )}
                    <style jsx>{`
                                .cart_content {
                                  
                                 .cart_item{
                                     .cart_all{
                                        display: flex;                              
                                    .cart_check_warp{
                                        flex: 1;
                                         display: flex;
                                         justify-content: center;
                                         align-items: center;
                                    }
                                    .cart_img_warp {
                                        flex: 3;
                                         padding: 15px;
                                    }
                                    .cart_goods_warp{
                                        flex: 3;
                                        display: flex;
                                        flex-direction: column;
                                        justify-content: space-around;
                                        font-weight: 600;
                                        .cart_title{
                                            font-size: 17px;
                                        }
                                        .cart_price{
                                            font-size: 18px;
                                             color: orangered;
                                        }
                                    }
                                    .cart_num_warp{
                                       flex: 2;
                                        display: flex;
                                        align-items: flex-end;
                                        padding-bottom: 20px;
                                        .item_num{
                                            font-size: 21px;
                                              color: red;
                                              padding: 0 5px;
                                        }
                                        }
                                }
                                }
                            }
                            `}</style>

                    {/* 购物车商品 结束 */}
                    {/* 底部 开始 */}
                    {/* 底部 结束 */}
                    <div className="footer_content">
                        {/* 复选框 开始 */}
                        <div className="footer_check_warp">
                            <CheckboxItem checked={this.props.selectAllCheck} onChange={this.props.handleAllChecked}>全选</CheckboxItem>
                        </div>
                        <div className="footer_price_warp" >
                            <span className="footer_price">合计💴{this.props.shopAllPrice}</span>
                        </div>
                        <div className="footer_buy_warp">
                            去结算({this.props.shopAllnum})
                          </div>
                        {/* 复选框 结束 */}

                    </div>
                    <style jsx>{`
                         .footer_content{
                             position:fixed;
                             bottom: 50px;
                             left: 0;
                             width: 100%;
                             height: 50px;
                             background-color: #fff;
                             display: flex;
                             .footer_check_warp{
                                flex: 1;
                                display: flex;
                                justify-content: center;
                                align-items: center;
                             }
                             .footer_price_warp{
                                flex: 2;
                                display: flex;
                                justify-content: center;
                                align-items: center;
                                .footer_price{
                                    font-size: 17px;
                                     font-weight: 600;
                                     color: orangered;
                                }
                             }
                             .footer_buy_warp{
                                flex: 2;
                                display: flex;
                                justify-content: center;
                                align-items: center;
                                background-color: orangered;
                                color: #fff;
                                font-size: 19px;
                                font-weight: 600;
                             }
                         }
                         `}</style>
                </div>
            </Fragment>
        );
    }
}


//合计总价
const getAllPrice = (arr) => {
    let price = 0
    //选中的才会计算价格
    arr.forEach(v => v.isChecked && (price += v.num * v.price))
    return price
}

//合计商品数量
const getAllNum = (arr) => {
    let num = 0
    //选中的才会计算总量
    arr.forEach(v => v.isChecked && (num += v.num))
    return num
}

//购物车数据
const mapStateToProps = (state) => {
    return {
        //购物车数据
        cartList: state.cartReducer.cartList,
        //当单选全部勾选中时 全选也得勾选中 单选一定要有长度 没有长度就为false 条件就不成立 就不可以全选
        selectAllCheck: state.cartReducer.cartList.length && state.cartReducer.cartList.every(v => v.isChecked),
        //商品总价
        shopAllPrice: getAllPrice(state.cartReducer.cartList),
        //商品结算数量
        shopAllnum: getAllNum(state.cartReducer.cartList)
    }
}

const mapDispatch = (dispatch) => {
    return {
        //单选派发任务
        handleOneChecked: (id) => {
            dispatch(cart_one_check(id))
        },
        //全选派发任务
        handleAllChecked: (e) => {
            const { checked } = e.target
            dispatch(cart_all_check(checked))
        },
        handleAllNum: (id, unit, num) => {
            if (unit === -1 && num === 1) {
                alert('警告', '您确定删除吗？😊', [
                    { text: '取消', onPress: () => console.log('cancel') },
                    {
                        text: '删除', onPress: () => {
                            // 执行删除
                            dispatch(cart_one_delete(id));
                        }
                    },
                ])
            } else {
                dispatch(cart_all_num(id, unit))
            }
        },
        handleOneDel: (id) => {
            alert('警告', '您确定删除吗？😊', [
                { text: '取消', onPress: () => console.log('cancel') },
                {
                    text: '删除', onPress: () => {
                        // 执行删除
                        dispatch(cart_one_delete(id));
                    }
                },
            ])

        }
    }
}





export default connect(mapStateToProps, mapDispatch)(withRouter(Cart));