import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import styled from 'styled-components';

const NavBarIcon = styled(Navbar.Toggle)`
  .navbar-toggler:focus {
    box-shadow: 0;
  }
  .navbar-toggler-icon {
    width: 1.25em;
  }
  padding: 0;
  border: 0;
`

function Header() {
  return (
    <Navbar expand="lg" className='navbar navbar-light navbar-expand-sm shadow bg-white px-4'>
      <Container>
        <Navbar.Brand href="/" className='navbar-brand ms-lg-5 strong-text a-nav'>
          <img 
            src="https://el-tinto-utils.s3.amazonaws.com/logos/el_tinto_imagotipo.png" 
            height="20" 
            alt='logo'
            style={{cursor: "pointer", verticalAlign: 0}}
          />
        </Navbar.Brand>
        <NavBarIcon aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto mb-lg-0">
            {/* <Nav.Link href="/suscribirse" style={{fontFamily: 'Arial'}}>¡Suscríbete!</Nav.Link> */}
            <Nav.Link href="/el-tinto-de-hoy" style={{fontFamily: 'Arial'}}>El Tinto de hoy</Nav.Link>
            <Nav.Link href="/faq" style={{fontFamily: 'Arial'}}>Preguntas frecuentes</Nav.Link>
            <Nav.Link href="/club-de-cata" style={{fontFamily: 'Arial'}}>Club de Cata</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;