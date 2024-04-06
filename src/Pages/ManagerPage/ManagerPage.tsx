import { useState } from "react";
import { signOut } from "firebase/auth";
import { auth } from "../../Firebase/firebase";
import JSZip from 'jszip';
import { saveAs } from 'file-saver';
import { Api } from "../../Api";
function ManagerPage() {
  const [topics, setTopics] = useState([
    { id: 1, name: "Topic 1", description: "Description of Topic 1", closureDate: new Date("2024-04-01"), selected: false, content: "Content of Topic 1" },
    { id: 2, name: "Topic 2", description: "Description of Topic 2", closureDate: new Date("2024-04-05"), selected: false, content: "Content of Topic 2" },
    { id: 3, name: "Topic 3", description: "Description of Topic 3", closureDate: new Date("2024-04-10"), selected: false, content: "Content of Topic 3" }
  ]);
  
  
  const [formData, setFormData] = useState({
    topicName: "",
    topicDescription: "",
  });
  const [editingTopicId, setEditingTopicId] = useState<number | null>(null);

  const handleSignOut = () => {
    signOut(auth)
      .then(() => console.log("Sign Out"))
      .catch((error) => console.log(error));
  };

  const handleSubmit = (event: { preventDefault: () => void; }) => {
    event.preventDefault();
  };

  const handleDelete = (topicId: number) => {
    setTopics(topics.filter(topic => topic.id !== topicId));
  };

  const handleEdit = (topicId: number) => {
    setEditingTopicId(topicId);
    const topicToEdit = topics.find((topic) => topic.id === topicId);
    if (topicToEdit) {
      setFormData({ topicName: topicToEdit.name, topicDescription: topicToEdit.description });
    }
  };

  const handleChange = (event: { target: { name: string; value: string; }; }) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleUpdate = (topicId: number) => {
    const updatedTopics = topics.map(topic => {
      if (topic.id === topicId) {
        return { ...topic, name: formData.topicName, description: formData.topicDescription };
      }
      return topic;
    });
    setTopics(updatedTopics);
    setEditingTopicId(null);
    setFormData({ topicName: "", topicDescription: "" });
  };

  const handleDownloadSelectedContributions = () => {
    const selectedIds = topics.filter(topic => topic.selected).map(topic => topic.id);
    const selectedContributions = topics.filter(topic => selectedIds.includes(topic.id) && new Date(topic.closureDate) < new Date());

    const zip = new JSZip();
    selectedContributions.forEach(contribution => {
      // Assuming content is a string, you can add it to the zip file
      zip.file(`Contribution_${contribution.id}.txt`, contribution.content);
    });

    zip.generateAsync({ type: "blob" }).then(content => {
      // Using FileSaver.js to save the blob as a ZIP file
      saveAs(content, "Selected_Contributions.zip");
    });
  };

  const apiClient = new Api({
    baseUrl: "https://localhost:7279",
  });

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">Manager Page</h1>
      <button className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded" onClick={handleSignOut}>Sign Out</button>
      <button className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded ml-4" onClick={handleDownloadSelectedContributions}>Download Selected Contributions</button>
      <ul className="mt-8">
        {topics.map((topic) => (
          <li key={topic.id} className="flex justify-between items-center border-b border-gray-300 py-4">
            <div>
              {editingTopicId === topic.id ? (
                <div className="flex space-x-2">
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
                </div>
              ) : (
                <div>
                  <span className="font-semibold">{topic.name}</span>
                  <p className="text-gray-600">{topic.description}</p>
                </div>
              )}
            </div>
            <div>
              {editingTopicId === topic.id ? (
                <button className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded" onClick={() => handleUpdate(topic.id)}>Update</button>
              ) : (
                <div className="flex space-x-2">
                  <button className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded" onClick={() => handleEdit(topic.id)}>Edit</button>
                  <button className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded" onClick={() => handleDelete(topic.id)}>Delete</button>
                  <input type="checkbox" onChange={(e) => {
                    const checked = e.target.checked;
                    setTopics(topics.map(item => {
                      if (item.id === topic.id) {
                        return { ...item, selected: checked };
                      }
                      return item;
                    }));
                  }} />
                </div>
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ManagerPage;
