import { PLACES } from '../types';

interface FilterProps {
  status: string;
  place: string;
  search: string;
  onStatusChange: (status: string) => void;
  onPlaceChange: (place: string) => void;
  onSearchChange: (search: string) => void;
}

export default function Filter({
  status,
  place,
  search,
  onStatusChange,
  onPlaceChange,
  onSearchChange,
}: FilterProps) {
  return (
    <div className="filter-bar">
      <div className="filter-group">
        <label htmlFor="filter-status">상태</label>
        <select
          id="filter-status"
          value={status}
          onChange={(e) => onStatusChange(e.target.value)}
          data-testid="status-filter"
        >
          <option value="">전체</option>
          <option value="OPEN">찾는중</option>
          <option value="RESOLVED">해결됨</option>
        </select>
      </div>

      <div className="filter-group">
        <label htmlFor="filter-place">장소</label>
        <select
          id="filter-place"
          value={place}
          onChange={(e) => onPlaceChange(e.target.value)}
        >
          <option value="">전체</option>
          {PLACES.map((p) => (
            <option key={p} value={p}>{p}</option>
          ))}
        </select>
      </div>

      <div className="filter-group search">
        <label htmlFor="filter-search">검색</label>
        <input
          id="filter-search"
          type="text"
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="제목으로 검색..."
        />
      </div>
    </div>
  );
}
