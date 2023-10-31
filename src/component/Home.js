import React from 'react'
import { Link } from "react-router-dom";
const Home = (props) => {
    return (
        <div>
            <h1>
                <Link to="/signup">SignUp </Link>
            </h1>
            <h1>
                <Link to="/login">Login </Link>
            </h1>
            <br />
            <br />

            <h2>{props.name ? `Welcome ${props.name}` : "Please Login"}</h2>
        </div>
    )
}

export default Home
