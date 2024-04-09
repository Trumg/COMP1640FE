import { useState, useEffect, ChangeEvent, FormEvent } from "react";
import AdminNavbar from "../../Components/Navbar/AdminNavbar";
import { format } from "date-fns";
import { message, Table } from "antd";

function AdminPage() {
  const [isMobile, setIsMobile] = useState(false);
  const [userList, setUserList] = useState([]);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    birthDate: "",
    confirmPassword: "",
  });

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const token = sessionStorage.getItem("Token");
      if (!token) {
        throw new Error('No token found');
      }
  
      const formattedBirthDate = format(
        new Date(formData.birthDate),
        "yyyy-MM-dd"
      );
  
      const response = await fetch("https://localhost:7279/api/Auth/Register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify({
          firstName: formData.firstName,
          lastName: formData.lastName,
          username: formData.email,
          password: formData.password,
          birthDate: formattedBirthDate,
          confirmPassword: formData.confirmPassword,
        }),
      });
  
      if (response.ok) {
        message.success("Account created successfully");
        fetchUserList();
      } else {
        const data = await response.json();
        message.error("Failed to create account");
        console.error("Failed to create account:", data);
      }
    } catch (error) {
      message.error("Error occurred during account creation");
      console.error("Error occurred during account creation:", error);
    }
  };
  

  const fetchUserList = async () => {
    try {
      const token = sessionStorage.getItem("Token");
      if (!token) {
        throw new Error('No token found');
      }
  
      const response = await fetch("https://localhost:7279/api/Users", {
        headers: {
          "Authorization": `Bearer ${token}`,
        },
      });
  
      if (response.ok) {
        const data = await response.json();
        setUserList(data.results);
      } else {
        throw new Error('Failed to fetch user list');
      }
    } catch (error) {
      console.error("Error fetching user list:", error);
      // Handle error
    }
  };
  

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    fetchUserList();
    return () => window.removeEventListener("resize", handleResize);
  }, []);
    const editHandler = async (user) => {
      try {
        const token = sessionStorage.getItem("Token");
        if (!token) {
          throw new Error('No token found');
        }
    
        // Example URL for editing user with ID
        const url = `https://localhost:7279/api/Users/${user.id}`;
    
        // Example request body for editing user data
        const requestBody = {
          // Add properties to update
        };
    
        const response = await fetch(url, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
          body: JSON.stringify(requestBody),
        });
    
        if (response.ok) {
          message.success("User updated successfully");
          // Perform any necessary actions after successful update
        } else {
          const data = await response.json();
          message.error("Failed to update user");
          console.error("Failed to update user:", data);
        }
      } catch (error) {
        message.error("Error occurred during user update");
        console.error("Error occurred during user update:", error);
      }
    };
    
    const deleteHandler = async (id) => {
      try {
        const token = sessionStorage.getItem("Token");
        if (!token) {
          throw new Error('No token found');
        }
    
        // Example URL for deleting user with ID
        const url = `https://localhost:7279/api/Users/${id}`;
    
        const response = await fetch(url, {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });
    
        if (response.ok) {
          message.success("User deleted successfully");
          // Perform any necessary actions after successful deletion
        } else {
          const data = await response.json();
          message.error("Failed to delete user");
          console.error("Failed to delete user:", data);
        }
      } catch (error) {
        message.error("Error occurred during user deletion");
        console.error("Error occurred during user deletion:", error);
      }
    };
  

  const columns = [
    {
      title: "First Name",
      dataIndex: "firstName",
      key: "firstName",
    },
    {
      title: "Last Name",
      dataIndex: "lastName",
      key: "lastName",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Birth Date",
      dataIndex: "birthDate",
      key: "birthDate",
    },
    {
      title: "Role",
      dataIndex: "role",
      key: "role",
    },
    {
      title: "Action",
      dataIndex: "action",
      key: "action",
      render: () => (
        <div className="flex justify-center">
          <button className="mr-4 border border-yellow-500 relative bg-yellow-500 text-black py-2 px-4 rounded w-full flex justify-center transition duration-200 hover:text-gray-600 focus:outline-none hover:border-yellow-500 hover:bg-gray-200">
            Edit
          </button>
          <button className="border border-yellow-500 relative bg-red-500 text-black py-2 px-4 rounded w-full flex justify-center transition duration-200 hover:text-gray-600 focus:outline-none hover:border-red-500 hover:bg-gray-200">
            Delete
          </button>
        </div>
      ),
    },
  ];

  return (
    <div>
      <AdminNavbar />
      <div className="flex justify-center min-h-screen font-roboto pt-32">
        <div
          className={
            isMobile
              ? "w-full p-4 overflow-x-auto sticky top-24"
              : "w-full max-w-4xl p-4 sticky"
          }
          style={{ overflowX: isMobile ? "scroll" : "hidden" }}
        >
          <div className="border-[#549b90] border-2 rounded-lg shadow-md p-6">
            <h1 className="text-xl font-bold mb-3">Create User</h1>
            <form onSubmit={handleSubmit}>
              <div className="mt-4">
                <label className="block mb-2">
                  <input
                    placeholder="First Name"
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    className="border border-[#549b90] relative bg-white text-black py-2 px-4 rounded w-full flex justify-center transition duration-200 hover:text-gray-600 focus:outline-none hover:border-[#549b90] hover:bg-gray-200"
                  />
                </label>
                <label className="block mb-2">
                  <input
                    placeholder="Last Name"
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    className="border border-[#549b90] relative bg-white text-black py-2 px-4 rounded w-full flex justify-center transition duration-200 hover:text-gray-600 focus:outline-none hover:border-[#549b90] hover:bg-gray-200"
                  />
                </label>
                <label className="block mb-2">
                  <input
                    placeholder="Email"
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="border border-[#549b90] relative bg-white text-black py-2 px-4 rounded w-full flex justify-center transition duration-200 hover:text-gray-600 focus:outline-none hover:border-[#549b90] hover:bg-gray-200"
                  />
                </label>
                <label className="block mb-2">
                  <input
                    placeholder="Birth Date"
                    type="text"
                    name="birthDate"
                    value={formData.birthDate}
                    onChange={handleChange}
                    className="border border-[#549b90] relative bg-white text-black py-2 px-4 rounded w-full flex justify-start transition duration-200 hover:text-gray-600 focus:outline-none hover:border-[#549b90] hover:bg-gray-200"
                  />
                </label>
                <label className="block mb-2">
                  <input
                    placeholder="Password"
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    className="border border-[#549b90] relative bg-white text-black py-2 px-4 rounded w-full flex justify-center transition duration-200 hover:text-gray-600 focus:outline-none hover:border-[#549b90] hover:bg-gray-200"
                  />
                </label>
                <label className="block mb-2">
                  <input
                    placeholder="Confirm Password"
                    type="password"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    className="border border-[#549b90] relative bg-white text-black py-2 px-4 rounded w-full flex justify-center transition duration-200 hover:text-gray-600 focus:outline-none hover:border-[#549b90] hover:bg-gray-200"
                  />
                </label>
                <div className="flex justify-end">
                  <button
                    type="submit"
                    className="border border-[#549b90] relative bg-[#549b90] text-black py-2 px-4 rounded w-full flex justify-center transition duration-200 hover:text-gray-600 focus:outline-none hover:border-[#549b90] hover:bg-gray-200"
                  >
                    Create User
                  </button>
                </div>
              </div>
            </form>
          </div>
          <div className="border-[#549b90] border-2 rounded-lg shadow-md p-6">
            <h1 className="text-xl font-bold mb-3">Edit User</h1>
            <form onSubmit={handleSubmit}>
              <div className="mt-4">
                <label className="block mb-2">
                  <input
                    placeholder="First Name"
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    className="border border-[#549b90] relative bg-white text-black py-2 px-4 rounded w-full flex justify-center transition duration-200 hover:text-gray-600 focus:outline-none hover:border-[#549b90] hover:bg-gray-200"
                  />
                </label>
                <label className="block mb-2">
                  <input
                    placeholder="Last Name"
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    className="border border-[#549b90] relative bg-white text-black py-2 px-4 rounded w-full flex justify-center transition duration-200 hover:text-gray-600 focus:outline-none hover:border-[#549b90] hover:bg-gray-200"
                  />
                </label>
                <label className="block mb-2">
                  <input
                    placeholder="Email"
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="border border-[#549b90] relative bg-white text-black py-2 px-4 rounded w-full flex justify-center transition duration-200 hover:text-gray-600 focus:outline-none hover:border-[#549b90] hover:bg-gray-200"
                  />
                </label>
                <label className="block mb-2">
                  <input
                    placeholder="Birth Date"
                    type="text"
                    name="birthDate"
                    value={formData.birthDate}
                    onChange={handleChange}
                    className="border border-[#549b90] relative bg-white text-black py-2 px-4 rounded w-full flex justify-start transition duration-200 hover:text-gray-600 focus:outline-none hover:border-[#549b90] hover:bg-gray-200"
                  />
                </label>
                <label className="block mb-2">
                  <input
                    placeholder="Password"
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    className="border border-[#549b90] relative bg-white text-black py-2 px-4 rounded w-full flex justify-center transition duration-200 hover:text-gray-600 focus:outline-none hover:border-[#549b90] hover:bg-gray-200"
                  />
                </label>
                <label className="block mb-2">
                  <input
                    placeholder="Confirm Password"
                    type="password"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    className="border border-[#549b90] relative bg-white text-black py-2 px-4 rounded w-full flex justify-center transition duration-200 hover:text-gray-600 focus:outline-none hover:border-[#549b90] hover:bg-gray-200"
                  />
                </label>
                <div className="flex justify-end">
                  <button
                    type="submit"
                    className="border border-[#549b90] relative bg-[#549b90] text-black py-2 px-4 rounded w-full flex justify-center transition duration-200 hover:text-gray-600 focus:outline-none hover:border-[#549b90] hover:bg-gray-200"
                  >
                    Create User
                  </button>
                </div>
              </div>
            </form>
          </div>
          <hr className="my-10 border-[#549b90]" />
          <div className="mt-4 tex">
            <h2 className="text-xl font-bold mb-3">User List</h2>
            <Table dataSource={userList} columns={columns} bordered />
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminPage;
