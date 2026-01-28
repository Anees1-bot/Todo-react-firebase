
import { useNavigate } from 'react-router-dom'
import { Typography, Button, Table, Space, Dropdown } from 'antd'
import { DeleteOutlined, EditOutlined, MoreOutlined } from '@ant-design/icons'
import { useState, useEffect } from "react"
import dayjs from 'dayjs'
import { collection, query, where, getDocs, deleteDoc, doc, orderBy } from "firebase/firestore";
import { firestore } from '@/config/firebase'
import { useAuth } from '@/context/Auth'


const { Title, Text } = Typography

const All = () => {

    const { user } = useAuth()
    const [todos, setTodos] = useState([])
    const [isLoading, setIsloading] = useState(false)
    const navigate = useNavigate()

    const getTodos = async () => {
        setIsloading(true)
        const querySnapshot = await getDocs(query(collection(firestore, "todos"),
            where("uid", "==", user.uid), orderBy("createdAt", "desc")));
        const array = []
        querySnapshot.forEach((doc) => {
            const todo = doc.data()
            array.push({ ...todo, key: todo.id })
            console.log('todo', todo)
        });
        setTodos(array)
        setIsloading(false)

    }

    useEffect(() => {
        getTodos()
    }, [])

    const handleDelete = async (todo) => {

        try {
            await deleteDoc(doc(firestore, "todos", todo.id));
            const filteredTodos = todos.filter(item => item.id !== todo.id)
            setTodos(filteredTodos)
            window.toastify("Todo deleted successfully", "success")
        } catch (error) {
            console.error(error)
            window.toastify("Something went wrong while deleting todo", "success")
        }

    }

    const columns = [
        { title: 'Title', dataIndex: 'title' },
        { title: 'Due Date', dataIndex: 'dueDate' },
        { title: 'Description', dataIndex: 'description' },
        { title: 'Priority', dataIndex: 'priority', render: text => <Text className='text-capitalize'>{text}</Text> },
        { title: 'Date Created', dataIndex: 'createdAt', render: text => <Text className='text-capitalize'>{dayjs(text).format("ddd DD-MMM-YY, hh:mm:ss A")}</Text> },

        {
            title: 'Action',
            render: (_, record) => (
                <Dropdown menu={{
                    items: [
                        { label: "Edit", key: "edit", icon: <EditOutlined />, onClick: () => { navigate(`/dashboard/todos/edit/${record.id}`) } },
                        { label: "Delete", key: "delete", icon: <DeleteOutlined />, onClick: () => { handleDelete(record) } }
                    ]
                }} trigger={['click']}>
                    <Button className='border-0' icon={<MoreOutlined />} />
                </Dropdown>
            ),
        },
    ];

    return (
        <main className='py-5 '>
            <div className="container">
                <div className="d-flex align-items-center justify-content-between mb-4">
                    <Title level={2} className="mb-0">Todo</Title>
                    <div className='d-flex flex-row mb-3 gap-2'>
                        <Button type="primary" className='py-3' onClick={() => { navigate("/dashboard") }}>Dashboard</Button>
                        <Button type="primary" className='py-3' onClick={() => { navigate("/dashboard/todos/add") }}>Add Todos</Button>
                    </div>
                </div>
                <Table columns={columns} dataSource={todos} loading={isLoading} />
            </div>
        </main>
    )
}

export default All