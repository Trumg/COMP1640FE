import { format } from "date-fns";
import { signOut } from "firebase/auth";
import { auth } from "../../Firebase/firebase";
import { Api } from "../../Api";
import { ChangeEvent, useState } from "react";

function AdminPage() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    birthDate: "",
    confirmPassword: "",
  });

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

  const apiClient = new Api({
    baseUrl: "https://localhost:7279",
  });

  return (
    <div>
      <h1>AdminPage</h1>
      <button onClick={handleSignOut}>Sign Out</button>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="firstName"
          placeholder="First Name"
          onChange={handleChange}
        />
        <input
          type="text"
          name="lastName"
          placeholder="Last Name"
          onChange={handleChange}
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          onChange={handleChange}
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          onChange={handleChange}
        />
        <input
          type="date" // Change input type to date for birthDate
          name="birthDate"
          placeholder="Birth Date"
          onChange={handleChange}
        />
        <input
          type="password"
          name="confirmPassword"
          placeholder="Confirm Password"
          onChange={handleChange}
        />
        <button type="submit">Create Account</button>
      </form>
    </div>
  );
}

export default AdminPage;
