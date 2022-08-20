//Used for copying the new updated state to our variable
import { useSelector } from 'react-redux';
//User Defined store for dispatch functionality
import store from '../redux/store';
//User Defined action for invoking sending action objects to reducer functions (through dispatch)
import { filterTodo } from '../redux/actions';

function TodoFilter() {

    //Get my TodoList on every update
    const myTodoFilter = state => state.filter;
    const filter = useSelector(myTodoFilter);   //useSelector() is alternative to mapStateToProps

    //Update Filter type
    const handleFilter = (type) => {
        //Update filter in -> state in -> reducer function through actions using dispatch API of the store
        store.dispatch(filterTodo(type));   //store.dispatch() is alternative to mapDispatchToProps
        console.log(myTodoFilter);
        console.log(filter);
    }

    return (
        <div className="filterDiv flexDisplay">
            {
                /*Heading based on Filter*/
                filter === 'SHOW_ALL' ? <h3>All List</h3> :
                    filter === 'SHOW_COMPLETED' ? <h3>Completed List</h3> :
                        filter === 'SHOW_PENDING' ? <h3>Pending List</h3> :
                            <h3>No Items</h3>
            }
            {/*Toggle Buttons based on Filter*/}
            <div>
                {filter !== 'NO_ITEMS' && filter !== 'SHOW_PENDING' && <button onClick={() => { handleFilter('SHOW_PENDING') }}>SHOW PENDING</button> }
                {filter !== 'NO_ITEMS' && filter !== 'SHOW_COMPLETED' && <button onClick={() => { handleFilter('SHOW_COMPLETED') }}>SHOW COMPLETED</button>}
                {filter !== 'NO_ITEMS' && filter !== 'SHOW_ALL' && <button onClick={() => { handleFilter('SHOW_ALL') }}>SHOW ALL</button>}
            </div>
        </div>
    );
}

export default TodoFilter;