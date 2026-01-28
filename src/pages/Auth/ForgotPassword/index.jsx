import { Form, Typography, Input, Button } from "antd"
import { Link, useNavigate } from "react-router-dom"
import { useState } from "react"
import { useAuth } from "@/context/Auth"
import { sendPasswordResetEmail } from "firebase/auth"
import { auth } from "@/config/firebase"

const { Title, Paragraph } = Typography
const { Item } = Form

const initialState = {
  email: "",

}

const ForgotPassword = () => {

  const { dispatch } = useAuth()
  const [state, setState] = useState(initialState)
  const [isProcessig, setIsProcessing] = useState(false);
  const navigate = useNavigate();

  const handleChange = e => setState(s => ({ ...s, [e.target.name]: e.target.value }))

  const handleForgotPassword = (e) => {
    e?.preventDefault?.()
    let { email } = state

    setIsProcessing(true)

    sendPasswordResetEmail(auth, email)
      .then(() => {
        window.toastify("Password reset email sent!", "success")
        navigate("/auth/login")

      })
      .catch((error) => {
        console.error(error)
        const errorCode = error.code;
        const errorMessage = error.message;
        window.toastify("Something went wrong! Please try again", "error")

      })
      .finally(() => {

        setIsProcessing(false)
      })
  }


  return (
    <main className='auth flex-center'>
      <div className="container text-center">
        <div className="card p-3 p-4 mx-auto">
          <Title level={1} className="text-center">Reset Password</Title>
          <Paragraph className="text-center">Remember Password? <Link to="/auth/login">Login</Link></Paragraph>

          <Form layout="vertical">
            <Item label="Email" required>
              <Input type="email" size="large" placeholder="Enter Your Email" name="email" onChange={handleChange} />
            </Item>
          </Form>
          <Button type='primary' size='large' block htmlType="submit" loading={isProcessig} onClick={handleForgotPassword}>Send Email</Button>
        </div>
      </div>
    </main>

  )
}

export default ForgotPassword
