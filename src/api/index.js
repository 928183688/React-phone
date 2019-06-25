import axios from 'axios';
axios.defaults.baseURL = "http://react.zbztb.cn"
// 添加响应拦截器
axios.interceptors.response.use(function (response) {
    // 对响应数据做点什么
    return response.data;
  }, function (error) {
    // 对响应错误做点什么
    return Promise.reject(error);
  });
//获取轮播图和推荐商品数据
export const getGoods = () => axios.get("/site/goods/gettopdata/goods")
//获取数码产品
export const getProduct = () => axios.get("/site/goods/getgoodsgroup")
//获取商品详情页
export const getGoodsList = (id) => axios.get("/site/goods/getgoodsinfo/" + id)


