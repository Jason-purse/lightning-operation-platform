import Admin from './admin'
import Auth from './auth'
import {AppProps} from "next/app";
import {useRouter} from "next/router";
import {ChakraProvider} from "@chakra-ui/react";
import theme from '@/theme/theme'
import {ThemeEditorProvider} from "@hypertheme-editor/chakra-ui";

type LayoutsProps = {
    appProps: AppProps
}
export default function Layouts(props: LayoutsProps) {
    const Component = props.appProps.Component;
    let {pathname} = useRouter();
    let LayoutComponent = null;
    if (pathname.startsWith("/auth/")) {
        console.log("启用认证骨架")
        LayoutComponent = Auth;
    } else if (pathname.startsWith("/admin/")) {
        console.log("启用管理骨架")
        LayoutComponent = Admin;
    }

    return (
        <ChakraProvider theme={theme}>
            <ThemeEditorProvider>
            {
                LayoutComponent ? <LayoutComponent>
                        <Component {...props.appProps.pageProps}/>
                    </LayoutComponent> :
                    <Component {...props.appProps.pageProps}/>
            }
            </ThemeEditorProvider>
        </ChakraProvider>
    )
}