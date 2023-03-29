import React from "react";

//OPTIMIZE: Функциональный компонент принимает два аргумента!
const Contacts = ({ contacts, onRemoveContact }) => (
  <ul className="contact-list">
    {/*OPTIMIZE: Перебираем массив контактов и рендерим! */}
    {contacts.map((contact) => (
      //OPTIMIZE: Устанавливаем ключ для каждого элемента!
      <li className="contact-item" key={contact.id}>
        {/*OPTIMIZE: Отображаем имя и номер  */}
        {contact.name + ": " + contact.number}
        {
          <button
            className="contact-btn"
            type="button"
            name="delte"
            onClick={() => onRemoveContact(contact.id)}
          >
            delete
          </button>
        }
      </li>
    ))}
  </ul>
);

export default Contacts;
