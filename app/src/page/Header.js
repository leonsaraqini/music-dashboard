import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { auth } from '../firebase';
import { useNavigate } from 'react-router-dom';
import { signOut } from "firebase/auth";

const Header = ({ user , userData}) => {
    const navigate = useNavigate();

    const handleLogout = async() => {               
      try{
        await signOut(auth);
        navigate("/");
        alert("Signed out successfully");

      }catch(error){
        
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
      }
      
  }

  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container fluid>
        <Navbar.Brand href="#">Project Test</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: '100px' }}
            navbarScroll
          >
            <Nav.Link href="/">Home</Nav.Link>

            {userData?.role === "admin" ? (<Nav.Link href="/add-music">Add Music</Nav.Link>) : (<></>)}
            
          </Nav>
          {user ? (
            <Button variant="primary" size="md" onClick={handleLogout}>
              Log Out
            </Button>
          ) : (
            <Button variant="primary" size="md" onClick={() => { navigate("/login"); }}>
              Sign In
            </Button>
          )}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;