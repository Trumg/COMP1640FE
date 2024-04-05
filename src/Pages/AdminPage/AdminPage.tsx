import React, { ChangeEvent, useState } from "react";
import AdminNavbar from "../../Components/Navbar/AdminNavbar";
import { format } from "date-fns";
import { Api } from "../../Api";

function AdminPage() {

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    birthDate: "",
    confirmPassword: "",
  });

  const [showForm, setShowForm] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertType, setAlertType] = useState("");

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
        setAlertMessage("Account created successfully");
        setAlertType("success");
        // Clear form data
        setFormData({
          firstName: "",
          lastName: "",
          email: "",
          password: "",
          birthDate: "",
          confirmPassword: "",
        });
      } else {
        setAlertMessage("Failed to create account");
        setAlertType("error");
      }
    } catch (error) {
      console.error("Error occurred during account creation:", error);
      setAlertMessage("An error occurred. Please try again later.");
      setAlertType("error");
    }
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const toggleForm = () => {
    setShowForm(!showForm);
  };

  const apiClient = new Api({
    baseUrl: "https://localhost:7279",
  });

  return (
    <div>
      <AdminNavbar />
      {/* Main Content */}
      <div className="flex flex-col items-start min-h-screen font-roboto pt-24">
        <button
          onClick={toggleForm}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-4"
        >
          Create Account
        </button>
        {showForm && (
          <form
          onSubmit={handleSubmit}
          className="bg-white border border-gray-300 rounded p-4 w-full max-w-sm"
        >
          <label className="block mb-2">
            First Name:
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              className="block w-full border border-gray-300 rounded p-2 mt-1"
            />
          </label>
          <label className="block mb-2">
            Last Name:
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              className="block w-full border border-gray-300 rounded p-2 mt-1"
            />
          </label>
          <label className="block mb-2">
            Email:
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="block w-full border border-gray-300 rounded p-2 mt-1"
            />
          </label>
          <label className="block mb-2">
            Password:
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="block w-full border border-gray-300 rounded p-2 mt-1"
            />
          </label>
          <label className="block mb-2">
            Birth Date:
            <input
              type="date"
              name="birthDate"
              value={formData.birthDate}
              onChange={handleChange}
              className="block w-full border border-gray-300 rounded p-2 mt-1"
            />
          </label>
          <label className="block mb-2">
            Confirm Password:
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              className="block w-full border border-gray-300 rounded p-2 mt-1"
            />
          </label>
          <button
            type="submit"
            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mt-2"
          >
            Create Account
          </button>
          </form>
        )}
        {alertMessage && (
          <div className={`bg-${alertType === "success" ? "green" : "red"}-100 text-${alertType === "success" ? "green" : "red"}-900 px-4 py-2 rounded mt-2`}>
            {alertMessage}
          </div>
        )}
      </div>
    </div>
  );
}

export default AdminPage;
