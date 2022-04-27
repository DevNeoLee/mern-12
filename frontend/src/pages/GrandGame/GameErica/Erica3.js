import { Link, useNavigate } from "react-router-dom"

import { HeartFill } from 'react-bootstrap-icons';
import { Form, Button, ProgressBar, Table } from "react-bootstrap";

import { useTransition, animated } from "react-spring";


export default function Erica3({ petePower, round, ericaHealth, peteHealth, normanHealth, normanStay, messagesStorageErica }) {
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
                            <img src="/erica.png" alt="role_person_image" />
                        </div>
                        <p>Your Message to Citizen: {messagesStorageErica[`round${round}`].toNorman }</p>
                        <p>Your Message to Pete: {messagesStorageErica[`round${round}`].toPete}</p>
                        <p>Your Levl of Warning: {messagesStorageErica[`round${round}`].levelOfWarning}</p>
                        <p>Your Score: Your score as a city emergency manager is calcuated based on the whole citizen and Pete's performance on the last round.</p>
 
                        <p>Your Score: {ericaHealth}</p>
                        <div className="gameProgressBlock">
                            <ProgressBar now={ericaHealth} style={{ fontSize: "1.1rem", height: "27px", backgroundColor: 'black'  }} variant="primary" label={ericaHealth} />
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
                                    <td>{ericaHealth && ericaHealth > 85 ?  <span>Under Control</span> : <span>Risky</span>}</td>
                                    <td>1</td>
                                    <td>{ericaHealth}</td>
                                </tr>
                                <tr>
                                    <td>Pete</td>
                                    <td>{petePower && petePower === 'poweron' ? <span>Keep Power</span> : <span>Power Off</span>}</td>
                                    <td>1</td>
                                    <td>{peteHealth}</td>
                                </tr>
                                <tr>
                                    <td>Norman A</td>
                                    <td>{normanStay && normanStay === 'stayon' ? <span>Stayed</span> : <span>Went Out Road</span>}</td>
                                    <td>1</td>
                                    <td>{normanHealth}</td>
                                </tr>
                                <tr>
                                    <td>Norman B</td>
                                    <td>{normanStay && normanStay === 'stayon' ? <span>Stayed</span> : <span>Went Out Road</span>}</td>
                                    <td>1</td>
                                    <td>{normanHealth}</td>
                                </tr>
                                <tr>
                                    <td>Norman C</td>
                                    <td>{normanStay && normanStay === 'stayon' ? <span>Stayed</span> : <span>Went Out Road</span>}</td>
                                    <td>1</td>
                                    <td>{normanHealth}</td>
                                </tr>
                            </tbody>
                        </Table>
                        <Link to="/gameend"><Button size="lg" style={{ fontSize: "1.3rem" }}>Next</Button></Link>

                        {/* <div className="buttons" style={{ margin: "15px 80px" }}><Button size="lg" onClick={() => navigate('/gameend')}>Next</Button></div> */}
                    </animated.div>
                )}
            </div>
        </div>
        </>
    )
}
