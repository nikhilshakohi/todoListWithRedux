//For getting a id which is greater than all defined todo ID's
//If todos has no elements, it returns ( (-1) + 1)
let getID = (todos) => {
    //The below function is similar to 
    //todos.reduce(checkID, -1, todoID); //Passing (-1, todoID) as parameters to checkID()
    //checkID = (maxID, todoID) => {return Math.max(maxID, todoID);}
    const maxID = todos.reduce((maxID, todo) => { return Math.max(maxID, todo.id) }, -1);
    return maxID + 1;
}

//InitialState of todos list and filter type
let initialState = {
    todos: [],
    filter: 'NO_ITEMS'
}

//Reducer Function
//We call this function from store.dispatch(action)
//This will update and return the new state
//Method-1: Current Method
    //We created a reducer function
    //Added that reducer function into createStore()
//Method-2: Method for Multiple reducers
    //We use createSlice for multiple reducer functions (as const myFirstReducer = createSlice(state,action)=>{}....)
    //..and add all those into single rootReducer using combineReducer()
    //and add that root reducer into store using configureStore()
export const myReducer = (state = initialState, action) => {
    switch (action.type) {
        /*Add Todo object into the state.todos*/
        case 'ADD_TODO': {
            return {
                ...state,
                filter: 'SHOW_ALL',
                todos: [
                    ...state.todos,
                    {
                        id: getID(state.todos),
                        title: action.payload,
                        completed: false
                    }
                ]
            }
            
        }   
        /*Delete specific Todo object from state.todos*/
        case 'DELETE_TODO': {
            return {
                ...state,
                todos: state.todos.filter((todo) => {
                    return todo.id !== action.payload;
                }),
                filter: state.todos.length < 2 ? 'NO_ITEMS' : 'SHOW_ALL'
            }
        }
        /*Complete or Redo specific Todo*/
        case 'TOGGLE_TODO': {
            return {
                ...state,
                todos:
                    state.todos.map((todo) => {
                        return todo.id === action.payload ? { ...todo, completed: !todo.completed } : { ...todo };
                    })
            }
        }
        /*Edit Todo title*/
        case 'UPDATE_TODO': {
            return {
                ...state,
                todos:
                    state.todos.map((todo) => {
                        return todo.id === action.payload.id ? { ...todo, title: action.payload.title } : {...todo};
                    })
            }
        }
        /*Edit filter type in state.filter*/
        case 'FILTER_TODO': {
            return {
                ...state,
                filter: action.payload,
            }
        }
        default:
            return state;
    }
}