import React, {ReactElement} from "react";
import Link from 'next/link'
import {RouteInfo} from "@/model/entity";

const getRoute =  (ele: RouteInfo) => {
    return (React.createElement(Link,{
        href: ele.path
    },React.createElement("a",{
        value: ele.name
    })))
};
const getActiveRoute = (routes) => {
    let activeRoute = "Default Brand Text";
    for (let i = 0; i < routes.length; i++) {
        if (routes[i].collapse) {
            let collapseActiveRoute = getActiveRoute(routes[i].items);
            if (collapseActiveRoute !== activeRoute) {
                return collapseActiveRoute;
            }
        } else if (routes[i].category) {
            let categoryActiveRoute = getActiveRoute(routes[i].items);
            if (categoryActiveRoute !== activeRoute) {
                return categoryActiveRoute;
            }
        } else {
            if (
                window.location.href.indexOf(routes[i].layout + routes[i].path) !== -1
            ) {
                return routes[i].name;
            }
        }
    }
    return activeRoute;
};
const getActiveNavbar = (routes) => {
    let activeNavbar = false;
    for (let i = 0; i < routes.length; i++) {
        if (routes[i].collapse) {
            let collapseActiveNavbar = getActiveNavbar(routes[i].items);
            if (collapseActiveNavbar !== activeNavbar) {
                return collapseActiveNavbar;
            }
        } else if (routes[i].category) {
            let categoryActiveNavbar = getActiveNavbar(routes[i].items);
            if (categoryActiveNavbar !== activeNavbar) {
                return categoryActiveNavbar;
            }
        } else {
            if (
                window.location.href.indexOf(routes[i].layout + routes[i].path) !== -1
            ) {
                return routes[i].secondary;
            }
        }
    }
    return activeNavbar;
};
const getActiveNavbarText = (routes) => {
    let activeNavbar = false;
    for (let i = 0; i < routes.length; i++) {
        if (routes[i].collapse) {
            let collapseActiveNavbar = getActiveNavbarText(routes[i].items);
            if (collapseActiveNavbar !== activeNavbar) {
                return collapseActiveNavbar;
            }
        } else if (routes[i].category) {
            let categoryActiveNavbar = getActiveNavbarText(routes[i].items);
            if (categoryActiveNavbar !== activeNavbar) {
                return categoryActiveNavbar;
            }
        } else {
            if (
                window.location.href.indexOf(routes[i].layout + routes[i].path) !== -1
            ) {
                return routes[i].messageNavbar;
            }
        }
    }
    return activeNavbar;
};

const getRoutes = (routes: RouteInfo[]) => {
    return routes.map((prop, key) => {
        return (React.createElement(Link, {href: prop.path}, React.createElement("a", {
            value: prop.name
        })))
    });
};


module.exports = {
    getRoute,
    getActiveRoute,
    getActiveNavbar,
    getActiveNavbarText,
    getRoutes
}