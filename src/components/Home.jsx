import {useState} from "react";

const SearchURL = "http://localhost:5000/api/agent/search/A";

const init = {
    method: "GET",
    headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
        "Access-Control-Allow-Origin": "*",
    },
};

const CONFIG = {
  "api": {
    "url": "http://localhost:8080/api/v1"
  },
  "queryString": "Adam"
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

    const [searchState, setSearchState] = useState(CONFIG);
    const [searchResults, setSearchResults] = useState(SearchConfig);

    const HandleSearch = (evt) => {
        console.log(searchState.queryString);
        fetch(SearchURL, init)
            .then(response => response.json())
            .then(data => {
                setSearchResults(data);
            })
            .catch(error => console.log(error));
    };

    const HandleChange = (evt) => {
        console.log(evt.target.value);
        setSearchState({
            ...searchState,
            queryString: evt.target.value
        });
    }
  return (
    <div className="grid grid-cols-3">
        <div className="m-5 content-start border border-black h-full">
            <div className="m-auto p-2 text-black text-4xl text-bold text-center">
                FBI
            </div>
            <p className="mx-2 font-semibold">
                The FBI is a secret organization that is responsible for the investigation of crimes.
            </p>
        {/* Sort FBI Agents */}
            <div className="m-auto p-2 justify-center">
                <label className="m-5 font-bold items-center text-center content-center rounded p-2"> Find Agent: </label>
                <input onChange={HandleChange} id="fbiSearch" name="SearchData" value = {searchState.queryString}  className="my-5 mx-1 bg-green-200" type="text" placeholder="Search" />
                <button onClick={HandleSearch} className="my-5 mx-1 px-2 bg-green-500 hover:bg-red-600"> Search </button>
                {searchState.queryString}
            </div>
        </div>

        <div className="m-5 content-start border border-black h-full">
            <div  className="text-black text-4xl text-bold text-center">
                CIA
            </div>
            <p className="mx-2 font-semibold" >
                The FBI is a secret organization that is responsible for the investigation of crimes.
            </p>
            {/* Sort FBI Agents */}
            <div className="m-auto p-2 justify-center">
                <label className="m-5 font-bold items-center text-center content-center rounded p-2"> Find Agent: </label>
                <input className="my-5 mx-1 bg-green-200" type="text" placeholder="Search" />
                <button onClick={HandleSearch} className="my-5 mx-1 px-2 bg-green-500 hover:bg-red-600"> Search </button>

            </div>
        </div>
        <div className="m-5 content-start border border-black h-full">
            <div  className="text-black text-4xl text-bold text-center">
                NSA
            </div>
            <p className="mx-2 font-semibold">
                The FBI is a secret organization that is responsible for the investigation of crimes.
            </p>
            {/* Sort FBI Agents */}
            <div className="m-auto p-2 justify-center">
                <label className="m-5 font-bold items-center text-center content-center rounded p-2"> Find Agent: </label>
                <input className="my-5 mx-1 bg-green-200" type="text" placeholder="Search" />
                <button onClick={HandleSearch} className="my-5 mx-1 px-2 bg-green-500 hover:bg-red-600"> Search </button>
            </div>
        </div>


        <div className="py-2 m-5 content-start border border-black h-full">
            <div  className="text-black text-4xl text-bold text-center">
                Results
            </div>
            {/* List Agents */}
            <ul>
                {searchResults.map(s => (
                    <li key={s.agentId}>{s.firstName} {s.lastName} {s.dateOfBirth} {s.height}</li>
                ))}
            </ul>
        </div>
    </div>
  );
}
export default Home;