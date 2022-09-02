import React from "react";

interface HeaderProps {
  addUser: Function;
}

interface HeaderState {
  fullName: string;
  email: string;
  status: string;
}

class Header extends React.Component<HeaderProps, HeaderState> {
  constructor(props: HeaderProps) {
    super(props);

    this.state = {
      fullName: "",
      email: "",
      status: "",
    };
  }

  handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    fieldName: string
  ) => {
    this.setState({
      ...this.state,
      [fieldName]: event.target.value,
    });
  };

  handleStatusSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
    this.setState({
      ...this.state,
      status: event.target.value,
    });
  };

  addUser = () => {
    this.props.addUser({
      fullName: this.state.fullName,
      email: this.state.email,
      status: this.state.status,
    });

    this.setState(() => ({
      fullName: "",
      email: "",
      status: "",
    }));
  };

  render() {
    return (
      <div className="d-flex align-items-center p-3 my-4 bg-light">
        <h5 className="me-auto mb-0">Users</h5>
        <div className="d-flex">
          <input
            value={this.state.fullName}
            onChange={(e) => this.handleInputChange(e, "fullName")}
            type="text"
            placeholder="Full Name"
            className="form-control"
          />

          <input
            value={this.state.email}
            onChange={(e) => this.handleInputChange(e, "email")}
            type="text"
            placeholder="Email"
            className="form-control mx-3"
          />

          <select
            className="form-select"
            aria-label="status select"
            onChange={this.handleStatusSelect}
          >
            <option selected>Select status</option>
            <option value="active">Active</option>
            <option value="expired">Expired</option>
            <option value="banned">Banned</option>
          </select>

          <button onClick={this.addUser} className="btn btn-info text-white">
            Add
          </button>
        </div>
      </div>
    );
  }
}

export default Header;
