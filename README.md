This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br>
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (Webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: https://facebook.github.io/create-react-app/docs/code-splitting

### Analyzing the Bundle Size

This section has moved here: https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size

### Making a Progressive Web App

This section has moved here: https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app

### Advanced Configuration

This section has moved here: https://facebook.github.io/create-react-app/docs/advanced-configuration

### Deployment

This section has moved here: https://facebook.github.io/create-react-app/docs/deployment

### `npm run build` fails to minify

This section has moved here: https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify


### 项目总结
使用的是react框架 就当是初步了解 做出了一个类似电商的小项目

主页： 
因为是移动端 第一步先设置好底部导航栏 实现路由跳转 设置路由  设置一个公共组件 起名为MyLayout 就是底部导航栏 
然后设置三个网页小组件 一个是home 一个是cart 一个是mine  MyLayout属于他们的父路由 所以需要嵌套路由
代码：<Route path="/" render=(<MyLayout {...props}><Home></MyLayout>)/>
然后再MyLayout父组件空出一个插槽 因为已经把props传过来了 所以放心使用props
this.props.children就可以页面了 不过还有一个点击事件 你已经有路由状态了 放心使用吧
this.props.history.push('/') 点击首页跳转首页即可

Home首页组件：
轮播图不用我解释了吧 调用接口 循环数据即可
商品展示 调用接口 看结构 循环一次父数据 在循环一次拿到子数据

GoodDetail 商品详情组件：
轮播图一样的 走起
商品展示 调用接口 看结构 循环一次父数据 在循环一次拿到子数据
商品详情有一个 购物车 可以实现跳转购物车 当你选择加入购物车的时候 购物车红点应该显示为1 这里就运用到了redux来传值
弄好redux架构  定义一个虚拟数组 跟数据库一样的数组  然后 action派发 深拷贝一份state里面的数据 存一份数据库的数据 
因为我点击加入购物车的时候 存了一份数据库的数据 可以判断 深拷贝的state 和 数据库里面的数据  如果都存在 那么就num++ 
如果都没有 不存在 那么就应该 在newstate.push 一个 新的数据库数组对象 
然后在把值赋值于购物车的红点上即可 
一个是商品种类 一个是商品数量
商品种类：state.cartList.length
商品数量:
const getArr = (arr) => {
    let num = 0
    arr.forEach(v => num += v.num)
    return num
}

getArr(state.cartList)

cart 购物车组件：
先获取到购物车里面的数据 在购物车管理员里面 用connet连接器 连接起来 然后this.props.cartList 循环

把布局弄好 实现业务操作

单选、全选业务
单选：单选最重要的是就是双向绑定 里面有一个checked 还有onChange 才能实现双向绑定 每次添加完购物车 单选就默认选中 
代码：checked:{v.isChecked}  这个时候还没有实现双向绑定 你会发现 点不了 这个情况只要取反即可 先找到ID 不然对应不了
         let index =  newState.cartList.findIndex(v => v.id === action.value.id)
          newState.cartList[index].isChecked = !newState.cartList[index].isChecked

  然后全部单选完毕之后 应该要让全选也选上 设置onChange事件
          当单选为0 0即为false false直接中止  后面的every是 空数组都会返回true 所以要&&
        selectAllCheck : state.cartList.length && state.cartList.every(v => v.isChecked)

全选：弄一个onChange事件 然后获取状态值 当我为true时 单选也为true 状态保持一样即可
          newState.cartList.forEach(v => v.isChecked = action.value.isChecked) (注意点：action后面的值不要写错 一定要保持对应形参实参)
总价、总数
定义两个方法
选中后总价相乘
const getPrice = (arr) => {
    let price = 0
    arr.forEach(v => v.isChecked && (price += v.num * v.price))
    return price
}
选中后总数相加
const getNum = (arr) => {
    let num = 0
    arr.forEach(v => v.isChecked && (num += v.num))
    return num
}
增加、减少
点击后增加数量 点击后减少数量
共同一个方法  都得带参数ID 不然对应不了 一个参数为1  一个参数为-1
let index = newState.cartList.findIndex(v => v.id === action.value.id)
newState.cartList[index].num += action.value.unit

删除  对应ID即可
let index = newState.cartList.findIndex(v => v.id === action.value.id)
newState.cartList.splice(index,1)





