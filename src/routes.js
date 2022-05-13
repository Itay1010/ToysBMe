import { Home } from "./pages/home.jsx"
import { About } from "./pages/about.jsx"
import { ToyApp } from "./pages/toy-app.jsx"
import { ToyDetails } from "./pages/toy-details.jsx"
import { ToyEdit } from "./pages/toy-edit.jsx"

export const routes = [
    {
        path: '/toy/edit/:toyId',
        component: ToyEdit
    },
    {
        path: '/toy/:toyId',
        component: ToyDetails
    },
    {
        path: '/toy',
        component: ToyApp
    },
    {
        path: '/about',
        component: About
    },
    {
        path: '/',
        component: Home
    },
]