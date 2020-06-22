import React, { Component } from 'react'
import ListContacts from './ListContacts.js'
import * as ContactsAPI from './utils/ContactsAPI.js'
import CreateContact from './CreateContact.js'
import { Route } from 'react-router-dom'

class App extends Component {
  state = {
    contacts: []
  }

  componentDidMount() {
    ContactsAPI.getAll()
      .then((contacts)=> {
        this.setState(()=> ({
          contacts
        }))
      })
  }
  
  removeContact = (contact)=> {
    this.setState((currentState)=> ({
      contacts: currentState.contacts.filter((c)=> {
        return contact.id !== c.id
      })
    }))
    ContactsAPI.remove(contact)
  }

  createContact = (contact)=> {
    ContactsAPI.create(contact)
      .then((contact)=> {
        this.setState((prevState)=> ({
          contacts: prevState.contacts.concat([contact])
        }))
      })
  }

  render() {
    return (
      <div>
        <Route exact path='/' render={()=> (
          <ListContacts 
            onDeleteContact={this.removeContact}
            contacts={this.state.contacts}
          />
        )} />
        <Route path='/create' render={({ history })=> (
          <CreateContact
            onCreateContact={(contact)=> {
              this.createContact(contact)
              history.push('/')
            }}
          />
        )} />
      </div>
    )
  }
}

export default App