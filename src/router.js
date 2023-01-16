import { createRouter, createWebHistory } from 'vue-router'

import HomePage from '@/app/page/HomePage';
import AllUsersPage from '@/user/view/page/AllUsersPage';
import UserPage from '@/user/view/page/UserPage';
import DeckOfUserPage from '@/deck/view/page/DeckOfUserPage';
import DecksOfUserPage from '@/deck/view/page/DecksOfUserPage';
import CardsOfDeckPage from '@/card/view/page/CardsOfDeckPage';
import CreateAccountPage from '@/user/create/page/CreateAccountPage';
import LoginPage from '@/user/create/page/LoginPage';

import AddDeckPage from '@/deck/create/page/AddDeckPage';
import TestPage from '@/app/test/TestPage';
import AddPairPage from "@/card/create/page/AddPairPage";
import EditPairPage from "@/card/edit/page/EditPairPage";
import MoreTestPage from '@/app/test/MoreTestPage';

import PracticeDeckPage from "@/deck/practice/page/PracticeDeckPage";
import GuessAndRatePracticePage from "@/deck/practice/page/GuessAndRatePracticePage";
import ChoicesPracticePage from "@/deck/practice/page/ChoicesPracticePage";
import SelectGuessPracticeModePage from "@/deck/practice/page/SelectGuessPracticeModePage";

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
            path: '/more',
            name: 'MoreTestPage',
            component: MoreTestPage
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
            path: '/user/:username/decks',
            name: "DecksOfUserPage",
            component: DecksOfUserPage,
            props: true
        },

        {
            path: '/user/:username/deck/:padId',
            name: 'CardsOfDeckPage',
            component: CardsOfDeckPage
        },

        {
            path: '/add-deck',
            name: 'AddDeckPage',
            component: AddDeckPage
        },
        {
            path: '/user/:username/deck/:padId/card/:cardId/edit-card',
            name: 'EditPairPage',
            component: EditPairPage
        },
        {
            path: '/user/:username/deck/:padId/add-pair',
            name: 'AddPairPage',
            component: AddPairPage,
            props: route => ({
                padId: parseInt(route.params.padId),
                loggedInUsername: route.params.username
            })
        },
        {
            path: '/user/:username/deck/:padId/practice',
            name: 'PracticeDeckPage',
            component: PracticeDeckPage,
            props: route => ({
                padId: parseInt(route.params.padId),
                loggedInUsername: route.params.username
            })
        }


        ,
        {
            path: '/user/:username/deck/:padId/practice/guess-and-rate/:mode',
            name: 'GuessAndRatePracticePage',
            component: GuessAndRatePracticePage,
            props: route => ({
                padId: parseInt(route.params.padId),
                loggedInUsername: route.params.username,
                mode: route.params.mode
            })
        }

        ,
        {
            path: '/user/:username/deck/:padId/practice/choices',
            name: 'ChoicesPracticePage',
            component: ChoicesPracticePage,
            props: route => ({
                padId: parseInt(route.params.padId),
                loggedInUsername: route.params.username
            })
        }
        ,
        {
            path: '/user/:username/deck/:padId/practice/select-guess-mode',
            name: 'SelectGuessPracticeModePage',
            component: SelectGuessPracticeModePage,
            props: route => ({
                padId: parseInt(route.params.padId),
                loggedInUsername: route.params.username
            })
        }
    ]
});

export default router;