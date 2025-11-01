import { useReducer, useEffect } from 'react';
import { Launch } from '../types/launch';
import { launchReducer, initialState } from '../reducers/launchReducer';

export const useLaunches = () => {
  const [state, dispatch] = useReducer(launchReducer, initialState);

  const fetchLaunches = async () => {
    dispatch({ type: 'SET_LOADING', payload: true });
    try {
      const response = await fetch(
        'https://api.spacexdata.com/v3/launches?launch_year=2020'
      );
      if (!response.ok) throw new Error('Failed to fetch launches');
      const data: Launch[] = await response.json();
      
      const launchesWithImages = data.filter(launch => 
        launch.links.mission_patch_small
      );
      
      dispatch({ type: 'SET_LAUNCHES', payload: launchesWithImages });
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: (error as Error).message });
    }
  };

  const selectLaunch = (launch: Launch) => {
    dispatch({ type: 'SELECT_LAUNCH', payload: launch });
    dispatch({ type: 'OPEN_MODAL' });
  };

  const closeModal = () => {
    dispatch({ type: 'CLOSE_MODAL' });
  };

  useEffect(() => {
    fetchLaunches();
  }, []);

  return {
    ...state,
    selectLaunch,
    closeModal,
  };
};