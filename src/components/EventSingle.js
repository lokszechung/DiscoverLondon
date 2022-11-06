// import { useParams } from "react-router-dom"

import { faCalendarDays, faClock, faLocationDot, faSterlingSign, faUser } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import axios from "axios"
import { useState, useEffect } from "react"
import { Col, Container, Row } from "react-bootstrap"
import { useParams } from "react-router-dom"
import Footer from "./Footer"


import TheNavbar from "./TheNavbar"

const EventSingle = ({ luckyId }) => {
  const [ event, setEvent ] = useState(null)

  let { id } = useParams()

  !id && (id = luckyId)

  useEffect(() => {
    const getEvent = async () => {
      try {
        const apiKey = 'api_key=7544cdafe70d0b9d8a15ae17a08a53fd'
        const { data } = await axios.get(`https://www.skiddle.com/api/v1/events/${id}/?${apiKey}&descriptions=1`)
        setEvent(data.results)
        console.log(data.results)
      } catch (err) {
        console.log(err)
      }
    }
    getEvent()
  }, [id])

  function findTickets(){
    window.open(
      `https://www.google.com/search?q=${event.eventname} ${event.venue.name}`,
      '_blank' 
    );
  }


  return (
    <>
      <main className="eventSingle">
        {!luckyId && <TheNavbar />}
        <Container>
          
          {event ? 
            <>
              <h1>{event.eventname}</h1>
              <div className="subhead">
              {event.genres && event.genres.map(({ name, genreid }) => {
                return <div key={genreid} className="d-flex">
                    <h3>{name}</h3>
                  </div>
              })}
              {event.eventcode && 
                <>
                  <h3>{event.eventcode}</h3>
                </>}
              {/* {event.tickets ? 
                <>
                  <h3>Tickets Available</h3>
                </>
                :
                <>
                  <h3>SOLD OUT</h3>
                </>} */}
              </div>
            
              <Row className="mb-4">
                <Col className="imageBox sm-text-center">
                  <img src={event.largeimageurl} className="singleImage" alt="event"/>
                </Col>
                <Col className="d-flex flex-column justify-content-end">
                  <div className="infoDiv">
                    <h2>Description <small>by Organiser</small></h2>
                    <p className="desc">{event.description}</p>
                  </div>
                  <div className="infoDiv">
                    <p className='mb-0'><FontAwesomeIcon icon={faLocationDot}/>  {event.venue.name}</p>
                    <p className='mb-0'><FontAwesomeIcon icon={faCalendarDays}/>  {event.date}  <FontAwesomeIcon icon={faClock}/>  {event.openingtimes.doorsopen} till {event.openingtimes.doorsclose}</p>
                    <p className='mb-0'><FontAwesomeIcon icon={faSterlingSign}/>  { event.entryprice ? `${event.entryprice}` : 'Free admission' }</p>
                    <p className='mb-0'><FontAwesomeIcon icon={faUser}/>  { (!event.minage || event.minage === '0') ? 'No age restriction' : `Minimum age ${event.minage}`}</p>
                  </div>
                </Col>
              </Row>
              <button onClick={findTickets} className="btn btn-warning">Find Tickets</button>
              <hr />
              <Row className="mt-4">
                <div className="mapBox">
                  <iframe
                  title={event.id}
                  width="70%"
                  height="300"
                  src={`https://www.google.com/maps/embed/v1/place?key=AIzaSyALd_bYvfEc51wNsGxL8ZHFHjYk4aHi_mA&q=${event.venue.latitude},${event.venue.longitude}`}>
                  </iframe>
                </div>
              
              </Row>
            </>
            :
            <h1>something went wrong</h1>
          }
        </Container>
        <Footer />
      </main>
    </>
    
  )


}

export default EventSingle