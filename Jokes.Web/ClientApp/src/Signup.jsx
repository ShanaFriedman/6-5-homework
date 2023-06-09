import React, {useState} from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
    const navigate = useNavigate()
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email:'',
        password:''
    })

    const onTextChange = e => {
        const copy = {...formData}
        copy[e.target.name] = e.target.value
        setFormData(copy)
        console.log(formData)
    }

    const onSubmit = async e => {
        e.preventDefault()
        await axios.post('/api/account/signup', formData)
        navigate('/')
    }
    return(<><div className="col-md-6 offset-md-3 bg-light p-4 rounded shadow">
    <h3>Sign up for a new account</h3>
    <form onSubmit={onSubmit}>
      <input
        type="text"
        name="firstName"
        placeholder="First Name"
        className="form-control"
        value={formData.firstName}
        onChange={onTextChange}
      />
      <br />
      <input
        type="text"
        name="lastName"
        placeholder="Last Name"
        className="form-control"
        value={formData.lastName}
        onChange={onTextChange}
      />
      <br />
      <input
        type="text"
        name="email"
        placeholder="Email"
        className="form-control"
        value={formData.email}
        onChange={onTextChange}
      />
      <br />
      <input
        type="password"
        name="password"
        placeholder="Password"
        className="form-control"
        value={formData.password}
        onChange={onTextChange}
      />
      <br />
      <button className="btn btn-primary">
        Signup
      </button>
    </form>
  </div></>)
}

export default Signup