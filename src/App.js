import Missions from "./components/Missions";
import Header from "./components/Header";
import Home from "./components/Home";
import Agents from "./components/Agents";
import {
    BrowserRouter,
    Routes,
    Route,
    Link,
} from "react-router-dom";
import Login from "./components/Login";
import {useState} from "react";

const loginUrl = "http://localhost:5000/api/auth/login";
const loginHeader = {
    method: "POST",
    headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
    },
};
function App() {

    const [token, setToken] = useState('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2NTE4OTY3ODQsImlzcyI6Imh0dHA6Ly9sb2NhbGhvc3Q6MjAwMCIsImF1ZCI6Imh0dHA6Ly9sb2NhbGhvc3Q6MjAwMCJ9.b1ihrsINEVJ0qvm_-tIKYgi44a9dK5i9H00ezQyBF2g');

    const handleLogin = (login) => {
        // const loginConfig = {
        //     ...loginHeader,
        //     body: JSON.stringify(login)
        // };
        // const newToken = getToken(loginConfig).token;
        // setToken(newToken);

        var myHeaders = new Headers();
        myHeaders.append("Accept", "application/json");

        var raw = JSON.stringify({
            UserName: "sa",
            Password: "abc@123"
        });

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
        };

        fetch("http://localhost:5000/api/auth/login", requestOptions)
            .then(response => response.text())
            .then(result => console.log(result))
            .catch(error => console.log('error', error));

    }

    const getToken = (login) => {
        fetch(loginUrl, loginHeader)
            .then(response => {
                if (response.status !== 200) {
                    console.log(`Bad status: ${response.status}`);
                    return Promise.reject("response is not 200 OK");
                }
                return response.json();
            })
            .then(json => console.log(json));

    }

    return (
        <BrowserRouter>
            <Header/>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="missions/*" element={<Missions />} />
                <Route path="agents/*" element={<Agents token={token} />} />
                <Route path="login/*" element={<Login login={handleLogin} />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
