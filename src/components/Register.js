import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import regImg from '../assets/images/sigimg.png'
import { useState } from 'react'
import axios from 'axios'
import { toast } from 'sonner'
import { AiFillEye } from "react-icons/ai"
import { AiFillEyeInvisible } from "react-icons/ai"

const Register = () => {

  const navigate = useNavigate()

  const [formData, setData] = useState({
    name: "",
    email: "",
    password: "",
    password_confirmation: ""
  })

  const [passType, setType] = useState("password")

  const handlePassword = () => {
    (passType === "password")? setType("text"): setType("password")
  }

  const handleForm = (event) => {
     const {name, value} = event.target
     setData({
      ...formData, [name]: value
     })
  }

  const submitForm = (event) => {

    event.preventDefault()

    if (formData.password.length < 6) { //check password length
      toast.warning("The password must be at least 6 characters.")
    } else if (formData.password !== formData.password_confirmation) { //check if password and confirm password match
      toast.error("The passwords do not match.")
    } else {
      const promise = () => new Promise((resolve) => setTimeout(() => resolve({ name: 'Sonner' }), 1000)); //for loading toast
      
      toast.promise(promise, {
        loading: 'Please wait...',
        success: 'User successfully registered',
        error: 'Error',
      })

      axios.post('https://cyrilyoruba.juadebgabriel.com/yorubalearning/api/register_admin', formData)
      .then(response => {

        if (response.data.status === 'failed') { //check if email is taken
          return toast.warning(response.data.message.email[0])
        }
        navigate('/')
      })
      .catch(error => console.log("ERROR", error)) 
    }
  }
  

  return (
    <>
        <div className='row mx-0'>
            <div className='col col-sm-4 col-lg-5 col-xl-3 px-0 d-flex align-items-center register-img-div'>
              <img src={regImg} alt='' className='w-100 register-img'/>
            </div>

            <div className='register-form-div col col-sm-8 col-lg-7 col-xl-9 d-flex flex-column pt-5 gap-4 gap-md-5'>
              <h2 className='text-center fs-1 fw-normal mt-0 mt-md-5 mt-lg-0' data-aos='zoom-in' data-aos-delay='300'>Register</h2>

              <form onSubmit={submitForm} className='d-flex flex-column mx-auto gap-3 px-4 pt-4 pb-5 px-lg-5 py-lg-5 rounded-4 rounded-lg-5' data-aos='fade-up' data-aos-delay='700'>
                <div className='d-flex flex-column gap-2 gap-md-3'>
                <label htmlFor='name'>Name</label>
                <input type='text' id='name' name='name' placeholder='Enter Name' value={formData.name} onChange={handleForm} className='px-3 py-2 border-0 rounded-3' required/>
                </div>
                <div className='d-flex flex-column gap-2 gap-md-3'>
                <label htmlFor='email'>Email Address</label>
                <input type='email' id='email' name='email' placeholder='Enter Email Address' value={formData.email} onChange={handleForm} className='px-3 py-2 border-0 rounded-3' required/>
                </div>

                <div className='d-flex flex-column gap-2 gap-md-3'>
                <label htmlFor='password'>Password</label>
                <div className='position-relative'>
                <input type={passType} id='password' name='password' placeholder='Enter Password' value={formData.password} onChange={handleForm} className='px-3 py-2 border-0 rounded-3 w-100' required/>
                {(passType === "text")? <AiFillEye className='position-absolute top-50 end-0 translate-middle text-secondary fs-5' onClick={handlePassword}/>: <AiFillEyeInvisible className='position-absolute top-50 end-0 translate-middle text-secondary fs-5' onClick={handlePassword}/>}
                </div>
                </div>

                <div className='d-flex flex-column gap-2 gap-md-3'>
                <label htmlFor='cpassword'>Confirm Password</label>
                <input type={passType} id='cpassword' name='password_confirmation' placeholder='Confirm Password' value={formData.password_confirmation} onChange={handleForm} className='px-3 py-2 border-0 rounded-3 w-100' required/>
                </div>

                <button type='submit' className='btn btn-primary px-3 py-2 border-0 rounded-3 text-white'>Create account</button>
              </form>

              <span className='fw-semibold text-primary ps-3 fit-content'><Link to={'/'} className='text-decoration-none'>Login here</Link></span>

            </div>
        </div>
    </>
  )
}

export default Register
