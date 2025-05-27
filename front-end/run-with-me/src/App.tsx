import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import CalculatorPage from './pages/CalculatorPage';
import './index.css'; // 전역 CSS 파일을 index.css로 가정 (App.css라면 해당 파일명으로)

function App(){
  return (
    <Router>
      <div className="app-container">
        <Header />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<CalculatorPage />} />
            <Route path="/calculator" element={<CalculatorPage />} />
            {/* 다른 라우트들을 여기에 추가 */}
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;