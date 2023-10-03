import { createSlice } from "@reduxjs/toolkit"

const errorsSlice = createSlice({
  name: "errors",
  initialState: '',
  reducers: {
    setErrors: (state, action) => action.payload,
    cleanErrors: () => ''
  },
})

export const { setErrors, cleanErrors } = errorsSlice.actions
export default errorsSlice.reducer