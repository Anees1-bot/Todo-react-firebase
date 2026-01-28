import { Form, Typography, Input, Button } from "antd"
import { Link, useNavigate } from "react-router-dom"
import { useState } from "react"
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, firestore } from "@/config/firebase";
import { doc, serverTimestamp, setDoc } from "firebase/firestore";



const { Title, Paragraph } = Typography
const { Item } = Form

const initialState = {
  name: "",
  email: "",
  password: "",
  confirmPassword: ""
}

const Register = () => {

  const [state, setState] = useState(initialState)
  const [isProcessig, setIsProcessing] = useState(false);
  const navigate = useNavigate()

  const handleChange = e => setState(s => ({ ...s, [e.target.name]: e.target.value }))

  const handleRegister = (e) => {
    e?.preventDefault?.()
    let { name, email, password, confirmPassword } = state
    name = name.trim()
    if (name.length < 3) { return window.toastify("Please enter your fullname", "error") }
    if (!window.isValidEmail(email)) { return window.toastify("Please enter your valid email", "error") }
    if (password.length < 6) { return window.toastify("Password must be atleast 6 Characters", "error") }
    if (confirmPassword !== password) { return window.toastify("Password not matched", "error") }

    const userData = { name, email, status: "active", role: "customer" }

    setIsProcessing(true)

    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log('userCredential ', userCredential)
        console.log('user', user)
        userData.uid = user.uid
        createUserProfile(userData)
        window.toastify("User sccessfully created", "success")

      })
      .catch((error) => {
        const errorCode = error.code;
        setIsProcessing(false)
        if (errorCode === "auth/email-already-in-use") {
          return window.toastify("Email is already in use ", "error")
        }
        window.toastify("Something went wrong ", "error")
      })
  }

  const createUserProfile = async (userData) => {
    const user = userData
    user.createdAt = serverTimestamp()
    try {
      // await addDoc(collection(firestore, "todos"), todo);
      await setDoc(doc(firestore, "users", user.uid), user);
      window.toastify("User profile has been sccessfully created", "success")
      navigate("/dashboard/todos")
    } catch (error) {
      console.error("Error adding document: ", error);
      window.toastify("User not created", "error")
    } finally {
      setIsProcessing(false)
    }
  }


  return (
    <main className='auth flex-center'>
      <div className="container text-center">
        <div className="card p-3 p-4 mx-auto">
          <Title level={1} className="text-center">Register</Title>
          <Paragraph className="text-center">Already have an account? <Link to="/auth/login">Login</Link></Paragraph>

          <Form layout="vertical">
            <Item label="Full Name" required>
              <Input type="text" size="large" placeholder="Enter Your Full Name" name="name" onChange={handleChange} />
            </Item>
            <Item label="Email" required>
              <Input type="email" size="large" placeholder="Enter Your Email" name="email" onChange={handleChange} />
            </Item>
            <Item label="Password" required>
              <Input.Password size="large" placeholder="Enter Your Password" name="password" onChange={handleChange} />
            </Item>
            <Item label="Password" required>
              <Input.Password size="large" placeholder="Enter Your Password Again" name="confirmPassword" onChange={handleChange} />
            </Item>
          </Form>
          <Button type='primary' size='large' block htmlType="submit" loading={isProcessig} onClick={handleRegister}>Create Account</Button>
        </div>
      </div>
    </main>

  )
}

export default Register
