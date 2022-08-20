//	In this file, we can have action objects which will return objects of "what to do" and "where to do" as parameters.
//  We call action functions from our UI events (using dispatch) and then these will invoke the reducer functions.

//Add Todo
const addTodo = (title) => {
    return {
        type: 'ADD_TODO',
        payload: title
    }
}

//Delete Todo
const deleteTodo = (id) => {
    return {
        type: 'DELETE_TODO',
        payload: id
    }
}

//Complete or Redo Todo
const toggleTodo = (id) => {
    return {
        type: 'TOGGLE_TODO',
        payload: id
    }
}

//Update or Edit Todo
const updateTodo = (id, title) => {
    return {
        type: 'UPDATE_TODO',
        payload: {id:id, title:title}
    }
}

//Filter
const filterTodo = (filter) => {
    return {
        type: 'FILTER_TODO',
        payload: filter
    }
}

//These functions are exported so that we can call those which are required in specific files
export { addTodo, deleteTodo, toggleTodo, updateTodo, filterTodo };