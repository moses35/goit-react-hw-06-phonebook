import { createSlice } from '@reduxjs/toolkit';
import initialContacts from 'initialContacts.json';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

export const contactsSlice = createSlice({
  name: 'phonebook',
  initialState: { contacts: initialContacts },
  reducers: {
    setContact(state, action) {
      state.contacts.push(action.payload);
    },
    deleteContact(state, action) {
      const index = state.contacts.findIndex(
        contact => contact.id === action.payload
      );
      state.contacts.splice(index, 1);
    },
  },
});

const persistConfig = {
  key: 'phonebook',
  storage,
};

export const persistedReducer = persistReducer(
  persistConfig,
  contactsSlice.reducer
);

export const { setContact, deleteContact } = contactsSlice.actions;

//selectors
export const getContacts = state => state.phonebook.contacts;
