import Signup from './signup';
import Login from './login';
import StudentDashboard from './StudentDashboard';
import TeacherDashboard from './TeacherDashboard';
import ManagementDashboard from './ManagementDashboard';
import StudentDetails from './studentDetails'; // Assuming the correct component name

import { BrowserRouter, Routes, Route } from 'react-router-dom';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='' element={<Signup />} />
        <Route path='/login' element={<Login />} />
        <Route path='/Signup' element={<Login />} />
        <Route path="/student-details/:email" element={<StudentDashboard />} />
        <Route path="/teacher-dashboard/:email" element={<TeacherDashboard />} />
        <Route path="/management-dashboard" element={<ManagementDashboard />} />
        <Route path="/studentDetails" element={<StudentDetails />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
