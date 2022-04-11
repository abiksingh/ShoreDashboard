import React, { useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import {
  Box,
  Button,
  Checkbox,
  Divider,
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  MenuItem,
  Modal,
  Radio,
  RadioGroup,
  Select,
  SelectChangeEvent,
  TextField,
  Typography
} from '@mui/material'
import { modalStyle } from './contactsStyle'

const contactApi = process.env.REACT_APP_CONTACTS_API_URL

interface IContactsModal {
  id: string
  open: boolean
  setOpen: (boo: boolean) => void
  firstName: string
  lastName: string
  _email: string
}

const ContactsModal = (props: IContactsModal) => {
  const { id, open, setOpen, firstName, lastName, _email } = props

  const dispatch = useAppDispatch()

  const [first_name, setFirstName] = useState(firstName)
  const [last_name, setLastName] = useState(lastName)
  const [email, setEmail] = useState(_email)
  const [department, setDepartment] = useState('')

  const updateContacts = createAsyncThunk('contacts/updateContacts', async () => {
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

  return (
    <>
      <Modal open={open} onClose={() => setOpen(false)} aria-labelledby='modal-modal-title' aria-describedby='modal-modal-description'>
        <Box sx={modalStyle}>
          <div>
            <form
              onSubmit={(e) => {
                e.preventDefault()
                dispatch(updateContacts())
                window.location.reload()
                setOpen(false)
              }}
            >
              <Typography variant='h6' component='h2'>
                Edit Contact
              </Typography>
              <Divider />

              <Grid container mt={1} mb={1} spacing={4}>
                <Grid item xs={6}>
                  <FormControl>
                    <FormLabel>First Name</FormLabel>
                    <TextField
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFirstName(e.target.value)}
                      required
                      value={firstName}
                      type='text'
                      placeholder='Enter Name Here'
                    />
                  </FormControl>
                </Grid>
                <Grid item xs={6}>
                  <FormControl>
                    <FormLabel>Last Name</FormLabel>
                    <TextField
                      value={lastName}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => setLastName(e.target.value)}
                      type='text'
                      placeholder=' Enter Last Name Here'
                    />
                  </FormControl>
                </Grid>
                <Grid item xs={6}>
                  <FormControl>
                    <FormLabel id='demo-row-radio-buttons-group-label'>Gender</FormLabel>
                    <RadioGroup row aria-labelledby='demo-row-radio-buttons-group-label' name='row-radio-buttons-group'>
                      <FormControlLabel value='female' control={<Radio color={'success'} />} label='Female' />
                      <FormControlLabel value='male' control={<Radio color={'success'} />} label='Male' />
                      <FormControlLabel value='other' control={<Radio color={'success'} />} label='Other' />
                    </RadioGroup>
                  </FormControl>
                </Grid>
                <Grid item xs={6}>
                  <FormControl>
                    <FormLabel>Email</FormLabel>
                    <TextField
                      value={_email}
                      fullWidth={true}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
                      required
                      type='text'
                      placeholder='example@email.com'
                    />
                  </FormControl>
                </Grid>
                <Grid item xs={6}>
                  <FormControl fullWidth>
                    <FormLabel>Department</FormLabel>
                    <Select
                      placeholder={'Select Department'}
                      labelId='demo-simple-select-label'
                      id='demo-simple-select'
                      value={department}
                      onChange={(event: SelectChangeEvent) => setDepartment(event.target.value as string)}
                    >
                      <MenuItem>Sales</MenuItem>
                      <MenuItem>Finance</MenuItem>
                      <MenuItem>IT</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={6}>
                  <FormControl>
                    <FormLabel>Contribution</FormLabel>
                    <TextField type='text' placeholder='eg. 4870,87$' />
                  </FormControl>
                </Grid>
                <Grid sx={{ display: 'flex', alignItems: 'center' }} item xs={12}>
                  <Checkbox color={'success'} />
                  <Typography>is Active</Typography>
                </Grid>
              </Grid>

              <Divider />
              <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 10 }}>
                <Button sx={{ marginRight: 2 }} variant='outlined' onClick={() => setOpen(false)}>
                  Cancel
                </Button>
                <Button color={'success'} variant='contained' type='submit'>
                  Save
                </Button>
              </div>
            </form>
          </div>
        </Box>
      </Modal>
    </>
  )
}

export default ContactsModal
