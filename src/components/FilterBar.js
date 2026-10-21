import { CATEGORIES } from '../data';

const FilterBar = ({ keyword, onKeywordChange, category, onCategoryChange }) => (
  <div className="filter-bar">
    <div className="form-row">
      <label htmlFor="search">Tìm kiếm</label>
      <input
        id="search"
        type="text"
        value={keyword}
        onChange={(e) => onKeywordChange(e.target.value)}
      />
    </div>
    <div className="form-row">
      <label htmlFor="filter-category">Danh mục</label>
      <select
        id="filter-category"
        value={category}
        onChange={(e) => onCategoryChange(e.target.value)}
      >
        <option value="Tất cả">Tất cả</option>
        {CATEGORIES.map((c) => (
          <option key={c} value={c}>
            {c}
          </option>
        ))}
      </select>
    </div>
  </div>
);

export default FilterBar;