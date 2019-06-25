import React, { Component } from 'react';
import { TabBar } from 'antd-mobile';
import {connect} from 'react-redux';
class MyLayout extends Component {
  constructor(props) {
    super(props);
    this.state = {
    }
  }
  render() {
    return (
      <div style={{ position: 'fixed', height: '100%', width: '100%', top: 0 }}>
        <TabBar
          unselectedTintColor="#949494"
          tintColor="#33A3F4"
        >
          <TabBar.Item
            title="首页"
            key="Home"
            icon={<span className="iconfont icon-home" />
            }
            selectedIcon={<span className="iconfont icon-home"/>
            }
            selected={this.props.match.url === '/'}
            onPress={() => {
              this.props.history.push('/')
            }}
          >
            {this.props.match.url === "/" ? this.props.children : null}
          </TabBar.Item>
          <TabBar.Item
            icon={<span className="iconfont icon-gouwuche" />
            }
            selectedIcon={<span className="iconfont icon-gouwuche"/>
            }
            title="购物车"
            key="Cart"
            badge={this.props.cartList}
            selected={this.props.match.url === '/cart'}
            onPress={() => {
                this.props.history.push('/cart')
            }}
          >
            {this.props.match.url === "/cart" ? this.props.children : null}
          </TabBar.Item>
          <TabBar.Item
         
            icon={<span className="iconfont  icon-weibiaoti2fuzhi12"></span>
          }
            selectedIcon={<span className="iconfont  icon-weibiaoti2fuzhi12"></span>
          }
            title="个人中心"
            key="login"
            selected={this.props.match.url === "/login"}
            onPress={() => {
             this.props.history.push('/login')          
            }}
          >
            {/* {this.props.match.url === "/login" ? this.props.children : null} */}
          </TabBar.Item>

        </TabBar>
      </div>
    )
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


export default connect(mapStateToProps,null)(MyLayout);
