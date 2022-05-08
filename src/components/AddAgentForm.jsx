import {useState} from "react";
import 'flowbite';
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

// AGENT FIELDS
//     "agentId"
//     "firstName"
//     "lastName"
//     "dateOfBirth"
//     "height"
//     "missionAgent"
//     "agencyAgent"
//     "alias"

const initialAgent = {
    firstName: "",
    lastName: "",
    dateOfBirth: "1/2/1994",
    height: "",
    alias: ""
};

function AddAgentForm(props){

    const [agent, setAgent] = useState(initialAgent);
    const [dateOfBirth, setDateOfBirth] = useState(new Date());
    const handleChange = function (evt) {
        let nextAgent = { ...agent };
        nextAgent[evt.target.name] = evt.target.value;
        setAgent(nextAgent);
        console.log(nextAgent);
    };

    function handleSubmit(evt) {
        evt.preventDefault();

        console.log("submitted!", agent);

        // if(dateOfBirth !== null && dateOfBirth !== undefined){
        //     agent.dateOfBirth = dateOfBirth;
        // }
        props.submit(agent);
    }

    return (
        <form hidden={props.hidden} onSubmit={handleSubmit}>
            <div className="py-1">
                <label className="" htmlFor="firstName">First Name</label>
                <input className={props.mini ? "w-20 h-5" : ""} type="text" id="firstName" name="firstName" value={agent.firstName} onChange={handleChange} />
            </div>
            <div className="py-1">
                <label className="" htmlFor="lastName">Last Name</label>
                <input className={props.mini ? "w-20 h-5" : ""} type="text" id="lastName" name="lastName" value={agent.lastName} onChange={handleChange} />
            </div>
            <div className="py-1">
                <label className="" htmlFor="dateOfBirth">Date of birth</label>
                <DatePicker className={props.mini ? "w-20 h-6" : ""} id="dateOfBirth" name="dateOfBirth"  value={agent.dateOfBirth}  onChange={(date) => setDateOfBirth(date)} />
            </div>
            <div className="py-1">
                <input className={props.mini ? "w-20 h-5" : ""} type="text" id="dateOfBirth" name="dateOfBirth" value={agent.dateOfBirth} onChange={handleChange} />
            </div>
            <div>
                <label htmlFor="height">Height</label>
                <select className="" id="height" name="height" value={agent.height} onChange={handleChange}>
                    <option value="">Height</option>
                    <option value="56">4'8"</option>
                    <option value="57">4'9"</option>
                    <option value="58">4'10"</option>
                    <option value="59">4'11"</option>
                    <option value="60">5'0"</option>
                    <option value="61">5'1"</option>
                    <option value="62">5'2"</option>
                    <option value="63">5'3"</option>
                    <option value="64">5'4"</option>
                    <option value="65">5'5"</option>
                    <option value="66">5'6"</option>
                    <option value="67">5'7"</option>
                    <option value="68">5'8"</option>
                    <option value="69">5'9"</option>
                    <option value="70">5'10"</option>
                    <option value="71">5'11"</option>
                    <option value="72">6'0"</option>
                    <option value="73">6'0"</option>
                    <option value="74">6'1"</option>
                    <option value="75">6'2"</option>
                    <option value="76">6'3"</option>
                    <option value="77">6'4"</option>
                    <option value="78">6'5"</option>
                    <option value="79">6'6"</option>
                    <option value="80">6'7"</option>
                    <option value="81">6'8"</option>
                    <option value="82">6'9"</option>
                    <option value="83">6'10"</option>
                </select>
            </div>

            <div>
                <button className="my-5 mx-1 px-2 bg-green-500 hover:bg-red-600" type="submit">✔</button>
            </div>
        </form>
    )
}
export default AddAgentForm;

