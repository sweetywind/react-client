import React, { Component } from "react";
import { Link } from "react-router-dom";

class Home extends Component {
  constructor(props) {
    super();
    this.state = {
      lists: [],
      title: "",
      url: "",
      seller: "",
    };
  }

  componentDidMount() {
    this.getList();
  }

  getList = () => {
    fetch("/lists")
      .then((res) => res.json())
      .then((lists) => this.setState({ lists }));
  };

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  handleClick = (e) => {
    e.preventDefault();
    const { title, url, seller } = this.state;

    fetch("/lists", {
      method: "POST",
      body: JSON.stringify({
        title,
        url,
        seller,
      }),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    }).then((res) => this.getList());

    document.querySelector(".registForm #title").value = "";
    document.querySelector(".registForm #url").value = "";
    document.querySelector(".registForm #seller").value = "";
  };

  handleUpdate = (e) => {
    e.preventDefault();
    const { id } = e.target;
    const title = prompt("바꿀 제목을 입력하세요.");
    const url = prompt("바꿀 URL을 입력하세요.");
    const seller = prompt("바꿀 판매자를 입력하세요.");

    fetch(`/lists/${id}`, {
      method: "PATCH",
      body: JSON.stringify({
        title,
        url,
        seller,
      }),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    }).then((res) => this.getList());
  };

  handleDelete = (e) => {
    e.preventDefault();
    const { id } = e.target;
    fetch(`/lists/${id}`, {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    }).then((res) => this.getList());
  };
  render() {
    return (
      <div>
        <h1>영상목록</h1>
        <form className="registForm">
          방송제목{" "}
          <input id="title" name="title" onChange={this.handleChange} />
          <br />
          방송 URL <input id="url" name="url" onChange={this.handleChange} />
          <br />
          판매자명{" "}
          <input id="seller" name="seller" onChange={this.handleChange} />
          <br />
          <br />
          <button onClick={this.handleClick}>등록</button>
        </form>
        <div>
          <ul className="lists">
            {this.state.lists.map((list) => (
              <li className="list" key={list._id}>
                <div>
                  <p title={this.state.title}>{list.title}</p>
                  <p url={this.state.url}>{list.url}</p>
                  <p seller={this.state.seller}>{list.seller}</p>
                </div>
                <Link
                  to={{
                    pathname: `/video/${list._id}`,
                    state: {
                      url: list.url,
                    },
                  }}
                >
                  보기
                </Link>
                <button id={list._id} onClick={this.handleUpdate}>
                  수정
                </button>
                <button id={list._id} onClick={this.handleDelete}>
                  삭제
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
  }
}

export default Home;
