import { useState } from "react";
import { Checkbox, Select, Upload, Button } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import StudentNavbar from "../../Components/Navbar/StudentNavbar";
import { CheckboxChangeEvent } from "antd/lib/checkbox";

const { Option } = Select;

function StudentPage() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [imageFile, setImageFile] = useState<File | undefined>(undefined);
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

  const handleImageUpload = (file: File) => {
    setImageFile(file);
  };

  const handleDocUpload = (file: File) => {
    setDocFile(file);
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
    console.log("Image File:", imageFile);
    console.log("Doc File:", docFile);
    console.log("Academic Year:", selectedAcademicYear);
    console.log("Faculty:", selectedFaculty);
    alert("Submission successful!");
  };

  const isMobile = window.innerWidth <= 768;

  return (
    <div>
      <StudentNavbar />
      <div className="flex justify-center items-center min-h-screen font-roboto pt-24">
        <div
          className={`${isMobile ? "w-full p-4 px-6" : "w-full max-w-4xl p-4"}`}
        >
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
              <div className="mb-4">
                <label htmlFor="imageUpload" className="block">
                  Image Upload:
                </label>
                <Upload
                  beforeUpload={handleImageUpload}
                  accept="image/*"
                  fileList={[]}
                  showUploadList={false}
                >
                  <Button icon={<UploadOutlined />}>Upload</Button>
                </Upload>
              </div>
              <div className="mb-4">
                <label htmlFor="docUpload" className="block">
                  Document Upload:
                </label>
                <Upload
                  beforeUpload={handleDocUpload}
                  accept=".doc,.docx"
                  fileList={[]}
                  showUploadList={false}
                >
                  <Button icon={<UploadOutlined />}>Upload</Button>
                </Upload>
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
