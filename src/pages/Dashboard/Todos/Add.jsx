import { Form, Typography, Input, Button, DatePicker, Select } from "antd"
import { useNavigate } from "react-router-dom"
import { useState } from "react"
import { useAuth } from "@/context/Auth"
import { collection, addDoc, doc, setDoc } from "firebase/firestore"
import { firestore } from "@/config/firebase"



const { Title } = Typography
const { Item } = Form
const { Option } = Select

const initialState = {
    title: "",
    dueDate: "",
    description: "",
    priority: ""
}


const Add = () => {

    const { dispatch, user } = useAuth()
    const [state, setState] = useState(initialState)
    const [isProcessig, setIsProcessing] = useState(false);
    const navigate = useNavigate();

    const handleChange = e => setState(s => ({ ...s, [e.target.name]: e.target.value }))

    const handleSubmit = async (e) => {
        e?.preventDefault?.()
        let { title, dueDate, description, priority } = state
        title = title.trim()
        if (title.length < 3) { return window.toastify("Please Enter Title", "error") }

        const todo = { uid: user.uid, id: window.getRandomId(), title, dueDate, description, priority }
        todo.uid = user.uid
        todo.id = window.getRandomId()
        todo.status = "active"
        todo.isCompleted = false
        todo.createdAt = new Date().getTime()

        setIsProcessing(true)

        try {
            // await addDoc(collection(firestore, "todos"), todo);
            await setDoc(doc(firestore, "todos",todo.id), todo);    
            window.toastify("A new Todo has been sccessfully created", "success")
            navigate("/dashboard/todos")
        } catch (error) {
            console.error("Error adding document: ", error);
            window.toastify("Todo not created", "error")

        } finally {

            setIsProcessing(false)
        }

    }

    return (
        <main className='auth flex-center'>
            <div className="container">
                <div className="card p-3 p-4 mx-auto">
                    <div className="d-flex align-items-center justify-content-between mb-4">
                        <Title level={2} className="mb-0">Add Todo</Title>
                        <Button type="primary" onClick={() => { navigate("/dashboard/todos") }}>Todos</Button>
                    </div>
                    <Form layout="vertical">
                        <Item label="Title" required>
                            <Input type="text" size="large" placeholder="Enter Todo Title" name="title" onChange={handleChange} />
                        </Item>
                        <Item label="Due Date">
                            <DatePicker size="large" placeholder="Enter Todo dueDate" className="w-100" onChange={(obj, dueDate) => { setState(s => ({ ...s, dueDate })) }} />
                        </Item>
                        <Item label="Description">
                            <Input.TextArea placeholder="Enter Todo Description" name="description" onChange={handleChange} style={{ height: 100, resize: "none" }} />
                        </Item>
                        <Item label="Priority">
                            <Select size="large" placeholder="Select Todo Priority" onChange={(priority) => { setState(s => ({ ...s, priority })) }} >
                                <Option value='low'>low</Option>
                                <Option value="medium">Medium</Option>
                                <Option value="high">High</Option>
                            </Select>
                        </Item>
                        {/* <Item label="image">
                            <input type="file" className="form-control" />
                        </Item> */}
                    </Form>
                    <Button type='primary' size='large' block htmlType="submit" loading={isProcessig} onClick={handleSubmit}>Add Todo</Button>
                </div>
            </div>
        </main>
    )
}

export default Add