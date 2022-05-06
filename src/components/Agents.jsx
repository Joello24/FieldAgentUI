import {react, useEffect, useState} from 'react';
import AddAgentForm from "./AddAgentForm";
import Agent from "./Agent";

const SearchURL = "http://localhost:5000/api/agent/search/A";
const URL = "http://localhost:5000/api/agent";

const get = {
    method: "GET",
    headers: {
        "Accept": "application/json",
    },
};
const update = {
    method: "PUT",
    headers: {
        "Accept": "application/json",
    },
};
const add = {
    method: "POST",
    headers: {
        "Accept": "application/json",
    },
};
const remove = {
    method: "DELETE",
    headers: {
        "Accept": "application/json",
    },
};


function Agents(){

    const [agents, setAgents] = useState([]);

    const [token, setToken] = useState();

    useEffect(() => {
        getAgents();
            },[setAgents]);

    const login = () => {
        setToken(token);
        get.headers.append("Authorization", "Bearer " + token);
        update.headers.append("Authorization", "Bearer " + token);
        add.headers.append("Authorization", "Bearer " + token);
        remove.headers.append("Authorization", "Bearer " + token);
    };

    const getAgents = async () => {
        // get agents from database
        fetch(URL, get)
            .then(res => res.json())
            .then(data => {
                setAgents(data);
                console.log(data);
            })
            .catch(err => console.log(err));
    };

    const addAgent = (agent) => {
        // add agent to use state and update database
        const currentAgents = [...agents];
        const nextId = currentAgents.length + 1;
        agent.id = nextId;
        currentAgents.push(agent);
        setAgents(currentAgents);
        fetch(URL, add)
            .then(response => response.json())
            .then(data => {
                console.log(data);
            })
            .catch(error => console.log(error));
        console.log(agent);
    };

    const getAgent = (id) => {
        // get agent from database
        fetch(URL+"/"+id, get)
            .then(res => res.json())
            .then(data => {
                setAgents(data);
                console.log(data);
            })
            .catch(err => console.log(err));
    };

    const deleteAgent = (agent) => {
        // delete agent from use state and database
        const newAgents = agents.filter(agent => agent.id !== agent.id);
        setAgents(newAgents);
        fetch(URL + "/" + agent.id, remove)
            .then(res => res.json())
            .then(data => {
                console.log(data);
            })
            .catch(err => console.log(err));
    };

    const updateAgent = (updatedAgent) => {
        const newAgentList = [...agents];
        for (let i = 0; i < newAgentList.length; i++) {
            if (newAgentList[i].id === updatedAgent.id ) {
                newAgentList[i] = updatedAgent;
                break;
            }
        }

        setAgents(newAgentList);
    }

    return (
        <div className="container ">
            <div className="m-5 content-start border border-green-500 bg-green-50">
                <div className="m-auto text-black text-4xl text-bold text-center">
                    Agents
                </div>
                <p className="mx-2 font-semibold">
                </p>
                {/* Sort FBI Agents */}
                <div className="m-auto p-2 justify-center">
                    <label className="m-5 font-bold items-center text-center content-center rounded p-2"> Add Agent: </label>
                    <AddAgentForm submit={addAgent} />
                </div>
            </div>

            <div className="m-5 content-start border border-green-500 bg-green-50">
                <div  className="text-black text-4xl text-bold text-center m-2">
                    Results
                </div>
                {/* List Agents */}
                <ul>
                    <span className="flex inline-grid grid-cols-8 gap-2">
                    {agents.map(s => (
                        <Agent key={s.id} updateAgent={updateAgent} agent={s} delete={() => deleteAgent(s)}  />
                    ))}
                    </span>
                </ul>
            </div>
        </div>
    );
}
export default Agents;


