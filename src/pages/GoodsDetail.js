/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component, Fragment } from 'react';
import { NavBar, Icon, Carousel } from 'antd-mobile';
import { getGoodsList } from '../api/index';
import {connect} from 'react-redux';
import {cart_add} from '../store/actionCreator';
class GoodsDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            imgHeight: 250,
            goodList: [],
            goodsinfo: {}
        }
    }
    componentDidMount() {
        const { id } = this.props.match.params
        getGoodsList(id).then(res => {
            // console.log(res)
            this.setState({ goodList: res.message.imglist, goodsinfo: res.message.goodsinfo });
        })
    }
    render() {
        const { goodsinfo } = this.state
        return (
            <Fragment>
                {/* 导航栏 */}
                <NavBar
                    mode="dark"
                    icon={<Icon type="left" />}
                    onLeftClick={() => this.props.history.go(-1)}
                >商品详情</NavBar>
                {/* 导航栏 */}
                {/* 轮播图 */}
                <Carousel
                    autoplay
                    infinite
                >
                    {this.state.goodList.map(val => (
                        <a
                            key={val}
                            style={{ display: 'inline-block', width: '100%', height: this.state.imgHeight }}
                        >
                            <img
                                src={val.thumb_path}
                                style={{ width: '100%', verticalAlign: 'top' }}
                                onLoad={() => {
                                    // fire window resize event to change height
                                    window.dispatchEvent(new Event('resize'));
                                    this.setState({ imgHeight: 'auto' });
                                }}
                            />
                        </a>
                    ))}
                </Carousel>
                {/* 轮播图 */}
                {/* 商品详情 */}
                <div className="good_product">
                    <div className="good_title">{goodsinfo.title}</div>
                    <div className="good_new">{goodsinfo.sub_title}</div>
                    <div className="good_price">
                        <span className="good_sell_price">￥{goodsinfo.sell_price}</span>
                        <del className="good_market_price">￥{goodsinfo.market_price}</del>
                    </div>
                    <div className="good_content">
                        <p>商品参数</p>
                        <p>商品编号：{goodsinfo.goods_no}</p>
                        <p>库存：{goodsinfo.stock_quantity}</p>
                        <p>上架时间：{goodsinfo.update_time}</p>
                    </div>
                    {/* 图文详情 */}
                    <div className="good_large_content" dangerouslySetInnerHTML={{ __html: this.state.goodsinfo.content }} >
                    </div>
                    <style jsx>{`
                       .good_product {
                           padding:5px;
                         .good_title {
                             margin-top:5px;
                             color:#666;
                             font-size:14px
                         }
                         .good_new{
                            margin-top:5px;
                             color:#666;
                             font-size:12px
                         }
                         .good_price{
                            display:flex;
                            justify-content: space-between;
                            margin-top:10px;
                         .good_sell_price {
                             color:red;
                         }
                        
                         }
                         .good_large_content{
                            margin-bottom:60px;
                         }
                       }
                       `}</style>
                </div>
                {/* 商品详情 */}
                {/* 底部工具栏 开始 */}
                <div className="btm_tool">
                    <div className="btm_item btm_cantact">
                        <span className="iconfont icon-kefu"></span>
                        <span>客服</span>
                    </div>
                    <div className="btm_item btm_cart">
                        <span className="iconfont icon-gouwuche"></span>
                        <span onClick={()=>this.props.history.push('/cart')}>购物车</span>
                        <span className="badge" style={{display:this.props.cartList?'block':'none'}}>{this.props.cartList}</span>
                    </div>
                    <div className="btm_item btm_cart_add" onClick={()=>this.props.handleClickCart(goodsinfo)}>
                        加入购物车
          </div>
                    <div className="btm_item btm_buy">
                        立即购买
          </div>
                    <style jsx>

                        {`
            .btm_tool{
              display: flex;
              height: 60px;
              width: 100%;
              background-color: #fff;
              position: fixed;
              bottom: 0;
              left: 0;
              .btm_item{
                flex: 1;
                display: flex;
                justify-content: center;
                align-items: center;
                flex-direction: column;
              }
              .btm_cantact{}
              .btm_cart{
                position: relative;
                .badge{
                  position: absolute;
                  top: 0;
                  left: 61%;
                  border-radius: 50%;
                  padding: 2px 6px;
                  background-color: orangered;
                  color: #fff;
                  font-size: 12px;
                }
              }
              .btm_cart_add{
                flex: 2;
                background-color: orange;
                color: #fff;
                font-size: 16px;
                border-radius:50px;
              }
              .btm_buy{
                flex: 2;
                color: #fff;
                font-size: 16px;
                background-color: orangered;
                border-radius:50px;
              }
            }
            `}
                    </style>
                </div>
                {/* 底部工具栏 结束 */}

            </Fragment>
        );
    }
}

const addnumber = (arr) => {
    let num = 0
    arr.forEach((v) => {
      num += v.num
    })
    return num
}

const mapStateToProps = (state) => {
    return {
        // cartLength : state.cartReducer.cartList.length
        cartList : addnumber(state.cartReducer.cartList)
    }
}

const mapDispath = (dispatch) => {
    return {
        handleClickCart:(goodsObj) => {
                // console.log(goodsObj)
            dispatch(cart_add(goodsObj))
        }
    }
}

export default connect(mapStateToProps,mapDispath)(GoodsDetail);