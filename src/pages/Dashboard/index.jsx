import { Route, Routes } from 'react-router-dom'
import Contact from './Contact'
import Home from './Home/Index'
import About from './About'
import Todos from './Todos'

const Dashboard = () => {
    return (
        <>
            
            <Routes>
                <Route path='/' element={<Home />} />
                <Route path='about' element={<About />} />
                <Route path='contact' element={<Contact />} />
                <Route path='todos/*' element={<Todos />} />

            </Routes>
            
        </>
    )
}

export default Dashboard