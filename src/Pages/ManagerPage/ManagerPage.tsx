import { useState } from "react";
import { signOut } from "firebase/auth";
import { auth } from "../../Firebase/firebase";

function ManagerPage() {
  const [topics, setTopics] = useState([]);
  const [formData, setFormData] = useState({
    topicName: "",
    topicDescription: "",
  });

  const handleSignOut = () => {
    signOut(auth)
      .then(() => console.log("Sign Out"))
      .catch((error) => console.log(error));
  };

  const handleSubmit = (event: { preventDefault: () => void; }) => {
    event.preventDefault();
 
    setFormData({
      topicName: "",
      topicDescription: "",
    });
  };

  const handleDelete = (topicId: unknown) => {

    setTopics(topics.filter(topic => topic.id !== topicId));
  };

  const handleChange = (event: { target: { name: string; value: string; }; }) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">Manager Page</h1>
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
        {topics.map((topic) => (
          <li key={topic.id} className="flex justify-between items-center border-b border-gray-300 py-4">
            <div>
              <span className="font-semibold">{topic.name}</span>
              <p className="text-gray-600">{topic.description}</p>
            </div>
            <button className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded" onClick={() => handleDelete(topic.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ManagerPage;
