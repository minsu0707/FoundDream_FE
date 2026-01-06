import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { getItem, updateItem } from '../api/items';
import { LostItem, LostItemInput } from '../types';
import ItemForm from '../components/ItemForm';

export default function EditPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [item, setItem] = useState<LostItem | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

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

  const handleSubmit = async (data: LostItemInput) => {
    if (!id) return;

    try {
      setSaving(true);
      setError(null);
      await updateItem(id, data);
      navigate(`/items/${id}`);
    } catch (err) {
      setError(err instanceof Error ? err.message : '수정에 실패했습니다');
      setSaving(false);
    }
  };

  if (loading) return <div className="loading">로딩중...</div>;
  if (error && !item) return <div className="error-page">{error}</div>;
  if (!item) return <div className="error-page">항목을 찾을 수 없습니다</div>;

  return (
    <div className="edit-page">
      <div className="page-header">
        <Link to={`/items/${id}`} className="back-link">&larr; 상세로 돌아가기</Link>
        <h1>분실물 수정</h1>
      </div>

      {error && <div className="error-banner">{error}</div>}

      <ItemForm
        initialData={item}
        onSubmit={handleSubmit}
        submitLabel="수정하기"
        isLoading={saving}
      />
    </div>
  );
}
