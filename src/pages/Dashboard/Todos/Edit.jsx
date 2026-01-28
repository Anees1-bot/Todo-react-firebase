import { Form, Typography, Input, Button, DatePicker, Select } from "antd"
import { useNavigate, useParams } from "react-router-dom"
import { useCallback, useEffect, useState } from "react"
import { useAuth } from "@/context/Auth"
import dayjs from "dayjs"
import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore"
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


const Edit = () => {

    const { user } = useAuth()
    const [state, setState] = useState(initialState)
    const [isProcessig, setIsProcessing] = useState(false);
    const navigate = useNavigate();

    const params = useParams()
    const handleChange = e => setState(s => ({ ...s, [e.target.name]: e.target.value }))

    const getTodo = useCallback(async () => {
        const { id } = params

        const docSnap = await getDoc(doc(firestore, "todos", id));

        if (docSnap.exists()) {
            const todo = docSnap.data()
            console.log('todo', todo)
            setState(todo)

        } else {
            // docSnap.data() will be undefined in this case
            console.log("No such document!");
            window.toastify("Todo not find", "error")

        }
    }, [params])

    useEffect(() => {
        getTodo()
    }, [getTodo])


    const handleSubmit = async () => {
        let { title, dueDate, description, priority, status, isCompleted } = state
        title = title.trim()
        if (title.length < 3) { return window.toastify("Please Enter Title", "error") }

        const todo = { title, dueDate, description, priority }

        todo.updatedAt = new Date().getTime()

        setIsProcessing(true)

        try {
            // await addDoc(collection(firestore, "todos"), todo);
            // await setDoc(doc(firestore, "todos", state.id), todo, { merge: true });
            await updateDoc(doc(firestore, "todos", state.id), todo);
            window.toastify("Todo updated successfully", "success")
            navigate("/dashboard/todos")
        } catch (error) {
            console.error("Error adding document: ", error);
            window.toastify("Something went wrong", "error")

        } finally {

            setIsProcessing(false)
        }
    }
    return (
        <main className='auth flex-center'>
            <div className="container">
                <div className="card p-3 p-4 mx-auto">
                    <div className="d-flex align-items-center justify-content-between mb-4">
                        <Title level={2} className="mb-0">Edit Todo</Title>
                        <Button type="primary" onClick={() => { navigate("/dashboard/todos") }}>Todos</Button>
                    </div>
                    <Form layout="vertical">
                        <Item label="Title" required>
                            <Input type="text" size="large" placeholder="Enter Todo Title" value={state.title} name="title" onChange={handleChange} />
                        </Item>
                        <Item label="Due Date">
                            <DatePicker size="large" placeholder="Enter Todo dueDate" value={state.dueDate ? dayjs(state.dueDate) : null} className="w-100" onChange={(obj, dueDate) => { setState(s => ({ ...s, dueDate })) }} />
                        </Item>
                        <Item label="Description">
                            <Input.TextArea placeholder="Enter Todo Description" value={state.description} name="description" onChange={handleChange} style={{ height: 100, resize: "none" }} />
                        </Item>
                        <Item label="Priority">
                            <Select size="large" placeholder="Select Todo Priority" value={state.priority} onChange={(priority) => { setState(s => ({ ...s, priority })) }} >
                                <Option value='low'>low</Option>
                                <Option value="medium">Medium</Option>
                                <Option value="high">High</Option>
                            </Select>
                        </Item>
                    </Form>
                    <Button type='primary' size='large' block htmlType="submit" loading={isProcessig} onClick={handleSubmit}>Edit Todo</Button>
                </div>
            </div>
        </main>
    )
}

export default Edit