import { lazy } from 'react';
import NotFound from '../components/NotFound';
const Login = lazy(() => import('../pages/auth/Login'))
const ForgetPassword = lazy(() => import('../pages/auth/ForgetPassword'))
const ResetPassword = lazy(() => import('../pages/auth/ResetPassword'))
const Home = lazy(() => import('../pages/Home'))
const States = lazy(() => import('../pages/states'))
const City = lazy(() => import('../pages/city'))
const WareHouse = lazy(() => import('../pages/warehouse'))
const AddEditStates = lazy(() => import('../pages/states/AddEdit'))
const AddEditCity = lazy(() => import('../pages/city/AddEdit'))
const AddEditWareHouse = lazy(() => import('../pages/warehouse/AddEdit'))

export const publicRoutes = [
    {
        path: '*',
        component: NotFound
    },
    {
        path: '/',
        component: Login
    },
    {
        path: '/forget-password',
        component: ForgetPassword
    },
    {
        path: '/reset-password/:token',
        component: ResetPassword
    }
];

export const protectedRoutes = [
    {
        path: '/home',
        component: Home,
        forms: []
    },
    {
        path: '/state',
        component: States,
        forms: [
            {
                path: '/state/add',
                component: AddEditStates
            },
            {
                path: '/state/edit/:id',
                component: AddEditStates
            },
        ]
    },
    {
        path: '/city',
        component: City,
        forms: [
            {
                path: '/city/add',
                component: AddEditCity
            },
            {
                path: '/city/edit/:id',
                component: AddEditCity
            },
        ]
    },
    {
        path: '/warehouse',
        component: WareHouse,
        forms: [
            {
                path: '/warehouse/add',
                component: AddEditWareHouse
            },
            {
                path: '/warehouse/edit/:id',
                component: AddEditWareHouse
            },
        ]
    },

];
