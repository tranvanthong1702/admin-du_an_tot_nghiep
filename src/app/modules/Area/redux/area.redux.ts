import storage from 'redux-persist/lib/storage'
import { persistReducer } from 'redux-persist'
import { Area } from '../../../interfaces/models/Area'
import { ActionInterface } from '../../../interfaces/action.interface'
import { put, takeLatest } from 'redux-saga/effects'
import AreaService from '../services/Area.service'
import { PayloadAction } from '@reduxjs/toolkit'

interface AreaReduxInterface {
  areas: Area[]
  areaSelected: Area | null
}

export const actionTypes = {
  loadAreas: '[Load Area] action',
  selectArea: '[Select Area] action'
}

const initialAreaState: AreaReduxInterface = {
  areas: [],
  areaSelected: null
}

export const reducer = persistReducer(
  { storage, key: 'area', whitelist: ['areas', 'areaSelected '] },
  (state: object = initialAreaState, action: PayloadAction<Area[]>) => {
    switch (action.type) {
      case actionTypes.loadAreas: {
        const areas = action.payload

        return { ...state, areas }
      }

      default:
        return state
    }
  }
)

export const actions = {
  loadAreas: (areas: Area[]) => ({
    type: actionTypes.loadAreas,
    payload: areas
  }),
  selectArea: (area: Area) => ({
    type: actionTypes.selectArea,
    payload: area
  })
}

export function* saga() {
  yield takeLatest(actionTypes.loadAreas, function* loadAreaSaga() {
    const areas: Area[] = yield AreaService.list()
    yield put(actions.loadAreas(areas))
  })

  // yield takeLatest(actionTypes.selectArea, function* selectAreaSaga() {
  //   yield put(actions.selectArea(area))
  // })
}
