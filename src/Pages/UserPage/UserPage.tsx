import { signOut } from "firebase/auth";
import { auth } from "../../Firebase/firebase";
import UserNavbar from "../../Components/Navbar/UserNavbar/UserNavbar";

function UserPage() {
  const handleSignOut = () => {
    signOut(auth)
      .then(() => console.log("Sign Out"))
      .catch((error) => console.log(error));
  };

  return (
    <div>
      <UserNavbar />
      <button onClick={handleSignOut}>Sign Out</button>
    </div>
  );
}

export default UserPage;
