# Discover London
#### Pair project  |  2 days  |  Front end

A React.js application leveraging Skiddle’s open API to display upcoming events in London with all the relevant filters, event information, an embedded map with the venue location, and a link to find tickets. It includes an ‘I’m feeling lucky’ feature that displays a random event which can be  filtered further by date and event type.

[Visit site](https://discoverlondon.netlify.app)


## Technologies used
- Third party API
- React.js
- Browser router, routes, links and useNavigate from React Router Dom
- useState and useEffect hooks
- Async function for Axios get requests to retrieve API data
- Google Maps embedding
- HTML5, CSS3, SASS
- Bootstrap
- Font Face
- Font Awesome
- React date picker


## Brief
The project must:
- Consume a public API
- Include several components
- Have a router
- Include wireframes
- Be deployed online


## Planning
Lok Sze and I began by looking into publicly available APIs and settled on the Skiddle events API as it seemed fairly well built out. We drew up a wireframe on Excalidraw of each of the main pages and how the components would fit together. With a goal in mind, we each took a task to start working on and maintained communication throughout to reprioritise actions. Rather than strictly splitting up the workload, we worked together throughout, each taking on new tasks as we progressed. This approach allowed us both to be fully involved with the whole production and problem solving process whilst minimising duplication of workload by reusing eachother’s code where possible.

![Wireframe](/assets/planning/wireframe.png)
<!-- <img src="./assets/planning/wireframe.png" width="80%" > -->

## Build Process
I started by setting up the main pages and their browser routes with React Router, navigable via a rough Navbar at the top of the page, so that we had a website skeleton to work from. 

Charged with the single event page, I set an :id placeholder in the browser route, to be obtained with useParams, in order to retrieve the corresponding event via a get request. With the Events Index page still in production, I started by creating the page as a stand alone component, preparing it to be linked up to the event listings later on. Following Skiddle’s documentation, I set an ID parameter on the Axios get request inside an async useEffect to retrieve a single event which I provisionally hardcoded. With the API response set in state, I built up the page around this single event, displaying the relevant information. I added a ‘find tickets’ button that performs a google search and embedded a google map of the venue location.
```
<iframe
  title={event.id}
  width="70%"
  height="300"
  src={`https://www.google.com/maps/embed/v1/place?key=AIzaSyALd_bYvfEc51wNsGxL8ZHFHjYk4aHi_mA
    &q=${event.venue.latitude},${event.venue.longitude}`}>
</iframe>
```
By this point, the Events Index page was developed enough to connect each event to the single page. All I had to do was add the link to each card that routed to the events single page and switch out the hard coded ID for the ID defined in useParams. With Lok Sze continuing to work on the event type and date filters, I added a search bar and check box that removes sold out events. As this was a feature on a component developed by Lok Sze, I found it helpful to first familiarise myself with what was going on and understand how he had implemented the existing filters. This way I could ensure that my additions would work in tandem with the preexisting code. 

The ‘I’m feeling lucky’ page was next on my to do list. This leveraged the single event component but fed in a random ‘lucky’ ID as a prop. The ID was generated from a get request for all non-sold-out events with a useEffect that set a randomly selected ID in state.
```
  useEffect(() => {
    const getEvents = async () => {
      try {
        const apiKey = 'api_key=7544cdafe70d0b9d8a15ae17a08a53fd'
        const ldnCoord = 'latitude=51.509865&longitude=-0.118092&radius=40'
        const { data } = await axios.get(`https://www.skiddle.com/api/v1/events/
          ?${apiKey}&${ldnCoord}&ticketsavailable=true${eventCode}${minDate}${maxDate}`)
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
```
It felt necessary to then be able to filter the generated event by date and event type to actually make it useful. Since the other filters weren’t really necessary, I segmented out the relevant filters into another subcomponent to be used here.

With the deadline approaching, we focused on smoothing out rough edges with SASS and Bootstrap.  


## Challenges
I had some persistent errors when linking up the single component to the ‘I’m feeling lucky’ page. I tried passing in a hardcoded ID as a prop in the execution of the single event component. This helped narrow down the location of the error and confirm that the single event component had been incorporated correctly. Then, I ran console logs in several places to understand what each state looked like at every stage. Talking myself through the flow of events, I realised the component was still trying to render before the luckyId state had been properly defined. The random ID was also trying to be set before events had been updated by the get request. These issues were fixed with a couple conditions on events.length, as shown above, and luckyId.length below.

Inside the return:
```
{luckyId.length > 0 && <EventSingle luckyId={luckyId} />}
```

## Wins
I really enjoyed working on this pair project and felt we worked very well together - checking in and running ideas past each other regularly. We were both able to help each other with problems we were facing as sometimes an outside view can see things in a different perspective and provide a backboard for discussing ideas. We got a lot done quickly by prioritising and completing tasks one by one. 

We leveraged components well to keep each section tidy and avoid repeating code. Whilst the web of components was at times a little confusing, it was good practice using props and understanding exactly which states were required where.
```
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
    <h1>Uh oh! Something went wrong...</h1>
    }
  </>
)
```
The functionality of the filters was very successful. They all work together and are reset when the Navbar link is clicked. I also like that the filters bar sticks at the top of the page as you scroll down.


## Key Takeaways
- Working with an API
- Get requests and async functions
- useState and useEffect hooks
- Leveraging components
- Browser router from React Router Dom
- Working as a pair on this type of project and merging code with Git


## Bugs
- While the event(s) are loading, a ‘no events found’ message is displayed as well as when no events are actually found
- There are some inconsistencies in the API that could be ironed out. For example, the format of the event price listed varies, sometimes including a pound sign, sometimes just a number.
- Some of the navbar links are broken


## Future Improvements
- With less than 2 days to complete the assignment and several features we wanted to implement, we didn’t spend too much time on the styling. Whilst it all looks clean, it would be nice to get a bit more creative with the website name and home page etc. 
- Add a spinner whilst the requests are sending and events pages loading
- Better error handling
- Functionality to like events or add to favourites that can be banked on a separate page
- The ability to register and log in so favourites can be saved
- In the initial mock up of the single events page, it displayed whether the event was sold out or if tickets were still available using the ‘tickets’ key in the API that had a boolean value. However, towards the end I realised that this was not always accurate with some events being incorrectly tagged as sold out. It would be good to use the ticketsavailable parameter on the initial request to accurately determine this.