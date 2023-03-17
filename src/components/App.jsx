import { Component } from 'react';
import { nanoid } from 'nanoid';

import ContactForm from './ContactForm/ContactForm';
import Filter from './Filter/Filter';
import ContactList from './ContactList/ContactList';

class App extends Component {
  initContacts = [
    { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
    { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
    { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
    { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
  ];

  state = {
    contacts: this.initContacts,
    filter: '',
  };

  formSubmitHandler = ({ name, number }) => {
    const isNameAlreadyExist = this.state.contacts.some(
      contact => contact.name === name
    );

    if (isNameAlreadyExist) {
      alert(`'${name}' is in contacts already.`);

      return;
    } else {
      const newContact = {
        id: nanoid(),
        name,
        number,
      };

      this.setState(prevState => ({
        contacts: [newContact, ...prevState.contacts],
      }));
    }
  };

  deleteContactHandler = contactId => {
    const updatedContacts = this.state.contacts.filter(
      contact => contact.id !== contactId
    );

    this.setState({ contacts: updatedContacts });
  };

  changeFilterHandler = filterValue => {
    this.setState({
      filter: filterValue,
    });
  };

  filteredContacts = contacts => {
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(this.state.filter)
    );
  };

  render() {
    return (
      <div>
        <h2>Phonebook</h2>
        <ContactForm onSubmitData={this.formSubmitHandler} />
        <h2>Contacts</h2>
        <Filter onChangeFilter={this.changeFilterHandler} />
        <ContactList
          contacts={this.filteredContacts(this.state.contacts)}
          onDelete={this.deleteContactHandler}
        />
      </div>
    );
  }
}

export default App;
