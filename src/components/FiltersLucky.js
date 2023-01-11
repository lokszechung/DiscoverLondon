import ReactDatePicker from 'react-datepicker'
// import { useEffect } from 'react'

const FiltersLucky = ({ eventCode, setEventCode, selectedDate, setSelectedDate, setMinDate, setMaxDate, selectValue, setSelectValue }) => {

  const eventTypes = [ 
    { code:  '',
      value: 'All'},
    { code: '&eventcode=FEST', 
      value: 'Festivals' },
    { code: '&eventcode=LIVE', 
      value: 'Live music' },
    { code: '&eventcode=CLUB', 
      value: 'Clubbing/Dance music' },
    { code: '&eventcode=DATE', 
      value: 'Dating event' },
    { code: '&eventcode=THEATRE', 
      value: 'Theatre/Dance' },
    { code: '&eventcode=COMEDY', 
      value: 'Comedy' },
    { code: '&eventcode=EXHIB', 
      value: 'Exhibitions and Attractions' },
    { code: '&eventcode=KIDS', 
      value: 'Kids/Family event' },
    { code: '&eventcode=BARPUB', 
      value: 'Bar/Pub event' },
    { code: '&eventcode=LGB', 
      value: 'Gay/Lesbian event' },
    { code: '&eventcode=SPORT', 
      value: 'Sporting event' },
    { code: '&eventcode=ARTS', 
      value: 'The Arts' },
  ]

  const optionValues = eventTypes.map(type => type.value)

  const typeChange = (e) => {
    const findObject = eventTypes.find(type => type.value === e.target.value)
    setEventCode(findObject.code)
    setSelectValue(e.target.value)
  }

  const dateChange = (date) => {
    setSelectedDate(date)
    const minDateFormat = `&minDate=${date.toISOString().split('T')[0]}`
    const maxDateFormat = `&maxDate=${date.toISOString().split('T')[0]}`
    setMinDate(minDateFormat)
    setMaxDate(maxDateFormat)
    console.log(minDateFormat, maxDateFormat)
  }


  return (
    <div className='filters-left d-flex flex-column flex-md-row'>
      {/* <Col className="filter-col mb-4 col-8 offset-2 col-sm-6 offset-sm-0 col-md-4 offset-md-0 col-lg-3 offset-lg-0"> */}
      <div className="type-container">
        <label htmlFor="selectEventType">Type</label>
        <select className="filter-input px-1" onChange={typeChange} value={selectValue} name="selectEventType">
          {/* {eventTypes.map(type => <option key={Object.keys(type)} value={Object.keys(type)} id={Object.values(type)}>{Object.values(type)}</option>)} */}
          {optionValues.map(type => <option key={type} value={type}>{type}</option>)}
        </select>
      </div>
      <div className="date-container">
        <label htmlFor="calendar">Date</label>
        <ReactDatePicker 
          name="calendar"
          selected={selectedDate} 
          onChange={dateChange}
          dateFormat='dd/MM/yyyy'  
          minDate={new Date()}
          className="filter-input px-2"
        />
      </div>
    </div>
    
  )
}
export default FiltersLucky