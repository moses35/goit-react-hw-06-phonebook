import { ContactForm } from 'components/ContactForm/ContactForm';
import { ContactList } from 'components/ContactList/ContactList';
import { Filter } from 'components/Filter/Filter';
import { Container } from 'components/App/App.styled';
import { nanoid } from 'nanoid';
import { useSelector, useDispatch } from 'react-redux';
import { setContact, deleteContact } from 'redux/contactsSlice';
import { getFilter, setFilter } from 'redux/filterSlice';
import { getContacts } from 'redux/contactsSlice';

export const App = () => {
  const contacts = useSelector(getContacts);
  const filter = useSelector(getFilter);

  const dispatch = useDispatch();

  const formSubmitHandler = data => {
    duplicatedContact(data);
  };

  const changeFilter = e => {
    dispatch(setFilter(e.currentTarget.value));
  };

  const getVisibleContacts = () => {
    const normalizaFilter = filter.toLowerCase();
    return contacts.filter(contact =>
      contact.name.toLocaleLowerCase().includes(normalizaFilter)
    );
  };

  const duplicatedContact = data => {
    const normalizaName = data.name.toLocaleLowerCase();

    //check for duplicate name
    const result = contacts.find(
      contact => normalizaName === contact.name.toLocaleLowerCase()
    );

    //checking if find() return 'object'
    if (typeof result === 'object') {
      window.alert(result.name + ' is already in contacts');
    } else {
      data.id = nanoid();
      dispatch(setContact(data));
    }
  };

  const deleteConatact = contactId => {
    dispatch(deleteContact(contactId));
  };

  const visibleContacts = getVisibleContacts();

  return (
    <Container>
      <div>
        <h1>Phonebook</h1>
        <ContactForm onSubmit={formSubmitHandler} />
        <h2>Contacts</h2>
        <Filter value={filter} onChange={changeFilter} />
        {contacts.length > 0 ? (
          <ContactList
            contacts={visibleContacts}
            onDeleteContact={deleteConatact}
          />
        ) : (
          <p>No contacts</p>
        )}
      </div>
    </Container>
  );
};
