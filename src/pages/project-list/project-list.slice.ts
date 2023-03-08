import { createSlice } from '@reduxjs/toolkit'
import { RootState } from 'store'

interface State {
  projectModalOpen: boolean
}

const initialState: State = {
  projectModalOpen: false
}

export const projectListSlice = createSlice({
  name: 'projectListSlice',
  initialState,
  reducers: {
    // immer在内部进行处理，因此可以直接修改state内部的变量
    openProjectModal(state) {
      state.projectModalOpen = true
    },
    closeProjectModal(state) {
      state.projectModalOpen = false
    }
  }
})

export const projectListActions = projectListSlice.actions

// 读取总state树
export const selectProjectModalOpen = (state: RootState) => state.projectList.projectModalOpen
