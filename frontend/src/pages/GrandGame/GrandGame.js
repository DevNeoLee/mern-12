import Erica0 from './GameErica/Erica0'
import Erica1 from './GameErica/Erica1'
import Erica2 from './GameErica/Erica2'
import Erica3 from './GameErica/Erica3'

import Norman0 from './GameNorman/Norman0'
import Norman1 from './GameNorman/Norman1'
import Norman2 from './GameNorman/Norman2'
import Norman3 from './GameNorman/Norman3'

import Pete0 from './GamePete/Pete0'
import Pete1 from './GamePete/Pete1'
import Pete2 from './GamePete/Pete2'
import Pete3 from './GamePete/Pete3'

import Instruction from './Instruction'

import { Button } from "react-bootstrap";

import { Link } from "react-router-dom"

import { useEffect, useState } from 'react'

import io from 'socket.io-client'

import { original_data } from './dataGame'

import HOST from '../../utils/routes'

import axios from 'axios';

import { useRecoilState } from 'recoil';
import { sessionState } from '../../recoil/globalState';

export default function GrandGame() {

    const data = JSON.parse(JSON.stringify(original_data))
    
    const [role, setRole] = useState('')

    const [gameStart, setGameStart] = useState(false);
    const [pageQuantity, setPageQuantity] = useState(4)
    const [step, setStep] = useState(0)
    const [id, setId] = useState({})
    
    const [socket, setSocket] = useState(null)

    const [round, setRound] = useState(1)

    const [user, setUser] = useState({
        role: '',
        id: '',
        scores: [],
        round_completed: 0,
        final_score: 100,
    })

    const [clients, setClients ] = useState(0)

    const [messagesStorageErica, setMessagesStorageErica] = useState({
        round1: {
            toNorman: [],
            toPete: [],
            levelOfWarning: []
        },
        round2: {
            toNorman: [],
            toPete: [],
            levelOfWarning: []
        },
        round3: {
            toNorman: [],
            toPete: [],
            levelOfWarning: []
        },
        round4: {
            toNorman: [],
            toPete: [],
            levelOfWarning: []
        },
    })
    
    const [roundFinished, setRoundFinished] = useState(false)
    const [resultReady, setResultReady] = useState(false)//////////true <-> false 로 step값과 함께 페이지 이동 결정함

    const [peteDecisions, setPeteDecisions] = useState([
        {stay: "", whichRoute: "", role: ""},
    ])
    const [normanDecisions, setNormanDecisions] = useState([
        { stay: "", whichRoute: "", role: ""},
    ])

    const [levelOfWarning, setLevelOfWarning] = useState('')
    const [messageToNorman, setMessageToNorman] = useState('')
    const [messageToPete, setMessageToPete] = useState('')
    const [messageFromErica, setMessageFromErica] = useState('')
    
    const [petePower, setPetePower] = useState("poweron")
    const [normanStay, setNormanStay] = useState("stayon")


    const [whichRoute, setWhichRoute] = useState("")
    const [whichRoutePete, setWhichRoutePete] = useState("")

    const [normanRoute, setNormanRoute] = useState('')

    const [popForm, setPopForm] = useState(false);
    const [waitPopupErica, setWaitPopupErica] = useState(false)

    const [normanQuestion, setNormanQuestion] = useState(false)

    const [normanHealth, setNormanHealth] = useState(100)
    const [ericaHealth, setEricaHealth] = useState(100)
    const [peteHealth, setPeteHealth] = useState(100)

    const [decidedArea, setDecidedArea] = useState('')

    //if decidedArea's water depth above 30cm
    const [critical, setCritical] = useState(false)

    const [gameResult, setGameResult] = useState([])

    
    const [electricity, setElectricity] = useState('poweron')

    const [ players, setPlayers ] = useState([])

    const normanRoles = ['NormanA', 'NormanB', 'NormanC', 'NormanD', 'NormanE', 'NormanF'];

    const [waterDepthEndupNorman, setWaterDepthEndupNorman] = useState(0)
    const [waterDepthEndupPete, setWaterDepthEndupPete] = useState(0)

    const [normanChat, setNormanChat] = useState("");
    const [peteChat, setPeteChat] = useState("");
    const [ericaChat, setEricaChat] = useState("");

    const [chatReceived, setChatReceived] = useState({message: "", user_name: ""});

    const [chatData, setChatData] = useState([]);

    const [userQuantity, setUserQuantity] = useState(0)
  
    const [browserTapCount, setBrowserTapCount] = useState(0);

    const [canStartGame, setCanStartGame ] = useState(false);

    const MAX_CLIENTS = 8;
    const MIN_CLIENTS = 3;

    const sessionData = sessionStorage.getItem('ufoknSession');
    const sessionDataObject = JSON.parse(sessionData);

    ///////////////////////////main data///////////////////////////////////////////////////////////////////////// 
    const [session, setSession] = useState({});

    const [globalSession, setGlobalSession] = useRecoilState(sessionState);

    const roles = ['Erica', 'Pete', 'NormanA', 'NormanB', 'NormanC', 'NormanD', 'NormanE', 'NormanF'];

    //individual game
    const [game, setGame] = useState({
        room_name: "",
        players: [],
        chatting: [],
    });

    //게임 있는 여부
    const [isGame, setIsGame] = useState(false);

    //all the games array, three rooms to start
    const [games, setGames] = useState(() => [
        { room_name: "1", players: [], chatting: [] }, 
        { room_name: "2", players: [], chatting: [] },
        { room_name: "3", players: [], chatting: [] }
    ])

    //create a session
    const createSession = async () => {
        return await fetch(HOST + '/api/session', { "method": "POST" })
            .then(res => res.json())
            .then(data => {
                
                sessionStorage.setItem('ufoknSession', JSON.stringify(data));
                return data
            })
            .catch(err => console.log(err))
    }

    //make new game
    const createGame = async () => {
        const gameData = await fetch(HOST + '/api/grandgame', { "method": "POST" })
            .then(res => res.json())
            .then(data => {
                sessionStorage.setItem('ufoknGame', JSON.stringify(data));
                return data
            })
            .catch(err => console.log(err))
        
        //if the new game was created in DB, push this game into 'games' 
        if (gameData) {
            setGame(gameData)
            setGames([...games, gameData])
        }

        //share this game info with all the connected sockets
        // socket.emit("share_game", gameData )
    }

    //when user joins, check see if game can start
    const checkGameStart = (room_size) => {
        if (room_size >= MIN_CLIENTS ) {
            setCanStartGame(true);
        }


    }

    const updateToMongoDBSession = async (payload) => {
        console.log('session data: ', sessionDataObject);

        const dataUpdate = async () => {
            await axios.put(HOST + '/api/session', {...sessionDataObject, payload})
                .then(data => {
                    console.log('data from mongo saved: ', data)
                    // return data
                })
                .catch(err => console.log(err))
        }

        await dataUpdate();
        // navigate('/welcome');
    }

    useEffect(() => {
        const getItem = async () => {
            console.log('grandGame page begins!')
        let s = await sessionStorage.getItem('ufoknSession')
        console.log("s??: ", s)
        if (!s ) {
            console.log('세션이 없네')
            s = await createSession()
            console.log("Your Session Newly create/Saved in Mongo: ", s)

            setSession(s)
            setGlobalSession(s)

        } else {
            console.log("Your Global Session: ", globalSession)
            setSession(JSON.parse(s))
            setGlobalSession(JSON.parse(s))
        }
    }
        getItem()
    }, [])

    useEffect(() => {
        const setItem = async () => {
            console.log('session updated!')
            await sessionStorage.setItem('ufoknSession', JSON.stringify(session))
            console.log('Your session data; ', session)
        }
            
        setItem()
    }, [session])

    useEffect(() => {
        const updateGames = async () => {
            console.log('game updated!')
            await sessionStorage.setItem('ufoknGame', JSON.stringify(game))
            console.log('Your game data updated: ', game)
    
            let newGames = games.map(g => {
                if (g.room_name === game.room_name) {
                    return game
                } else {
                    return g
                }
            })
    
            console.log("what newGames: ?", newGames)
            setGames(newGames)
        }
        updateGames();
        // socket.emit("join_room", game.room_name, game, session._id) ////////////////////////////////
    }, [game])


    useEffect(() => {
        console.log("ericaMessage to norman:", messageToNorman)
        console.log("ericaMessage to pete:", messageToPete)

    }, [messageToNorman, messageToPete])

    useEffect(() => {
        const average = (peteHealth + normanHealth * 3) / 4;
        setEricaHealth(average.toFixed())
        // console.log('erica health updated; ', ericaHealth )
    }, [peteHealth, normanHealth], () => { console.log('erica health updated; ', ericaHealth) })

    useEffect(() => {
        console.log("City Power now on: ", electricity )
    }, [electricity])
   
    //먼저 소켓 접속
    const connectToSocket = () => {
        //////Socket///////////////////////////////////////////////////////////////////
        const socket = io()
        setSocket(socket)
        console.log("socket connected: ", socket)

        //먼저 무조건 게임을 최소 하나 있어야 함으로 게임 하나 만듬
        // if (!isGame) {
        //     createGame()
        // }

        socket.on("client_count", (arg1, arg2) => {
            console.log('Client Count:', arg2)
            setClients(arg2);
        })

        socket.on("join_room", (room_name, player_name, game, room_size) => {
            console.log(`New player joined a room #${room_name}: `, game, player_name)
            setGame(game)
            setGames([...games, game])
            console.log('game: ', game)
            console.log('games: ', games)
            console.log('room_size: ', room_size)
            checkGameStart(room_size)
        })

        socket.on("game_start", () => {
            const gameOn = async () => {
                //update sessionData in MongoDB
                setGameStart(true)
                await updateToMongoDBSession({role: role})
                console.log("Game Start Go!")
            }
            gameOn();
        })

        socket.on("share_game", game_data => {
            console.log('game_data: ', game_data)
            setGame(game_data)
            setGames([...games, game_data]);
        })

        socket.onAny((event, ...args) => {
            console.log('socket event: ', event, args)
        })

        socket.on("leaving", () => {
            console.log("someone leaving the room")
        })

        socket.on("left", () => {
            console.log("someone left the room")
        })

        socket.on("erica_message", (msg) => {
            console.log('Erica message from Erica received: ', msg)

            setMessageFromErica(msg)

            setInterval(() => {
                setPopForm(true)
                setWaitPopupErica(true)
            }, 3000);


        })

        socket.on("norman_message", (data => {
            console.log('Norman data from Norman received: ', data)
            console.log('current normanDecisions: ', normanDecisions)
            setNormanDecisions(prev => (
                prev.map((ele, idx) => {
                    if (idx === (round - 1)) {
                        return { stay: data.stay, whichRoute: data.whichRoute, role: data.role }
                    } else {
                        return ele
                    }
                })
         
            ))
            console.log('norman data added to your states!')

        }))

        socket.on("pete_message", (data => {
            console.log('Pete data from Pete received: ', data)
            console.log('current peteDecisions: ', peteDecisions)
            console.log('data.stay: poweroff?', data.stay)

            if (data.stay === 'poweroff')  {
                setElectricity('poweroff')
            } else if (data.stay === 'poweron') {
                setElectricity('poweron')
            }
        

            setPeteDecisions(prev => (
                prev.map((ele, idx) => {
                    if (idx === (round - 1)) {
                        return { stay: data.stay, whichRoute: data.whichRoute, role: data.role}
                    } else {
                        return ele
                    }
                })
            ))
           

            console.log('pete data added to your states!')
        }))

        socket.on("norman_chat", (data) => {
            console.log('Norman is chatting on frontend received: ', data.message);
            setChatReceived(prev => ({...prev, message: data.message}));
            console.log("hmm, role: ", data.role)
            setChatData(prev => [...prev, { role: data.role, message: data.message }], console.log("chatData1: ", JSON.stringify(chatData)) );
            console.log("chatData2: ", JSON.stringify(chatData))
        })
    }

    useEffect(()=>{
   
        connectToSocket()
        
        return () => {
            // socket.close()
            // socket.disconnect();
            setSocket(null);
            console.log("socket closed: ")
        }
    }, [])
// },[setSocket])

    useEffect(() => {
        console.log("messages storage Erica: ", JSON.stringify(messagesStorageErica))
    }, [messagesStorageErica])

    

    /////////////////////round complete dececion logic////////////////////
    useEffect(()=> {
        console.log('NormanDecisions: ',normanDecisions)
        console.log('PeteDecisions: ', peteDecisions)

        //만약 노만과 피터가 자료를 서로 보내줘서 두명의 자료가 모두 압데이트 되어 모두 null이 아니라면
        if ((normanDecisions[round - 1].stay) && (peteDecisions[round - 1].stay)) {

            ////// calculate socres here///////
            calculateScore(normanDecisions, peteDecisions)
            ////// feed the date /////


            //// render result page /////
            
            setResultReady(true)
            console.log('!!!!!!!calcuation done')
        } else {
            console.log("result page is not ready yet: " + 'NormanDecisions: ' + JSON.stringify(normanDecisions) + 'PeteDecisions: ' + JSON.stringify(peteDecisions))
        }

    },[normanDecisions, peteDecisions])


    useEffect(() => {
        console.log("chatReceived: ", chatReceived)
    }, [chatReceived])



    useEffect(() => {
        console.log("chatData: ", chatData)
    }, [chatData])

    const calculateScore = (normanDecisions, peteDecisions) => {

        //지금 라운드의 자료
        const stayedHome = normanDecisions[round - 1].stay === 'stayon' 
        const stayedHomePete = peteDecisions[round - 1].stay === 'poweron'

        console.log('stayed home ? : ', stayedHome)
        console.log('stayed home pete? : ', stayedHomePete)


        // console.log('노만의 결정은 ? : ', normanDecisions[round - 1].stay)
        // console.log('pete의 결정은 ? : ', peteDecisions[round - 1].stay)

        let travelRisk;
        let travelRiskPete;
        let powerOutrageRisk;
    
        let criticalRisk;
        let criticalRiskPete;
        let decidedAreaNorman;
        let decidedAreaPete;


        if (stayedHome) {
            console.log('======== stayed home norman =========')
            travelRisk = 0;

            decidedAreaNorman = normanDecisions[round - 1].role

            console.log('normanDecisions[round - 1]: ', normanDecisions[round - 1])
            console.log('normanDecisions[round - 1].role: ', normanDecisions[round - 1].role)

            console.log("decidedAreaNorman: ", decidedAreaNorman)

            if (electricity === 'poweron') {
                powerOutrageRisk = 0;
            } else if (electricity === 'poweroff') {
                powerOutrageRisk = 5;
            }

            //find the water depth you end up, data array 에서 찾아야함
            //다음 라운드의 current wtaer depth 값임
            data[`round${round + 1}`].map(ele => {
                if (ele.name.toLowerCase() === decidedAreaNorman.toLowerCase()) {
                    setWaterDepthEndupNorman(ele['Current Water Depth'])
                    console.log('자료 안입니다.')
                }
            })

            //when the result of the waterDepth in the house above 30cm
            if ( waterDepthEndupNorman > 30 ) {
                    criticalRisk = 80;
            } else {
                criticalRisk = 0;
            }
            

            console.log('travelRisk: ', travelRisk)
            console.log('powerOutrageRisk: ', powerOutrageRisk)
            console.log('criticalRisk: ', criticalRisk)
            console.log('decidedAreaNorman: ', decidedAreaNorman)
            console.log('waterDepthEndupNorman: ', waterDepthEndupNorman)


        ///now in case of 'left home'
        } else {
            decidedAreaNorman = normanDecisions[round - 1].whichRoute;

            travelRisk = 5;

            powerOutrageRisk = 0;

            console.log("decidedAreaNorman: ", decidedAreaNorman)


            data[`round${round + 1}`].map(ele => {
                if (ele.name.toLowerCase() === decidedAreaNorman) {
                    setWaterDepthEndupNorman(ele['Current Water Depth'])
                }
            })
            
            //when the result of the waterDepth in the house above 30cm
            if (waterDepthEndupNorman > 30) {
                criticalRisk = 80;
            } else {
                criticalRisk = 0;
            }


            console.log('======== went out norman =========')

            console.log('travelRisk: ', travelRisk)
            console.log('powerOutrageRisk: ', powerOutrageRisk)
            console.log('criticalRisk: ', criticalRisk)
            console.log('decidedAreaNorman: ', decidedAreaNorman)
            console.log('waterDepthEndupNorman: ', waterDepthEndupNorman)
        }

        setNormanHealth(prev => 
            prev - travelRisk - powerOutrageRisk - criticalRisk
        )

        //peteScore update
        if (stayedHomePete) {
            console.log('======== stayed home pete =========')
            travelRiskPete = 0;

            decidedAreaPete = peteDecisions[round - 1].role

            console.log('peteDecisions[round - 1]: ', peteDecisions[round - 1])
            console.log('peteDecisions[round - 1].role: ', peteDecisions[round - 1].role)

            console.log("decidedAreaPete: ", decidedAreaPete)

            if (electricity === 'poweron') {
                powerOutrageRisk = 0;
            } else if (electricity === 'poweroff') {
                powerOutrageRisk = 5;
            }

            //find the water depth you end up, data array 에서 찾아야함
            //다음 라운드의 current wtaer depth 값임
            data[`round${round + 1}`].map(ele => {

                console.log("ele.name.toLowerCase(): ", ele.name.toLowerCase())
                console.log(" decidedAreaPete.toLowerCase(): ", decidedAreaPete.toLowerCase())

                if (ele.name.toLowerCase() === decidedAreaPete.toLowerCase()) {
                    setWaterDepthEndupPete(ele['Current Water Depth'])
                    console.log('자료 안입니다.ele["Current Water Depth"]: ', ele['Current Water Depth'])
                }
            })

            //when the result of the waterDepth in the house above 30cm
            if (waterDepthEndupPete > 30) {
                criticalRiskPete = 80;
            } else {
                criticalRiskPete = 0;
            }


            console.log('travelRisk: ', travelRiskPete)
            console.log('powerOutrageRisk: ', powerOutrageRisk)
            console.log('criticalRisk: ', criticalRiskPete)
            console.log('decidedAreaPete: ', decidedAreaPete)
            console.log('waterDepthEndupPete: ', waterDepthEndupPete)


            ///now in case of 'left home'
        } else {
            decidedAreaPete = peteDecisions[round - 1].whichRoute;

            travelRiskPete = 5;

            powerOutrageRisk = 0;

            console.log("decidedAreaPete: ", decidedAreaPete)
            console.log('일로 왓나요?')

            data[`round${round + 1}`].map(ele => {
                if (ele.name.toLowerCase() === decidedAreaPete.toLowerCase()) {
                    setWaterDepthEndupPete(ele['Current Water Depth'])
                    console.log("water level pete: ", )
                }
            })

            //when the result of the waterDepth in the house above 30cm
            if (waterDepthEndupPete > 30) {
                criticalRiskPete = 80;
            } else {
                criticalRiskPete = 0;
            }


            console.log('======== went out Pete =========')

            console.log('travelRisk: ', travelRiskPete)
            console.log('powerOutrageRisk: ', powerOutrageRisk)
            console.log('criticalRisk: ', criticalRiskPete)
            console.log('decidedAreaPete: ', decidedAreaPete)
            console.log('waterDepthEndupPete: ', waterDepthEndupPete)
        }

        console.log("hmm: ", 100 - travelRiskPete - powerOutrageRisk - criticalRiskPete)

        setPeteHealth(prev =>
            (prev - travelRiskPete - powerOutrageRisk - criticalRiskPete)
        )
        //ericaScore update
    }


    const giveRoleRandomly = () => {
        console.log('***************giveRoleRandomly clicked!**********')

        setRole(role => ['Erica', 'Pete', 'NormanA', 'NormanB', 'NormanC'][Math.floor(Math.random()*3)])
        // setRole(role => '')

        // socket.emit("role")
        console.log('someone joined a room', typeof role)
        // /socket emit/////


        socket.emit("enter_room", 'hello entering', () => {
            console.log("you entered the room1")
            
        })

        console.log('socket,,', socket)
    }

    const handleRoleChange = () => {
        switch (role) {
         case 'Erica':
            setPageQuantity(quantity => 4)
            console.log("current role: ", role)
            socket.emit("role", {role: role})
            break;
        case 'Pete':
            setPageQuantity(quantity => 4)
            console.log("current role:  ", role)
            socket.emit("role", { role: role })
            break;
        case 'NormanA':
        case 'NormanB':
        case 'NormanC':
            setPageQuantity(quantity => 6)
            console.log("current role: ", role)
            socket.emit("role", { role: role })
            break;
        default:
            setPageQuantity(quantity => 0)
            console.log("current role: none", role)
        }
    }

    const handleSubmitPete = (e) => {
        console.log('pete just submitted his decison form: ')
        e.preventDefault()

        setPeteDecisions(prev => (
           prev.map((ele, idx) => {
               if (idx === (round - 1)) {
                   return { stay: petePower, whichRoute: whichRoutePete, role: role }
               } else {
                   return ele
               }
           })
        ))


        setElectricity(petePower)
        // setPetePower(true)

        // socket interaction
        socket.emit('pete_message', { stay: petePower, whichRoute: whichRoutePete, role: 'pete'})
    }

    const handleChangePetePower = (e) => {
        setPetePower(e.target.value)
        console.log('pete power: ', e.target.value)

    }


    const handleChangeWhichRoutePete =(e) => {
        setWhichRoutePete(e.target.value)
        console.log('which route pete: ', e.target.value)

    }

    //Norman handles
    const handleSubmitNorman = (e) => {
        console.log('Norman just submitted his form:')
        e.preventDefault()

        console.log("norman stay: " + normanStay + "which route: " + whichRoute)

        setNormanDecisions(prev => (
            prev.map((ele, idx) => {
                if (idx === (round - 1)) {
                    return { stay: normanStay, whichRoute: whichRoute, role: role }
                } else {
                    return ele
                }
            })
        ))
        // setNormanStay(true)
        // setWhichRoute('')
        
        const normanData = {
            stay: normanStay, whichRoute, role: role
        }
        // socket interaction
        socket.emit('norman_message', normanData)

    }

    const handleChangeNormanStay = (e) => {
        setNormanStay(e.target.value)
        console.log('norman select: ', normanStay)
    }

    const handleChangeWhichRoute =(e) => {
        setWhichRoute(e.target.value)
        console.log('norman which route: ', e.target.value)
    }


    //erica communicating through SOCKET  + to do: save to MongoDB
    const handleSubmitErica = (e) => {
        e.preventDefault()
        console.log('erica just submitted her messages:')

        const messages = {
            messageToNorman, messageToPete, levelOfWarning
        }

        // socket interaction
        socket.emit('erica_message', messages)

        console.log("current messages! Pete: " + messageToPete + "Norman: " + messageToNorman + "LevelOfWarning: " + levelOfWarning)
        switch(round) {
            case 1:
                setMessagesStorageErica(prevState => ({
                    ...prevState, round1: {
                        toNorman: [...prevState.round1.toNorman, messageToNorman],
                        toPete: [...prevState.round1.toPete, messageToPete],
                        levelOfWarning: [...prevState.round1.levelOfWarning, levelOfWarning]
                                            }       
                                        
                }))

                setLevelOfWarning('')
                setMessageToNorman('')
                setMessageToPete('')

                break;
            case 2:
                setMessagesStorageErica(prevState => ({
                    ...prevState, round1: {
                        toNorman: [...prevState.round1.toNorman, messageToNorman],
                        toPete: [...prevState.round1.toPete, messageToPete],
                        levelOfWarning: [...prevState.round1.levelOfWarning, levelOfWarning]
                    }

                }))

                setLevelOfWarning('')
                setMessageToNorman('')
                setMessageToPete('')

                break;
            case 3:
                setMessagesStorageErica(prevState => ({
                    ...prevState, round1: {
                        toNorman: [...prevState.round1.toNorman, messageToNorman],
                        toPete: [...prevState.round1.toPete, messageToPete],
                        levelOfWarning: [...prevState.round1.levelOfWarning, levelOfWarning]
                    }

                }))

                setLevelOfWarning('')
                setMessageToNorman('')
                setMessageToPete('')

                break;
            case 4:
                setMessagesStorageErica(prevState => ({
                    ...prevState, round1: {
                        toNorman: [...prevState.round1.toNorman, messageToNorman],
                        toPete: [...prevState.round1.toPete, messageToPete],
                        levelOfWarning: [...prevState.round1.levelOfWarning, levelOfWarning]
                    }

                }))

                setLevelOfWarning('')
                setMessageToNorman('')
                setMessageToPete('')

                break;
        }

       
        
        console.log("erica_messages on frontend: ", JSON.stringify(messagesStorageErica.round1))

    } 

    const handleClick = () => {
        console.log("!final click!: ");
    };

    const handleChangeWarning = (e) => {
        setLevelOfWarning(e.target.value)
        console.log("Level of wanrning: ", e.target.value)
    }

    const handleChangeMessageToNorman = (e) => {
        setMessageToNorman(e.target.value)
        console.log("Message To Norman: ", e.target.value)
    }

    const handleChangeMessageToPete = (e) => {
        setMessageToPete(e.target.value)
        console.log("Message To Pete: ", e.target.value)
    }

    const ericas = [
        <Erica0 step={step} role setRole />,
        <Erica1 step={step} round={round} />,
        <Erica2 globalSession={globalSession} setGlobalSession={setGlobalSession} data={data} setWaitPopupErica={setWaitPopupErica} waitPopupErica={waitPopupErica} handleSubmitErica={handleSubmitErica} round={round} handleChangeWarning={handleChangeWarning} handleChangeMessageToNorman={handleChangeMessageToNorman} handleChangeMessageToPete={handleChangeMessageToPete} levelOfWarning={levelOfWarning} messageToPete={messageToPete} messageToNorman={messageToNorman} ericaHealth={ericaHealth} players={players}/>,
        <Erica3 step={step} setRound={setRound} setStep={setStep} setResultReady={setResultReady} petePower={petePower} normanHealth={normanHealth} peteHealth={peteHealth} round={round} ericaHealth={ericaHealth} messagesStorageErica={messagesStorageErica} normanStay={normanStay} />,
    ];
    
    const normans = [
        <Norman0 step={step} />,
        <Norman1 step={step} round={round}/>,
        <Norman2 globalSession={globalSession} setGlobalSession={setGlobalSession} step={step} data={data} handleChangeWhichRoute={handleChangeWhichRoute} normanStay={normanStay} handleSubmitNorman={handleSubmitNorman} handleChangeNormanStay={handleChangeNormanStay} popForm={popForm} setPopForm={setPopForm} round={round} electricity={electricity} normanQuestion={normanQuestion} normanHealth={normanHealth} messageToNorman={messageToNorman} role={role} messageFromErica={messageFromErica} socket={socket} setChatData={setChatData} chatData={chatData}/>,
        <Norman3 step={step} setRound={setRound} setStep={setStep} setResultReady={setResultReady} sround={round} peteHealth={peteHealth} ericaHealth={ericaHealth} whichRoute={whichRoute} normanStay={normanStay} electricity={electricity} normanHealth={normanHealth} waterDepthEndupNorman={waterDepthEndupNorman} petePower={petePower}/>,
    ];
    
    const petes = [
        <Pete0 step={step} />,
        <Pete1 step={step} round={round} />,
        <Pete2 step={step} globalSession={globalSession} setGlobalSession={setGlobalSession} data={data} handleChangePetePower={handleChangePetePower} handleSubmitPete={handleSubmitPete} popForm={popForm} setPopForm={setPopForm} round={round} electricity={electricity} normanQuestion={normanQuestion} peteHealth={peteHealth} petePower={petePower} whichRoutePete={whichRoutePete} normanStay={normanStay} handleChangeWhichRoutePete={handleChangeWhichRoutePete} messageToPete={messageToPete} messageFromErica={messageFromErica}/>,
        <Pete3 step={step} setRound={setRound} setStep={setStep} setResultReady={setResultReady} round={round} normanHealth={normanHealth} ericaHealth={ericaHealth} peteHealth={peteHealth} whichRoutePete={whichRoutePete} electricity={electricity} petePower={petePower} waterDepthEndupPete={waterDepthEndupPete}/>
    ];
    
    const Buttons = () => (
        <section className='buttons' >
            {/* {step > 0 && (
                <Button
                type="button"
                onClick={() => {
                    setStep(step - 1);
                    console.log(step)
                }}
                style={{ margin: "0.5rem"}}
                >
                BACK
                </Button>
            )} */}
            {step === pageQuantity && (
                <Link to="/instructionformpostgame">
                    <Button onClick={handleClick}
                        style={{ margin: "0.5rem" }}
                    >
                    SUBMIT
                    </Button>
                </Link>
            )}

            {step < pageQuantity && (
                <Button
                    type="button"
                    style={{ margin: "0.5rem" }}
                    onClick={() => {
                        setStep(step + 1);
                        console.log("Current Game Page: ", step + 1)
                    }}
                >
                    NEXT
                </Button>
            )}
        </section>
    );
    return (
        <div className="main">
            <div className="gameframe">
                {/* {ericas[3]} */}
            { gameStart ?
                <>
                    { 
                        role === 'Erica' && resultReady
                            ? 
                            ericas[3] 
                            :
                        role === 'Erica'
                            ?
                            ericas[step] 
                            : 
                        role === 'Pete' && resultReady
                            ? 
                            petes[3] 
                            :
                        role === 'Pete'
                            ?
                            petes[step] 
                            : 
                        normanRoles.includes(role) && resultReady
                            ?
                            normans[3] 
                            :
                            normans[step]
                        }

                    { step !== 2 && <Buttons/> }
                </>
                    : 
                    <Instruction clients={clients} axios={axios} HOST={HOST} sessionDataObject={sessionDataObject} setGameStart={setGameStart} id={id} setId={setId} handleRoleChange={handleRoleChange} canStartGame={canStartGame} setCanStartGame={setCanStartGame} game={game} setGame={setGame} socket={socket} giveRoleRandomly={giveRoleRandomly} session={session} setRole={setRole} role={role} normans={normanRoles} userQuantity={userQuantity} games={games} MAX_CLIENTS={MAX_CLIENTS} MIN_CLIENTS={MIN_CLIENTS} />
                } 
            </div>
        </div>
    )
}
