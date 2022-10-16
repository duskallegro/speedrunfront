import { createRouter, createWebHistory } from 'vue-router'

import HomePage from '@/pages/HomePage';
import AllUsersPage from '@/pages/AllUsersPage';
import UserPage from '@/pages/UserPage';
import WordPadOfUserPage from '@/pages/WordPadOfUserPage';
import WordPadsOfUserPage from '@/pages/WordPadsOfUserPage';
import WordPairsOfPad from '@/pages/WordPairsOfPad';

let router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/home',
            name: "HomePage",
            component: HomePage
        },

        {
            path: '/users',
            name: 'AllUsersPage',
            component: AllUsersPage
        },

        {
            path: '/user/:username',
            name: 'UserPage',
            component: UserPage
        },

        {
            path: '/user/:username/pads',
            name: "WordPadsOfUserPage",
            component: WordPadsOfUserPage
        },

        {
            path: '/user/:username/pad/:padId',
            name: 'WordPairsOfPad',
            component: WordPairsOfPad
        }
    ]
});

export default router;