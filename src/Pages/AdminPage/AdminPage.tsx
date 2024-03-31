import { signOut } from "firebase/auth";
import { auth } from "../../Firebase/firebase";
import { Api } from "../../Api";
import React, { ChangeEvent } from "react";

function AdminPage() {
  const handleSignOut = () => {
    signOut(auth)
      .then(() => console.log("Sign Out"))
      .catch((error) => console.log(error));
  };

  const handleSubmit = async (event: ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    try {
      const response = await apiClient.api.authRegisterCreate({
        firstName: data.get("first name")?.toString() ?? "",
        lastName: data.get("last name")?.toString() ?? "",
        username: data.get("email")?.toString() ?? "",
        password: data.get("password")?.toString() ?? "",
        birthDate: data.get("Birth Date")?.toString() ?? "",
        confirmPassword: data.get("confirm password")?.toString() ?? "",
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

  const apiClient = new Api({
    baseUrl: "https://localhost:7279",
  });

  return (
    <div>
      AdminPage
      <button onClick={handleSignOut}>Sign Out</button>
    </div>
  );
}

export default AdminPage;
