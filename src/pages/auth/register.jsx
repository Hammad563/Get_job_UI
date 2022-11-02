import { Button, Input } from "@material-tailwind/react";
import { useState } from "react";
import { Link } from "react-router-dom";
import LandingHeader from "../../components/landingHeader";

const Register = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    return(
        <>
            <LandingHeader></LandingHeader>
            <div className=" mt-28 min-h-full flex flex-col justify-center py-12 sm:px-6 lg:px-8">
                <div className="sm:mx-auto sm:w-full sm:max-w-md">
                    
                <h2 class="mt-6 text-center text-5xl font-extrabold text-gray-900">
                    Register
                </h2>
                <p className="mt-2 text-center text-md text-gray-600">Already have an account? <Link to="/auth/login">Login</Link></p>
                </div>

                <div class="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
                    <div class="bg-white py-8 px-4 shadow sm:rounded-lg sm-px-10">
                        <form>
                        <div className="mt-0">
                                <Input onChange={ (e) => setEmail(e.target.value)} label="First Name" ></Input>
                            </div>
                            <div className="mt-6">
                                <Input onChange={ (e) => setEmail(e.target.value)} label="Last Name" ></Input>
                            </div>
                            <div className="mt-6">
                                <Input onChange={ (e) => setEmail(e.target.value)} type='email' label="Email" ></Input>
                            </div>
                            <div className="mt-6">
                                <Input onChange={ (e) => setPassword(e.target.value)} type='password' label="Password"></Input>
                            </div>
                            <div className="mt-6 text-center">
                                <Button>Register</Button>
                            </div>
                        </form>
                    </div>
                </div>


            </div>
        </>
    )
}

export default Register;