import { createSlice } from '@reduxjs/toolkit'
import { RootState } from '../../app/store'
import { Contacts } from '../../types'

export interface ContactsState {
  value: Contacts[]
  status: 'idle' | 'loading' | 'failed'
}

const initialState: ContactsState = {
  value: [],
  status: 'idle'
}

export const contactsSlice = createSlice({
  name: 'contacts',
  initialState,

  reducers: {
    setContacts: (state, action) => {
      state.value = action.payload
      state.status = 'idle'
    }
  }
})

export const { setContacts } = contactsSlice.actions

export const getContactsState = (state: RootState) => state.contacts.value

export default contactsSlice.reducer
