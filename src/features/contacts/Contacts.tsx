import React, { useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { getContactsState, setContacts } from './contactsSlice'
import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import { Avatar, Box, Button, Paper, Table, TableBody, TableCell, TableContainer, TableRow, TextField } from '@mui/material'
import EditIcon from '@mui/icons-material/Edit'
import AddIcon from '@mui/icons-material/Add'
import ContactsModal from './contactModal'

const contactApi = process.env.REACT_APP_CONTACTS_API_URL

const Contacts = () => {
  const contacts = useAppSelector(getContactsState)
  const dispatch = useAppDispatch()

  const [open, setOpen] = React.useState(false)
  const [id, setId] = React.useState('')
  const [search, setSearch] = useState('')
  const [first_name, setFirstName] = useState('')
  const [last_name, setLastName] = useState('')
  const [email, setEmail] = useState('')

  useEffect(() => {
    try {
      const getContacts = createAsyncThunk('contacts/fetchContacts', async () => {
        const response = await axios.get(`${contactApi}/data`)

        return dispatch(setContacts(response.data))
      })

      dispatch(getContacts())
    } catch (error) {
      console.log(error.response)
    }
  }, [dispatch])

  return (
    <>
      <Box
        sx={{
          minWidth: 400,
          width: '100%',
          display: 'flex',
          marginBottom: 5
        }}
      >
        <TextField onChange={(e) => setSearch(e.target.value)} fullWidth label='Search Contacts' id='fullWidth' />
        <Button color={'success'} sx={{ marginLeft: 5, width: 200 }} variant='contained'>
          <AddIcon /> Add Contact
        </Button>
      </Box>

      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label='simple table'>
          <TableBody>
            {contacts
              .filter((contact) => {
                if (search === '') {
                  return contact
                } else if (contact.first_name.toLowerCase().includes(search.toLowerCase())) {
                  return contact
                }
              })
              ?.map((contact) => (
                <TableRow key={contact.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                  <TableCell align='left'>
                    <Avatar alt='Remy Sharp' src={contact.avatar} />
                  </TableCell>
                  <TableCell align='left'>
                    {contact.first_name} {''} {contact.last_name}
                  </TableCell>
                  <TableCell align='left'>{contact.email}</TableCell>
                  <TableCell align='left'>
                    <Button
                      onClick={() => {
                        setId(contact.id)
                        setOpen(true)
                        setFirstName(contact.first_name)
                        setLastName(contact.last_name)
                        setEmail(contact.email)
                      }}
                    >
                      <EditIcon />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>

      <ContactsModal id={id} firstName={first_name} lastName={last_name} _email={email} open={open} setOpen={setOpen} />
    </>
  )
}

export default Contacts
