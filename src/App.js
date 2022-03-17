import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import Chat from './component/Chat/Chat';
import Join from './component/Join/Join';

function App() {
  return (
    <BrowserRouter>
      <div>
        <Routes>
          <Route path="/" element={<Join />} />
          <Route path="/chat" element={<Chat />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
