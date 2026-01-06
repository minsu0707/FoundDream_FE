import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { getItem, deleteItem, updateItem } from '../api/items';
import { LostItem } from '../types';

export default function DetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [item, setItem] = useState<LostItem | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const fetchItem = async () => {
      if (!id) return;
      try {
        setLoading(true);
        const data = await getItem(id);
        setItem(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : '항목을 찾을 수 없습니다');
      } finally {
        setLoading(false);
      }
    };
    fetchItem();
  }, [id]);

  const handleDelete = async () => {
    if (!id || !window.confirm('정말 삭제하시겠습니까?')) return;

    try {
      setDeleting(true);
      await deleteItem(id);
      navigate('/');
    } catch (err) {
      alert(err instanceof Error ? err.message : '삭제에 실패했습니다');
      setDeleting(false);
    }
  };

  const handleToggleStatus = async () => {
    if (!id || !item) return;

    try {
      const newStatus = item.status === 'OPEN' ? 'RESOLVED' : 'OPEN';
      const updated = await updateItem(id, { status: newStatus });
      setItem(updated);
    } catch (err) {
      alert(err instanceof Error ? err.message : '상태 변경에 실패했습니다');
    }
  };

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString('ko-KR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  if (loading) return <div className="loading">로딩중...</div>;
  if (error) return <div className="error-page">{error}</div>;
  if (!item) return <div className="error-page">항목을 찾을 수 없습니다</div>;

  return (
    <div className="detail-page">
      <div className="detail-header">
        <Link to="/" className="back-link">&larr; 목록으로</Link>
      </div>

      <article className="detail-content">
        <div className="detail-meta">
          <span className={`status-badge ${item.status.toLowerCase()}`}>
            {item.status === 'OPEN' ? '찾는중' : '해결됨'}
          </span>
          <span className="place-tag">{item.place}</span>
        </div>

        <h1>{item.title}</h1>

        <div className="detail-info">
          <div><strong>분실일:</strong> {formatDate(item.lostAt)}</div>
          <div><strong>등록일:</strong> {formatDate(item.createdAt)}</div>
          {item.contact && <div><strong>연락처:</strong> {item.contact}</div>}
        </div>

        <div className="detail-description">
          <h2>상세 설명</h2>
          <p>{item.description}</p>
        </div>

        <div className="detail-actions">
          <button
            onClick={handleToggleStatus}
            className={`btn ${item.status === 'OPEN' ? 'btn-success' : 'btn-warning'}`}
          >
            {item.status === 'OPEN' ? '해결됨으로 변경' : '찾는중으로 변경'}
          </button>
          <Link to={`/items/${id}/edit`} className="btn btn-secondary">
            수정
          </Link>
          <button
            onClick={handleDelete}
            className="btn btn-danger"
            disabled={deleting}
          >
            {deleting ? '삭제중...' : '삭제'}
          </button>
        </div>
      </article>
    </div>
  );
}
