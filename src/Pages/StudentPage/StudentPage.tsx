import { useState } from "react";
import { Checkbox, Select, Upload, Button, List } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import StudentNavbar from "../../Components/Navbar/StudentNavbar";
import { CheckboxChangeEvent } from "antd/lib/checkbox";

const { Option } = Select;

function StudentPage() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [imageFiles, setImageFiles] = useState<File[]>([]);
  const [docFile, setDocFile] = useState<File | undefined>(undefined);
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [selectedAcademicYear, setSelectedAcademicYear] = useState("");
  const [selectedFaculty, setSelectedFaculty] = useState("");

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value);
  };

  const handleImageUpload = (files: File[]) => {
    setImageFiles(files);
  };

  const handleDocUpload = (file: File | null) => {
    if (file) {
      setDocFile(file);
    }
  };

  const handleTermsChange = (e: CheckboxChangeEvent) => {
    setAcceptTerms(e.target.checked);
  };

  const handleAcademicYearChange = (value: string) => {
    setSelectedAcademicYear(value);
  };

  const handleFacultyChange = (value: string) => {
    setSelectedFaculty(value);
  };

  const handleSubmit = () => {
    console.log("Title:", title);
    console.log("Content:", content);
    console.log("Image Files:", imageFiles);
    console.log("Doc File:", docFile);
    console.log("Academic Year:", selectedAcademicYear);
    console.log("Faculty:", selectedFaculty);
    alert("Submission successful!");
  };

  const isMobile = window.innerWidth <= 768; // Define your threshold for mobile here

  return (
    <div>
      <StudentNavbar />
      <div className="flex justify-center items-center min-h-screen font-roboto pt-24">
        <div className={`w-full max-w-4xl p-4 ${isMobile ? "px-2" : ""}`}>
          <div className="bg-white border-2 border-[#549b90] rounded-lg shadow-md p-6">
            <h1 className="text-xl font-bold mb-3">Share Your Ideas</h1>
            <div>
              <div className="mb-4">
                <label htmlFor="title" className="block">
                  Title:
                </label>
                <input
                  id="title"
                  type="text"
                  value={title}
                  onChange={handleTitleChange}
                  className="block border-[#549b90] text-black px-4 rounded w-full resize-none overflow-auto justify-center border transition duration-200 hover:text-gray-600 hover:border-[#549b90] focus:outline-none focus:border-[#549b90] focus:ring-0"
                  style={{ fontSize: "1.2rem", padding: "0.5rem" }} // Adjust font size and padding
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
                  className="block border-[#549b90] text-black py-2 px-4 rounded w-full resize-none overflow-auto justify-center border transition duration-200 hover:text-gray-600 hover:border-[#549b90] focus:outline-none focus:border-[#549b90] focus:ring-0"
                  style={{ maxHeight: "150px", minHeight: "100px" }}
                ></textarea>
              </div>
              <div className="mb-4">
                <label htmlFor="imageUpload" className="block">
                  Image Upload:
                </label>
                <Upload
                  accept="image/*"
                  maxCount={5} // Set maximum number of images
                  fileList={imageFiles.map((file, index) => ({
                    uid: `${index}`,
                    name: file.name,
                    status: "done",
                    url: URL.createObjectURL(file),
                  }))}
                  onChange={(info) => {
                    if (info.fileList.length <= 5) {
                      handleImageUpload(
                        info.fileList.map((file) => file.originFileObj as File)
                      );
                    }
                  }}
                >
                  <Button icon={<UploadOutlined />}>Upload Image</Button>
                </Upload>
                <List
                  style={{ marginTop: "1rem" }}
                  size="small"
                  bordered
                  dataSource={imageFiles}
                  renderItem={(item) => (
                    <List.Item>
                      <img
                        src={URL.createObjectURL(item)}
                        alt={item.name}
                        style={{ width: "100px", marginRight: "1rem" }}
                      />
                      {item.name}
                    </List.Item>
                  )}
                />
              </div>
              <div className="mb-4">
                <label htmlFor="docUpload" className="block">
                  Document Upload:
                </label>
                <input
                  type="file"
                  accept=".doc,.docx"
                  id="docUpload"
                  onChange={(e) =>
                    handleDocUpload(e.target.files ? e.target.files[0] : null)
                  }
                />
              </div>
              <div className="mb-4">
                <label htmlFor="academicYear" className="block">
                  Academic Year:
                </label>
                <Select
                  id="academicYear"
                  value={selectedAcademicYear}
                  onChange={handleAcademicYearChange}
                  style={{ width: "100%" }}
                >
                  <Option value="first">First Year</Option>
                  <Option value="second">Second Year</Option>
                  <Option value="third">Third Year</Option>
                  <Option value="fourth">Fourth Year</Option>
                </Select>
              </div>
              <div className="mb-4">
                <label htmlFor="faculty" className="block">
                  Faculty:
                </label>
                <Select
                  id="faculty"
                  value={selectedFaculty}
                  onChange={handleFacultyChange}
                  style={{ width: "100%" }}
                >
                  <Option value="engineering">Engineering</Option>
                  <Option value="medicine">Medicine</Option>
                  <Option value="business">Business</Option>
                  <Option value="law">Law</Option>
                </Select>
              </div>
              <Checkbox
                checked={acceptTerms}
                onChange={handleTermsChange}
                style={{ marginBottom: "1rem" }}
              >
                I agree to the{" "}
                <a
                  href="/terms-conditions"
                  style={{ color: "#549b90", fontWeight: "bold" }}
                >
                  Terms and Conditions
                </a>
              </Checkbox>
              <button
                onClick={() => {
                  if (acceptTerms) {
                    handleSubmit();
                  } else {
                    alert(
                      "Please agree to the Terms and Conditions to submit."
                    );
                  }
                }}
                disabled={!acceptTerms}
                className={`relative bg-[#549b90] text-black py-2 px-4 rounded w-full flex justify-center border border-[#549b90] transition duration-200 hover:text-gray-600 hover:border-[#549b90] focus:outline-none hover:bg-gray-200 ${
                  !acceptTerms ? "cursor-not-allowed opacity-50" : ""
                }`}
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default StudentPage;
