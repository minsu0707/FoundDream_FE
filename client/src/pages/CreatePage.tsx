import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { createItem } from '../api/items';
import { LostItemInput } from '../types';
import ItemForm from '../components/ItemForm';

export default function CreatePage() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (data: LostItemInput) => {
    try {
      setLoading(true);
      setError(null);
      const created = await createItem(data);
      navigate(`/items/${created._id}`);
    } catch (err) {
      setError(err instanceof Error ? err.message : '등록에 실패했습니다');
      setLoading(false);
    }
  };

  return (
    <div className="create-page">
      <div className="page-header">
        <Link to="/" className="back-link">&larr; 목록으로</Link>
        <h1>분실물 등록</h1>
      </div>

      {error && <div className="error-banner">{error}</div>}

      <ItemForm
        onSubmit={handleSubmit}
        submitLabel="등록하기"
        isLoading={loading}
      />
    </div>
  );
}
