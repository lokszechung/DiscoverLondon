import { useEffect } from 'react'
import { Container } from 'react-bootstrap'

import FiltersLucky from './FiltersLucky'

const Filters = ({ eventCode, setEventCode, checked, setChecked, search, setSearch, selectedDate, setSelectedDate, setMinDate, setMaxDate, setForSale, setInput, input, selectValue, setSelectValue}) => {

  const handleInput = (e) => {
    setInput(e.target.value)
  }

  const handleSearch = (e) => {
    e.preventDefault()
    setSearch(`&keyword=${input}`)
    console.log(search)
  }

  useEffect(() => {
    console.log(checked)
    checked ? setForSale('&ticketsavailable=true') : setForSale('')

  }, [checked])

  return (
    <div className="filters">
      <Container className='pt-4 filters-container '>
            <FiltersLucky eventCode={eventCode} setEventCode={setEventCode} selectedDate={selectedDate} setSelectedDate={setSelectedDate} setMinDate={setMinDate} setMaxDate={setMaxDate} selectValue={selectValue} setSelectValue={setSelectValue} />
            <div className='filters-right'>
              <div className="tickets-container">
                <input className="filter-input" type="checkbox" checked={checked} onChange={() => setChecked(!checked)}/>
                <label>Tickets Available Only</label>
              </div>
              <div className="search-container">
                <form onSubmit={handleSearch}>
                  <input className="filter-input p-2" type="search" id="search" name="search" onChange={handleInput} value={input}  placeholder='Search Events'/>
                </form>
              </div>
            </div>
      </Container>
    </div>
  )
}
export default Filters