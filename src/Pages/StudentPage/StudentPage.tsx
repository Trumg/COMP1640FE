import { useState } from "react";
import { Tabs, Button, Checkbox } from "antd";
import StudentNavbar from "../../Components/Navbar/StudentNavbar";
import { CheckboxChangeEvent } from "antd/lib/checkbox";

const { TabPane } = Tabs;

function StudentPage() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [acceptTerms, setAcceptTerms] = useState(false);

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0]);
    }
  };

  const handleTermsChange = (e: CheckboxChangeEvent) => {
    setAcceptTerms(e.target.checked);
  };

  const handleSubmit = () => {
    // Check if terms are accepted
    if (!acceptTerms) {
      alert("Please accept the terms and conditions to submit.");
      return;
    }

    // Process the submission here, e.g., send data to backend
    console.log("Title:", title);
    console.log("Content:", content);
    console.log("File:", file);
    alert("Submission successful!");
  };

  return (
    <div>
      <StudentNavbar />
      <div className="flex justify-center items-center min-h-screen font-roboto pt-24">
        <div className="w-full max-w-4xl p-4">
          <div className="bg-white border border-gray-200 rounded-lg shadow-md p-6">
            <h1 className="text-xl font-bold mb-3">Submit Assignment</h1>
            <Tabs defaultActiveKey="1">
              <TabPane tab="Input" key="1">
                <div>
                  <label htmlFor="title">Title:</label>
                  <input
                    type="text"
                    id="title"
                    value={title}
                    onChange={handleTitleChange}
                    className="block border border-gray-300 rounded-md p-2 mt-1 w-full"
                  />
                </div>
                <div className="mt-4">
                  <label htmlFor="content">Content:</label>
                  <textarea
                    id="content"
                    value={content}
                    onChange={handleContentChange}
                    className="block border border-gray-300 rounded-md p-2 mt-1 w-full h-32"
                  ></textarea>
                </div>
              </TabPane>
              <TabPane tab="Upload" key="2">
                <div className="mt-4">
                  <label htmlFor="file">Upload File:</label>
                  <input
                    type="file"
                    id="file"
                    onChange={handleFileUpload}
                    className="block mt-1"
                  />
                </div>
              </TabPane>
              <TabPane tab="Terms & Conditions" key="3">
                <div className="mt-4">
                  <Checkbox checked={acceptTerms} onChange={handleTermsChange}>
                    I agree to the terms and conditions
                  </Checkbox>
                </div>
              </TabPane>
            </Tabs>
            <div className="mt-6">
              <Button type="primary" onClick={handleSubmit}>
                Submit
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default StudentPage;
