import {react, useEffect, useState} from 'react';
import AddAgentForm from "./AddAgentForm";
import Agent from "./Agent";

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

const remove = {
    method: "DELETE",
    headers: {
        "Accept": "application/json",
        "token" : "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2NTE4OTY3ODQsImlzcyI6Imh0dHA6Ly9sb2NhbGhvc3Q6MjAwMCIsImF1ZCI6Imh0dHA6Ly9sb2NhbGhvc3Q6MjAwMCJ9.b1ihrsINEVJ0qvm_-tIKYgi44a9dK5i9H00ezQyBF2g"
    },
};
const bearer = "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2NTE5NDg5MzksImlzcyI6Imh0dHA6Ly9sb2NhbGhvc3Q6MjAwMCIsImF1ZCI6Imh0dHA6Ly9sb2NhbGhvc3Q6MjAwMCJ9.LnBhkVIRulLNj8glegVs4z2kgbDtOFO1N0VMyaifE5k";

const SearchURL = "http://localhost:5000/api/agent/search/";

const init = {
    method: "GET",
    headers: {
        "Accept": "application/json",
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

function Agents(props){

    const [agents, setAgents] = useState([]);

    const [token, setToken] = useState();

    const [searchState, setSearchState] = useState("");
    const [searchResults, setSearchResults] = useState(SearchConfig);

    useEffect(() => {
        getAgents();
            },[setAgents]);


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
        // const nextId = Math.max(...currentAgents.map(m => m.agentId)) + 1;
        // agent.agentId = nextId;

        const day = agent.dateOfBirth.substring(0,2);
        const month = agent.dateOfBirth.substring(3,5);
        const year = agent.dateOfBirth.substring(6,10);
        const date = year + "-" + month + "-" + day;
        const addBody = JSON.stringify({
            "firstName": agent.firstName,
            "lastName": agent.lastName,
            "dateOfBirth": date+"T00:00:00",
            "height": agent.height.toString(),
        });
        const add = {
            method: "POST",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
            },
            body: addBody
        };

        function handle() {
            return fetch(URL, add)
                .then(response => {
                    if (response.status !== 200 && response.status !== 201) {
                        console.log(`Bad status: ${response.status}`);
                        return Promise.reject("response is not 200 OK");
                    }
                    return response.json();
                })
        };
        handle().then(data =>{
            console.log("in handle");
            console.log(data);
            agent = data;
            currentAgents.push(agent);
            setAgents(currentAgents);
            getAgents();
        });

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
        const token = props.getToken;
        setToken(token);
        const myHeaders = new Headers();
        myHeaders.append("Authorization", `Bearer ${props.token2}`);

        const requestOptions = {
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
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        myHeaders.append("Authorization", `Bearer ${props.token2}`);

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
            body: raw2,
            redirect: 'follow'
        };

        fetch("http://localhost:5000/api/agent", requestOptions)
            .then(response => {
                if (response.status !== 200 && response.status !== 201) {
                    console.log(`Bad status: ${response.status}`);
                    return Promise.reject("response is not 200 OK");
                }
                const newAgentList = [...agents];
                for (let i = 0; i < newAgentList.length; i++) {
                    if (newAgentList[i].agentId === updatedAgent.agentId ) {
                        newAgentList[i] = updatedAgent;
                        break;
                    }
                }
                setAgents(newAgentList);
                return response.json();
            })
            .then(json => console.log(json));

        // working, need to update list of agents here
    }
    const HandleAgentSearch = (evt) => {
        fetch(SearchURL+searchState, init)
            .then(response => response.json())
            .then(data => {
                setSearchResults(data);
            })
            .catch(error => console.log(error));
    };

    const HandleChange = (evt) => {
        console.log(evt.target.value);
        setSearchState(evt.target.value);
    }


    return (
        <div className="container ">
            {props.getToken}
            <div className="m-5 h-50 flex columns-3 border border-green-500 bg-green-50">
                <div className=" m-5 content-start border border-green-500 bg-green-50">
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
                    <div className="m-auto p-2 text-black text-4xl text-bold text-center">
                        Search
                    </div>
                    <p className="mx-2 font-semibold">
                        The FBI is a secret organization that is responsible for the investigation of crimes.
                    </p>

                    <div className="m-auto p-2 justify-center">
                        <label className="m-5 font-bold items-center text-center content-center rounded p-2"> Find Agent: </label>
                        <input onChange={HandleChange} id="fbiSearch" name="SearchData"  className="my-5 mx-1 bg-green-200" type="text" placeholder="Search" />
                        <button onClick={HandleAgentSearch} className="my-5 mx-1 px-2 bg-green-500 hover:bg-red-600"> Search </button>
                        {searchState.queryString}
                    </div>
                </div>
                <div className="overflow-scroll h-[23rem] m-5 content-start border border-green-500 bg-green-50">
                    <div  className="text-black text-4xl text-bold text-center">
                        Results
                    </div>
                    {/* List Agents */}
                    <ul className="">
                        {searchResults.length == 0 || !Array.isArray(searchResults) ?
                            <li>No Results</li> :
                            searchResults.map(s => (
                                <li key={s.agentId}>{s.firstName} {s.lastName} {s.dateOfBirth} {s.height}</li>
                            ))}
                    </ul>
                </div>
            </div>

            <div className="m-5 content-start border border-green-500 bg-green-50">
                <div  className="text-black text-4xl text-bold text-center m-2">
                    Agents
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


