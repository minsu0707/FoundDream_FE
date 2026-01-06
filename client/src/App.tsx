import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ListPage from './pages/ListPage';
import DetailPage from './pages/DetailPage';
import CreatePage from './pages/CreatePage';
import EditPage from './pages/EditPage';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <div className="app">
        <Routes>
          <Route path="/" element={<ListPage />} />
          <Route path="/new" element={<CreatePage />} />
          <Route path="/items/:id" element={<DetailPage />} />
          <Route path="/items/:id/edit" element={<EditPage />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
