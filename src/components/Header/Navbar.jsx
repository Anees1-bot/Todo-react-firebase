import { Link, useNavigate } from 'react-router-dom'
import { Button, Space } from 'antd'
import { use } from 'react';
import { useAuth } from '@/context/Auth';

const Navbar = () => {
  const navigate = useNavigate();
  const { isAuth, handleLogout } = useAuth();

  return (
    <header>
      <nav className="navbar navbar-expand-lg bg-white shadow">
        <div className="container-fluid ps-4 pe-4">
          <Link to="/" className="navbar-brand fw-bold fs-4 text-primary me-auto">✓ Todos</Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0 gap-1">
              <li className="nav-item"><Link to="/" className="nav-link text-dark fw-500 px-3" >Home</Link> </li>
              <li className="nav-item"><Link to="/about" className="nav-link text-dark fw-500 px-3" >About</Link> </li>
              <li className="nav-item"><Link to="/contact" className="nav-link text-dark fw-500 px-3" >Contact</Link> </li>

            </ul>
            <div className="d-flex gap-3 ms-4">
              <Space size={8}>
                {isAuth ?
                  <>
                    <Button type='default' onClick={() => { navigate("/dashboard") }}>Dashboard</Button>
                    <Button danger onClick={handleLogout}>Logout</Button>
                  </> :
                  <>
                    <Button onClick={() => { navigate("/auth/login") }}>Login</Button>
                    <Button type='primary' onClick={() => { navigate("/auth/register") }}>Sign Up</Button>
                  </>
                }


              </Space>
            </div>
          </div>
        </div>
      </nav>
    </header>
  )
}

export default Navbar