//Pre Defined React functionality for input references
import { useRef } from 'react';
//User Defined store for dispatch functionality
import store from '../redux/store';
//User Defined action for invoking sending action objects to reducer functions (through dispatch)
import { addTodo } from '../redux/actions';

function TodoInput() {
    const input = useRef();//Input Title Field

    //Add Input Todo
    const handleAddTodo = () => {
        if (input.current.value !== '') {
            store.dispatch(addTodo(input.current.value)); //AddTodo function from the actions.js
            input.current.value = '';   //Clear Input field
            input.current.focus();
        }
    }

    return (
        <div>
            <input type="text" placeholder="Title" ref={input} autoFocus={true} />
            <button onClick={handleAddTodo}>ADD</button>
        </div>
        );
}

export default TodoInput;