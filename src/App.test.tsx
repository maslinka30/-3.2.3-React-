import { describe, it, expect } from 'vitest'
import { launchReducer, initialState } from './reducers/launchReducer'
import { LaunchState, LaunchAction, Launch } from './types/launch'

const mockLaunch: Launch = {
  flight_number: 1,
  mission_name: 'Starlink 2',
  mission_id: ['123'],
  launch_year: '2020',
  rocket: {
    rocket_id: 'falcon9',
    rocket_name: 'Falcon 9', 
    rocket_type: 'FT'
  },
  links: {
    mission_patch_small: 'https://test.com/image.png',
    mission_patch: 'https://test.com/image-large.png',
    flickr_images: []
  },
  details: 'Test details'
}

describe('Launch Reducer - управление состоянием', () => {
  it('должен устанавливать состояние загрузки', () => {
    const action: LaunchAction = { type: 'SET_LOADING', payload: true }
    const newState = launchReducer(initialState, action)
    
    expect(newState.isLoading).toBe(true)
    expect(newState.error).toBeNull()
  })

  it('должен устанавливать список запусков', () => {
    const launches: Launch[] = [mockLaunch]
    const action: LaunchAction = { type: 'SET_LAUNCHES', payload: launches }
    const newState = launchReducer(initialState, action)
    
    expect(newState.launches).toHaveLength(1)
    expect(newState.launches[0].mission_name).toBe('Starlink 2')
    expect(newState.isLoading).toBe(false)
    expect(newState.error).toBeNull()
  })

  it('должен устанавливать ошибку', () => {
    const error = 'Ошибка загрузки'
    const action: LaunchAction = { type: 'SET_ERROR', payload: error }
    const newState = launchReducer(initialState, action)
    
    expect(newState.error).toBe(error)
    expect(newState.isLoading).toBe(false)
  })

  it('должен выбирать запуск для модального окна', () => {
    const action: LaunchAction = { type: 'SELECT_LAUNCH', payload: mockLaunch }
    const newState = launchReducer(initialState, action)
    
    expect(newState.selectedLaunch).toBe(mockLaunch)
    expect(newState.selectedLaunch?.mission_name).toBe('Starlink 2')
  })

  it('должен открывать модальное окно', () => {
    const action: LaunchAction = { type: 'OPEN_MODAL' }
    const newState = launchReducer(initialState, action)
    
    expect(newState.isModalOpen).toBe(true)
  })

  it('должен закрывать модальное окно и сбрасывать выбранный запуск', () => {
    const stateWithModal: LaunchState = {
      ...initialState,
      isModalOpen: true,
      selectedLaunch: mockLaunch
    }
    
    const action: LaunchAction = { type: 'CLOSE_MODAL' }
    const newState = launchReducer(stateWithModal, action)
    
    expect(newState.isModalOpen).toBe(false)
    expect(newState.selectedLaunch).toBeNull()
  })

  it('должен возвращать исходное состояние для неизвестного действия', () => {
    const action = { type: 'UNKNOWN_ACTION' } as any
    const newState = launchReducer(initialState, action)
    
    expect(newState).toEqual(initialState)
  })
})

describe('Валидация данных запуска', () => {
  it('должен проверять структуру объекта запуска', () => {
    expect(mockLaunch).toHaveProperty('flight_number')
    expect(mockLaunch).toHaveProperty('mission_name')
    expect(mockLaunch).toHaveProperty('mission_id')
    expect(mockLaunch).toHaveProperty('launch_year')
    expect(mockLaunch).toHaveProperty('rocket.rocket_id')
    expect(mockLaunch).toHaveProperty('rocket.rocket_name')
    expect(mockLaunch).toHaveProperty('links.mission_patch_small')
    expect(mockLaunch).toHaveProperty('links.flickr_images')
    
    expect(typeof mockLaunch.mission_name).toBe('string')
    expect(typeof mockLaunch.rocket.rocket_name).toBe('string')
    expect(Array.isArray(mockLaunch.mission_id)).toBe(true)
  })

  it('должен проверять корректность начального состояния', () => {
    expect(initialState.launches).toHaveLength(0)
    expect(initialState.selectedLaunch).toBeNull()
    expect(initialState.isLoading).toBe(false)
    expect(initialState.error).toBeNull()
    expect(initialState.isModalOpen).toBe(false)
  })
})

describe('Логика фильтрации запусков', () => {
  it('должен фильтровать запуски с изображениями mission_patch_small', () => {
    const launchesWithImages: Launch[] = [
      { 
        ...mockLaunch, 
        flight_number: 1,
        links: { ...mockLaunch.links, mission_patch_small: 'image1.png' } 
      },
      { 
        ...mockLaunch, 
        flight_number: 2,
        links: { ...mockLaunch.links, mission_patch_small: 'image2.png' } 
      }
    ]
    
    const launchesWithoutImages: Launch[] = [
      { 
        ...mockLaunch, 
        flight_number: 3,
        links: { ...mockLaunch.links, mission_patch_small: undefined } 
      }
    ]
    
    const filteredWithImages = launchesWithImages.filter(launch => 
      launch.links.mission_patch_small
    )
    
    const filteredWithoutImages = launchesWithoutImages.filter(launch => 
      launch.links.mission_patch_small
    )
    
    expect(filteredWithImages).toHaveLength(2)
    expect(filteredWithoutImages).toHaveLength(0)
  })
})