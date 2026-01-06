import { Link } from 'react-router-dom';
import { LostItem } from '../types';

interface ItemCardProps {
  item: LostItem;
}

export default function ItemCard({ item }: ItemCardProps) {
  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString('ko-KR');
  };

  return (
    <div className="item-card">
      <div className="item-header">
        <span className={`status-badge ${item.status.toLowerCase()}`}>
          {item.status === 'OPEN' ? '찾는중' : '해결됨'}
        </span>
        <span className="place-tag">{item.place}</span>
      </div>
      <h3 className="item-title">
        <Link to={`/items/${item._id}`}>{item.title}</Link>
      </h3>
      <p className="item-description">{item.description.slice(0, 80)}...</p>
      <div className="item-footer">
        <span className="lost-date">분실일: {formatDate(item.lostAt)}</span>
        <span className="created-date">등록일: {formatDate(item.createdAt)}</span>
      </div>
    </div>
  );
}
