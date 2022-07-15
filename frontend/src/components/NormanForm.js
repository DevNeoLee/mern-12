import { Link } from "react-router-dom"

import { useState } from 'react'

import Radio from "./Radio"

import { Button, Form } from "react-bootstrap";

import { useTransition, animated } from "react-spring";


export default function NormanForm({ handleSubmitNorman, handleChangeWhichRoute, normanStay, handleChangeNormanStay, setPopForm}) {

    const [stay, setStay] = useState(false);

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

    const handleStay = () => {

    }

    return (
        <div className="">
            {transition2((style, item) =>
                <animated.div style={style} className="roleframe">
                    <p>
                        Now time to decide, you check flood risk information.
                        What is your decision?</p>
                    <Form onSubmit={handleSubmitNorman} >
                        <Form.Group onChange={handleChangeNormanStay}>
                            <div className="gameQuestion">
                                <Form.Label htmlFor={`radio`}>You check flood risk indivation. What is your decision?</Form.Label>
                                <Radio label='Stay' name="questionNorman2" value='stayon' required/>
                                <Radio label='Evacuate' name="questionNorman2" value='stayoff' required/>
                            </div>
                        </Form.Group>
                            {normanStay === 'stayoff' && 
                            (
                                <Form.Group onChange={handleChangeWhichRoute}>
                                    <div className="gameQuestion2">
                                        <Form.Label htmlFor={`radio`}>Which way is your decision?</Form.Label>
                                        <Radio label='Route 1' name="questionNorman3" value="route1" required/>
                                        <Radio label='Route 2' name="questionNorman3" value="route2" required/>
                                        <Radio label='Route 3' name="questionNorman3" value="route3" required/>
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

                