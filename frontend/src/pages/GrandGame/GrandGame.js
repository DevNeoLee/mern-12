
import Erica0 from './GameErica/Erica0'
import Erica1 from './GameErica/Erica1'
import Erica2 from './GameErica/Erica2'
import Erica3 from './GameErica/Erica3'
import Erica4 from './GameErica/Erica4'

import Norman0 from './GameNorman/Norman0'
import Norman1 from './GameNorman/Norman1'
import Norman2 from './GameNorman/Norman2'
import Norman3 from './GameNorman/Norman3'
import Norman4 from './GameNorman/Norman4'
import Norman5 from './GameNorman/Norman5'

import Pete0 from './GamePete/Pete0'
import Pete1 from './GamePete/Pete1'
import Pete2 from './GamePete/Pete2'
import Pete3 from './GamePete/Pete3'

import Instruction from './Instruction'

import { Button } from "react-bootstrap";

import { Link } from "react-router-dom"

import { useEffect, useState } from 'react'

import io from 'socket.io-client'


export default function GrandGame() {
    // const roles = ['Erica', 'Pete', 'Norman']
    
    const [role, setRole] = useState('')
    const [pageQuantity, setPageQuantity] = useState(4)
    const [step, setStep] = useState(0) 
    
    const [socket, setSocket] = useState(null)

    const [round, setRound] = useState(1)
    const [user, setUser] = useState({
        role: '',
        ide: '',
        scores: [],
        round_completed: 0,
        final_score: 100,
    })
    
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
    const [resultReady, setResultReady] = useState(false)

    const [peteDecisions, setPeteDecisions] = useState([])
    const [normanDecisions, setNormanDecisions] = useState([])

    const [levelOfWarning, setLevelOfWarning] = useState('')
    const [messageToNorman, setMessageToNorman] = useState('')
    const [messageToPete, setMessageToPete] = useState('')
    const [messageFromErica, setMessageFromErica] = useState('')
    
    const [petePower, setPetePower] = useState(true)

    const [normanStay, setNormanStay] = useState(true)

    const [whichRoute, setWhichRoute] = useState("")

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

    


    const [electricity, setElectricity] = useState(true)

    const [ players, setPlayers ] = useState([])

    const normanRoles = ['NormanA', 'NormanB', 'NormanC'];

  

    // new WebSocket(`wss://${window.location.host}`)
    // console.log()

    useEffect(() => {
        console.log('grandGame page begins!')
    }, [])

    useEffect(() => {
        console.log("ericaMessage to norman:", messageToNorman)
        console.log("ericaMessage to pete:", messageToPete)

    }, [messageToNorman, messageToPete])

    useEffect(() => {
        console.log("City Power now on: ", electricity )
    }, [electricity])
   
    const connectToSocket = () => {
        //////Socket///////////////////////////////////////////////////////////////////
        const socket = io()
        setSocket(socket)
        console.log("socket connected: ", socket)

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

            setNormanDecisions(prev => (
                [...prev, {
                    stay: normanStay,
                    whichRoute: whichRoute
                }]
            ))
        }))

        socket.on("pete_message", (data => {
            console.log('Pete data from Pete received: ', data)

            setPeteDecisions(prev => (
                [...prev, petePower]
            ))

        }))
    }

    useEffect(()=>{
   
        connectToSocket()
        
        return () => {
            socket.close()
            console.log("socket closed: ")
        }
    }, [])
// },[setSocket])

    useEffect(() => {
        console.log("messages storage Erica: ", JSON.stringify(messagesStorageErica))
    }, [messagesStorageErica])

    useEffect(() => {
        handleRoleChange(role)
    }, [role])
    

    /////////////////////round complete dececion logic////////////////////
    useEffect(()=> {
        console.log('NormanDecisions: ',normanDecisions)
        console.log('PeteDecisions: ', peteDecisions)

        //만약 노만과 피터가 자료를 서로 보내줘서 두명의 자료가 모두 압데이트 되어 모두 null이 아니라면
        if ((normanDecisions[round - 1]) && (peteDecisions[round - 1])) {

            ////// calculate socres here///////

            ////// feed the date /////


            //// render result page /////
            
            setResultReady(true)
            console.log('!!!!!!!Now result Ready!!!!!!!')
            console.log("Two Decisions: " + "norman: " + normanDecisions + "pete: " + peteDecisions)
        } else {
            console.log("result page is not ready yet: " + 'NormanDecisions: ' + normanDecisions + 'PeteDecisions: ' + peteDecisions)
        }

    },[normanDecisions, peteDecisions])




    const calculateScore = (normanS, ericaS, peteS) => {
        
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
           [...prev, petePower]
        ))

        setElectricity(petePower)
        // setPetePower(true)

        // socket interaction
        socket.emit('pete_message', petePower)
    }

    const handleChangePetePower = (e) => {
        setPetePower(e.target.value)
        console.log('pete power: ', e.target.value)

    }

    //Norman handles
    const handleSubmitNorman = (e) => {
        console.log('Norman just submitted his form:')
        e.preventDefault()

        console.log("norman stay: " + normanStay + "which route: " + whichRoute)

        setNormanDecisions(prev => (
            [...prev, {stay: normanStay,
            whichRoute: whichRoute}]
        ))
        // setNormanStay(true)
        // setWhichRoute('')
        
        const normanData = {
            normanStay, whichRoute
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
        console.log('erica just submitted her messages:')
        e.preventDefault()

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
        <Erica1 step={step}/>,
        <Erica2 setWaitPopupErica={setWaitPopupErica} waitPopupErica={waitPopupErica} handleSubmitErica={handleSubmitErica} round={round} handleChangeWarning={handleChangeWarning} handleChangeMessageToNorman={handleChangeMessageToNorman} handleChangeMessageToPete={handleChangeMessageToPete} levelOfWarning={levelOfWarning} messageToPete={messageToPete} messageToNorman={messageToNorman} ericaHealth={ericaHealth} players={players}/>,
        <Erica3 step={step} ericaHealth={ericaHealth}/>,
        <Erica4 step={step} ericaHealth={ericaHealth}/>
    ];
    
    const normans = [
        <Norman0 step={step} />,
        <Norman1 step={step} />,
        <Norman2 step={step} handleChangeWhichRoute={handleChangeWhichRoute} normanStay={normanStay} handleSubmitNorman={handleSubmitNorman} handleChangeNormanStay={handleChangeNormanStay} popForm={popForm} setPopForm={setPopForm} round={round} electricity={electricity} normanQuestion={normanQuestion} normanHealth={normanHealth} messageToNorman={messageToNorman} role={role} messageFromErica = { messageFromErica}/>,
        <Norman3 step={step} normanHealth={normanHealth}/>,
        <Norman4 step={step} />,
        <Norman5 step={step} />
    ];
    
    const petes = [
        <Pete0 step={step} />,
        <Pete1 step={step} />,
        <Pete2 step={step} handleChangePetePower={handleChangePetePower} handleSubmitPete={handleSubmitPete} popForm={popForm} setPopForm={setPopForm} round={round} electricity={electricity} normanQuestion={normanQuestion} peteHealth={peteHealth} messageToPete={messageToPete} messageFromErica={messageFromErica}/>,
        <Pete3 step={step} peteHealth={peteHealth}/>
    ];
    
    const Buttons = () => (
        <section className='buttons' >
            {step > 0 && (
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
            )}
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
            { role ?
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
                    <Instruction giveRoleRandomly={giveRoleRandomly} setRole={setRole} normans={normanRoles}/>
            }
            </div>
        </div>
    )
}
