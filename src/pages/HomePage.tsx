import Hero from '../components/Hero'
import FeaturedDishes from '../components/FeaturedDishes'
import WhyUs from '../components/WhyUs'
import MenuPreview from '../components/MenuPreview'
import Testimonials from '../components/Testimonials'
import GalleryPreview from '../components/GalleryPreview'
import ContactCTA from '../components/ContactCTA'

const HomePage = () => {
  return (
    <main>
      <Hero />
      <FeaturedDishes />
      <WhyUs />
      <MenuPreview />
      <Testimonials />
      <GalleryPreview />
      <ContactCTA />
    </main>
  )
}

export default HomePage
