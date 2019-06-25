/* eslint-disable no-script-url */
/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component, Fragment } from 'react';
import {withRouter} from 'react-router-dom';
//轮播图插件
import { Carousel } from 'antd-mobile';
import { getGoods, getProduct } from '../api';

class MyCarousel extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    render() { 
        return ( 
            <Carousel autoplay infinite>
            {this.props.sliderlist.map(val => (
                <a
                    key={val.id}
                    // eslint-disable-next-line no-script-url
                    href="javascript:;"
                    style={{ display: 'inline-block', width: '100%', height: this.state.imgHeight }}
                >
                    <img
                        src={val.img_url}
                        style={{ width: '100%', verticalAlign: 'top', height: 250 }}
                        onLoad={() => {
                            // fire window resize event to change height
                            window.dispatchEvent(new Event('resize'));
                            this.setState({ imgHeight: 'auto' });
                        }}
                    />
                </a>
            ))}
        </Carousel>
         );
    }
}
 

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            //轮播图数据
            sliderlist: [],
            imgHeight: 50,
            //推荐商品数据
            toplist: [],
            //数码产品数据
            productlist: []

        }
    }
    componentDidMount() {
        getGoods().then(res => {
            if(res.status===0){
                this.setState({ sliderlist: res.message.sliderlist, toplist: res.message.toplist });
            }
           
        })
        getProduct().then(res => {
            if(res.status===0){
                this.setState({ productlist: res.message });
            }
         
        })
    }
    render() {
        return (
            <Fragment>
                {/* 轮播图开始 */}
                 {this.state.sliderlist.length!==0 ? <MyCarousel sliderlist={this.state.sliderlist}/> : null}
                {/* 轮播图结束 */}
                {/* 推荐商品开始 */}
                <div className="good_list">
                    <div className="good_title">推荐商品</div>
                    {
                        this.state.toplist.map(v =>
                            // eslint-disable-next-line no-script-url
                            <a href="javascript:;"  onClick={()=>this.props.history.push('/goodsdetail/' + v.id)}  key={v.id}>
                                <div className="good_product">
                                    <img src={v.img_url}></img>
                                    <span>{v.title}</span>
                                </div>
                            </a>
                        )

                    }
                </div>
                <style jsx>{`
                .good_list{
                    .good_title{
                        padding:15px;
                        color:#666;
                        font-size:14px
                    }
                    .good_product{
                        display:flex;
                        border-bottom: 1px solid #666;
                        img{
                           width:35px;
                           height:35px
                        }
                        span {
                             margin-top:10px;
                             overflow: hidden;
                             white-space: nowrap;
                             text-overflow: ellipsis;
                        }
                    }
                }
                `}</style>
                {/* 推荐商品结束 */}
                {/* 数码产品开始 */}
                <div className="product_list">
                    {
                        this.state.productlist.map(v1 => {
                            return (
                                <div className="product_info" key={v1.level1cateid}>
                                    <div className="product_title">{v1.catetitle}</div>
                                    <div className="product_content">
                                        {
                                            v1.datas.map(v2 =>
                                                <a href="javascript:;" key={v2.artID}  onClick={()=>this.props.history.push('/goodsdetail/' + v2.artID)}>
                                                    <img src={v2.img_url}></img>
                                                    <p>{v2.artTitle}</p>
                                                    <div className="product_price">
                                                        <span className="product_sell_price">{v2.sell_price}</span>
                                                        <del className="product_market_price">{v2.market_price}</del>
                                                    </div>
                                                    <div className="product_hot">
                                                        <span>热卖中{v2.stock_quantity}</span>
                                                    </div>
                                                </a>
                                            )
                                        }
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
                <style jsx>{`
                 .product_list{
                     .product_title{
                        padding:15px;
                        color:#666;
                        font-size:14px
                    }
                    .product_content {
                        display: flex;
                        flex-wrap: wrap;
                     
                     >a {
                         width:50%;
                         border-bottom: 1px solid #666;
                       
                         &:nth-child(odd){
                         border-right: 1px solid #ccc;
                  }
                        }
                  
                  img{
                    width: 80%;
                    margin: 0 auto;
                  }
                  p {
                      font-size:12px;
                      padding:5px 0;
                      color:#666;
                      overflow:hidden;
                      white-space: nowrap;
                      text-overflow: ellipsis

                  }
                  .product_price{
                      display:flex;
                      justify-content: space-between;
                      padding:0 5px;
                      margin-bottom:10px;    
                  }
                  .product_sell_price{
                          color:red
                      }
                    .product_hot{
                        margin-bottom:10px
                    }
                    
                   
                   
                    }

                  }
                 `}</style>

                {/* 数码产品结束 */}
            </Fragment>
        );
    }
}

export default withRouter(Home,MyCarousel);