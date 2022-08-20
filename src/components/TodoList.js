//Pre Defined React functionalities
import { useRef, useState } from 'react';
//Used for copying the new updated state (of todos and filter) to our variable
import { useSelector } from 'react-redux';
//User Defined store for dispatch functionality
import store from '../redux/store';
//User Defined action for invoking sending action objects to reducer functions (through dispatch)
import { toggleTodo, deleteTodo, updateTodo } from '../redux/actions';

function TodoList() {

    //Initializations
    const [toggleEditTodo, SetToggleEditTodo] = useState(false);                    //Show or hide Edit Inputs
    const [editTodoInputVal, SetEditTodoInputVal] = useState({id:'', title:''});    //Update state of edit Input
    const editTodoInputRef = useRef();                                              //Reference of edit Input
    var newTodos = [];   //For storing todos for maitaining other todos during filter functionality 

    //Get my TodoList and filter selected on every update
    const myTodoList = state => state.todos;
    const todos = useSelector(myTodoList);
    const myTodoFilter = state => state.filter;
    const filter = useSelector(myTodoFilter);

    //Update todos array based on filter and copy it to newTodo
    if (filter === 'SHOW_ALL') {
        newTodos = [].concat(todos);    //As we use newTodos for updating completion status, we dont change the original todo
        newTodos.sort((a, b) => { return a.completed - b.completed });
    } else if (filter === 'SHOW_COMPLETED') {
        newTodos = todos.filter((todo) => { return todo.completed === true; });
    } else if (filter === 'SHOW_PENDING') {
        newTodos = todos.filter((todo) => { return todo.completed === false; });
    }


    //Toggle Todo
    const handleToggleTodo = (id) => {
        //Update complete/redo todo in -> state in -> reducer function through actions using dispatch API of the store
        store.dispatch(toggleTodo(id));
    }

    //Delete Todo
    const handleDeleteTodo = (id) => {
        //Update delete in -> state in -> reducer function through actions using dispatch API of the store
        store.dispatch(deleteTodo(id));
    }

    //Show Edit Todo
    const handleShowEditTodo = (id, title) => {
        SetToggleEditTodo(true);    //Show Edit Input Div
        SetEditTodoInputVal({ id: id, title: title });  //Add selected Input value to the edit Input
        setTimeout(() => { editTodoInputRef.current.focus() },0); //settimeout will run after this block is executed
    }

    //Update Edit Input
    const handleChangeEditInputVal = (e) => {
        SetEditTodoInputVal({ ...editTodoInputVal, title: e.target.value });    //Onchange edit Input text
    }

    //Edit Todo
    const handleEditTodo = () => {
        if (editTodoInputVal.title !== '') {
            //Update todo in -> state in -> reducer function through actions using dispatch API of the store
            store.dispatch(updateTodo(editTodoInputVal.id, editTodoInputVal.title));
            //Set back default state like clearing its input, hiding edit div
            SetToggleEditTodo(false);   //Hide Edit Input Div
            SetEditTodoInputVal({ id: '', title: '' }); //Clear edit state
        }
    }

    return (
        <>
            {/*Edit Todo Div having - Edit Input box, Submit Button, Cancel button*/}
            <div className={toggleEditTodo ? "display" : "noDisplay"}>
                <fieldset>
                    <legend>EDIT Todo</legend>
                    <input ref={editTodoInputRef} value={editTodoInputVal.title} type="text" placeholder="Edit Title" onChange={(e) => handleChangeEditInputVal(e)} /><br />
                    <button onClick={handleEditTodo}>DONE</button><button onClick={() => { SetToggleEditTodo(false) }}>CANCEL</button>
                </fieldset>
            </div>
            {/*List of Todos*/}
            <div>
                {
                    newTodos.map((item,index) => {
                        return (
                            <div className="listDiv flexDisplay" key={item.id}>
                                <div className="listData flexDisplay">
                                    <div>{index+1}</div>
                                    <div className={!item.completed ? "toBeDoneItems" : "doneItems"}>{item.title}</div>
                                </div>
                                <div className="listActions flexDisplay">
                                    <div className="listStatus">{item.completed ? "completed" : "pending"}</div>
                                    <div><button onClick={() => { handleToggleTodo(item.id) }}>{item.completed ? "REDO" : "DONE"}</button></div>
                                    <div><button onClick={() => { handleShowEditTodo(item.id, item.title) }}>{"EDIT"}</button></div>
                                    <div><button onClick={() => { handleDeleteTodo(item.id) }}>{"DELETE"}</button></div>
                                </div>
                            </div>
                         )
                    })
                }
            </div>
        </>
    );
}

export default TodoList;