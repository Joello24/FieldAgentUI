function Agent(props){
    return (
        <a
            className="block p-4 max-w-sm bg-white rounded-lg border border-gray-200 shadow-md hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{props.agent.id}</h5>
            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{props.agent.firstName} {props.agent.lastName}</h5>
            <p className="font-normal text-gray-700 dark:text-gray-400">{props.agent.dateOfBirth}</p>
            <p className="font-normal text-gray-700 dark:text-gray-400">{props.agent.height}"</p>
            <button onClick={props.delete} className="px-2 bg-red-400 hover:bg-red-600">Delete</button>
            <button onClick={props.updateAgent} className="mx-1 px-2 bg-green-400 hover:bg-green-500">Edit</button>
        </a>
    )
}
export default Agent;