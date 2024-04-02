import { useState, useEffect } from "react";
import { signOut } from "firebase/auth";
import { auth } from "../../Firebase/firebase";

function CoordinatorPage() {
  const [selectedContributions, setSelectedContributions] = useState([]);
  const [formData, setFormData] = useState({
    topicName: "",
    topicDescription: "",
  });

  useEffect(() => {
    // Fetch data from API to populate selected contributions based on coordinator's faculty
    // Example:
    // fetchContributionsForFaculty(coordinatorFacultyId).then((data) => {
    //   setSelectedContributions(data);
    // }).catch((error) => {
    //   console.error("Error fetching contributions:", error);
    // });

    // For now, let's simulate some data
    const simulatedContributions = [
      { id: 1, title: "Contribution 1", description: "Description of Contribution 1", faculty: "Faculty A" },
      { id: 2, title: "Contribution 2", description: "Description of Contribution 2", faculty: "Faculty A" },
      { id: 3, title: "Contribution 3", description: "Description of Contribution 3", faculty: "Faculty B" },
      { id: 4, title: "Contribution 4", description: "Description of Contribution 4", faculty: "Faculty B" },
    ];
    const contributionsForCoordinatorFaculty = simulatedContributions.filter(contribution => contribution.faculty === coordinatorFacultyId);
    setSelectedContributions(contributionsForCoordinatorFaculty);
  }, []); // Ensure effect runs only once when component mounts

  const handleSignOut = () => {
    signOut(auth)
      .then(() => console.log("Sign Out"))
      .catch((error) => console.log(error));
  };

  const handleSubmit = (event: { preventDefault: () => void; }) => {
    event.preventDefault();
    // Code to submit form data
  };

  const handleDelete = (contributionId: unknown) => {
    setSelectedContributions(selectedContributions.filter(contribution => contribution.id !== contributionId));
  };

  const handleChange = (event: { target: { name: string; value: string; }; }) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">Coordinator Page</h1>
      <button className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded" onClick={handleSignOut}>Sign Out</button>
      <form className="mt-8" onSubmit={handleSubmit}>
        <div className="flex flex-col space-y-4">
          <input
            className="border border-gray-300 rounded px-4 py-2"
            type="text"
            name="topicName"
            placeholder="Topic Name"
            value={formData.topicName}
            onChange={handleChange}
          />
          <input
            className="border border-gray-300 rounded px-4 py-2"
            type="text"
            name="topicDescription"
            placeholder="Topic Description"
            value={formData.topicDescription}
            onChange={handleChange}
          />
          <button className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded" type="submit">Create Topic</button>
        </div>
      </form>
      <ul className="mt-8">
        {/* Render selected contributions */}
        {selectedContributions.map((contribution) => (
          <li key={contribution.id} className="flex justify-between items-center border-b border-gray-300 py-4">
            <div>
              <span className="font-semibold">{contribution.title}</span>
              <p className="text-gray-600">{contribution.description}</p>
            </div>
            <button className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded" onClick={() => handleDelete(contribution.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default CoordinatorPage;
