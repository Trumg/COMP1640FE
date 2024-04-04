import { useState, useEffect, ChangeEvent, FormEvent } from "react";
import AdminNavbar from "../../Components/Navbar/AdminNavbar";
import { format } from "date-fns";
import { Api } from "../../Api";
import { message } from "antd";

function AdminPage() {
  const [isMobile, setIsMobile] = useState(false);

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
      } else {
        message.error("Failed to create account");
        console.error("Failed to create account:", response.data);
      }
    } catch (error) {
      message.error("Error occurred during account creation");
      console.error("Error occurred during account creation:", error);
    }
  };

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
      <div className="flex justify-center min-h-screen font-roboto pt-32">
        <div
          className={
            isMobile
              ? "w-full p-4 overflow-x-auto sticky top-24"
              : "w-full max-w-4xl p-4"
          }
          style={{ overflowX: isMobile ? "scroll" : "hidden" }}
        >
          <div className="bg-white border border-gray-200 rounded-lg shadow-md p-6">
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
                    className="relative bg-white text-black py-2 px-4 rounded-full w-full flex justify-center border border-[#549b90] transition duration-300 hover:text-gray-600 hover:border-[#549b90] focus:outline-none hover:bg-gray-200"
                  />
                </label>
                <label className="block mb-2">
                  <input
                    placeholder="Last Name"
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    className="relative bg-white text-black py-2 px-4 rounded-full w-full flex justify-center border border-[#549b90] transition duration-300 hover:text-gray-600 hover:border-[#549b90] focus:outline-none hover:bg-gray-200"
                  />
                </label>
                <label className="block mb-2">
                  <input
                    placeholder="Email"
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="relative bg-white text-black py-2 px-4 rounded-full w-full flex justify-center border border-[#549b90] transition duration-300 hover:text-gray-600 hover:border-[#549b90] focus:outline-none hover:bg-gray-200"
                  />
                </label>
                <label className="block mb-2">
                  <input
                    placeholder="Password"
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    className="relative bg-white text-black py-2 px-4 rounded-full w-full flex justify-center border border-[#549b90] transition duration-300 hover:text-gray-600 hover:border-[#549b90] focus:outline-none hover:bg-gray-200"
                  />
                </label>
                <label className="block mb-2">
                  <input
                    placeholder="Birth Date"
                    type="text"
                    name="birthDate"
                    value={formData.birthDate}
                    onChange={handleChange}
                    className="relative bg-white text-black py-2 px-4 rounded-full w-full flex justify-start border border-[#549b90] transition duration-300 hover:text-gray-600 hover:border-[#549b90] focus:outline-none hover:bg-gray-200"
                  />
                </label>
                <label className="block mb-2">
                  <input
                    placeholder="Confirm Password"
                    type="password"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    className="relative bg-white text-black py-2 px-4 rounded-full w-full flex justify-center border border-[#549b90] transition duration-300 hover:text-gray-600 hover:border-[#549b90] focus:outline-none hover:bg-gray-200"
                  />
                </label>
                <div className="flex justify-end">
                  <button
                    type="submit"
                    className="relative bg-[#549b90] text-black py-2 px-4 rounded-full w-full flex justify-center border border-[#549b90] transition duration-300 hover:text-gray-600 hover:border-[#549b90] focus:outline-none hover:bg-gray-200"
                  >
                    Create User
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminPage;
