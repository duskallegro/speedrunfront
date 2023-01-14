import { createRouter, createWebHistory } from 'vue-router'

import HomePage from '@/pages/HomePage';
import AllUsersPage from '@/pages/AllUsersPage';
import UserPage from '@/pages/UserPage';
import WordPadOfUserPage from '@/pages/WordPadOfUserPage';
import WordPadsOfUserPage from '@/pages/WordPadsOfUserPage';
import WordPairsOfPad from '@/pages/WordPairsOfPad';
import CreateAccountPage from '@/pages/CreateAccountPage';
import LoginPage from '@/pages/LoginPage';

import AddPadPage from '@/pages/AddPadPage';
import TestPage from '@/pages/TestPage';
import AddPairPage from "@/pages/AddPairPage";
import EditPairPage from "@/pages/EditPairPage";

let router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/home',
            name: "HomePage",
            component: HomePage
        },
        {
            path: '/',
            name: "HomePage",
            component: HomePage
        },
        {
            path: '/users',
            name: 'AllUsersPage',
            component: AllUsersPage
        },
        {
            path: '/test',
            name: 'TestPage',
            component: TestPage
        },
        {
            path: '/user/:username',
            name: 'UserPage',
            component: UserPage,
            props: true
        },

        {
            path: '/create-account',
            name: 'CreateAccountPage',
            component: CreateAccountPage,
            props: true
        },

        {
            path: '/normal-login',
            name: 'LoginPage',
            component: LoginPage,
            props: true
        },

        {
            path: '/user/:username/pads',
            name: "WordPadsOfUserPage",
            component: WordPadsOfUserPage,
            props: true
        },

        {
            path: '/user/:username/pad/:padId',
            name: 'WordPairsOfPad',
            component: WordPairsOfPad
        },

        {
            path: '/add-pad',
            name: 'AddPadPage',
            component: AddPadPage
        },
        {
            path: '/user/:username/pad/:padId/card/:cardId/edit-card',
            name: 'EditPairPage',
            component: EditPairPage
        },
        {
            path: '/user/:username/pad/:padId/add-pair',
            name: 'AddPairPage',
            component: AddPairPage,
            props: route => ({
                padId: parseInt(route.params.padId),
                loggedInUsername: route.params.username
            })

        }
    ]
});

export default router;