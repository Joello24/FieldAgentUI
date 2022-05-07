import {useState} from "react";
import AddAgentForm from "./AddAgentForm";

function Agent(props){

    const [isEditing, setIsEditing] = useState(false);
    const [edit, setEdit] = useState("");

    const setEditMode = () => {
        if(isEditing == false)
            setIsEditing(true);
        else
            setIsEditing(false);
    }
    const confirmEdit = (newAgent) => {
        setIsEditing(false);
        newAgent.agentId = props.agent.agentId;

        props.updateAgent(newAgent);
    }
    return (
        <a
            className="block p-4 max-w-sm bg-white rounded-lg border border-gray-200 shadow-md hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
            <h5 hidden={true} className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{props.agent.agentId}</h5>
            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{props.agent.firstName} {props.agent.lastName}</h5>
            <p className="font-normal text-gray-700 dark:text-gray-400 bg-green-200">DOB: {props.agent.dateOfBirth.slice(0,10)}</p>
            <p className="font-normal my-1 text-gray-700 dark:text-gray-400 bg-green-200">Height: {props.agent.height}"</p>
            <button onClick={props.delete} className="px-2 bg-red-400 hover:bg-red-600">Delete</button>
            <button hidden={isEditing} onClick={setEditMode} className="mx-1 px-2 bg-green-400 hover:bg-green-500">Edit</button>
            <button hidden={!isEditing} onClick={confirmEdit} className="mx-1 px-2 bg-green-400 hover:bg-green-500">Okay</button>
            <AddAgentForm hidden={!isEditing} submit={confirmEdit} mini = {true}/>
        </a>
    )
}
export default Agent;