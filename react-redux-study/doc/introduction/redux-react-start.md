# redux start
## overview
redux 是一个在js应用中可预测的状态容器 ..

能够帮助我们编写表现一致的,运行在不同环境(例如client / server / native)中且容易测试的应用.. 这能够提供好的开发者体验 .. 例如[实时代码编辑与时间旅行调试器相结合](https://github.com/reduxjs/redux-devtools) 。

我们能够结合react与redux,或者任何视图库(它很轻,仅仅只有2kb,包括依赖),但有一个庞大的插件生态系统可用。

## 安装
### Redux Toolkit
redux toolkit 是官方推荐的方式 - 能够编写redux 逻辑,它包装了redux核心并且包含了能够构建一个redux应用的必不可少的包和函数 .. redux toolkit 基于最佳实践所构建 ..简化了大多数redux 任务,消除了常见错误,并且编写redux应用
更加容易 ..

rtk 包含了一些帮助简化许多常见使用情况的工具类,包括了[存储配置](https://redux-toolkit.js.org/api/configureStore) ,[创建reducers](https://redux-toolkit.js.org/api/createreducer) 以及 [编写 不可变的更新逻辑](https://redux-toolkit.js.org/api/createreducer) 以及 [甚至一次性创建完整的"slices"](https://redux-toolkit.js.org/api/createslice)  

无论你是一个全新的Redux 用户第一次配置项目,或者是一个有经验的用户想要简化已有的应用,Redux Toolkit 能够帮助你让你的Redux代码更加棒 ..

Redux Toolkit 在Npm上是一个可用的包并且能够使用模块打包器或者在Node应用中使用 ..
```shell
# NPM
npm install @reduxjs/toolkit

# Yarn
yarn add @reduxjs/toolkit
```

### 创建react redux app
推荐的开始一个react 和redux 的新的app 是使用[官方的redux+js](https://github.com/reduxjs/cra-template-redux) 模板 或者 [redux + ts 模板](https://github.com/reduxjs/cra-template-redux-typescript) 
 来[创建react-app](https://github.com/facebook/create-react-app) 
```shell
# Redux + Plain JS template
npx create-react-app my-app --template redux

# Redux + TypeScript template
npx create-react-app my-app --template redux-typescript
```

### Redux Core
redux core 库也是一个可用的npm 包, 能够通过模块打包器或者node 应用中使用
```shell
# NPM
npm install redux

# Yarn
yarn add redux
```
它也预编译了一个umd 包(定义了一个`window.Redux` 全局变量来在浏览器中使用), UMD包能够直接使用`<script>` 标签直接使用 ..

有关详细信息,查看 [installation](https://redux.js.org/introduction/installation)

## 基础示例
项目中的整个全局state 将会存储在单个store的对象树上 .. 仅仅只有一种方式可以去改变状态树 - 创建action ..

action 是一个描述应该发生什么的描述对象,并使用dispatch 函数去派发action 到store中进行状态更新 ..  为了响应在action中指定如何让状态更新 ..
我们需要编写一个纯 reducer函数 - 来根据旧的state 以及 action 来计算...
```js
import { createStore } from 'redux'

/**
 * This is a reducer - a function that takes a current state value and an
 * action object describing "what happened", and returns a new state value.
 * A reducer's function signature is: (state, action) => newState
 *
 * The Redux state should contain only plain JS objects, arrays, and primitives.
 * The root state value is usually an object. It's important that you should
 * not mutate the state object, but return a new object if the state changes.
 *
 * You can use any conditional logic you want in a reducer. In this example,
 * we use a switch statement, but it's not required.
 */
function counterReducer(state = { value: 0 }, action) {
  switch (action.type) {
    case 'counter/incremented':
      return { value: state.value + 1 }
    case 'counter/decremented':
      return { value: state.value - 1 }
    default:
      return state
  }
}

// Create a Redux store holding the state of your app.
// Its API is { subscribe, dispatch, getState }.
let store = createStore(counterReducer)

// You can use subscribe() to update the UI in response to state changes.
// Normally you'd use a view binding library (e.g. React Redux) rather than subscribe() directly.
// There may be additional use cases where it's helpful to subscribe as well.

store.subscribe(() => console.log(store.getState()))

// The only way to mutate the internal state is to dispatch an action.
// The actions can be serialized, logged or stored and later replayed.
store.dispatch({ type: 'counter/incremented' })
// {value: 1}
store.dispatch({ type: 'counter/incremented' })
// {value: 2}
store.dispatch({ type: 'counter/decremented' })
// {value: 1}
```
除了直接修改state之外,能够使用action - plain object 来发生一些什么 - 描述你的变化,然后你写一个特定的函数叫做 `reducer` 去决定
每个动作如何转换整个应用程序的状态 ..

在一个典型的redux app中,一般仅仅是具有单个根reducing 函数的单个store, 由于应用增长,你需要将root reducer 分割为单个独立的更小的reduce,
来独立操作state树中的不同部分 .. 这是看起来在react app 中依旧是仅有一个根组件 .. 但是它由多个小的组件所组合 ..

这个架构可能对于一个计数器应用来说看起来很多, 但是这种模式的优美足以让你缩放大型以及复杂的app.. 它能够启用强有力的开发者工具,因此能够跟踪每一个突变到
导致突变的action ..

### redux toolkit example
redux toolkit 简化了编写redux逻辑以及配置store的过程,使用redux toolkit,那么相同的逻辑看起来就像:
```javascript
import { createSlice, configureStore } from '@reduxjs/toolkit'

const counterSlice = createSlice({
  name: 'counter',
  initialState: {
    value: 0
  },
  reducers: {
    incremented: state => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state.value += 1
    },
    decremented: state => {
      state.value -= 1
    }
  }
})

export const { incremented, decremented } = counterSlice.actions

const store = configureStore({
  reducer: counterSlice.reducer
})

// Can still subscribe to the store
store.subscribe(() => console.log(store.getState()))

// Still pass action objects to `dispatch`, but they're created for us
store.dispatch(incremented())
// {value: 1}
store.dispatch(incremented())
// {value: 2}
store.dispatch(decremented())
// {value: 1}
```
redux toolkit 让我们能够写出更简明的逻辑且更容易阅读,仍然遵循相同的redux 行为以及数据流 ..

## Learn Redux
现在让我们来学习redux ..
### redux Essentials Tutorial
这个教程是一个[自上而下的教程](https://redux.js.org/tutorials/essentials/part-1-overview-concepts) - 叫你如何正确的使用Redux,使用我们最新的推荐的api 以及最佳实践 ..

### Redux Fundamentals Tutorial
此教程是一个自下而上的教程让你理解redux 是如何工作的 - 根据第一个原理且没有任何抽象. 并且理解存在的标准的redux 使用模式 ..

### 学习现代化Redux 现场直播
redux 维护者Mark Erikson 出现在"Learn with Jason" 解释怎样去使用推荐的redux .. 这展示了包括实时编码的示例应用 - 展示了如何使用Redux Toolkit 以及 React-Redux hooks 以及Typescript..
以及新的RTK 查询数据抓取apis ..

查看 [学习现代化Redux](https://www.learnwithjason.dev/let-s-learn-modern-redux) 的笔记页面,了解文字记录和示例应用程序源的链接..

### 其他教程
- redux 仓库包含了各种示例项目 - 说明了如何使用redux的各个方面 ..

    几乎所有的示例都有一个相关的CodeSandbox 沙箱 .. 这是一个可交互版本的代码 - 能够在线使用,查看示例的完整列表[Examples page](https://redux.js.org/introduction/examples)

- Redux 创建者 Dan Abramov的免费"redux 开始"的[视频系列](https://app.egghead.io/playlists/fundamentals-of-redux-course-from-dan-abramov-bd5cc867) 以及 构建在Egghead.io上的"地道的使用Redux构建React 应用程序"的[视频](https://egghead.io/courses/building-react-applications-with-idiomatic-redux) ..
- Redux 维护者 Mark Erikson的"Redux 基本原理" [会议交谈](https://blog.isquaredsoftware.com/2018/03/presentation-reactathon-redux-fundamentals/) 以及 "Redux 基本原理" [工作坊](https://blog.isquaredsoftware.com/2018/06/redux-fundamentals-workshop-slides/) ..
- Dave Ceddia的 有关 一个完整的 [React Redux 初学者教程](https://daveceddia.com/redux-tutorial/) ..

### 其他资源
- [Redux FAQ](https://redux.js.org/faq) 回答有关如何使用Redux的常见问题,并在 ["Using Redux" 文档](https://redux.js.org/usage/) 部分包含了处理衍生数据,测试,结构化reducer逻辑 以及 减少模板的信息 ..
- Redux 维护者Mark Erikson的 [实践Redux 教程系列](https://blog.isquaredsoftware.com/series/practical-redux/) 说明了现实世界的中级 / 高级技术 - 有关与React 以及 Redux工作(同样是在Educative.io上的一个交互性课程) ..
- [React / Redux 链接列表](https://github.com/markerikson/react-redux-links)  已经了使用[reducers  以及 选择器](https://github.com/markerikson/react-redux-links/blob/master/redux-reducers-selectors.md) , [管理副作用](https://github.com/markerikson/react-redux-links/blob/master/redux-side-effects.md) , [Redux 架构以及最佳实践](https://github.com/markerikson/react-redux-links/blob/master/redux-architecture.md) 以及其他的工作的相关分类文章 ... 
- 社区创建了成千的Redux相关的库, 插件以及工具,[生态系统文档](https://redux.js.org/introduction/ecosystem)  页面列出了介绍 ... 并且

    完整的列表[Redux 插件目录](https://github.com/markerikson/redux-ecosystem-links)  中可见

### 帮助以及讨论
[Reactiflux Discord 社区](https://www.reactiflux.com/) 的 [#redux channel](https://discord.gg/0ZcbPKXt5bZ6au5t) 是redux的官方资源(包含了有关学习和使用redux的所有问题)..

Reactiflux 是一个闲逛,问问题以及学习的好地方 - 欢迎使用 ..

你能够在Stack Overflow中询问问题(使用[#redux 标签](https://stackoverflow.com/questions/tagged/redux))

如果有bug报告或者需要留下反馈,请在github仓库中留下issue ..

## 是否应该使用Redux
Redux 是一个有价值的工具 - 对于组织state ,但是我们应该可以考虑是否与我们的情况合适 ... 不要因为某些人说你需要使用它 - 
花一点实践理解最终的好处 以及使用它的代价 ..

这里有一些建议, 是否能够从Redux中收益:
- 随着时间存在合理数量的数据改变
- 你的状态需要一个单一的事实来源
- 你发现在顶层组件保持你的所有状态已经不足够 ..
> 有关更多思考React是如何使用的,请参考
- [Redux FAQ: When should i use Redux](https://redux.js.org/faq/general#when-should-i-use-redux)
- [You Might Not Need Redux](https://medium.com/@dan_abramov/you-might-not-need-redux-be46360cf367)
- [The Tao of Redux,Part 1 - 实现以及 Intent](https://blog.isquaredsoftware.com/2017/05/idiomatic-redux-tao-of-redux-part-1/)
- [The Tao of Redux,Part 2 - 实践和原理 - Philosophy](https://blog.isquaredsoftware.com/2017/05/idiomatic-redux-tao-of-redux-part-2/)
- [Redux FAQ](https://redux.js.org/faq)

