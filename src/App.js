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

function App() {
    return (
        <BrowserRouter>
            <Header/>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="missions/*" element={<Missions />} />
                <Route path="agents/*" element={<Agents />} />
                <Route path="login/*" element={<Login />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
