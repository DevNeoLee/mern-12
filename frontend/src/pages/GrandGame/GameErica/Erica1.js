
import { useState } from "react"

import { Link } from "react-router-dom"
import '../../../App.css'

import { BatteryCharging } from 'react-bootstrap-icons';
import { Form, Button, ProgressBar } from "react-bootstrap";

import { useTransition, useSpring, animated } from "react-spring";

export default function Erica1({ round }) {

    const transition = useTransition(true, {
        from: { x: 300, y: 0, opacity: 0 },
        enter: { x: 0, y: 0, opacity: 1 },
    });

    const transition2 = useTransition(true, {
        from: { x: 400, y: 0, opacity: 0 },
        enter: { x: 0, y: 0, opacity: 1 },
        config: {
            duration: 500 // duration for the whole animation form start to end
        }
    });

    return (
        <div className="gamecontainer">
            <div className="gameUpperForm">
                {transition((style, item) =>
                    <animated.h2 style={style}>Round {round} </animated.h2>
                )}
            </div>
            {transition2((style, item) =>
                <animated.div style={style} className="roleframe">
                    <div className="riskInfo">
                        <img src="/weathernews.jpg" />
                    </div>
                    <p>You see weather news.</p>
                    <p>You learn that a storm is fast approaching
                        to where you live.</p>
                    <p>There is a risk of flooding.</p>
                </animated.div>
            )}
        </div>
    )
}