import { Button, Input } from "@material-tailwind/react";
import { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import LandingHeader from "../../components/landingHeader";
import { logIN } from "../../services/authServices";
import {useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../../redux/actions/authActions";

const Login = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const dispatch = useDispatch()
    const currentUser = useSelector( (state) => state.auth.user)
    console.log("currentUser", currentUser)
    const loginAsync = async () => {
        if(email != '' && password != ''){
            await logIN(navigate,dispatch, email, password).then( (res) => {
                console.log("res", res)
                if(res) {
                    console.log("Successfully logged in")
                    dispatch(setUser(res))
                }
            }).catch( (e) => {
                console.log("Error Logging IN")
            })
        }else{
            console.log("Please enter a valid email and password")
        }
    }


    return(
        <>
            <LandingHeader></LandingHeader>
            <div className=" mt-28 min-h-full flex flex-col justify-center py-12 sm:px-6 lg:px-8">
                <div className="sm:mx-auto sm:w-full sm:max-w-md">
                    
                <h2 class="mt-6 text-center text-5xl font-extrabold text-gray-900">
                    Login
                </h2>
                <p className="mt-2 text-center text-md text-gray-600">Or <Link to="/auth/register">Register</Link></p>
                </div>

                <div class="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
                    <div class="bg-white py-8 px-4 shadow sm:rounded-lg sm-px-10">
                        <form>
                            <div className="mt-0">
                                <Input onChange={ (e) => setEmail(e.target.value)} type='email' label="Email" ></Input>
                            </div>
                            <div className="mt-6">
                                <Input onChange={ (e) => setPassword(e.target.value)} type='password' label="Password"></Input>
                            </div>
                            <div className="mt-6 text-center">
                                <Button onClick={loginAsync}>Login</Button>
                            </div>
                        </form>
                    </div>
                </div>


            </div>
        </>
    )
}

export default Login;