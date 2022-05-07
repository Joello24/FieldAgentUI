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
        "token" : "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2NTE4OTY3ODQsImlzcyI6Imh0dHA6Ly9sb2NhbGhvc3Q6MjAwMCIsImF1ZCI6Imh0dHA6Ly9sb2NhbGhvc3Q6MjAwMCJ9.b1ihrsINEVJ0qvm_-tIKYgi44a9dK5i9H00ezQyBF2g"
    },
};


function Agents(props){

    const [agents, setAgents] = useState([]);


    useEffect(() => {
        getAgents();
            },[setAgents]);

    const login = () => {
        get.headers.append("Authorization", "Bearer " + props.token);
        update.headers.append("Authorization", "Bearer " + props.token);
        add.headers.append("Authorization", "Bearer " + props.token);
        remove.headers.append("Authorization", "Bearer " + props.token);
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
        var myHeaders = new Headers();
        myHeaders.append("Authorization", "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2NTE4OTg0MjMsImlzcyI6Imh0dHA6Ly9sb2NhbGhvc3Q6MjAwMCIsImF1ZCI6Imh0dHA6Ly9sb2NhbGhvc3Q6MjAwMCJ9.XhiljjRMfGmb2oinm8o--gc-DQq4wkvGxZR40DmJUaA");

        var requestOptions = {
            method: 'DELETE',
            headers: myHeaders,
            redirect: 'follow'
        };
        const url = `http://localhost:5000/api/agent/${agent.agentId}`;
        fetch(url, requestOptions)
            .then(response => {
                if (response.status !== 200) {
                    console.log(`Bad status: ${response.status}`);
                    return Promise.reject("response is not 200 OK");
                }
                UpdateResults(agent);
                return response.json();
            })
            .then(json => console.log(json));
    };

    const UpdateResults = (agent) => {
        // update use state after deletion
        const currentAgents = [...agents];
        const index = currentAgents.indexOf(agent);
        currentAgents.splice(index, 1);
        setAgents(currentAgents);
    };
    const updateAgent = (updatedAgent) => {

        // const myHeaders = new Headers();
        // myHeaders.append("Authorization", "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2NTE4OTg0MjMsImlzcyI6Imh0dHA6Ly9sb2NhbGhvc3Q6MjAwMCIsImF1ZCI6Imh0dHA6Ly9sb2NhbGhvc3Q6MjAwMCJ9.XhiljjRMfGmb2oinm8o--gc-DQq4wkvGxZR40DmJUaA");
        //
        // myHeaders.append("Content-Type", "application/json");
        //
        // const raw = JSON.stringify(updatedAgent);
        //
        // const requestOptions = {
        //     method: 'PUT',
        //     headers: myHeaders,
        //     body: raw,
        //     redirect: 'follow'
        // };
        //
        // fetch(URL, requestOptions)
        //     .then(response => {
        //         if (response.status !== 200) {
        //             console.log(`Bad status: ${response.status}`);
        //             return Promise.reject("response is not 200 OK");
        //         }
        //         const newAgentList = [...agents];
        //         for (let i = 0; i < newAgentList.length; i++) {
        //             if (newAgentList[i].agentId === updatedAgent.agentId ) {
        //                 newAgentList[i] = updatedAgent;
        //                 break;
        //             }
        //         }
        //         setAgents(newAgentList);
        //         return response.json();
        //     })
        //     .then(json => console.log(json));
        const myHeaders = new Headers();
        myHeaders.append("Authorization", "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2NTE5MDUyMjEsImlzcyI6Imh0dHA6Ly9sb2NhbGhvc3Q6MjAwMCIsImF1ZCI6Imh0dHA6Ly9sb2NhbGhvc3Q6MjAwMCJ9.vxK7RzdL7AxchV6fAGc6ZXV9815li-11Wh1k9fb_HSs");
        myHeaders.append("Content-Type", "application/json");

        // working
        const raw = JSON.stringify({
            "agentId": "5",
            "firstName": "NEWNEWNewNEfdsfdsaaWNewJim",
            "lastName": "Halpfdasfsaert",
            "dateOfBirth": "1995-01-01T00:00:00",
            "height": 72,
            "alias": ""
        });

        // WORKING WITH HARD-CODED Date of Birth
        const raw2 = JSON.stringify({
            "agentId": updatedAgent.agentId.toString(),
            "firstName": updatedAgent.firstName,
            "lastName": updatedAgent.lastName,
            "dateOfBirth": "1995-01-01T00:00:00",
            "height": updatedAgent.height.toString(),
            "alias": ""
        });
        const requestOptions = {
            method: 'PUT',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        fetch("http://localhost:5000/api/agent", requestOptions)
            .then(response => response.text())
            .then(result => console.log(result))
            .catch(error => console.log('error', error));
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
                    <span className="flex inline-grid grid-cols-8 mx-2 gap-2">
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


