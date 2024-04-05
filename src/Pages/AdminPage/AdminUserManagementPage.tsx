import { useState, useEffect } from "react";
import AdminNavbar from "../../Components/Navbar/AdminNavbar";
import { Link } from "react-router-dom";

function AdminUserManagementPage() {
  const [users] = useState([
    { id: 1, name: "User 1", email: "user1@example.com", role: "Admin" },
    { id: 2, name: "User 2", email: "user2@example.com", role: "User" },
    { id: 3, name: "User 3", email: "user3@example.com", role: "User" },
    { id: 4, name: "User 4", email: "user4@example.com", role: "Admin" },
    { id: 5, name: "User 5", email: "user5@example.com", role: "User" },
  ]);

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div>
      <AdminNavbar />
      <div className="flex justify-center items-center min-h-screen font-roboto pt-24">
        <div className={`w-full max-w-4xl p-4 ${isMobile ? "px-6" : ""}`}>
          <div className="bg-white border-2 border-[#549b90] rounded-lg shadow-md p-6">
            <h1 className="text-xl font-bold mb-3">User Management</h1>
            <div
              className="table-container relative"
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
                          <Link to="/admin">
                            <button
                              className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mr-2"
                              style={{ width: "100px" }}
                            >
                              Add
                            </button>
                          </Link>
                          <button
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2"
                            style={{ width: "100px" }}
                          >
                            Edit
                          </button>
                          <button
                            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                            style={{ width: "100px" }}
                          >
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminUserManagementPage;
