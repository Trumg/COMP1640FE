import { useState, useEffect } from "react";
import CoordinatorNavbar from "../../Components/Navbar/CoordinatorNavbar";

function CoordinatorPage() {
  const [posts] = useState([
    { id: 1, title: "Post 1", content: "Content of Post 1", status: "Pending" },
    {
      id: 2,
      title: "Post 2",
      content: "Content of Post 2",
      status: "Approved",
    },
    {
      id: 3,
      title: "Post 3",
      content: "Content of Post 3",
      status: "Rejected",
    },
    { id: 4, title: "Post 4", content: "Content of Post 4", status: "Pending" },
    {
      id: 5,
      title: "Post 5",
      content: "Content of Post 5",
      status: "Approved",
    },
    {
      id: 6,
      title: "Post 6",
      content: "Content of Post 6",
      status: "Rejected",
    },
    { id: 7, title: "Post 7", content: "Content of Post 7", status: "Pending" },
    {
      id: 8,
      title: "Post 8",
      content: "Content of Post 8",
      status: "Approved",
    },
    {
      id: 9,
      title: "Post 9",
      content: "Content of Post 9",
      status: "Rejected",
    },
    {
      id: 10,
      title: "Post 10",
      content: "Content of Post 10",
      status: "Pending",
    },
  ]);

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768); // Adjust the breakpoint as needed
    };
    handleResize(); // Call initially to set the initial state
    window.addEventListener("resize", handleResize); // Listen for window resize
    return () => window.removeEventListener("resize", handleResize); // Clean up
  }, []);

  return (
    <div>
      <CoordinatorNavbar />
      <div className="flex justify-center items-center min-h-screen font-roboto pt-24">
        <div
          className={`${isMobile ? "w-full p-4 px-6" : "w-full max-w-4xl p-4"}`}
        >
          <div className="bg-white border-2 border-[#549b90] rounded-lg shadow-md p-6">
            <h1 className="text-xl font-bold mb-3">Post Management</h1>
            <div
              className="table-container relative"
              style={{
                overflow: "auto",
                maxHeight: "500px",
                maxWidth: "1000px",
              }}
            >
              <table className="w-full border-collapse border border-gray-200">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="border border-gray-200 px-6 py-3 sticky top-0 bg-gray-100 z-10 text-lg">
                      ID
                    </th>
                    <th className="border border-gray-200 px-6 py-3 sticky top-0 bg-gray-100 z-10 text-lg">
                      Title
                    </th>
                    <th className="border border-gray-200 px-6 py-3 sticky top-0 bg-gray-100 z-10 text-lg">
                      Content
                    </th>
                    <th className="border border-gray-200 px-4 py-2 sticky top-0 bg-gray-100 z-10">
                      Status
                    </th>
                    <th className="border border-gray-200 px-6 py-3 sticky top-0 bg-gray-100 z-10 text-lg">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {posts.map((post) => (
                    <tr key={post.id}>
                      <td className="border border-gray-200 px-4 py-2 text-center">
                        {post.id}
                      </td>
                      <td className="border border-gray-200 px-4 py-2 text-center">
                        {post.title}
                      </td>
                      <td className="border border-gray-200 px-4 py-2 text-center">
                        {post.content}
                      </td>
                      <td className="border border-gray-200 px-4 py-2 text-center">
                        <span
                          className={
                            post.status === "Pending"
                              ? "text-yellow-500 font-bold"
                              : post.status === "Approved"
                              ? "text-green-500 font-bold"
                              : post.status === "Rejected"
                              ? "text-red-500 font-bold"
                              : ""
                          }
                        >
                          {post.status}
                        </span>
                      </td>
                      <td className="border border-gray-200 px-4 py-2">
                        <div className="flex justify-center items-center">
                          {isMobile ? (
                            <div>
                              <button
                                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-2 w-full"
                                style={{ width: "100px" }}
                              >
                                Approve
                              </button>
                              <button
                                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded w-full"
                                style={{ width: "100px" }}
                              >
                                Reject
                              </button>
                            </div>
                          ) : (
                            <>
                              <button
                                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2"
                                style={{ width: "100px" }}
                              >
                                Approve
                              </button>
                              <button
                                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                                style={{ width: "100px" }}
                              >
                                Reject
                              </button>
                            </>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CoordinatorPage;
