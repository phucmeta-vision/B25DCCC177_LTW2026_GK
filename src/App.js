import { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import axios from 'axios';
import './App.css';
import Layout from './components/Layout';
import Home from './pages/Home';
import ExpenseList from './pages/ExpenseList';
import AddExpense from './pages/AddExpense';
import ExpenseDetail from './pages/ExpenseDetail';

const STORAGE_KEY = 'gk_expenses';

const App = () => {
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Mounting: đọc dữ liệu đã lưu, nếu chưa có thì gọi API
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        setExpenses(JSON.parse(saved));
        setLoading(false);
        return undefined;
      } catch (err) {
        // dữ liệu lưu bị hỏng -> gọi API
      }
    }

    const controller = new AbortController();
    axios
      .get('/data/expenses.json', { signal: controller.signal })
      .then((res) => {
        setExpenses(res.data);
        setLoading(false);
      })
      .catch((err) => {
        if (axios.isCancel(err)) return;
        setError(err.message || 'error');
        setLoading(false);
      });

    // Unmounting: hủy request đang chạy
    return () => {
      controller.abort();
    };
  }, []);

  // Updating: lưu dữ liệu sau khi đã tải xong
  useEffect(() => {
    if (!loading && !error) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(expenses));
    }
  }, [expenses, loading, error]);

  const addExpense = (newExpense) => {
    setExpenses((prev) => {
      const maxId = prev.reduce((max, item) => (item.id > max ? item.id : max), 0);
      return [...prev, { ...newExpense, id: maxId + 1, paid: false }];
    });
  };

  const deleteExpense = (id) => {
    setExpenses((prev) => prev.filter((item) => item.id !== id));
  };

  const togglePaid = (id) => {
    setExpenses((prev) =>
      prev.map((item) => (item.id === id ? { ...item, paid: !item.paid } : item))
    );
  };

  return (
    <Routes>
      <Route path="/" element={<Layout loading={loading} error={error} />}>
        <Route index element={<Home expenses={expenses} />} />
        <Route
          path="expenses"
          element={
            <ExpenseList
              expenses={expenses}
              onDelete={deleteExpense}
              onToggle={togglePaid}
            />
          }
        />
        <Route path="expenses/new" element={<AddExpense onAdd={addExpense} />} />
        <Route path="expenses/:id" element={<ExpenseDetail expenses={expenses} />} />
      </Route>
    </Routes>
  );
};

export default App;