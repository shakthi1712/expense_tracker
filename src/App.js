import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Authentication from './pages/auth/Authentication';
import ExpenseTracker from './pages/expense/ExpenseTracker';


function App() {
  return (
    <div className="App p-0 m-0 bg-black" >
      <Router>
        <Routes>
          <Route path="/" element={<Authentication />} />
          <Route path="/expense-page" element={<ExpenseTracker />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
