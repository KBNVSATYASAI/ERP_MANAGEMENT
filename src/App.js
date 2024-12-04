import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Footer from './footer';
import AddBus from './UI/Admin/Addbus';
import Addexam from './UI/Admin/Addexam';
import AddStudent from './UI/Admin/Addstudent';
import AddTeacher from './UI/Admin/Addteacher';
import AdminLogin from './UI/Admin/AdminLogin';
import AdminHome from './UI/Admin/AdminMainHome';
import UpdateStudentFee from './UI/Admin/Feeupdate';
import Newadmin from './UI/Admin/newadmin';
import ViewBus from './UI/Admin/viewBus';
import ViewAllStudents from './UI/Admin/viewStudent';
import ViewTeachers from './UI/Admin/viewTeacher';
import MainHome from './UI/mainhome';
import Seemarks from './UI/Student/marks';
import Studenthome from './UI/Student/Studenthome';
import StudentLoginPage from './UI/Student/Studentlogin';
import Addmarks from './UI/Teacher/Addmarks';
import Teacherhome from './UI/Teacher/Teacherhome';
import TeacherLogin from './UI/Teacher/TeacherLogin';
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainHome />} />

        <Route path="/viewstudents" element={<ViewAllStudents />} />
        <Route path="/AdminLogin" element={<AdminLogin />} />
        <Route path="/Adminhome" element={<AdminHome />} />
        <Route path="/studentlogin" element={<StudentLoginPage />} />
        <Route path="/Addstudent" element={<AddStudent/>}/>
        <Route path="/Addteacher" element={<AddTeacher/>}/>
        <Route path="/viewteachers" element={<ViewTeachers/>}/>
        <Route path="/updatefee" element={<UpdateStudentFee/>}/>
        <Route path="/addbus" element={<AddBus/>}/>
        <Route path="/viewbuses" element={<ViewBus/>}/>
        <Route path="/newadmin" element={<Newadmin/>}/>
        <Route path="/Studenthome" element={<Studenthome/>}/>
        <Route path="/teacherlogin" element={<TeacherLogin/>}/>
        <Route path="/Teacherhome" element={<Teacherhome/>}/>
        <Route path="/Addexam" element={<Addexam/>}/>
        <Route path="/Addmarks" element={<Addmarks/>}/>
        <Route path="seemarks" element={<Seemarks />}/>
        
        
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}
export default App;
