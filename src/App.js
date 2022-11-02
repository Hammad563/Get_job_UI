import { Routes, Route } from "react-router-dom";
import Auth from './pages/auth/index'
import UserPages from './pages/user/index'

function App() {
  console.log("props")
  return (
    <div className="App">
      <Routes>
        <Route path="/auth/*" element={<Auth></Auth>}></Route>
        <Route path="/*" element={<UserPages></UserPages>}></Route>
      </Routes>
    </div>
  );
}

export default App;
