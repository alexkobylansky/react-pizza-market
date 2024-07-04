import {createSlice} from '@reduxjs/toolkit'

interface initialStateProps {
  categoryId: number;
  sort: {
    name: string;
    sortProperty: string;
  }
}

const initialState: initialStateProps = {
  categoryId: 0,
  sort: {
    name: "популярности",
    sortProperty: "rating"
  }
};

export const filterSlice = createSlice({
  name: 'filter',
  initialState: initialState,
  reducers: {
    setCategoryId: (state, action) => {
      console.log(action.payload)
      state.categoryId = action.payload
    },
    setSortType: (state, action) => {
      state.sort = action.payload
    },
    setFilters(state, action) {
      state.sort = action.payload.sort
      state.categoryId = Number(action.payload.categoryId)
    }
  },
})

// Action creators are generated for each case reducer function
export const {setCategoryId, setSortType, setFilters} = filterSlice.actions

export default filterSlice.reducer