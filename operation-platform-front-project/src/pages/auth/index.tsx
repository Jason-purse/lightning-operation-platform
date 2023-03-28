import {useRouter} from "next/router";
import {useEffect} from "react";

export default function Auth() {
    let router = useRouter()
    // 每次进入这个页面就直接重定向到sign即可 ..
    useEffect(() => {
        router.push(router.pathname + "/login")
            .then(() => {
            });
    }, [router])
    return null
}