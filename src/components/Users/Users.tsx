import React from "react";
import Header from "../Header/Header";
import Message from "../Message/Message";
import Table from "../Table/Table";

export type StatusType = "active" | "expired" | "banned";

export interface IUser {
  fullName: string;
  email: string;
  status: StatusType;
  _id?: string;
}

export interface UsersState {
  users: Array<IUser>;
  addSuccess: boolean;
  addedUser: string;
  deleteSuccess: boolean;
  deletedUser: string;
  search: string;
}

class Users extends React.Component<{}, UsersState> {
  constructor(props: {}) {
    super(props);

    this.state = {
      users: [],
      addedUser: "",
      addSuccess: false,
      deleteSuccess: false,
      deletedUser: "",
      search: "",
    };
  }

  componentDidMount() {
    fetch("http://localhost:3000/users")
      .then((res) => res.json())
      .then((json) => {
        this.setState(() => ({
          users: json,
        }));
      });
  }

  addUser = (user: IUser) => {
    fetch("http://localhost:3000/users", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    })
      .then((res) => res.json())
      .then((json) => {
        this.setState(() => ({
          users: [...this.state.users, json],
          addSuccess: true,
          addedUser: user.fullName,
        }));

        setTimeout(() => {
          this.setState(() => ({
            addSuccess: false,
          }));
        }, 2000);
      });
  };

  deleteUser = (id: string, fullName: string) => {
    fetch("http://localhost:3000/users", {
      method: "delete",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ _id: id }),
    })
      .then((res) => res.json())
      .then((json) => {
        const updated = this.state.users.filter(
          (user) => user._id !== json._id
        );
        this.setState(() => ({
          users: updated,
          deletedUser: fullName,
          deleteSuccess: true,
        }));

        setTimeout(() => {
          this.setState(() => ({
            deleteSuccess: false,
          }));
        }, 2000);
      });
  };

  handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ ...this.state, search: e.target.value });
  };

  render() {
    return (
      <div className="bg-dark bg-opacity-10 border px-2">
        <Header addUser={this.addUser} />
        <div>
          <input
            value={this.state.search}
            onChange={this.handleSearchChange}
            type="text"
            placeholder="Search user by name"
            className="form-control"
          />
        </div>
        {this.state.users.length === 0 && (
          <Message type="warning" children="No users to display." />
        )}
        {this.state.addSuccess && (
          <Message
            type="success"
            children={`New user: ${this.state.addedUser}, has been added successfully`}
          />
        )}
        {this.state.deleteSuccess && (
          <Message
            type="success"
            children={`User: ${this.state.deletedUser}, has been deleted successfully`}
          />
        )}

        <Table
          users={this.state.users.filter((user) =>
            user.fullName
              .toLocaleLowerCase()
              .includes(this.state.search.toLocaleLowerCase())
          )}
          deleteUser={this.deleteUser}
        />
      </div>
    );
  }
}

export default Users;
