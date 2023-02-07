import { legacy_createStore, combineReducers, applyMiddleware, compose } from "redux";
import { combineEpics, createEpicMiddleware } from "redux-observable";
import skillsReducer from "../reducers/skills";
import { changeSearchEpic, searchSkillsEpic } from "../epics";

const reducer = combineReducers({
  skills: skillsReducer,
});
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const epic = combineEpics(changeSearchEpic, searchSkillsEpic);
const epicMiddleware = createEpicMiddleware();
export const store = legacy_createStore(
  reducer,
  composeEnhancers(applyMiddleware(epicMiddleware))
);

epicMiddleware.run(epic);
