import { useState, useEffect } from 'react';
import FilterBar from '../components/FilterBar';
import ExpenseTable from '../components/ExpenseTable';

const ExpenseList = ({ expenses, onDelete, onToggle }) => {
  const [keyword, setKeyword] = useState('');
  const [category, setCategory] = useState('Tất cả');
  const [width, setWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const isMobile = width < 768;

  const filtered = expenses.filter(
    (item) =>
      item.title.toLowerCase().includes(keyword.toLowerCase()) &&
      (category === 'Tất cả' || item.category === category)
  );

  return (
    <div>
      <p>{`Chế độ: ${isMobile ? 'Điện thoại' : 'Máy tính'}`}</p>
      <FilterBar
        keyword={keyword}
        onKeywordChange={setKeyword}
        category={category}
        onCategoryChange={setCategory}
      />
      <p>{`Tìm thấy ${filtered.length} khoản chi`}</p>
      {filtered.length === 0 ? (
        <p>Không có dữ liệu</p>
      ) : (
        <div className={isMobile ? 'table-wrap mobile' : 'table-wrap'}>
          <ExpenseTable expenses={filtered} onDelete={onDelete} onToggle={onToggle} />
        </div>
      )}
    </div>
  );
};

export default ExpenseList;