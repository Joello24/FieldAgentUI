﻿import {useState} from "react";
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

        props.submit(agent);
    }

    return (
        <form onSubmit={handleSubmit}>
            <div className="py-2">
                <label className="mx-2" htmlFor="firstName">First Name</label>
                <input type="text" id="firstName" name="firstName" value={agent.firstName} onChange={handleChange} />
            </div>
            <div className="py-2">
                <label className="mx-2" htmlFor="lastName">Last Name</label>
                <input type="text" id="lastName" name="lastName" value={agent.lastName} onChange={handleChange} />
            </div>
            <div className="mx-2 py-2">
                <label className="py-1" htmlFor="datePicker">Date of birth</label>
                <DatePicker id="datePicker" name="datePicker"  value={agent.dateOfBirth}  onChange={handleChange} />
            </div>
            <div>
                <label htmlFor="height">Height</label>
                <select className="mx-2" id="height" name="height" value={agent.height} onChange={handleChange}>
                    <option value="">[Select Height]</option>
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
                <button className="my-5 mx-1 px-2 bg-green-500 hover:bg-red-600" type="submit">Add</button>
            </div>
        </form>
    )
}
export default AddAgentForm;
