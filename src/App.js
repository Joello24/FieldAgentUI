import Missions from "./components/Missions";
import Header from "./components/Header";
import Home from "./components/Home";
import Agents from "./components/Agents";
import {
    BrowserRouter,
    Routes,
    Route,
    Link,
    Navigate,
} from "react-router-dom";
import Login from "./components/Login";
import {useState} from "react";
import {root} from "postcss";

const loginUrl = "http://localhost:5000/api/auth/login";
const loginHeader = {
    method: "POST",
    headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
    },
};
let savedToken = "";
function App() {

    const [token, setToken] = useState();
    const [loggedIn, setLoggedIn] = useState(false);

    const handleLogin = (login) => {
        const loginInput = JSON.stringify({
            "UserName": login.UserName,
            "Password": login.Password
        });
        const req = {
            method: "POST",
            headers: {
                "Accept": "*/*",
                "Accept-Encoding": "gzip, deflate, br",
                "Content-Type": "application/json",
            },
            body: loginInput,
        };
        fetch("http://localhost:5000/api/auth/login", req)
            .then(response => {
                if (response.status !== 200) {
                    console.log(`Bad status: ${response.status}`);
                    return Promise.reject("response is not 200 OK");
                }
                setLoggedIn(true);
                return response.json();
            })
            .then(json => {
                savedToken = json.token;
                console.log("Saved")
                console.log(savedToken);
                setToken(json.token);
                console.log("Returned")
                console.log(json.token);
            })
    }

    if(!token) {
        return <Login login ={handleLogin} />
    }


    return (
        <BrowserRouter>
            <Header/>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="missions/*" element={<Missions />} />
                <Route path="agents/*" element={<Agents token2={token} loggedIn={loggedIn} />} />
                <Route path="login/*" element={loggedIn ? <Navigate to="/" /> : <Login login={handleLogin} />} >
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

export default App;
