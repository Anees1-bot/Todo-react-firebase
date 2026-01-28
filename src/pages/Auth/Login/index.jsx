import { Form, Typography, Input, Button } from "antd"
import { Link, useNavigate } from "react-router-dom"
import { useState } from "react"
import { useAuth } from "@/context/Auth"
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/config/firebase";


const { Title, Paragraph } = Typography
const { Item } = Form

const initialState = {
  email: "",
  password: "",

}

const Login = () => {

  const { dispatch } = useAuth()
  const [state, setState] = useState(initialState)
  const [isProcessig, setIsProcessing] = useState(false);
  const navigate = useNavigate();

  const handleChange = e => setState(s => ({ ...s, [e.target.name]: e.target.value }))

  const handleLogin = (e) => {
    e?.preventDefault?.()
    let { email, password } = state

    setIsProcessing(true)

    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in 
        const user = userCredential.user;
        dispatch({ isAuth: true, user })
        navigate("/")
        window.toastify("Login sccessfully", "success")
        console.log('user', user)
        // ...
      })
      .catch((error) => {
        console.error(error)
        const errorCode = error.code;
        if (errorCode === "auth/invalid-credential") {
          return window.toastify("Invalid email or password ", "error")
        }

      })
      .finally(()=>{
        setIsProcessing(false)
      })



    // const users = (() => {
    //   const raw = localStorage.getItem("users")
    //   if (!raw) return []
    //   try {
    //     const parsed = JSON.parse(raw)
    //     return Array.isArray(parsed) ? parsed : []
    //   } catch {
    //     return []
    //   }
    // })()

    // const user = users.find(user => user.email === email && user.password === password)
    // if (!user) {
    //   setIsProcessing(false)
    //   return window.toastify("Invalid Email or Password", "error")
    // }



    // setTimeout(() => {
    //   localStorage.setItem("user", JSON.stringify(user))
    //   dispatch({ isAuth: true, user })
    //   navigate("/")
    //   setIsProcessing(false)
    //   window.toastify("Login sccessfully", "success")
    // }, 500)

  }


  return (
    <main className='auth flex-center'>
      <div className="container text-center">
        <div className="card p-3 p-4 mx-auto">
          <Title level={1} className="text-center">Login</Title>
          <Paragraph className="text-center">Don't have an account? <Link to="/auth/register">Register</Link></Paragraph>
          <Paragraph className="text-center">Forgot Password? <Link to="/auth/forgot-password">Reset Password</Link></Paragraph>

          <Form layout="vertical">
            <Item label="Email" required>
              <Input type="email" size="large" placeholder="Enter Your Email" name="email" onChange={handleChange} />
            </Item>
            <Item label="Password" required>
              <Input.Password size="large" placeholder="Enter Your Password" name="password" onChange={handleChange} />
            </Item>
          </Form>
          <Button type='primary' size='large' block htmlType="submit" loading={isProcessig} onClick={handleLogin}>Login</Button>
        </div>
      </div>
    </main>

  )
}

export default Login
