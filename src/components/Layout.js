import { Outlet } from 'react-router-dom';
import NavBar from './NavBar';

const Layout = ({ loading, error }) => {
  let body;
  if (loading) {
    body = <p>Đang tải...</p>;
  } else if (error) {
    body = <p>Không tải được dữ liệu</p>;
  } else {
    body = <Outlet />;
  }

  return (
    <div>
      <NavBar />
      <div className="content">{body}</div>
    </div>
  );
};

export default Layout;
