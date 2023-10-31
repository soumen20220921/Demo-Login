import React, { useState } from 'react'
import { signInWithEmailAndPassword } from "firebase/auth"
import { auth } from "../Firebase"
import { useNavigate } from 'react-router-dom'
const Login = () => {

    const navigate = useNavigate();
    const [values, setValues] = useState({
        email: "",
        password: "",
    });
    const [errorMsg, setErrorMsg] = useState("")
    const [btnDisabled, setBtnDisabled] = useState(false)

    const handleSubmition = () => {
        if (!values.email || !values.password) {
            setErrorMsg("Enter all fields.")
            return;
        }
        setErrorMsg("")
        // console.log(values);
        setBtnDisabled(true)
        signInWithEmailAndPassword(auth, values.email, values.password).then(
            async (res) => {
                setBtnDisabled(false)

                // console.log(user)
                navigate("/");
            })
            .catch(err => setErrorMsg(err.message))
        setBtnDisabled(false)
    }
    return (
        <div>
            <label>Email</label>
            <input type="email" placeholder='Enter Email'
                onChange={(event) =>
                    setValues((prev) => ({ ...prev, email: event.target.value }))
                } />
            <label>Password</label>
            <input type="password" placeholder='Enter password'
                onChange={(event) =>
                    setValues((prev) => ({ ...prev, password: event.target.value }))
                } />
            <br />
            <br />
            <b>{errorMsg}</b>
            <button disabled={btnDisabled} onClick={handleSubmition} >Login</button>
        </div>
    )
}

export default Login
