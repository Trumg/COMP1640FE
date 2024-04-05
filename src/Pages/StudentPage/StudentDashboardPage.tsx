import { useState, useEffect } from "react";
import StudentNavbar from "../../Components/Navbar/StudentNavbar";
import { Card } from "antd";

function StudentDashboardPage() {
  const [dashboardData] = useState([
    { id: 1, title: "Assignment 1", dueDate: "2024-04-10", status: "Pending" },
    {
      id: 2,
      title: "Assignment 2",
      dueDate: "2024-04-15",
      status: "InProgress",
    },
    {
      id: 3,
      title: "Assignment 3",
      dueDate: "2024-04-20",
      status: "Completed",
    },
    { id: 4, title: "Quiz 1", dueDate: "2024-04-12", status: "Pending" },
    { id: 5, title: "Quiz 2", dueDate: "2024-04-18", status: "InProgress" },
    { id: 6, title: "Quiz 3", dueDate: "2024-04-25", status: "Completed" },
  ]);

  const [isMobile, setIsMobile] = useState(false);

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
          <Card style={{ border: "none" }}>
            <div className="border-2 border-[#549b90] rounded-lg shadow-md p-6">
              <h1 className="text-xl font-bold mb-3">Dashboard</h1>
              <div
                className="table-container relative"
                style={{
                  overflow: "auto",
                  maxHeight: "500px",
                  maxWidth: "1000px",
                }}
              >
                <table className="w-full border-collapse border-1 border-[#549b90]">
                  <thead>
                    <tr className="bg-gray-100">
                      <th className="border border-gray-200 px-6 py-3 sticky top-0 bg-gray-100 z-10 text-lg">
                        ID
                      </th>
                      <th className="border border-gray-200 px-6 py-3 sticky top-0 bg-gray-100 z-10 text-lg">
                        Title
                      </th>
                      <th className="border border-gray-200 px-6 py-3 sticky top-0 bg-gray-100 z-10 text-lg">
                        Due Date
                      </th>
                      <th className="border border-gray-200 px-4 py-2 sticky top-0 bg-gray-100 z-10">
                        Status
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {dashboardData.map((item) => (
                      <tr key={item.id}>
                        <td className="border border-gray-200 px-4 py-2 text-center">
                          {item.id}
                        </td>
                        <td className="border border-gray-200 px-4 py-2 text-center">
                          {item.title}
                        </td>
                        <td className="border border-gray-200 px-4 py-2 text-center">
                          {item.dueDate}
                        </td>
                        <td className="border border-gray-200 px-4 py-2 text-center">
                          <span
                            className={
                              item.status === "Pending"
                                ? "text-yellow-500 font-bold"
                                : item.status === "InProgress"
                                ? "text-blue-500 font-bold"
                                : item.status === "Completed"
                                ? "text-green-500 font-bold"
                                : ""
                            }
                          >
                            {item.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default StudentDashboardPage;
