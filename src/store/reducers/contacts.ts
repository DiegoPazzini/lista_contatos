import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import Contact from '../../models/Contact'

type ContactsState = {
  items: Contact[]
}

const initialState: ContactsState = {
  items: [
    {
      name: 'Diego Pazzini',
      phone: 51995135379,
      email: 'diegopazzini2009@hotmail.com',
      id: 1
    },
    {
      name: 'Ricardo Pereira',
      phone: 51326598,
      email: 'ricardo.ht@gmail.com',
      id: 2
    },
    {
      name: 'Maria Clara',
      phone: 51326598,
      email: 'maraiclara.ht@gmail.com',
      id: 3
    },
    {
      name: 'Ana Luíza',
      phone: 51326598,
      email: 'analuiza.ht@gmail.com',
      id: 3
    }
  ]
}

const contactsSlice = createSlice({
  name: 'contacts',
  initialState,
  reducers: {
    remove: (state, action: PayloadAction<number>) => {
      state.items = state.items.filter(
        (contact) => contact.id !== action.payload
      )
    },
    edit: (state, action: PayloadAction<Contact>) => {
      const contactIndex = state.items.findIndex(
        (c) => c.id === action.payload.id
      )

      if (contactIndex >= 0) {
        state.items[contactIndex] = action.payload
      }
    },
    createNewContact: (state, action: PayloadAction<Omit<Contact, 'id'>>) => {
      const contactAlreadyExist = state.items.find(
        (c) => c.name.toLowerCase() === action.payload.name.toLowerCase()
      )

      if (contactAlreadyExist) {
        alert('Já existe uma tarefa com esse nome')
      } else {
        const lastContact = state.items[state.items.length - 1]

        const newContact = {
          ...action.payload,
          id: lastContact ? lastContact.id + 1 : 1
        }
        state.items.push(newContact)
      }
    }
  }
})

export const { remove, edit, createNewContact } = contactsSlice.actions
export default contactsSlice.reducer
