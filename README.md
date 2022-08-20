# ToDo List

A simple Todo List Application with Add, Edit, Delete, filter buttons.
Created using React and Redux.


## Steps for creating this application:

1. Create a React application 
     - `npx install create-react-app myTodoList`
     - `cd myTodoList`
     - `npm start`  
     We can see the basic react app at http://localhost:3000/
		
2. Get redux
     - `npm install @reduxjs/toolkit`
     - `npm install react-redux`

3. Components Structure  
     1. Components Folder  
          - src/components/TodoInput.js
          - src/components/TodoFilter.js
          - src/components/TodoList.js
     2. Redux Folder  
          - src/redux/store.js
          - src/redux/reducer.js
          - src/redux/actions.js

4. Update the code and test it.


## Understanding Redux:  
1. Concept:  
    - It is a concept to update the State based on actions performed.  
    - And it happens in a way such that the new updated state can be provided to the whole app.
2. Aspects:  
    1. Actions
         - In redux, we can create some action 'objects' which contain "what to do" and "where to do" parameters.
         - We call to these actions from our UI events (using dispatch) and then these will invoke the reducer functions.
         - Like: `const addTodo = text => { return {type:'addTodo',payload:text} }`
    2. Reducer
         - It is basically a function which will update new state based upon the "initialState" and the "action" given.
		 - Like  
            `const myReducer = (initialState:{todos:{}},action) => {`  
			&nbsp;&nbsp;`switch(action.type){`  
			&nbsp;&nbsp;&nbsp;&nbsp;`case 'addTodo':`  
			&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`return Object.assign({}, ...state, {todos: ...state.todos, [text: action.payload, completed: false] })`  
			&nbsp;&nbsp;&nbsp;&nbsp;`case default:`  
			&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`return state.todos;`  
			&nbsp;&nbsp;`}`  
			 `}`  
    3. Store  
         - It is the basis for storing reducers and calling them through actions given.
		 - Like  
         `let store = configureStore({reducer:myReducer})` //For Multiple Reducers  
         or  
         `let store = createStore(reducer)` //For single Reducer  
    4. Dispatch
         - Using store, dispatch API can be called where we pass our actions, the state gets updated.
		 - To get something done, we call store.dispatch() and place the action objects inside it.
		 - Like  `<button onClick={ () => {store.dispatch(addTodo(inputText))} }>ADD</button>`
    5. getState
         - This API lets us to get the updated state.
         - We can subscribe to the updations of the state globally instead of calling it everytime the state updates.
		 - Like `console.log(store.getState());`
    6. useSelector
         - To get the new updated state of our data, instead of subscribing, we can use useSelector hook from react-redux.
         - This will take the state as argument and returns the data required from the state.
         - Like  `const completedTodos = useSelector(state => state.todos.completed === true)`
         - useSelector is automatically subscribed for state changes, so it will render our requirement whenever the state is updated.
    7. connect
         - This is used to connect our component to the redux store as `connect()(MyComponent)`.
         - This is mostly used in cases where we use mapStateToProps and mapDispatchToProps as  
              `connect(mapStateToProps, mapDispatchToProps)(MyComponent)`.
              - mapStateToProps is function used in our component for managing state of our data
                   - Like `const mapStateToProps = (state) => ({todos:state.todos})`  
                    So now, we can use this state.todos in our component.
              - mapDispatchToProps is function used for dispatching actions
                   - Like `const mapDispatchToProps = (dispatch) => return {addTodo: dispatch({type:addTodo, text:inputText}) }`  
                    So now, we can use this in our `onClick={addTodo}`.
    8. createSlice()
         - This is used to add multiple reducer functions and actions in a single place.
         - We export the actions and use them in our components.
         - Like `const todoReducer = createSlice({name:'todos',reducers:{addTodo:(state,action)=>{...}, toggleTodo:()=>{}..... });`
         - We export our reducer as `export default todoReducer.reducer`
         - We export our actions as `export {addTodo, toggleTodo} = todoReducer.actions`
         - For adding all the reducers into the store, we use combineReducers.