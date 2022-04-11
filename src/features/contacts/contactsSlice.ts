import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { RootState } from '../../app/store'
import { Contacts } from '../../types'
import axios from 'axios'

const contactApi = process.env.REACT_APP_CONTACTS_API_URL

export interface ContactsState {
  value: Contacts[]
  status: 'idle' | 'loading' | 'failed'
}

const initialState: ContactsState = {
  value: [],
  status: 'idle'
}

export const updateContacts = createAsyncThunk('contacts/updateContacts', async ({ id, first_name, last_name, email }: Contacts) => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    }

    const response = await axios.put(`${contactApi}/data/${id}`, { first_name, last_name, email }, config)
    return response.data
  } catch (error) {
    console.log(error.response)
  }
})

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
