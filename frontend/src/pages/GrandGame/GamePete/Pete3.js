import { Link, useNavigate } from "react-router-dom"

import { HeartFill } from 'react-bootstrap-icons';
import { Form, Button, ProgressBar, Table } from "react-bootstrap";

import { useTransition, useSpring, animated } from "react-spring";


export default function Pete3({ normanHealth, petePower, ericaHealth, round, peteHealth, whichRoutePete, electricity, normanStay, waterDepthEndupPete }) {
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

    const navigate = useNavigate();

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
                        <div style={style} className="personContainer">
                            <img src="/pete.png" alt="role_person_image" />
                        </div>
                        <h4>Your Decision: {petePower === "poweron" ? <span>You maintained the power in the city.</span> : <span>You turned off the power and went out to {whichRoutePete}</span>}</h4>
                        <p>Water depth reached {waterDepthEndupPete}cm in this round.</p>
                        {/* <p>There is no damage to the substation</p> */}
                        <p>Your performance is {peteHealth}...(customers suffered) </p>
                        <div className="gameProgressBlock">
                            <ProgressBar now={peteHealth} style={{ fontSize: "1.1rem", height: "27px", backgroundColor: 'black' }} variant="primary" label={peteHealth} />
                            <div className="heartNorman"><HeartFill size={23} color="red" /></div>
                        </div>
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
                                    <th># of Players</th>
                                    <th>Score</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>Erica</td>
                                    <td>{ericaHealth > 85 ? <span>Under Control</span> : <span>Risky</span>}</td>
                                    <td>1</td>
                                    <td>{ericaHealth}</td>
                                </tr>
                                <tr>
                                    <td>Pete</td>
                                    <td>{petePower === 'poweron' ? <span>Keep Power</span> : <span>Power Off</span>}</td>
                                    <td>1</td>
                                    <td>{peteHealth}</td>
                                </tr>
                                <tr>
                                    <td>Norman A</td>
                                    <td>{normanStay === 'stayon' ? <span>Stayed</span> : <span>Went Out Road</span>}</td>
                                    <td>1</td>
                                    <td>{normanHealth}</td>
                                </tr>
                                <tr>
                                    <td>Norman B</td>
                                    <td>{normanStay === 'stayon' ? <span>Stayed</span> : <span>Went Out Road</span>}</td>
                                    <td>1</td>
                                    <td>{normanHealth}</td>
                                </tr>
                                <tr>
                                    <td>Norman C</td>
                                    <td>{normanStay === 'stayon' ? <span>Stayed</span> : <span>Went Out Road</span>}</td>
                                    <td>1</td>
                                    <td>{normanHealth}</td>
                                </tr>
                            </tbody>
                        </Table>
                        <div className="buttons" style={{ margin: "15px 80px" }}><Button size="lg" onClick={() => navigate('/gameend')}>Next</Button></div>
                    </animated.div>
                )}
            </div>
        </div>
        </>
    )
}
