import { atom } from 'recoil';

export const sessionState = atom({
    key: 'sessionState',
    default: {
        ipAddress: "",
        session_begin: "",
        session_end: "",
        pregameSurvey: [],
        postGameSurvey: [],
        generalSurvey: [],
        role: "",
        room_name: "",
        your_decisions: []
    }
})

export const gameState = atom({
    key: 'gameState',
    default: {
        ipAddress_creator: "",
        game_begin: "",
        game_end: "",
        players: [],
        chatting: { 1: [], 2: [], 3: [], 4: [] },
        norman_decisions: { 1: [] , 2: [] , 3: [] , 4: []  },
        pete_decisions: { 1: [] , 2: [] , 3: [] , 4: []  },
        erica_messages: { 1: [] , 2: [] , 3: [] , 4: []  }
    }
})
