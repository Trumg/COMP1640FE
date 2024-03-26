import { signOut } from "firebase/auth";
import { auth } from "../../firebase";

function UserPage() {
  const handleSignOut = () => {
    signOut(auth)
      .then(() => console.log("Sign Out"))
      .catch((error) => console.log(error));
  };

  return (
    <div>
      UserPage
      <button onClick={handleSignOut}>Sign Out</button>
    </div>
  );
}

export default UserPage;
