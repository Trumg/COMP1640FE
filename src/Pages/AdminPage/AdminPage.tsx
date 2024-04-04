import { ChangeEvent, useState } from "react";
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

  const toggleForm = () => {
    setShowForm(!showForm);
  };

  const apiClient = new Api({
    baseUrl: "https://localhost:7279",
  });

  return (
    <div>
      <AdminNavbar/>
      <button onClick={toggleForm}>Create Account</button>
      {showForm && (
        <form onSubmit={handleSubmit}>
          <label>
            First Name:
            <input type="text" name="firstName" value={formData.firstName} onChange={handleChange} />
          </label>
          <label>
            Last Name:
            <input type="text" name="lastName" value={formData.lastName} onChange={handleChange} />
          </label>
          <label>
            Email:
            <input type="email" name="email" value={formData.email} onChange={handleChange} />
          </label>
          <label>
            Password:
            <input type="password" name="password" value={formData.password} onChange={handleChange} />
          </label>
          <label>
            Birth Date:
            <input type="date" name="birthDate" value={formData.birthDate} onChange={handleChange} />
          </label>
          <label>
            Confirm Password:
            <input type="password" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} />
          </label>
          <button type="submit">Create Account</button>
        </form>
      )}
    </div>
  );
}

export default AdminPage;
