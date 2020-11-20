import React, { Component } from "react";
import "./App.css";

class App extends Component {
  constructor(props) {
    super();
    this.state = {
      users: [],
      name: "",
      age: "",
    };
  }

  componentDidMount() {
    this.getUser();
  }

  getUser = () => {
    fetch("/users")
      .then((res) => res.json())
      .then((users) => this.setState({ users }));
  };

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  handleClick = () => {
    const { name, age } = this.state;

    fetch("/users", {
      method: "POST",
      body: JSON.stringify({
        name,
        age,
      }),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    }).then((res) => this.getUser());

    document.getElementById("name").value = "";
    document.getElementById("age").value = "";
  };

  handleUpdate = (e) => {
    e.preventDefault();
    const { id } = e.target;
    const name = prompt("바꿀 이름을 입력하세요.");

    if (!name) {
      return alert("이름을 입력해주세요.");
    }

    fetch(`/users/${id}`, {
      method: "PATCH",
      body: JSON.stringify({
        name,
      }),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    }).then((res) => this.getUser());
  };

  handleDelete = (e) => {
    e.preventDefault();
    const { id } = e.target;
    fetch(`/users/${id}`, {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    }).then((res) => this.getUser());
  };

  render() {
    return (
      <div className="App">
        <h1>Users</h1>
        <p>
          이름 : <input id="name" name="name" onChange={this.handleChange} />
          <br />
          나이 : <input id="age" name="age" onChange={this.handleChange} />
          <br />
          <button onClick={this.handleClick}>등록</button>
        </p>
        {this.state.users.map((user) => (
          <div key={user._id}>
            {user.name} {user.age}
            <button id={user._id} onClick={this.handleUpdate}>
              수정
            </button>
            <button id={user._id} onClick={this.handleDelete}>
              삭제
            </button>
          </div>
        ))}
      </div>
    );
  }
}

export default App;
