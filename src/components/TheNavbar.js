import { Container, Nav, Navbar } from "react-bootstrap"
import { Link } from "react-router-dom"

const TheNavbar = ({ setEventCode, setSelectedDate, setMinDate, setMaxDate, setSearch, setForSale, setChecked, setInput, setSelectValue }) => {

  const resetAll = () => {
    console.log('reset')
    setEventCode('')
    setMinDate('')
    setMaxDate('')
    setSearch('')
    setForSale('')
    setChecked(false)
    setInput('')
    setSelectValue('All')
    setSelectedDate(new Date())
  }


  return (
    <Navbar collapseOnSelect expand="md" variant="dark" className="TheNavbar pb-0" data-toggle='collapse' data-target=".navbar-collapse" >
      <Container >
        <Nav.Link as={Link} to="/" className="slogan pe-1" >Discover London</Nav.Link>
        <Navbar.Toggle aria-controls="basic-navbar-nav"/>
        <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end" >
          <Nav >
            <Nav.Link className="text-end" onClick={resetAll} as={Link} to="/events"><strong>See All Events</strong></Nav.Link>
            <p className="splitter d-none d-md-inline-block" style={ {color: 'orangered', padding: '6px' } } >|</p>
            <Nav.Link className="text-end" onClick={resetAll} as={Link} to="/events/lucky"><strong>I'm Feeling Lucky</strong></Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )

}
export default TheNavbar