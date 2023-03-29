import React, { Component } from "react";

export default class Phonebook extends Component {
  //OPTIMIZE: Состояние имени и номера!
  state = {
    name: "",
    number: "",
  };

  //OPTIMIZE: Обработчик изменения инпута!
  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState({
      [name]: value,
    });
  };

  //OPTIMIZE: Обработчик отправки формы!
  handleSubmit = (e) => {
    e.preventDefault();

    //OPTIMIZE: Вызов функции, переданной в компонент через пропсы, для добавления контакта
    this.props.onAddContact({ ...this.state });

    //OPTIMIZE: Очистка инпута после добаления!
    this.setState({ name: "", number: "" });
  };
  render() {
    return (
      <form className="phonebook-form" onSubmit={this.handleSubmit}>
        <label className="phonebook-text">
          <input
            className="phonebook-input"
            type="text"
            name="name"
            placeholder="Name:"
            value={this.state.name}
            onChange={this.handleChange}
            pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
            //OPTIMIZE: Сообщение об ошибке для поля имени
            title="[a-zA-Zа-яА-Я]"
            required
          />
        </label>
        <br />
        <label className="phonebook-text">
          <input
            className="phonebook-input"
            type="text"
            name="number"
            placeholder="Number:"
            value={this.state.number}
            onChange={this.handleChange}
            //OPTIMIZE: Сообщение об ошибке для поля номера
            title="0-9"
            required
            pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
          />
        </label>
        <br />
        <button className="phonebook-btn" type="submit">
          Add contact
        </button>
      </form>
    );
  }
}
