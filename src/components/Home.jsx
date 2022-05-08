import {useEffect, useState} from "react";


const PensionURL = "http://localhost:5000/api/agent/pensionlist/";
const TopAgentsURL = "http://localhost:5000/api/agent/topagents";

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

function Home(){

    const [searchState, setSearchState] = useState("");
    const [searchResults, setSearchResults] = useState(SearchConfig);
    const [pensionResults, setPensionResults] = useState([]);
    const [pensionState, setPensionState] = useState(2);
    const [topAgents, setTopAgents] = useState([]);

    useEffect (() => {
        HandlePensionSearch();
    }, [setPensionResults],);


    const HandleTopAgentSearch = () => {
        fetch(TopAgentsURL, init)
            .then(response => response.json())
            .then(data => {
                setTopAgents(data);
            })
            .catch(error => console.log(error));
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

    const HandlePensionSearch = (evt) => {
        const url = PensionURL+pensionState;
        fetch(url, init)
            .then(response => response.json())
            .then(data => {
                setPensionResults(data);
            })
            .catch(error => console.log(error));
    }


    const HandlePensionChange = (evt) => {
        console.log(evt.target.value);
        setPensionState(evt.target.value);
        console.log("pension state: " + pensionState);
    }
  return (
    <div className="grid grid-cols-3">
        <div className="m-5 content-start border border-green-500 bg-green-50">
            <div className="m-auto p-2 text-black text-4xl text-bold text-center">
                Agents
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

        <div className="m-5 content-start border border-green-500 bg-green-50">
            <div  className="text-black text-4xl my-2 text-bold text-center">
                Pension
            </div>
            <p className="mx-5 font-semibold" >
                Pension list by agency
            </p>

            <div className="m-auto p-2 justify-center">
                <label className="m-5 font-bold items-center text-center content-center rounded p-2"> Agency ID: </label>
                <input onChange={HandlePensionChange} className="my-5 mx-1 bg-green-200" type="text" placeholder="Search" />
                <button onClick={HandlePensionSearch} className="my-5 mx-3 px-2 bg-green-500 hover:bg-red-600"> Search </button>
            </div>
        </div>
        <div className="m-5 content-start border border-green-500 bg-green-50">
            <div  className="text-black text-4xl my-2 text-bold text-center">
                Top Agents
            </div>
            <p className="mx-5 font-semibold" >
            </p>

            <div className="m-auto p-2 justify-center">
                <label className="m-5 font-bold items-center text-center content-center rounded p-2"> Find: </label>
                <button onClick={HandleTopAgentSearch} className="my-5 mx-3 px-2 bg-green-500 hover:bg-red-600"> Search </button>
            </div>
        </div>


        <div className="m-5 content-start border border-green-500 bg-green-50">
            <div  className="text-black text-4xl text-bold text-center">
                Results
            </div>
            {/* List Agents */}
            <ul>
                {searchResults.length == 0 || !Array.isArray(searchResults) ?
                    <li>No Results</li> :
                    searchResults.map(s => (
                    <li key={s.agentId}>{s.firstName} {s.lastName} {s.dateOfBirth} {s.height}</li>
                ))}
            </ul>
        </div>

        <div className="m-5 content-start border border-green-500 bg-green-50">
            <div  className="text-black text-4xl text-bold text-center">
                Pension Results
            </div>
            {/* List Agents */}
            <ul>
                {pensionResults.length == 0 || !Array.isArray(pensionResults) ?
                    <li>No Results</li> :
                    pensionResults.map(s => (
                        <li className="m-2" key={s.badgeId}> <div> Agency: {s.agencyName}</div> <div>Badge #: {s.badgeId}</div><div>Name: {s.nameLastFirst}</div><div>DOB: {s.dateOfBirth}</div> <div>Deactivation: {s.deactivationDate == undefined ?  "Active":s.deactivationDate  } </div></li>
                    ))}
            </ul>
        </div>
        <div className="m-5 content-start border border-green-500 bg-green-50">
            <div  className="text-black text-4xl text-bold text-center">
                Top Agents Results
            </div>
            {/* List Agents */}
            <ul>
                {topAgents.length == 0 || !Array.isArray(topAgents) ?
                    <li>No Results</li> :
                    topAgents.map(s => (
                        <li className="m-2" key={s.NameFirstLast}> <div>Name: {s.nameLastFirst}</div> <div>DOB: {s.dateOfBirth}</div> <div>Completed Missions: {s.completedMissionCount} </div></li>
                    ))}
            </ul>
        </div>
    </div>
  );
}
export default Home;