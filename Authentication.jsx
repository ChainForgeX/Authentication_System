import { useState } from "react";
import API from "../services/api";

function Auth() {

    const [name, setName] = useState("");

    const [email, setEmail] = useState("");

    const [password, setPassword] = useState("");

    const [token, setToken] = useState("");

    const [profile, setProfile] = useState(null);

    const registerUser = async() => {

        try{

            const response =
            await API.post(
                "/auth/register",
                {
                    name,
                    email,
                    password
                }
            );

            console.log(response.data);

            alert("Registration Successful");

        }
        catch(error){

            console.log(error);

        }

    };

    const loginUser = async() => {

        try{

            const response =
            await API.post(
                "/auth/login",
                {
                    email,
                    password
                }
            );

            setToken(
                response.data.token
            );

            localStorage.setItem(
                "token",
                response.data.token
            );

            alert("Login Successful");

        }
        catch(error){

            console.log(error);

        }

    };

    const loadProfile = async() => {

        try{

            const savedToken =
            localStorage.getItem(
                "token"
            );

            const response =
            await API.get(
                "/auth/profile",
                {
                    headers:{
                        Authorization:
                        `Bearer ${savedToken}`
                    }
                }
            );

            setProfile(
                response.data
            );

        }
        catch(error){

            console.log(error);

        }

    };

    const logout = () => {

        localStorage.removeItem(
            "token"
        );

        setToken("");

        setProfile(null);

        alert("Logged Out");

    };

    return(

        <div>

            <h1>
                Authentication System
            </h1>

            <hr/>

            <h2>
                Register
            </h2>

            <input
                type="text"
                placeholder="Name"
                value={name}
                onChange={(e)=>
                setName(e.target.value)}
            />

            <br/>
            <br/>

            <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e)=>
                setEmail(e.target.value)}
            />

            <br/>
            <br/>

            <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e)=>
                setPassword(e.target.value)}
            />

            <br/>
            <br/>

            <button
                onClick={registerUser}
            >
                Register
            </button>

            <hr/>

            <h2>
                Login
            </h2>

            <button
                onClick={loginUser}
            >
                Login
            </button>

            <hr/>

            <h2>
                Profile
            </h2>

            <button
                onClick={loadProfile}
            >
                Load Profile
            </button>

            <br/>
            <br/>

            {
                profile && (

                    <div>

                        <h3>
                            {profile.name}
                        </h3>

                        <p>
                            {profile.email}
                        </p>

                    </div>

                )
            }

            <hr/>

            <button
                onClick={logout}
            >
                Logout
            </button>

        </div>

    );

}

export default Auth;