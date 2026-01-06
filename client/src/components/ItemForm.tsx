import { useState, FormEvent } from 'react';
import { LostItemInput, PLACES } from '../types';

interface ItemFormProps {
  initialData?: Partial<LostItemInput>;
  onSubmit: (data: LostItemInput) => void;
  submitLabel: string;
  isLoading?: boolean;
}

interface FormErrors {
  title?: string;
  description?: string;
  place?: string;
  lostAt?: string;
}

export default function ItemForm({
  initialData,
  onSubmit,
  submitLabel,
  isLoading
}: ItemFormProps) {
  const [title, setTitle] = useState(initialData?.title || '');
  const [description, setDescription] = useState(initialData?.description || '');
  const [place, setPlace] = useState(initialData?.place || '');
  const [lostAt, setLostAt] = useState(
    initialData?.lostAt
      ? new Date(initialData.lostAt).toISOString().split('T')[0]
      : ''
  );
  const [status, setStatus] = useState(initialData?.status || 'OPEN');
  const [contact, setContact] = useState(initialData?.contact || '');
  const [errors, setErrors] = useState<FormErrors>({});

  const validate = (): boolean => {
    const newErrors: FormErrors = {};

    if (!title.trim()) {
      newErrors.title = '제목은 필수입니다';
    } else if (title.length < 2) {
      newErrors.title = '제목은 최소 2자 이상이어야 합니다';
    } else if (title.length > 60) {
      newErrors.title = '제목은 60자 이하여야 합니다';
    }

    if (!description.trim()) {
      newErrors.description = '설명은 필수입니다';
    } else if (description.length < 5) {
      newErrors.description = '설명은 최소 5자 이상이어야 합니다';
    } else if (description.length > 500) {
      newErrors.description = '설명은 500자 이하여야 합니다';
    }

    if (!place) {
      newErrors.place = '장소를 선택해주세요';
    }

    if (!lostAt) {
      newErrors.lostAt = '분실일을 입력해주세요';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    if (!validate()) return;

    onSubmit({
      title: title.trim(),
      description: description.trim(),
      place,
      lostAt: new Date(lostAt).toISOString(),
      status: status as 'OPEN' | 'RESOLVED',
      contact: contact.trim() || undefined,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="item-form">
      <div className="form-group">
        <label htmlFor="title">제목 *</label>
        <input
          id="title"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="예: 검정 지갑 찾습니다"
          className={errors.title ? 'error' : ''}
        />
        {errors.title && <span className="error-message">{errors.title}</span>}
      </div>

      <div className="form-group">
        <label htmlFor="description">설명 *</label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="분실물에 대한 상세 설명을 입력해주세요"
          rows={4}
          className={errors.description ? 'error' : ''}
        />
        {errors.description && <span className="error-message">{errors.description}</span>}
      </div>

      <div className="form-row">
        <div className="form-group">
          <label htmlFor="place">장소 *</label>
          <select
            id="place"
            value={place}
            onChange={(e) => setPlace(e.target.value)}
            className={errors.place ? 'error' : ''}
          >
            <option value="">장소 선택</option>
            {PLACES.map((p) => (
              <option key={p} value={p}>{p}</option>
            ))}
          </select>
          {errors.place && <span className="error-message">{errors.place}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="lostAt">분실일 *</label>
          <input
            id="lostAt"
            type="date"
            value={lostAt}
            onChange={(e) => setLostAt(e.target.value)}
            max={new Date().toISOString().split('T')[0]}
            className={errors.lostAt ? 'error' : ''}
          />
          {errors.lostAt && <span className="error-message">{errors.lostAt}</span>}
        </div>
      </div>

      <div className="form-group">
        <label htmlFor="status">상태</label>
        <select
          id="status"
          value={status}
          onChange={(e) => setStatus(e.target.value as 'OPEN' | 'RESOLVED')}
        >
          <option value="OPEN">찾는중</option>
          <option value="RESOLVED">해결됨</option>
        </select>
      </div>

      <div className="form-group">
        <label htmlFor="contact">연락처 (선택)</label>
        <input
          id="contact"
          type="text"
          value={contact}
          onChange={(e) => setContact(e.target.value)}
          placeholder="연락받을 전화번호 또는 이메일"
        />
      </div>

      <button type="submit" className="submit-btn" disabled={isLoading}>
        {isLoading ? '처리중...' : submitLabel}
      </button>
    </form>
  );
}
