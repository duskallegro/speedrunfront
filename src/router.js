import { createRouter, createWebHistory } from 'vue-router'

import HomePage from '@/app/page/HomePage';
import AllUsersPage from '@/user/view/page/AllUsersPage';
import UserPage from '@/user/view/page/UserPage';
import DecksOfUserPage from '@/deck/view/page/DecksOfUserPage';
import CardsOfDeckPage from '@/card/view/page/CardsOfDeckPage';
import CreateAccountPage from '@/user/create/page/CreateAccountPage';
import LoginPage from '@/user/create/page/LoginPage';

import AddDeckPage from '@/deck/create/page/AddDeckPage';
import TestPage from '@/app/test/TestPage';
import AddPairPage from "@/card/create/page/AddPairPage";
import EditPairPage from "@/card/edit/page/EditPairPage";

import PracticeDeckPage from "@/deck/practice/general/page/PracticeDeckPage";
import GuessAndRatePracticePage from "@/deck/practice/guess/page/GuessAndRatePracticePage";
import ChoicesPracticePage from "@/deck/practice/general/page/ChoicesPracticePage";
import SelectGuessPracticeModePage from "@/deck/practice/guess/page/SelectGuessPracticeModePage";
import PairPracticePage from "@/deck/practice/pair/page/PairPracticePage";
import ViewCardPage from "@/card/view/page/ViewCardPage";
import SplitwordPage from "@/deck/practice/splitword/page/SplitwordPage";

import TestPage2 from '@/test2/TestPage2';

import TestPage3 from '@/app/test3/TestPage3';
import TestPage4 from '@/app/test4/TestPage4';

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
            path: '/test2',
            name: 'TestPage2',
            component: TestPage2
        },
        {
            path: '/test4',
            name: 'TestPage4',
            component: TestPage4
        },
        {
            path: '/test3',
            name: 'TestPage3',
            component: TestPage3
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

        ,
        {
            path: '/user/:username/deck/:padId/practice/pair',
            name: 'PairPracticePage',
            component: PairPracticePage,
            props: route => ({
                padId: parseInt(route.params.padId),
                loggedInUsername: route.params.username
            })
        },

        {
            path: '/user/:username/deck/:deckId/card/:cardId',
            name: 'ViewCardPage',
            component: ViewCardPage,
            props: route => ({
                deckId: parseInt(route.params.deckId),
                cardId: parseInt(route.params.cardId)
            })
        },

        {
            path: '/user/:username/deck/:padId/practice/split',
            name: 'SplitwordPage',
            component: SplitwordPage,
            props: route => ({
                padId: parseInt(route.params.padId),
                loggedInUsername: route.params.username
            })
        },
    ]
});

export default router;