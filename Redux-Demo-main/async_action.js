const redux = require('redux');
const axios  = require('axios');
const {thunk} = require('redux-thunk');
const { legacy_createStore, combineReducers, applyMiddleware } = redux;

const initialState = {
    loading: false,
    data: [],
    error: ''
};

const USER_REQUEST = "USER_REQUEST";
const USER_SUCCESS = "USER_SUCCESS";
const USER_ERROR = "USER_ERROR";

const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case USER_REQUEST:
            return {
                ...state,
                loading: true,
                error: null
            };
        case USER_SUCCESS:
            return {
                ...state,
                loading: false,
                data: action.payload,
                error: null
            };
        case USER_ERROR:
            return {
                ...state,
                loading: false,
                data: null,
                error: action.payload
            };
        default:
            return state;
    }
};

const fetchUsersRequest = () => {
    return {
        type: USER_REQUEST,
        info: 'Redux action for User Request'
    };
};

const fetchUsersSuccess = (users) => {
    return {
        type: USER_SUCCESS,
        payload: users,
        info: 'Redux action for User Success'
    };
};

const fetchUsersError = (error) => {
    return {
        type: USER_ERROR,
        payload: error,
        info: 'Redux action for User Error'
    };
};

const fetchUsers = () => {
    return function(dispatch) {
        dispatch(fetchUsersRequest());
        axios.get('https://jsonplaceholder.typicode.com/users')
        .then((response)=>{
            const users = response.data.map(user => user.id);
            dispatch(fetchUsersSuccess(users));
        })
        .catch(error => {
            console.log("Error in Fetching Users", error);
            dispatch(fetchUsersError(error.message));
        });
    };
};

// Define your middlewares here if needed
const middlewares = [thunk];

const store = legacy_createStore(userReducer, applyMiddleware(...middlewares)); // Spread middlewares
store.subscribe(() => {console.log(store.getState());});
store.dispatch(fetchUsers());