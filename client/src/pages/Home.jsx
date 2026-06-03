import React from 'react'
import Hero from '../components/Hero/Hero'
import CollectionShowcase from '../components/Body/CollectionShowcase'
import FeaturedProducts from '../components/product/FeaturedProducts'
import EditorialBanner from '../components/Body/EditorialBanner'
import BestSeller from '../components/product/BestSeller'
import BrandValue from '../components/Body/BrandValue'
import NewsLetter from '../components/Body/NewsLetter'


const Home = () => {
  return (
    <div>
      <Hero/>
      <CollectionShowcase/>
      <FeaturedProducts/>
      <EditorialBanner/>
      <BestSeller/>
      <BrandValue/>
      <NewsLetter/>
    </div>
  )
}

export default Home
