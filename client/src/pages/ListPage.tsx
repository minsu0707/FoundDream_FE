import { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import { getItems } from "../api/items";
import { LostItem } from "../types";
import ItemCard from "../components/ItemCard";
import Filter from "../components/Filter";

export default function ListPage() {
  const [items, setItems] = useState<LostItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [status, setStatus] = useState("");
  const [place, setPlace] = useState("");
  const [search, setSearch] = useState("");

  const fetchItems = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await getItems({
        status: status || undefined,
        place: place || undefined,
        q: search || undefined,
      });
      setItems(data);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "목록을 불러오는데 실패했습니다"
      );
    } finally {
      setLoading(false);
    }
  }, [status, place, search]);

  useEffect(() => {
    const debounce = setTimeout(() => {
      fetchItems();
    }, 300);
    return () => clearTimeout(debounce);
  }, [fetchItems]);

  return (
    <div className="list-page">
      <div className="page-header">
        <h1>찾아드림 | FoundDream</h1>
        <Link to="/new" className="btn btn-primary">
          + 분실물 등록
        </Link>
      </div>

      <Filter
        status={status}
        place={place}
        search={search}
        onStatusChange={setStatus}
        onPlaceChange={setPlace}
        onSearchChange={setSearch}
      />

      {loading && <div className="loading">로딩중...</div>}

      {error && <div className="error-banner">{error}</div>}

      {!loading && !error && items.length === 0 && (
        <div className="empty-state">
          <p>등록된 분실물이 없습니다.</p>
        </div>
      )}

      <div className="items-grid">
        {items.map((item) => (
          <ItemCard key={item._id} item={item} />
        ))}
      </div>
    </div>
  );
}
