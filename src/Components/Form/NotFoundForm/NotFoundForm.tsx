import { Link } from "react-router-dom";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { NotFoundImage } from "../../../Assets/NotFoundImage/NotFoundImage";

const NotFoundForm: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="mb-8">
        <img src={NotFoundImage} width={400} height={400} alt="Login Image" />
      </div>
      <Link to="/" className="text-[#549b90]">
        <button>
          <ArrowLeftOutlined />
          &nbsp; Back to Homepage
        </button>
      </Link>
    </div>
  );
};

export default NotFoundForm;
