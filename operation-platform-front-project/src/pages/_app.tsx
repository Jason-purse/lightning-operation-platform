import '@/styles/globals.css'
import type {AppProps} from 'next/app'
import Layouts from '@/components/layouts'
import '@/assets/css/App.css'

type RouteInfo = {
    name: string,
    path: string
}

type RouteData = {
    routes: RouteInfo[]
}

export default function App(props: AppProps) {
    return <Layouts appProps={props}/>
}

/**
 * _app.tsx并不是一个页面,我们不能够使用 服务器 数据抓取函数 只能进行客户端数据抓取
 * getStaticProps,getServerSideProps(都属于服务器数据抓取函数)
 * @param context
 */
// export const getServerSideProps: GetServerSideProps<{ data: RouteData }> = async (context) => {
//     const res = await fetch('/api/routes')
//     const data: RouteData = await res.json()
//     console.log("请求的数据" + data)
//     // 这是一个异步函数,使用语法糖是为了像命令式编程处理 ..
//     return {
//         props: {
//             data,
//         },
//     }
// }
