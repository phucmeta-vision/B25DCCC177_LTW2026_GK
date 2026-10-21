import { formatMoney } from '../data';

const Home = ({ expenses }) => {
  const totalSpent = expenses.reduce((sum, item) => sum + item.amount, 0);
  const totalUnpaid = expenses.reduce(
    (sum, item) => (item.paid ? sum : sum + item.amount),
    0
  );

  return (
    <div>
      <h1>Chi tiêu cá nhân</h1>
      <p>Tổng số khoản chi: {expenses.length}</p>
      <p>Tổng số tiền đã chi: {formatMoney(totalSpent)}</p>
      <p>Tổng số tiền chưa thanh toán: {formatMoney(totalUnpaid)}</p>
    </div>
  );
};

export default Home;