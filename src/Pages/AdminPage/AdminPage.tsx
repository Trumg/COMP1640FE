import { useState, useEffect } from "react";
import { signOut } from "firebase/auth";
import { auth } from "../../Firebase/firebase";
import { Api } from "../../Api";
import { ChangeEvent } from "react";
import { format } from "date-fns/format";

function AdminPage() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    birthDate: "",
    confirmPassword: "",
  });
  const [showCreateAccount, setShowCreateAccount] = useState(false); // State to control visibility of the create account form
  const [userList, setUserList] = useState([]); // State để lưu trữ danh sách người dùng

  const handleSignOut = () => {
    signOut(auth)
      .then(() => console.log("Sign Out"))
      .catch((error) => console.log(error));
  };

  const handleSubmit = async (event: ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      // Format birthDate using date-fns
      const formattedBirthDate = format(new Date(formData.birthDate), "yyyy-MM-dd");

      const response = await apiClient.api.authRegisterCreate({
        firstName: formData.firstName,
        lastName: formData.lastName,
        username: formData.email,
        password: formData.password,
        birthDate: formattedBirthDate,
        confirmPassword: formData.confirmPassword,
      });
      if (response.status === 200) {
        console.log("Account created successfully");
        // Redirect to admin page or perform other actions as needed
      } else {
        console.error("Failed to create account:", response.data);
        // Handle failed account creation
      }
    } catch (error) {
      console.error("Error occurred during account creation:", error);
    }
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const getUserList = async () => {
    try {
      const response = await apiClient.api.usersList(); // Gọi API endpoint để lấy danh sách người dùng
      setUserList(response.data);
    } catch (error) {
      console.error("Error occurred while fetching users:", error);
    }
  };

  useEffect(() => {
    getUserList(); // Gọi hàm getUserList khi component được render
  }, []); // Dependency array rỗng đảm bảo hàm chỉ được gọi một lần sau khi component được render

  const apiClient = new Api({
    baseUrl: "https://localhost:7279",
  });

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">Admin Page</h1>
      <button className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded" onClick={handleSignOut}>
        Sign Out
      </button>
      <div className="mt-8">
        <button
          className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded"
          onClick={() => setShowCreateAccount(!showCreateAccount)}
        >
          Create Account
        </button>
        {showCreateAccount && (
          <form className="mt-4" onSubmit={handleSubmit}>
            <div className="flex flex-col space-y-4">
              <input
                className="border border-gray-300 rounded px-4 py-2"
                type="text"
                name="firstName"
                placeholder="First Name"
                onChange={handleChange}
              />
              <input
                className="border border-gray-300 rounded px-4 py-2"
                type="text"
                name="lastName"
                placeholder="Last Name"
                onChange={handleChange}
              />
              <input
                className="border border-gray-300 rounded px-4 py-2"
                type="email"
                name="email"
                placeholder="Email"
                onChange={handleChange}
              />
              <input
                className="border border-gray-300 rounded px-4 py-2"
                type="password"
                name="password"
                placeholder="Password"
                onChange={handleChange}
              />
              <input
                className="border border-gray-300 rounded px-4 py-2"
                type="date"
                name="birthDate"
                placeholder="Birth Date"
                onChange={handleChange}
              />
              <input
                className="border border-gray-300 rounded px-4 py-2"
                type="password"
                name="confirmPassword"
                placeholder="Confirm Password"
                onChange={handleChange}
              />
              <button className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded" type="submit">
                Create Account
              </button>
            </div>
          </form>
        )}
      </div>
      <div className="mt-8">
        <h2 className="text-2xl font-bold mb-4">User List</h2>
        <ul>
          {userList.map((user, index) => (
            <li key={index}>{user.firstName} {user.lastName} - {user.email}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default AdminPage;
