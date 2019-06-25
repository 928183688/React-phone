/* eslint-disable no-unreachable */
import { CART_ADD, CART_ONE_CHECK, CART_ALL_CHECK, CART_ALL_NUM, CART_ONE_DEL } from "../actionTypes";

//购物车管理员
const defaultState = {
    //购物车默认数据
    cartList: [
  
    ] 
    
}

export default (state = defaultState,action) => {
    switch (action.type) {
        case CART_ADD:{
         //获取商品对象
         let goodsObj = action.value
         //深拷贝
         let newState = JSON.parse(JSON.stringify(state))
         //循环新的数组 判断商品对象和新的数组的值是否一样 
         let index = newState.cartList.findIndex(v => v.id === goodsObj.id)
         //如果是不一样 那么就新增一个商品对象
            //index为-1 就是不存在
            if(index === -1){
                let newObj = {
                    id: goodsObj.id,
                    price : goodsObj.sell_price,
                    img_url : goodsObj.img_url,
                    isChecked : true,
                    good_name : goodsObj.title,
                    num: 1,
                }
              newState.cartList.push(newObj)
           //如果一样 那么直接添加数量
            }else{
                newState.cartList[index].num++
            }
            return newState
        }
            break;
        //选中或取消选中
        case CART_ONE_CHECK: 
        {
          //深拷贝一份state数据
         let newState = JSON.parse(JSON.stringify(state))
         //找到索引下标ID  当ID相同时
          let index = newState.cartList.findIndex(v => v.id === action.value.id)
            //取反即可
            newState.cartList[index].isChecked = !newState.cartList[index].isChecked
            //返回新的数组对象
            return newState
        }    
          break;
          //全选选中或取消选中
        case CART_ALL_CHECK:
            {
         let newState = JSON.parse(JSON.stringify(state))
         //循环拷贝过来的数组对象 把单选状态和全选状态保持一致
         newState.cartList.forEach(v => v.isChecked = action.value.ischecked)
         //返回新数组对象
         return newState
            }
            break;
        //购物车增加或减少数量
        case CART_ALL_NUM : 
        {
         //深拷贝一份state
         let newState = JSON.parse(JSON.stringify(state))
         //获取ID下标
         let index = newState.cartList.findIndex(v => v.id === action.value.id)
         newState.cartList[index].num += action.value.unit
         return newState
        }   
        break; 
        //购物车删除
        case CART_ONE_DEL : 
        {
         //深拷贝一份state
         let newState = JSON.parse(JSON.stringify(state))
         //获取ID下标
         let index = newState.cartList.findIndex(v => v.id === action.value.id)
         newState.cartList.splice(index,1)
         return newState
        }  
        default:
            break;
    }
    return state
}