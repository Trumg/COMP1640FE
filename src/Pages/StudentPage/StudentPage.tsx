import { useState, ReactNode } from "react";
import { Tabs, Checkbox, Upload } from "antd";
import StudentNavbar from "../../Components/Navbar/StudentNavbar";
import { CheckboxChangeEvent } from "antd/lib/checkbox";

const { TabPane } = Tabs;
const { Dragger } = Upload;

function StudentPage(): ReactNode {
  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const [file, setFile] = useState<File | undefined>(undefined);
  const [acceptTerms, setAcceptTerms] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<string>("1");

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value);
  };

  const handleFileUpload = (file: File | undefined) => {
    if (file) {
      setFile(file);
    }
  };

  const handleTermsChange = (e: CheckboxChangeEvent) => {
    setAcceptTerms(e.target.checked);
  };

  const handleSubmit = () => {
    console.log("Title:", title);
    console.log("Content:", content);
    console.log("File:", file);
    alert("Submission successful!");
  };

  const handleTabChange = (key: string) => {
    setActiveTab(key);
  };

  const handleNextTab = () => {
    const nextTab = (parseInt(activeTab) + 1).toString();
    setActiveTab(nextTab);
  };

  const handlePrevTab = () => {
    const prevTab = (parseInt(activeTab) - 1).toString();
    if (prevTab >= "1") {
      setActiveTab(prevTab);
    }
  };

  return (
    <div>
      <StudentNavbar />
      <div className="flex justify-center items-center min-h-screen font-roboto pt-24">
        <div className="w-full max-w-4xl p-4">
          <div className="bg-white border-2 border-[#549b90] rounded-lg shadow-md p-6">
            <h1 className="text-xl font-bold mb-3">Share your Ideas</h1>
            <Tabs activeKey={activeTab} onChange={handleTabChange}>
              <TabPane tab="Input" key="1">
                <div style={{ height: "300px" }}>
                  <label htmlFor="title">Title:</label>
                  <input
                    type="text"
                    id="title"
                    value={title}
                    onChange={handleTitleChange}
                    className="block border border-gray-300 rounded-md p-2 mt-1 w-full"
                  />
                  <div className="mt-4">
                    <label htmlFor="content">Content:</label>
                    <textarea
                      id="content"
                      value={content}
                      onChange={handleContentChange}
                      className="block border border-gray-300 rounded-md p-2 mt-1 w-full h-32 resize-none overflow-auto"
                    ></textarea>
                  </div>
                </div>
              </TabPane>
              <TabPane tab="Upload" key="2">
                <div style={{ height: "300px" }}>
                  <Dragger
                    accept=".pdf,.doc,.docx"
                    multiple={false}
                    onChange={(info) => {
                      const { status, originFileObj } = info.file;
                      if (status === "done") {
                        handleFileUpload(originFileObj);
                      }
                    }}
                  >
                    <p className="ant-upload-text">
                      Click or drag file to this area to upload
                    </p>
                  </Dragger>
                </div>
              </TabPane>
              <TabPane tab="Terms & Conditions" key="3">
                <div style={{ height: "300px" }}>
                  <Checkbox checked={acceptTerms} onChange={handleTermsChange}>
                    I agree to the terms and conditions
                  </Checkbox>
                </div>
              </TabPane>
            </Tabs>
            <div className="mt-6 flex justify-end space-x-4">
              {activeTab !== "1" && (
                <button
                  onClick={handlePrevTab}
                  className="bg-[#549b90] text-white font-bold py-2 px-4 rounded"
                >
                  Previous
                </button>
              )}
              <button
                onClick={() => {
                  if (activeTab === "3") {
                    if (acceptTerms) {
                      handleSubmit();
                    } else {
                      alert(
                        "Please agree to the terms and conditions to submit."
                      );
                    }
                  } else {
                    handleNextTab();
                  }
                }}
                disabled={activeTab === "3" && !acceptTerms}
                className={`bg-[#549b90] text-white font-bold py-2 px-4 rounded ${
                  activeTab === "3" && !acceptTerms
                    ? "cursor-not-allowed opacity-50"
                    : ""
                }`}
              >
                {activeTab === "3" ? "Submit" : "Next"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default StudentPage;
