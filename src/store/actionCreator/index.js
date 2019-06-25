import {CART_ADD,CART_ONE_CHECK,CART_ALL_CHECK,CART_ALL_NUM,CART_ONE_DEL} from '../actionTypes';

// eslint-disable-next-line no-undef
export const cart_add = (goodsObj) => {
        return {
            type : CART_ADD,
            value : goodsObj
        }
}

//购物车选中或取消选中
export const cart_one_check = (id) => {
    return {
         type : CART_ONE_CHECK,
         value : {id}
    }
}

//购物车全选和单选状态保持一致
export const cart_all_check = (ischecked) => {
    return {
         type : CART_ALL_CHECK,
         value : {ischecked}
    }
}

//购物车增加或减少数量
export const cart_all_num = (id,unit) => {
    return {
         type : CART_ALL_NUM,
         value : {id,unit}
    }
}

//购物车删除数量

export const cart_one_delete = (id) => {
    return {
         type : CART_ONE_DEL,
         value : {id}
    }
}



