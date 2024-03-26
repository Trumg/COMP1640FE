import { signOut } from "firebase/auth";
import { auth } from "../../firebase";

function AdminPage() {
  const handleSignOut = () => {
    signOut(auth)
      .then(() => console.log("Sign Out"))
      .catch((error) => console.log(error));
  };

  return (
    <div>
      AdminPage
      <button onClick={handleSignOut}>Sign Out</button>
    </div>
  );
}

export default AdminPage;
