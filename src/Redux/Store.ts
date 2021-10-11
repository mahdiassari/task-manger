import { createStore, applyMiddleware } from "redux";
import reducers from "./Reducers";

const middlewares: any[] = [];

const bindMiddleware = (middleware: any) => {
  const { composeWithDevTools } = require("redux-devtools-extension");
  return composeWithDevTools(applyMiddleware(...middleware));
};

const store = createStore(reducers, bindMiddleware(middlewares));
export { store };
