import { LaunchState, LaunchAction } from '../types/launch';

export const initialState: LaunchState = {
  launches: [],
  selectedLaunch: null,
  isLoading: false,
  error: null,
  isModalOpen: false,
};

export function launchReducer(state: LaunchState, action: LaunchAction): LaunchState {
  switch (action.type) {
    case 'SET_LOADING':
      return { ...state, isLoading: action.payload };
    case 'SET_LAUNCHES':
      return { ...state, launches: action.payload, isLoading: false };
    case 'SET_ERROR':
      return { ...state, error: action.payload, isLoading: false };
    case 'SELECT_LAUNCH':
      return { ...state, selectedLaunch: action.payload };
    case 'OPEN_MODAL':
      return { ...state, isModalOpen: true };
    case 'CLOSE_MODAL':
      return { ...state, isModalOpen: false, selectedLaunch: null };
    default:
      return state;
  }
}