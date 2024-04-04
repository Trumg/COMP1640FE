import React, { useState } from "react";
import {
  Card,
  Button,
  Form,
  Input,
  Upload,
  Checkbox,
  Tabs,
  Layout,
} from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { UploadChangeParam } from "antd/lib/upload/interface";
import { CheckboxChangeEvent } from "antd/lib/checkbox";
import StudentNavbar from "../../Components/Navbar/StudentNavbar";

const { TextArea } = Input;
const { TabPane } = Tabs;
const { Content } = Layout;
const { Dragger } = Upload;

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

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <StudentNavbar />
      <Content
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          padding: "50px",
        }}
      >
        <Card style={{ width: "80%", maxWidth: "800px" }}>
          <Tabs defaultActiveKey="1" activeKey={String(step)}>
            <TabPane tab="Step 1" key="1">
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
                  <button>Next</button>
                </Form.Item>
              </Form>
            </TabPane>
            <TabPane tab="Step 2" key="2">
              <Form onFinish={() => setStep(3)}>
                <Form.Item label="Image or Document">
                  <Dragger
                    onChange={handleImageChange}
                    fileList={[]}
                    showUploadList={false}
                  >
                    <p className="ant-upload-drag-icon">
                      <UploadOutlined />
                    </p>
                    <p className="ant-upload-text">
                      Click or drag file to this area to upload
                    </p>
                  </Dragger>
                </Form.Item>
                <Form.Item>
                  <button onClick={() => setStep(1)}>Previous</button>
                  <button>Next</button>
                </Form.Item>
              </Form>
            </TabPane>
            <TabPane tab="Step 3" key="3">
              <Form onFinish={handleSubmit}>
                <Form.Item>
                  <Checkbox
                    checked={termsAgreed}
                    onChange={handleTermsAgreeChange}
                  >
                    I agree to the terms and conditions
                  </Checkbox>
                </Form.Item>
                <Form.Item>
                  <Button type="default" onClick={() => setStep(2)}>
                    Previous
                  </Button>
                  <Button
                    type="primary"
                    htmlType="submit"
                    disabled={!termsAgreed}
                  >
                    Submit
                  </Button>
                </Form.Item>
                {image && (
                  <img src={URL.createObjectURL(image)} alt="Uploaded" />
                )}
              </Form>
            </TabPane>
          </Tabs>
        </Card>
      </Content>
    </Layout>
  );
}

export default StudentPage;
