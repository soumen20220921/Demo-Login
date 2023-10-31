import React, { useState } from 'react'
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth"
import { auth } from "../Firebase"
import { useNavigate } from 'react-router-dom'
const Signup = () => {
    const navigate = useNavigate();
    const [values, setValues] = useState({
        name: "",
        email: "",
        password: "",
    });
    const [errorMsg, setErrorMsg] = useState("")
    const [btnDisabled, setBtnDisabled] = useState(false)

    const handleSubmition = () => {
        if (!values.name || !values.email || !values.password) {
            setErrorMsg("Enter all fields.")
            return;
        }
        setErrorMsg("")
        // console.log(values);
        setBtnDisabled(true)
        createUserWithEmailAndPassword(auth, values.email, values.password).then(
            async (res) => {
                setBtnDisabled(false)
                const user = res.user;
                await updateProfile(user, {
                    displayName: values.name,
                })
                // console.log(user)
                navigate("/");
            })
            .catch(err => setErrorMsg(err.message))
        setBtnDisabled(false)
    }
    return (
        <div>
            <label>Name</label>
            <input type="text" placeholder='Enter Name' onChange={(event) =>
                setValues((prev) => ({ ...prev, name: event.target.value }))
            } />
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
            <button disabled={btnDisabled} onClick={handleSubmition}>Login</button>
        </div>
    )
}

export default Signup
