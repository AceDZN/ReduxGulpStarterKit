import { combineReducers } from 'redux';
import PlatformReducer from './platforms';
import ActivePlatformReducer from './active-platform';

const rootReducer = combineReducers({
  platforms: PlatformReducer,
  activePlatform: ActivePlatformReducer
});

export default rootReducer;
