
import { createStore } from 'redux'

const initialState = {
    tasks: [],
    language: 'en'
}

const MOVE_TASK = "MOVE_TASK";
const ADD_TASK = "ADD_TASK"
const REMOVE_TASK = "REMOVE_TASK"
const CHANGE_TASK = "CHANGE_TASK"

const addTask = (id, task, column) => ({
    type: ADD_TASK,
    payload: { id, task, column }
});
const moveTask = (id, column, idNew, idOld, oldColumn) => ({
    type: MOVE_TASK,
    payload: { id, column, idNew, idOld, oldColumn }
});
const removeTask = (id) => ({
    type: REMOVE_TASK,
    payload: id
});
const changeTask = (id, newTask) => ({
    type: CHANGE_TASK,
    payload: {id, newTask}
})

const reducer = (state = initialState, action) => {
    switch(action.type){
        case ADD_TASK:
            return {
                ...state, 
                tasks: [...state.tasks, action.payload]
            }
        case MOVE_TASK:
            const reorderedTasks = [...state.tasks]
            const destinationIndex = action.payload.idNew
            const sourseIndex = action.payload.idOld

            const [removedTask] = reorderedTasks.splice(sourseIndex, 1)
            reorderedTasks.splice(destinationIndex, 0, removedTask)
            const newTasks = reorderedTasks.map((task) => task.id === action.payload.id ? {...task, column: action.payload.column || task.column} : task)
            return {
                ...state,
                tasks: newTasks
            }
        case REMOVE_TASK:
            return{
                ...state,
                tasks: state.tasks.filter(task => task.id !== action.payload)
            }
        case CHANGE_TASK:
            return{
                ...state, 
                tasks: state.tasks.map(task => task.id === action.payload.id ? {...task, task: action.payload.newTask} : task)
            }
        default:
            return state;
    }
}

const loadState = () => {
    try {
        const serializedState = localStorage.getItem('reduxState');
        if (serializedState === null) {
            return undefined;
        }
        return JSON.parse(serializedState);
    } catch (err) {
        return undefined;
    }
};

const saveState = (state) => {
    try {
        const serializedState = JSON.stringify(state);
        localStorage.setItem('reduxState', serializedState);
    } catch (err) {
        console.log(err)
    }
};

const persistedState = loadState();


const store = createStore(reducer, persistedState)

store.subscribe(() => {
    saveState(store.getState());
});
export {store, addTask, moveTask, removeTask, changeTask };