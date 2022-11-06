import { Link } from 'react-router-dom'

const Home = () => {
  return (
    <main className='home'>
      <Link  to="/events" className='btn title'>Discover London</Link>
      <Link to="/events/lucky" className='btn lucky'>I'm feeling lucky...</Link>
    </main>
  )
}
export default Home