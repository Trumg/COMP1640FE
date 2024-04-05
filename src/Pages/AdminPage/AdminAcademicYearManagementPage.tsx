import { useState, useEffect } from "react";
import AdminNavbar from "../../Components/Navbar/AdminNavbar";
import { Card, Select, Tabs, DatePicker } from "antd";

const { Option } = Select;
const { TabPane } = Tabs;

function AdminAcademicYearManagementPage() {
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const [selectedAcademicYear, setSelectedAcademicYear] = useState<string>("");
  const [activeTab, setActiveTab] = useState<string>("academicYear");
  const [closureDate, setClosureDate] = useState<string | null>(null);

  const handleAcademicYearChange = (value: string) => {
    setSelectedAcademicYear(value);
  };

  const handleClosureDateChange = (date: string | null) => {
    setClosureDate(date);
  };

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleTabChange = (key: string) => {
    setActiveTab(key);
  };

  return (
    <div>
      <AdminNavbar />
      <div className="flex justify-center items-center min-h-screen font-roboto">
        <div
          className={
            isMobile
              ? "w-full p-4 overflow-x-auto sticky top-24"
              : "w-full max-w-2xl p-4 sticky"
          }
          style={{ overflowX: isMobile ? "scroll" : "hidden" }}
        >
          <div className="flex justify-center">
            <Card
              className="transparent border-none rounded-lg p-6"
              style={{ width: "80%" }}
            >
              <div className="border-[#549b90] border-2 rounded-lg shadow-md p-6">
                <h1 className="text-xl font-bold mb-3">
                  Academic Year Management
                </h1>
                <Tabs activeKey={activeTab} onChange={handleTabChange}>
                  <TabPane tab="Academic Year" key="academicYear">
                    <form>
                      <div className="mt-4">
                        <label className="block mb-2">
                          <Select
                            placeholder="Select Academic Year"
                            onChange={handleAcademicYearChange}
                            className="w-full"
                            value={selectedAcademicYear}
                          >
                            <Option value="2023">2023</Option>
                            <Option value="2024">2024</Option>
                          </Select>
                        </label>
                        <div className="flex justify-end mt-4">
                          <button className="relative bg-[#549b90] text-black py-2 px-4 rounded-full w-full flex justify-center border border-[#549b90] transition duration-300 hover:text-gray-600 hover:border-[#549b90] focus:outline-none hover:bg-gray-200">
                            Publish
                          </button>
                        </div>
                      </div>
                    </form>
                  </TabPane>
                  <TabPane tab="Closure Dates" key="closureDates">
                    <div className="mt-4">
                      <DatePicker
                        onChange={handleClosureDateChange}
                        value={closureDate}
                        placeholder="Select Closure Date"
                        className="w-full"
                      />
                    </div>
                    <div className="flex justify-end mt-4">
                      <button className="relative bg-[#549b90] text-black py-2 px-4 rounded-full w-full flex justify-center border border-[#549b90] transition duration-300 hover:text-gray-600 hover:border-[#549b90] focus:outline-none hover:bg-gray-200">
                        Publish
                      </button>
                    </div>
                  </TabPane>
                </Tabs>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminAcademicYearManagementPage;
