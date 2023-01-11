import axios from "axios"
import { useEffect, useState } from "react"
import { Container, Spinner } from "react-bootstrap"
import EventSingle from "./EventSingle"
import FiltersLucky from "./FiltersLucky"
import TheNavbar from "./TheNavbar"

const EventLucky = () => {

  const [ events, setEvents] = useState([])
  const [ eventCode, setEventCode ] = useState('')
  const [ selectedDate, setSelectedDate ] = useState(new Date())
  const [ minDate, setMinDate ] = useState('')
  const [ maxDate, setMaxDate ] = useState('')
  const [ luckyId, setLuckyId ] = useState('')
  const [ luckyError, setLuckyError ] = useState(null)

  
  useEffect(() => {
    const getEvents = async () => {
      try {
        const apiKey = 'api_key=7544cdafe70d0b9d8a15ae17a08a53fd'
        const ldnCoord = 'latitude=51.509865&longitude=-0.118092&radius=40'
        const { data } = await axios.get(`https://www.skiddle.com/api/v1/events/?${apiKey}&${ldnCoord}&ticketsavailable=true${eventCode}${minDate}${maxDate}`)
        setEvents(data.results)
      } catch (err) {
        console.log(err)
        setLuckyError(err.message ? err.message : err)
      }
    }
    getEvents()
  }, [eventCode, minDate, maxDate])

  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * events.length)
    events.length > 0 && setLuckyId(events[randomIndex].id)
  }, [events])

return (
  <>
    <TheNavbar />
    <div className="filters">
      <Container className="filters-container pt-4">
        <FiltersLucky eventCode={eventCode} setEventCode={setEventCode} selectedDate={selectedDate}
          setSelectedDate={setSelectedDate} setMinDate={setMinDate} setMaxDate={setMaxDate} />
      </Container>
    </div>
    {!luckyError ? 
      luckyId.length > 0 ?
        <EventSingle luckyId={luckyId} />
      :
      <Spinner className="my-5" animation="border" variant="warning" />
    :
    <Container className="no-container">
      <h1>Uh oh! Something went wrong...</h1>
    </Container>
    }
  </>
)

}
export default EventLucky