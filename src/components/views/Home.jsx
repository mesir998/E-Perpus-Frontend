import Layout from '../Layout'
import AboutUs from './AboutUs'
import Footer from './fitur/Footer'
import Jumbotron from './fitur/Jumbotron'

function Home() {
  return (
    <Layout noPadding>
      <Jumbotron />

      <AboutUs />
    </Layout>
  )
}

export default Home
