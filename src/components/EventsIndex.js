
import { useEffect, useState } from 'react'
// import { Link } from 'react-router-dom'
import axios from 'axios'

import TheNavbar from "./TheNavbar"
// import Calendar from './Calendar'
import 'react-datepicker/dist/react-datepicker.css'

import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Card from 'react-bootstrap/Card'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLocationDot, faCalendarDays, faClock, faSterlingSign, faUser } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom'
import Filters from './Filters'

const Events = () => {

  const [ events, setEvents ] = useState([])
  const [ eventCode, setEventCode ] = useState('')
  const [ selectedDate, setSelectedDate ] = useState(new Date())
  const [ search, setSearch ] = useState('')
  const [ checked, setChecked ] = useState(false)
  const [ forSale, setForSale ] = useState('')
  const [ minDate, setMinDate ] = useState('')
  const [ maxDate, setMaxDate ] = useState('')
  


  useEffect(() => {
    const getEvents = async () => {
      try {
        const apiKey = 'api_key=7544cdafe70d0b9d8a15ae17a08a53fd'
        const ldnCoord = 'latitude=51.509865&longitude=-0.118092&radius=40'
        const { data } = await axios.get(`https://www.skiddle.com/api/v1/events/search/?${apiKey}&${ldnCoord}&descriptions=1&limit=100${eventCode}${minDate}${maxDate}${search}${forSale}`)
        setEvents(data.results)
        console.log(data.results)
      } catch (err) {
        console.log('here -> ' + err.data)
      }
    }
    getEvents()
  }, [eventCode, minDate, maxDate, search, forSale])

  
  return (
    <>
      <TheNavbar />
      <Filters eventCode={eventCode} setEventCode={setEventCode} checked={checked} setChecked={setChecked} search={search} setSearch={setSearch} selectedDate={selectedDate} setSelectedDate={setSelectedDate} setMinDate={setMinDate} setMaxDate={setMaxDate} setForSale={setForSale}/>
      <main className="events-page">
        <Container className='mt-4'>
          <Row className="events-row">
            {events.length > 0 ? 
              events.map(event => {
                const { id, eventname, date, venue, openingtimes, xlargeimageurl, minage, entryprice } = event
                const eventDate = new Date(date).toDateString()
                return (
                  <Col key={id} className="event-card mb-4 col-8 offset-2 col-sm-6 offset-sm-0 col-md-4 offset-md-0 col-lg-3 offset-lg-0">
                    <Link to={`/events/${id}`}>
                      <Card>
                        <div className="card-image" style={{ backgroundImage: `url(${xlargeimageurl})` }}></div>
                        <Card.Body>
                          <Card.Title className='mb-0'>{eventname}</Card.Title>
                          <Card.Text className='mb-0'><span><FontAwesomeIcon className="icon" icon={faLocationDot}/></span>  {venue.name}</Card.Text>
                          <Card.Text className='mb-0'><span><FontAwesomeIcon className="icon" icon={faCalendarDays}/></span>  {eventDate}</Card.Text>
                          <Card.Text className='mb-0'><span><FontAwesomeIcon className="icon" icon={faClock}/></span>  {openingtimes.doorsopen} till {openingtimes.doorsclose}</Card.Text>
                          <Card.Text className='mb-0'><span><FontAwesomeIcon className="icon" icon={faSterlingSign}/></span>  { entryprice ? `${entryprice}` : 'Free admission' }</Card.Text>
                          <Card.Text className='mb-0'><span><FontAwesomeIcon className="icon" icon={faUser}/></span>  { (!minage || minage === '0') ? 'No age restriction' : `Minimum age ${minage}`}</Card.Text>
                        </Card.Body>
                      </Card>
                    </Link>
                  </Col>
                )
              })
              :
              <Container className='mt-6 no-container'>
                No events found.
              </Container>
            }
          </Row>
        </Container>
      </main>
    </>
  )
}

export default Events

