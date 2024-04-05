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
            <h1 className="text-xl font-bold mb-3">Share Your Ideas</h1>
            <Tabs activeKey={activeTab} onChange={handleTabChange}>
              <TabPane tab="Ideas" key="1">
                <div style={{ height: "300px" }}>
                  <div className="flex flex-col">
                    <div className="mb-4">
                      <label htmlFor="title" className="block">
                        Title:
                      </label>
                      <input
                        type="text"
                        id="title"
                        value={title}
                        onChange={handleTitleChange}
                        className="block border-[#549b90] text-black py-2 px-4 rounded w-full resize-none overflow-auto flex justify-center border border-[#549b90] transition duration-200 hover:text-gray-600 hover:border-[#549b90] focus:outline-none"
                      />
                    </div>
                    <div className="mb-4">
                      <label htmlFor="content" className="block">
                        Content:
                      </label>
                      <textarea
                        id="content"
                        value={content}
                        onChange={handleContentChange}
                        className="block border-[#549b90] text-black py-2 px-4 rounded w-full resize-none overflow-auto flex justify-center border border-[#549b90] transition duration-200 hover:text-gray-600 hover:border-[#549b90] focus:outline-none"
                        style={{ height: "200px" }}
                      ></textarea>
                    </div>
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
                    style={{ border: "2px dashed #549b90" }}
                  >
                    <p className="ant-upload-text">
                      Click or drag file to this area to upload
                    </p>
                  </Dragger>
                </div>
              </TabPane>
              <TabPane tab="Policy" key="3">
                <div style={{ height: "300px" }}>
                  <Checkbox checked={acceptTerms} onChange={handleTermsChange}>
                    I agree to the{" "}
                    <a
                      href="/terms-conditions"
                      style={{ color: "#549b90", fontWeight: "bold" }}
                    >
                      Terms and Conditions
                    </a>
                  </Checkbox>
                </div>
              </TabPane>
            </Tabs>
            <div className="mt-6 flex justify-end space-x-4">
              {activeTab !== "1" && (
                <button
                  onClick={handlePrevTab}
                  className="relative bg-[#549b90] text-black py-2 px-4 rounded w-full flex justify-center border border-[#549b90] transition duration-200 hover:text-gray-600 hover:border-[#549b90] focus:outline-none hover:bg-gray-200"
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
                        "Please agree to the Terms and Conditions to submit."
                      );
                    }
                  } else {
                    handleNextTab();
                  }
                }}
                disabled={activeTab === "3" && !acceptTerms}
                className={`relative bg-[#549b90] text-black py-2 px-4 rounded w-full flex justify-center border border-[#549b90] transition duration-200 hover:text-gray-600 hover:border-[#549b90] focus:outline-none hover:bg-gray-200 ${
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
