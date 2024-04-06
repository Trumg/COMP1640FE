import { useState, useEffect, ChangeEvent, FormEvent } from "react";
import AdminNavbar from "../../Components/Navbar/AdminNavbar";
import { format } from "date-fns";
import { Api } from "../../Api";
import { message, Table } from "antd";

function AdminPage() {
  const [isMobile, setIsMobile] = useState(false);
  // const [userList, setUserList] = useState([]);

  const apiClient = new Api({
    baseUrl: "https://localhost:7279",
  });

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
      // Format birthDate using date-fns
      const formattedBirthDate = format(
        new Date(formData.birthDate),
        "yyyy-MM-dd"
      );

      const response = await apiClient.api.authRegisterCreate({
        firstName: formData.firstName,
        lastName: formData.lastName,
        username: formData.email,
        password: formData.password,
        birthDate: formattedBirthDate,
        confirmPassword: formData.confirmPassword,
      });

      if (response.status === 200) {
        message.success("Account created successfully");
        console.log("Account created successfully");
        // fetchUserList();
      } else {
        message.error("Failed to create account");
        console.error("Failed to create account:", response.data);
      }
    } catch (error) {
      message.error("Error occurred during account creation");
      console.error("Error occurred during account creation:", error);
    }
  };

  // const fetchUserList = async () => {
  //   try {
  //     const response = await apiClient.api.getUserList();
  //     if (response.status === 200) {
  //       setUserList(response.data);
  //     }
  //   } catch (error) {
  //     console.error("Error fetching user list:", error);
  //   }
  // };

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    // fetchUserList();
    return () => window.removeEventListener("resize", handleResize);
  }, []);

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
  ];

  return (
    <div>
      <AdminNavbar />
      <div className="flex justify-center min-h-screen font-roboto pt-32">
        <div
          className={
            isMobile
              ? "w-full p-4 overflow-x-auto sticky top-24"
              : "w-full max-w-2xl p-4 sticky"
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
            {/* Line break */}
            <hr className="my-8 border-gray-300" />
            <div className="mt-8">
              <h2 className="text-xl font-bold mb-3">User List</h2>
              {/* <Table dataSource={userList} columns={columns} /> */}
              <Table columns={columns} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminPage;
