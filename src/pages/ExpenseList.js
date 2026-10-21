import ExpenseTable from '../components/ExpenseTable';

const ExpenseList = ({ expenses, onDelete, onToggle }) => (
  <div>
    <ExpenseTable expenses={expenses} onDelete={onDelete} onToggle={onToggle} />
  </div>
);

export default ExpenseList;
