import { Link } from "react-router-dom"

import { Button} from "react-bootstrap";

import { useTransition, useSpring, animated } from "react-spring";


export default function EricaPopup({setPopup}) {
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
                    <div style={style} className="ericaPopupPerson">
                        <img src="/erica.png" alt="role_person_image" />
                        {/* <ProgressBar now={100} animated variant="primary" />
                        <div className="heartRole"><HeartFill size={24} color="red" /></div> */}
                    </div>
               
                    <p> Your task is to identify information on flood
                        risks and then communicate messages to
                        ordinary residents (Norman) and a power
                        utility manager (Pete)</p>
                    <div className="buttons" style={{ margin: "15px 80px" }}><Button size="lg" onClick={() => setPopup(false)}>Start</Button></div>
                </animated.div>
            )}
        </div>
    )
}
