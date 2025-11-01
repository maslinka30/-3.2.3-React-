export interface Launch {
  flight_number: number;
  mission_name: string;
  mission_id: string[];
  launch_year: string;
  rocket: {
    rocket_id: string;
    rocket_name: string;
    rocket_type: string;
  };
  links: {
    mission_patch?: string;
    mission_patch_small?: string;
    flickr_images: string[];
  };
  details?: string;
}

export interface LaunchState {
  launches: Launch[];
  selectedLaunch: Launch | null;
  isLoading: boolean;
  error: string | null;
  isModalOpen: boolean;
}

export type LaunchAction =
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_LAUNCHES'; payload: Launch[] }
  | { type: 'SET_ERROR'; payload: string }
  | { type: 'SELECT_LAUNCH'; payload: Launch }
  | { type: 'OPEN_MODAL' }
  | { type: 'CLOSE_MODAL' };