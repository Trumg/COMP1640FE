import { useState } from "react";
import StudentNavbar from "../../Components/Navbar/StudentNavbar";
import { Card, Button, Form, Input, Upload, Checkbox } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { UploadChangeParam } from "antd/lib/upload/interface";
import { CheckboxChangeEvent } from "antd/lib/checkbox";

const { TextArea } = Input;

function StudentPage() {
  const [step, setStep] = useState(1);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [termsAgreed, setTermsAgreed] = useState(false);

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value);
  };

  const handleImageChange = (info: UploadChangeParam) => {
    const file = info.fileList[0]?.originFileObj;
    if (file) {
      setImage(file);
    }
  };

  const handleTermsAgreeChange = (e: CheckboxChangeEvent) => {
    setTermsAgreed(e.target.checked);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Form submitted!");
  };

  const renderFormStep = () => {
    switch (step) {
      case 1:
        return (
          <Form onFinish={() => setStep(2)}>
            <Form.Item
              label="Title"
              name="title"
              rules={[{ required: true, message: "Please input title!" }]}
            >
              <Input value={title} onChange={handleTitleChange} />
            </Form.Item>
            <Form.Item
              label="Content"
              name="content"
              rules={[{ required: true, message: "Please input content!" }]}
            >
              <TextArea value={content} onChange={handleContentChange} />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit">
                Next
              </Button>
            </Form.Item>
          </Form>
        );
      case 2:
        return (
          <Form onFinish={() => setStep(3)}>
            <Form.Item label="Image or Document">
              <Upload onChange={handleImageChange} showUploadList={false}>
                <Button icon={<UploadOutlined />}>Click to upload</Button>
              </Upload>
            </Form.Item>
            <Form.Item>
              <Button type="default" onClick={() => setStep(1)}>
                Previous
              </Button>
              <Button type="primary" htmlType="submit">
                Next
              </Button>
            </Form.Item>
          </Form>
        );
      case 3:
        return (
          <Form onFinish={handleSubmit}>
            <Form.Item>
              <Checkbox checked={termsAgreed} onChange={handleTermsAgreeChange}>
                I agree to the terms and conditions
              </Checkbox>
            </Form.Item>
            <Form.Item>
              <Button type="default" onClick={() => setStep(2)}>
                Previous
              </Button>
              <Button type="primary" htmlType="submit" disabled={!termsAgreed}>
                Submit
              </Button>
            </Form.Item>
            {image && <img src={URL.createObjectURL(image)} alt="Uploaded" />}
          </Form>
        );
      default:
        return null;
    }
  };

  return (
    <div>
      <StudentNavbar />
      <Card>{renderFormStep()}</Card>
    </div>
  );
}

export default StudentPage;
