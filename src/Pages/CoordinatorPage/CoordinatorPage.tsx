import React, { useState } from "react";

function CoordinatorPage() {
  const [topic, setTopic] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = (event: { preventDefault: () => void; }) => {
    event.preventDefault();
    // Here you can add code to send the topic and description to the backend for processing
    console.log("Topic:", topic);
    console.log("Description:", description);
    // Reset the form after submission
    setTopic("");
    setDescription("");
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Submit a Topic
        </h2>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="topic" className="sr-only">
              Topic
            </label>
            <input
              id="topic"
              name="topic"
              type="text"
              autoComplete="off"
              required
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
              placeholder="Topic"
            />
          </div>
          <div>
            <label htmlFor="description" className="sr-only">
              Description
            </label>
            <textarea
              id="description"
              name="description"
              rows={3}
              required
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
              placeholder="Description"
            />
          </div>
          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CoordinatorPage;
