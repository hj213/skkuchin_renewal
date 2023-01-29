import { useState, useEffect } from "react";
import { TextField, Button, Container, Typography } from '@mui/material';


const SignUpStep3 = () => {
    const [department, setDepartment] = useState('');
    const [studentId, setStudentId] = useState('');
  
    return (
      <div>
        <TextField
          label="Department"
          value={department}
          onChange={(e) => setDepartment(e.target.value)}
        />
        <TextField
          label="Student ID"
          value={studentId}
          onChange={(e) => setStudentId(e.target.value)}
        />
        <Button variant="contained" color="primary">
          Next
        </Button>
      </div>
    );
  };

  export default SignUpStep3;