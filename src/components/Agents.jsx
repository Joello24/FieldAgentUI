﻿import {react, useEffect, useState} from 'react';
import AddAgentForm from "./AddAgentForm";

const SearchURL = "http://localhost:5000/api/agent/search/A";


const init = {
    method: "GET",
    headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
        "Access-Control-Allow-Origin": "*",
    },
};

const SearchConfig = [
    {"agentId": 71,
        "firstName": "Madelene",
        "lastName": "Wrout",
        "dateOfBirth": "1996-07-10T00:00:00",
        "height": 77.00,
        "missionAgent": null,
        "agencyAgent": null,
        "alias": null},
];

function Agents(){

    const [agents, setAgents] = useState([]);
    const [token, setToken] = useState();


    const addAgent = (agent) => {
        // add agent to use state and update database
        setAgents([...agents, agent]);
        console.log(agent);

    };
    return (
        <div className="container">
            <div className="m-5 content-start border border-black h-full">
                <div className="m-auto p-2 text-black text-4xl text-bold text-center">
                    Agents
                </div>
                <p className="mx-2 font-semibold">
                </p>
                {/* Sort FBI Agents */}
                <div className="m-auto p-2 justify-center">
                    <label className="m-5 font-bold items-center text-center content-center rounded p-2"> Add Agent: </label>
                    <AddAgentForm submit={addAgent} />
                    {/*<input onChange={HandleChange} id="fbiSearch" name="SearchData" value = {searchState.queryString}  className="my-5 mx-1 bg-green-200" type="text" placeholder="Search" />*/}
                    {/*<button onClick={HandleSearch} className="my-5 mx-1 px-2 bg-green-500 hover:bg-red-600"> Search </button>*/}
                    {/*{searchState.queryString}*/}
                </div>
            </div>

            <div className="py-2 m-5 content-start border border-black h-full">
                <div  className="text-black text-4xl text-bold text-center">
                    Results
                </div>
                {/* List Agents */}
                <ul>
                    {agents.map(s => (
                        <li key={s.agentId}>{s.firstName} {s.lastName} {s.dateOfBirth} {s.height}</li>
                    ))}
                </ul>
            </div>
        </div>
    );
}
export default Agents;

