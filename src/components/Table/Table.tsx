import { useState } from "react";
import Status from "../Status/Status";
import { IUser } from "../Users/Users";

interface Props {
  users: Array<IUser>;
  deleteUser: Function;
}

function Table({ users, deleteUser }: Props) {
  const [sortedUsers, setSortedUsers] = useState<IUser[]>([]);
  const [nameSort, setNameSort] = useState(1);

  const sortByName = () => {
    if (nameSort) {
      setSortedUsers(() => {
        const sorted = [...users].sort((a, b) =>
          a.fullName.localeCompare(b.fullName)
        );
        console.log(sorted);
        return sorted;
      });
      setNameSort(0);
    } else {
      setSortedUsers((prevUsers) => {
        const sorted = [...prevUsers].reverse();
        console.log(sorted);
        return sorted;
      });
      setNameSort(1);
    }
  };

  const currentUsers = sortedUsers.length ? sortedUsers : users;

  return (
    <table className="table table-hover">
      <thead>
        <tr>
          <th className="w-25">
            Full Name{" "}
            <i className="bi bi-sort-alpha-down" onClick={sortByName}></i>
          </th>
          <th className="w-25">Status</th>
          <th className="w-50">Email</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {currentUsers.map((user) => (
          <tr key={user._id} className="bg-light">
            <td>{user.fullName}</td>
            <td>
              <Status type={user.status} />
            </td>
            <td>{user.email}</td>
            <td>
              <button
                onClick={() => deleteUser(user._id, user.fullName)}
                className="btn btn-default"
              >
                <i className="bi-trash3"></i>
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default Table;
