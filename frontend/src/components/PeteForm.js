import { Link } from "react-router-dom"

import Radio from "./Radio"

import { Button, Form } from "react-bootstrap";

import { useTransition, useSpring, animated } from "react-spring";


export default function PeteForm({ whichRoutePete, handleSubmitPete, petePower, setPopForm, handleChangePetePower, handleChangeWhichRoutePete}) {
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
        <div className="">
            {transition2((style, item) =>
                <animated.div style={style} className="roleframe">
                    <p>
                        Now time to decide, You check flood risk information.
                        What is your decision? </p>
                    <Form onSubmit={handleSubmitPete} >
                        <Form.Group onChange={handleChangePetePower}>
                            <div className="gameQuestion">
                                <Form.Label htmlFor={`radio`}>You check flood risk indivation. What is your decision?</Form.Label>
                                <Radio label='Keep providing electricity service' name="questionPete2" value='poweron' required />
                                <Radio label='Shut down' name="questionPete2" value='poweroff' required />
                            </div>
                        </Form.Group>
                        {petePower === 'poweroff' &&
                            (
                            <Form.Group onChange={handleChangeWhichRoutePete}>
                                    <div className="gameQuestion2">
                                        <Form.Label htmlFor={`radio`}>Which way is your decision?</Form.Label>
                                        <Radio label='Route 1' name="questionNorman3" value="route1" required />
                                        <Radio label='Route 2' name="questionNorman3" value="route2" required />
                                        <Radio label='Route 3' name="questionNorman3" value="route3" required />
                                    </div>
                                </Form.Group>
                            )
                        }

                        <div className="buttons" style={{ margin: "15px 80px" }}><Button size="lg" type="submit">Submit</Button></div>
                    </Form>
                </animated.div>
            )}
        </div>
    )
}

