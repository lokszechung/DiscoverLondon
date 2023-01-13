# Discover London ***REDEPLOY***

This is my second project completed at the end of week 6 of General Assembly's Software Engineering bootcamp, having learned some advanced JavaScript, and the basic fundamentals of APIs and React for two weeks.

The aim of this project was to use React to create an application that consumed a public API. We used the Skiddle API to display events in and around London, and the user can filter the events according to type of event, date and ticket availability. The user can also click through on the main display page to get more information on specific events, or use the ‘I’m feeling lucky’ feature to get a random event recommended to them. 

- **Project timeframe:** 1.5 days
- **Team size:** 2 

[Check it out here!](discover-london-events.netlify.app)

![Discover London Homepage](/readme-images/discover-london-1.png)
_Homepage_
![Discover London Index Page](/readme-images/discover-london-2.png)
_Index Page_
![Discover London Single Page](/readme-images/discover-london-3.png)
_Single Page_

#### Technologies Used
- JavaScript
- React
- CSS3, Sass
- Bootstrap
- Git & GitHub
- Insomnia

#### Brief
- The app must consume a public API
- Must have several components
- The app can have a router
- Include wireframes designed before building the app
- Must be deployed online and made accessible to the public

---

## Planning

### Wireframe & Pseudocode - Day 1

My partner and I looked into public APIs and decided to use the Skiddle API to display events. We found that this displayed events all around the UK, so in order that we could keep the project manageable, we scaled this down to use only events in London. 

We went onto Excalidraw and began wireframing the app, and decided which components to include and which features we would incorporate. Initially, we divided up the components between us; I would take the index page and my partner would take the home page and single events page. However, we both wanted to be involved on all aspects of the app, and so we decided to divide up some features on each component. This allowed both of us to work on all aspects; for instance I would take the index page, but give some of the filter features to my partner to work on. 

We communicated often over Zoom and Slack to ensure we were on track, to problem-solve and to discuss any changes that may have needed to be implemented. 

![wireframe](/readme-images/wireframe.png)
_Wireframe_

---

## Build Process

### Testing the API

The first step in the process was to test the API and ensure we understood how the API is structured. We read through the documentation to familiarise ourselves the endpoints the API provided, and tested them using Insomnia. Once we made sense of how the API worked, we determined which parameters along with the endpoint we would use to send our API requests.

My partner and I also decided that for the single event pages, it would be useful to include Google Maps indicating the location of the event. I went away and found a Google link that catered to this, given the data that was returned to us from the Skiddle API request. Using the link, I dynamically changed the latitude and longitude for each venue, by using ```event.venue.latitude``` and ```event.venue.longitude```,  as this information was given to us from the Skiddle API. 
```
src={`https://www.google.com/maps/embed/v1/place?key=AIzaSyALd_bYvfEc51wNsGxL8ZHFHjYk4aHi_mA&q=${event.venue.latitude},${event.venue.longitude}`}>
```
### Displaying Events

The second step of the process was to create the events index page, where the grid for the results returned from the API would be displayed.

1. I sent a request to the API endpoint, with the parameters we wanted. Inside the ```useEffect```, using an async await function, I used the get method to return a response from the API. Using ```useState```, define a variable called ```events``` in which to store the returned results to be displayed. Unfortunately, this API returns a maximum of 100 results each time, rather than all results (which is understandable, given that there are a plethora of events that can be returned). So when it came to the filtering process, I had to pass the filter requirements in as parameters in the API url. And each time results were to be filtered, I would run a new get request to the API with the new parameters and display them accordingly. 
```
useEffect(() => {
  const getEvents = async () => {
    try {
      const apiKey = 'api_key=7544cdafe70d0b9d8a15ae17a08a53fd'
      const ldnCoord = 'latitude=51.509865&longitude=-0.118092&radius=40'
      const { data } = await axios.get(`https://www.skiddle.com/api/v1/events/search/?${apiKey}&${ldnCoord}&descriptions=1&limit=100${eventCode}${minDate}${maxDate}${search}${forSale}`)
      setEvents(data.results)
    } catch (err) {
      console.log(err)
      setError(err.message ? err.message : err)
    }
  }
  getEvents()
}, [eventCode, minDate, maxDate, search, forSale ])
```
2. Mapping through the events array, along with Bootstrap components, I displayed each event in its own card. I included an image, and other crucial information, separating the text using icons from FontAwesome. If no results are returned, the user can see ‘no results found’.
```
<Row className="events-row mt-4">
  {!error ?
    events ? 
      events.length > 0 ? 
        events.map(event => {
          const { id, eventname, date, venue, openingtimes, xlargeimageurl, minage, entryprice } = event
          const eventDate = new Date(date).toDateString()
          return (
            <Col key={id} className="event-card mb-4 col-8 col-sm-6 col-md-4 offset-md-0 col-lg-3 offset-lg-0">
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
      <Container className='no-container'>
        <h1>No events found</h1>
      </Container>
    :
    <Spinner className="my-5" animation="border" variant="warning" />
  :
  <Container className='no-container'>
    <h1>Uh oh! Something went wrong...</h1>
  </Container>
  }
</Row>
```

### Creating Filters

The next step in the process was to create the filters and have them return specific results.

**Filter by Type of Event**

1. As mentioned earlier, each filter should return a response from a new get request. In order to filter for types of event, an ```eventTypes``` array is created, inside of which contains individual objects, each containing 2 keys, ```code``` and ```value```. The value for the ```code``` in the key-value pair is the parameter to be included in the API url. The value of the ```value``` in the key-value pair is what should be displayed on the filter, which will also be the value of the select dropdown. For example, when ‘All’ is selected, this means no parameter is to be passed, hence the ```code``` is an empty string. 
```
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
```
2. ```optionValues``` was defined, which maps though the eventTypes array and returns an array of the ```value``` values. 
```
const optionValues = eventTypes.map(type => type.value)
```
3. The function ```typeChange``` was created to handle when the user chooses a new type to filter. The function will find the object containing the value selected by the user, and set React state ```eventCode``` as the value of the ```code``` key in the object by using ```setEventCode```. ```eventCode``` will now be the parameter which is included in the API url. 
```
const [ eventCode, setEventCode ] = useState('')
const [ selectValue, setSelectValue ] = useState('All')
```
```
const typeChange = (e) => {
  const findObject = eventTypes.find(type => type.value === e.target.value)
  setEventCode(findObject.code)
  setSelectValue(e.target.value)
}
```

**Date Filter**

To create the date-picker, I imported and used the date-picker from React. The function ```dateChange``` is used to handle when a new date is chosen. ```setSelectedDate``` sets the React state ```selectedDate``` (which is, by default, today's date) the date to the one that is selected. We define the ```minDateFormat``` and ```maxDateFormat``` by taking the date selected, transforming it to ISO string then splitting it and finally taking the first item in the object returned to get the date in dd-mm-yyyy format, which is what is required to be passed as a parameter. This then will be passed into the API url. 
```
  const [ selectedDate, setSelectedDate ] = useState(new Date())
  const [ minDate, setMinDate ] = useState('')
  const [ maxDate, setMaxDate ] = useState('')
```
```
const dateChange = (date) => {
  setSelectedDate(date)
  const minDateFormat = `&minDate=${date.toISOString().split('T')[0]}`
  const maxDateFormat = `&maxDate=${date.toISOString().split('T')[0]}`
  setMinDate(minDateFormat)
  setMaxDate(maxDateFormat)
}
```

**Reset**

Finally, in the navbar, link this to the pages specified. In order that all filters are reset when the user presses ‘Show All Events’, we run a function ```resetAll```  when it is clicked. This function resets all states to empty strings or default values.

```
const resetAll = () => {
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
```

### Bugs

- Some images might not load, because we were not permitted or authorised to use these items. 
- The format of events prices may seem inconsistent or confusing, as this was how the API returned its results. 

---

## Reflection

### Challenges 

- Working as a pair for the first time in a project was a challenge, as we would sometimes find ourselves working on the same thing when we intended to work on separate sections. This also proved to be a little problematic when it came to merging on GitHub. This was a good project to demonstrate the need for clear communication within the team. 

### Wins

- Using the ```eventTypes``` array of objects, because streamlined the filtering of event types process. Rather than having to write many lines of conditional JavaScript, it is much cleaner to use the array of objects, and write some code to match the filter value with that in the array. This also makes it a lot simplier if there were ever any additions to the types of events, as all I would need to do is add one object, rather than writing more lines of conditional code. 
- Using React hooks and React components, and seeing how it can all come together in one app. 
- Using Bootstrap aided the design process and saved time on styling when time was limited. 

### Key Takeaways

- Solidfying my understanding and practical usage of useState and useEffect. Being able to see what works and what doesn't when using these helped me to learn from mistakes and from trial and error. 
- It is important to keep clear, open lines of communication when working within a group. However, I enjoyed working in a group, because it opens the doors for bigger, better ideas, more efficient problem solving and fresh perspectives.  

### Future Improvements

- Use of pagination to include more results, particularly for results filtered with fewer results returned in the first 100 events. 
- The ability to select a range of dates instead of just one date. 



