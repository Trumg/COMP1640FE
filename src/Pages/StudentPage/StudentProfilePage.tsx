import { useState, useEffect } from "react";
import { Tabs, Input, Button } from "antd";
import StudentNavbar from "../../Components/Navbar/StudentNavbar";

const { TabPane } = Tabs;

function StudentProfilePage() {
  const [userData, setUserData] = useState({
    username: "student123",
    email: "student@example.com",
    password: "********",
  });

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleChangeUsername = (newUsername: string) => {
    setUserData({ ...userData, username: newUsername });
    // Here you can make API calls to update the username in the backend
  };

  const handleResetPassword = () => {
    // Logic to reset password
  };

  return (
    <div>
      <StudentNavbar />
      <div className="flex justify-center items-center min-h-screen font-roboto pt-24">
        <div
          className={
            isMobile
              ? "w-full p-4 overflow-x-auto sticky top-24"
              : "w-full max-w-4xl p-4"
          }
          style={{ overflowX: isMobile ? "scroll" : "hidden" }}
        >
          <div className="bg-white border border-gray-200 rounded-lg shadow-md p-6">
            <h1 className="text-xl font-bold mb-3">Profile</h1>
            <Tabs defaultActiveKey="1">
              <TabPane tab="Change Username" key="1">
                <div className="flex flex-col space-y-4">
                  <div>
                    <label htmlFor="username" className="font-semibold">
                      New Username:
                    </label>
                    <Input
                      type="text"
                      id="username"
                      value={userData.username}
                      onChange={(e) => handleChangeUsername(e.target.value)}
                      className="border border-gray-300 rounded-md px-3 py-2 mt-1 focus:outline-none focus:ring focus:border-blue-500"
                    />
                  </div>
                  <Button
                    type="primary"
                    onClick={() => handleChangeUsername("New Username")}
                  >
                    Save Username
                  </Button>
                </div>
              </TabPane>
              <TabPane tab="Change Password" key="2">
                <div className="flex flex-col space-y-4">
                  <div>
                    <label htmlFor="password" className="font-semibold">
                      New Password:
                    </label>
                    <Input
                      type="password"
                      id="password"
                      placeholder="Enter new password"
                      className="border border-gray-300 rounded-md px-3 py-2 mt-1 focus:outline-none focus:ring focus:border-blue-500"
                    />
                  </div>
                  <Button type="primary" onClick={handleResetPassword}>
                    Reset Password
                  </Button>
                </div>
              </TabPane>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
}

export default StudentProfilePage;
