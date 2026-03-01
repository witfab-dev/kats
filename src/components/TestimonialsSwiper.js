import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';

// Swiper styles (already in your component)
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import TestimonialCard from './TestimonialCard';
import { testimonials } from '../assets/data/testimonials';
import './TestimonialsSwiper.css';

const TestimonialsSwiper = ({ featuredOnly = false }) => {
  // Validate testimonials data
  if (!testimonials || !Array.isArray(testimonials) || testimonials.length === 0) {
    return (
      <div className="text-center py-5">
        <p className="text-muted">No testimonials available at the moment.</p>
      </div>
    );
  }

  const testimonialList = featuredOnly
    ? testimonials.filter(t => t.featured)
    : testimonials;

  if (testimonialList.length === 0) {
    return (
      <div className="text-center py-5">
        <p className="text-muted">No featured testimonials found.</p>
      </div>
    );
  }

  return (
    <div className="testimonials-swiper-wrapper">
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        spaceBetween={30}
        slidesPerView={1}                // Force one slide per view
        navigation
        pagination={{ clickable: true }}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        loop={true}
        className="testimonials-swiper"
        // Optional: Add these to debug Swiper initialization
        onSwiper={(swiper) => console.log('Swiper initialized:', swiper)}
        onSlideChange={(swiper) => console.log('Slide index changed to:', swiper.realIndex)}
      >
        {testimonialList.map((testimonial) => (
          <SwiperSlide key={testimonial.id}>
            <div className="testimonial-slide-content">
              <TestimonialCard {...testimonial} />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default TestimonialsSwiper;