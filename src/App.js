import React, { Component } from "react";
import { v4 as uuidv4 } from "uuid"; // OPTIMIZE: Импортируем уникальные айдишники!
import Contacts from "./components/Contacts/Contacts";
import Filter from "./components/Filter/Filter";
import Phonebook from "./components/Phonebook/Phonebook";
import "./components/PhonebookOption.css";

export default class App extends Component {
  // OPTIMIZE:  Состояние!
  state = {
    contacts: [
      { id: "id-1", name: "Абдыкеримов Темирлан", number: "(+996)702-826-547" },
      { id: "id-2", name: "Абдыкалыкова Эльдана", number: "(+996)999-838-868" },
      { id: "id-3", name: "Боронов Азилет", number: "(+996)990-012-161" },
      { id: "id-4", name: "Стамкулов Руслан", number: "(+996)556-969-896" },
    ],
    filter: "",
  };

  //OPTIMIZE: Считаем контакты и устанавливаем с состояние!
  componentDidMount() {
    const contacts = JSON.parse(localStorage.getItem("contacts")) || [];
    this.setState({ contacts });
  }

  //OPTIMIZE: Сохраняем контакты в localStorage если они изменились!
  componentDidUpdate(prevProps, prevState) {
    const { contacts } = this.state;
    if (prevState.contacts !== contacts) {
      localStorage.setItem("contacts", JSON.stringify(contacts));
    }
  }
  s;
  // OPTIMIZE: Обработчик контакта!
  addContact = (task) => {
    const searchSameName = this.state.contacts
      .map((cont) => cont.name)
      .includes(task.name);

    // OPTIMIZE: Ограничивает добавление контакта!
    if (searchSameName) {
      alert(`"${task.name}" такой контакт уже существует`);
    } else if (task.name.length === 0) {
      alert("Такой контакт уже существует!");
    } else {
      const contact = {
        ...task,
        id: uuidv4(), // OPTIMIZE: Генерируем айдишник!
      };

      // OPTIMIZE: Обновляет предыдущее состояние!
      this.setState((prevState) => ({
        contacts: [...prevState.contacts, contact],
      }));
    }
  };

  // OPTIMIZE: Обработчик фильтра!
  changeFilter = (filter) => {
    this.setState({ filter });
  };

  // OPTIMIZE: Функция для получения отфильтрованного контакта!
  getVisibleContacts = () => {
    const { contacts, filter } = this.state;

    // OPTIMIZE: Процесс фильтрации контакта!
    return contacts.filter((contacts) =>
      contacts.name.toLowerCase().includes(filter.toLowerCase())
    );
  };

  // OPTIMIZE: Удаление контакта из списка!
  removeContact = (contactId) => {
    this.setState((prevState) => {
      return {
        contacts: prevState.contacts.filter(({ id }) => id !== contactId),
      };
    });
  };

  render() {
    const { filter } = this.state;
    // OPTIMIZE: Получаем отфильтрованный контакт!
    const visibleContacts = this.getVisibleContacts();

    return (
      <div>
        <h1 className="phonebook-title">Phonebook</h1>
        <hr />
        {/*OPTIMIZE: Передаём обработчика контакта!  */}
        <Phonebook onAddContact={this.addContact} />
        <h2 className="contact-title">Contacts</h2>
        {/*OPTIMIZE:  Передаём список контактов */}
        <Filter value={filter} onChangeFilter={this.changeFilter} />
        {/*OPTIMIZE:  Ставим условие: если длина списка равна к 0
         //OPTIMIZE:  то мы отрендерим "донт" а если нет то сам контакт! */}
        {visibleContacts.length > 0 ? (
          <Contacts
            contacts={visibleContacts}
            onRemoveContact={this.removeContact}
          />
        ) : (
          <p className="dont">Контакт(ы) отсутствует!</p>
        )}
      </div>
    );
  }
}
