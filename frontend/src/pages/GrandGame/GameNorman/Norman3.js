import { Link, useNavigate } from "react-router-dom"

import { useState, useEffect} from 'react'

import { HeartFill } from 'react-bootstrap-icons';
import { Form, Button, ProgressBar, Table } from "react-bootstrap";

import { useTransition, useSpring, animated } from "react-spring";



export default function Norman3({ step, handleSetStep, setStep, setRound, ericaHealth, petePower, peteHealth, whichRoute, normanStay, round, normanHealth, waterDepthEndupNorman, electricity}) {

    const [roundCount, setRoundCount] = useState(1)
    const [lastRound, setLastRound] =useState(4)

    const navigate = useNavigate();

    // useEffect(()=> {
    //     setInterval(()=> {
    //         navigate('/instruction')
    //     }, 5000)
    // }, [])

    const handleNextRound = () => {
        console.log('handleNextRound clicked')
        console.log('round: ', round)
        handleSetStep('step: ', step)
        console.log('step: ', step)
        // setStep(prev => prev + 1)
        // navigate('/grandgame')
    }

    // const handleNextRound2 = () => {
    //     console.log('handleNextRound clicked')
    //     handleSetRound()
    //     setStep(prev => prev + 1)
    //     setRound(prev => prev + 1)
    //     navigate('/grandgame')
    // }

    const transition = useTransition(true, {
        from: { x: 500, y: 0, opacity: 0 },
        enter: { x: 0, y: 0, opacity: 1 },
    });

    const transition2 = useTransition(true, {
        from: { x: 600, y: 0, opacity: 0 },
        enter: { x: 0, y: 0, opacity: 1 },
        config: {
            duration: 500 // duration for the whole animation form start to end
        }
    });


    // console.log("round: ", round)
    // console.log("normanStay: ", normanStay)
    // console.log("whichRoute: ", whichRoute)
    // console.log("normanHealth: ", normanHealth)
    // console.log("waterDepthEndupNorman: ", waterDepthEndupNorman)
    // console.log("electricity: ", electricity)

    return (
        <>
            <div className="gameUpperForm">
                {transition((style, item) =>
                    <animated.h2 style={style}>Round {round} Result</animated.h2>
                )}
            </div>
        <div className="resultWrapper">
            <div className="resultContainer">
                {transition2((style, item) =>
                    <animated.div style={style} className="resultLeft">
                        <div style={{ marginBottom: "1rem" }} className="personContainer">
                            <img src="/norman.png" alt="role_person_image" />
                        </div>
                        <h4>Your Decision: {normanStay === "stayon" ? <span>You stayed in your house</span> : <span>You went to {whichRoute}</span>}</h4>
                        <p>Water depth is reached to <span>{waterDepthEndupNorman} cm</span> </p>
                        {/* if stayed home*/}
                        {electricity === 'poweroff' && (
                            <p>There is <span>power outage </span>in your location.</p>
                        )}
                        {/* if left home*/}
                        {/* <p>There is congestion on Route A</p> */}
                        <p>Your wellbeing is <span>{normanHealth} </span></p>
                        { normanHealth !== 100  && <p></p>}
                        <div className="gameProgressBlock">
                            <ProgressBar now={normanHealth} style={{ fontSize: "1.1rem", height: "27px", backgroundColor: "black"}} variant="primary" label={normanHealth}/>
                            <div className="heartNorman"><HeartFill size={23} color="red" /></div>
                        </div>
                        <div className="buttons" style={{ margin: "15px 80px" }}><Button size="lg" onClick={() => handleSetStep()}>Next</Button></div>
                        {/* <div className="buttons" style={{ margin: "15px 80px" }}><Button size="lg" onClick={() => handleNextRound2()}>Next</Button></div> */}
                    </animated.div>
                )}
                {transition2((style, item) =>
                    <animated.div style={style} className="resultRight">
                        <h3>Players Summary</h3>
                        <Table striped bordered hover size="lg" responsive>
                            <thead>
                                <tr>
                                    <th>Player</th>
                                    <th>Decision</th>
                    
                                    <th>Current Score</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>Erica</td>
                                    <td>{ericaHealth > 85 ? <span>Under Control</span> : <span>Risky</span>}</td>
      
                                    <td>{ericaHealth}</td>
                                </tr>
                                <tr>
                                    <td>Pete</td>
                                    <td>{petePower === 'poweron' ? <span>Keep Power</span> : <span>Power Off</span>}</td>
             
                                    <td>{peteHealth}</td>
                                </tr>
                                <tr>
                                    <td>Norman A</td>
                                    <td>{normanStay === 'stayon' ? <span>Stayed</span> : <span>Went Out Road</span>}</td>
                              
                                    <td>{normanHealth}</td>
                                </tr>
                                <tr>
                                    <td>Norman B</td>
                                    <td>{normanStay === 'stayon' ? <span>Stayed</span> : <span>Went Out Road</span>}</td>
                        
                                    <td>{normanHealth}</td>
                                </tr>
                                <tr>
                                    <td>Norman C</td>
                                    <td>{normanStay === 'stayon' ? <span>Stayed</span> : <span>Went Out Road</span>}</td>
                         
                                    <td>{normanHealth}</td>
                                </tr>
                            </tbody>
                        </Table>
                    </animated.div>
                )}
            </div>
        </div>
        </>
    )
}
