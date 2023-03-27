import {useRouter} from "next/router";
import {useEffect} from "react";

/**
 * 直接重定向到 dash board
 */
export default function Admin() {
    let router = useRouter();
    useEffect(() => {
        router.push(router.pathname + "/dashboard")
    }, [router])
}