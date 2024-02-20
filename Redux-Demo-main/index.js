const redux = require('redux');
const { legacy_createStore, combineReducers, applyMiddleware } = redux;
console.log('From index.js');
const reduxLogger = require('redux-logger');
const logger = reduxLogger.createLogger();
// Action types
const BUY_CAKE = "BUY_CAKE";
const BUY_ICECREAM = "BUY_ICECREAM";

// Action creators
function buyCake() {
    return {
        type: BUY_CAKE,
        info: 'Redux action for buying cake'
    };
}

function buyIceCream() {
    return {
        type: BUY_ICECREAM,
        info: 'Redux action for buying ice cream'
    };
}

// Reducers
const cakeReducer = (state = { numOfCakes: 10 }, action) => {
    switch (action.type) {
        case BUY_CAKE:
            return {
                ...state,
                numOfCakes: state.numOfCakes - 1
            };
        default:
            return state;
    }
};

const iceCreamReducer = (state = { numOfIceCreams: 20 }, action) => {
    switch (action.type) {
        case BUY_ICECREAM:
            return {
                ...state,
                numOfIceCreams: state.numOfIceCreams - 1
            };
        default:
            return state;
    }
};

// Combine reducers
const rootReducer = combineReducers({
    cake: cakeReducer,
    iceCream: iceCreamReducer
});

const store = legacy_createStore(rootReducer, applyMiddleware(logger));

console.log('Initial state', store.getState());

// store.subscribe(() => console.log('Updated state', store.getState()));

store.dispatch(buyCake());
store.dispatch(buyCake());
store.dispatch(buyCake());

store.dispatch(buyIceCream());
store.dispatch(buyIceCream());
store.dispatch(buyIceCream());

