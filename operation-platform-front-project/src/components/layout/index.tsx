import React, {useState} from "react";
import {Layout, Menu, theme} from "antd";
import {
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    UploadOutlined,
    UserOutlined,
    VideoCameraOutlined
} from "@ant-design/icons";
import styles from './index.module.scss'

const {Header, Sider, Content} = Layout
export default function Index({children}) {
    const [collapsed, setCollapsed] = useState(false);
    const {
        token: {colorBgContainer},
    }
        // 使用token ??
        = theme.useToken();
    return (
        <Layout className={styles.container}>
            <Sider trigger={null} collapsible collapsed={collapsed} width={'300px'} collapsedWidth={'150px'}>
                <div className={`${styles.logonoCollapse} ${styles.logo}`}>
                    运营平台
                </div>
                <Menu
                    theme="dark"
                    mode="inline"
                    defaultSelectedKeys={['1']}
                    items={[
                        {
                            key: '1',
                            icon: <UserOutlined/>,
                            label: '权限控制',
                        }
                        // {
                        //     key: '2',
                        //     icon: <VideoCameraOutlined/>,
                        //     label: 'nav 2',
                        // },
                        // {
                        //     key: '3',
                        //     icon: <UploadOutlined/>,
                        //     label: 'nav 3',
                        // }
                    ]}
                />
            </Sider>
            <Layout className="site-layout">
                <Header style={{paddingLeft: 20, background: colorBgContainer}}>
                    {collapsed ? <MenuUnfoldOutlined className='trigger' onClick={() => setCollapsed(!collapsed)}/> :
                        <MenuFoldOutlined className='trigger' onClick={() => setCollapsed(!collapsed)}/>}
                </Header>
                <Content
                    style={{
                        margin: '24px 16px',
                        padding: 24,
                        minHeight: 280,
                        background: colorBgContainer,
                    }}
                >
                    {children}
                </Content>
            </Layout>
        </Layout>
    );
}

// 抓取页面数据 ..
// export async function getServerSideProps() {
//     // Fetch data from external API
//     const res = await fetch(`https://.../data`)
//     const data = await res.json()
//
//     // Pass data to the page via props
//     return { props: { data } }
// }