//Get useEffect to subscribe to state changes (using redux store)
import { useEffect } from 'react';
//User Defined Functions
import './App.css';
import TodoInput from './components/TodoInput';
import TodoList from './components/TodoList';
import TodoFilter from './components/TodoFilter';
//Get User Defined store for using getStore() API
import store from './redux/store';

function App() {

    //Subscribe to change events. 
    useEffect(() => {
        const unsubscribe = store.subscribe(() => {
            console.log(store.getState());  //Output the changed state
        })
        //Clean up function
        return unsubscribe; 
    }, []);

    return (
        <div className="App">
            <h1>To-Do List</h1>
            <h3>Made with React and Redux</h3>
            {/*Contains Input and Add button*/}
            <TodoInput />
            {/*Contains Filter Toggling*/}
            <TodoFilter />
            {/*Contains List of our todos*/}
            <TodoList />
        </div>
  );
}

export default App;
