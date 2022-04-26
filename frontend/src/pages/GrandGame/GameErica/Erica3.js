import { Link } from "react-router-dom"

import { HeartFill } from 'react-bootstrap-icons';
import { Form, Button, ProgressBar, Table } from "react-bootstrap";

import { useTransition, useSpring, animated } from "react-spring";


export default function Erica3({ round, ericaHealth, ericaMessageForNorman, ericaMessageForPete }) {
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
                        <h3>Your Round Result</h3>
                        <div style={style} className="personContainer">
                            <img src="/erica.png" alt="role_person_image" />
                        </div>
                        <p>Your Message to Citizen: ...{ericaMessageForNorman}</p>
                        <p>Your Message to Pete: ... {ericaMessageForNorman}</p>
                        <p>Your Levl of Warning: ...{ericaMessageForPete}</p>
                        <p>Your Score: Your score as a city emergency manager is calcuated based on the whole citizen and Pete's performance on the last round.</p>
 
                            <p>Your Score: ...{}</p>
                        <div className="gameProgressBlock">
                            <ProgressBar now={ericaHealth} style={{ fontSize: "1.1rem", height: "27px", borderRadius: "5px 5px 0 0" }} variant="primary" label={`Score: ${ericaHealth} of 100`} />
                            <div className="heartNorman"><HeartFill size={23} color="red" /></div>
                        </div>
                    </animated.div>
                )}
                {transition2((style, item) =>
                    <animated.div style={style} className="resultRight">
                        <h3>Whole Player Summary</h3>
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
                                    <td>risk scale</td>
                                    <td>1</td>
                                    <td>90</td>
                                </tr>
                                <tr>
                                    <td>Pete</td>
                                    <td>Keep Power</td>
                                    <td>1</td>
                                    <td>80</td>
                                </tr>
                                <tr>
                                    <td>Norman A</td>
                                    <td>Keep Power</td>
                                    <td>1</td>
                                    <td>80</td>
                                </tr>
                                <tr>
                                    <td>Norman B</td>
                                    <td>Keep Power</td>
                                    <td>1</td>
                                    <td>80</td>
                                </tr>
                                <tr>
                                    <td>Norman C</td>
                                    <td>Keep Power</td>
                                    <td>1</td>
                                    <td>80</td>
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
