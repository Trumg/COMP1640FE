import { useState, useEffect } from "react";
import AdminNavbar from "../../Components/Navbar/AdminNavbar";

function AdminPage() {
  const [users, setUsers] = useState([
    { id: 1, name: "User 1", email: "user1@example.com", role: "Admin" },
    { id: 2, name: "User 2", email: "user2@example.com", role: "User" },
    { id: 3, name: "User 3", email: "user3@example.com", role: "User" },
    { id: 4, name: "User 4", email: "user4@example.com", role: "Admin" },
    { id: 5, name: "User 5", email: "user5@example.com", role: "User" },
  ]);

  const [isMobile, setIsMobile] = useState(false);
  const [newUserName, setNewUserName] = useState("");
  const [newUserEmail, setNewUserEmail] = useState("");
  const [newUserRole, setNewUserRole] = useState("User");

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768); // Adjust the breakpoint as needed
    };
    handleResize(); // Call initially to set the initial state
    window.addEventListener("resize", handleResize); // Listen for window resize
    return () => window.removeEventListener("resize", handleResize); // Clean up
  }, []);

  const handleCreateUser = () => {
    const newUser = {
      id: users.length + 1,
      name: newUserName,
      email: newUserEmail,
      role: newUserRole,
    };
    setUsers([...users, newUser]);
    // Clear input fields after creating the user
    setNewUserName("");
    setNewUserEmail("");
    setNewUserRole("User");
  };

  return (
    <div>
      <AdminNavbar />
      {/* Main Content */}
      <div className="flex justify-center items-center min-h-screen font-roboto pt-24">
        <div
          className={
            isMobile
              ? "w-full p-4 overflow-x-auto sticky top-24"
              : "w-full max-w-4xl p-4"
          }
          style={{ overflowX: isMobile ? "scroll" : "hidden" }}
        >
          <div className="bg-white border border-gray-200 rounded-lg shadow-md p-6">
            <h1 className="text-xl font-bold mb-3">Create</h1>
            <div
              className="table-container relative" // Added relative position
              style={{
                overflow: "auto",
                maxHeight: "500px",
                maxWidth: "1000px",
              }}
            >
              <table className="w-full border-collapse border border-gray-200">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="border border-gray-200 px-6 py-3 sticky top-0 bg-gray-100 z-10 text-lg">
                      ID
                    </th>
                    <th className="border border-gray-200 px-6 py-3 sticky top-0 bg-gray-100 z-10 text-lg">
                      Name
                    </th>
                    <th className="border border-gray-200 px-6 py-3 sticky top-0 bg-gray-100 z-10 text-lg">
                      Email
                    </th>
                    <th className="border border-gray-200 px-6 py-3 sticky top-0 bg-gray-100 z-10 text-lg">
                      Role
                    </th>
                    <th className="border border-gray-200 px-6 py-3 sticky top-0 bg-gray-100 z-10 text-lg">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user) => (
                    <tr key={user.id}>
                      <td className="border border-gray-200 px-4 py-2 text-center">
                        {user.id}
                      </td>
                      <td className="border border-gray-200 px-4 py-2 text-center">
                        {user.name}
                      </td>
                      <td className="border border-gray-200 px-4 py-2 text-center">
                        {user.email}
                      </td>
                      <td className="border border-gray-200 px-4 py-2 text-center">
                        {user.role}
                      </td>
                      <td className="border border-gray-200 px-4 py-2">
                        <div className="flex justify-center items-center">
                          {isMobile ? (
                            <div>
                              <button
                                className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mb-2 w-full"
                                style={{ width: "100px" }}
                              >
                                Create
                              </button>
                              <button
                                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-2 w-full"
                                style={{ width: "100px" }}
                              >
                                Edit
                              </button>
                            </div>
                          ) : (
                            <>
                              <button
                                className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mr-2"
                                style={{ width: "100px" }}
                              >
                                Create
                              </button>
                              <button
                                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2"
                                style={{ width: "100px" }}
                              >
                                Edit
                              </button>
                            </>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {/* Form to create a new user */}
            <div className="mt-4">
              <h2 className="text-lg font-bold mb-2">Create New User</h2>
              <input
                type="text"
                placeholder="Name"
                value={newUserName}
                onChange={(e) => setNewUserName(e.target.value)}
                className="block w-full p-2 border border-gray-300 rounded mb-2"
              />
              <input
                type="email"
                placeholder="Email"
                value={newUserEmail}
                onChange={(e) => setNewUserEmail(e.target.value)}
                className="block w-full p-2 border border-gray-300 rounded mb-2"
              />
              <select
                value={newUserRole}
                onChange={(e) => setNewUserRole(e.target.value)}
                className="block w-full p-2 border border-gray-300 rounded mb-2"
              >
                <option value="User">User</option>
                <option value="Admin">Admin</option>
              </select>
              <button
                onClick={handleCreateUser}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              >
                Create User
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminPage;
