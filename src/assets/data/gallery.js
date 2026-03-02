// src/assets/data/gallery.js

export const galleryImages = [
  {
    id: 1,
    title: 'Modern Computer Laboratory',
    description: 'Students working in our state-of-the-art computer lab equipped with latest technology',
    category: 'Facilities',
    image: '/images/lab.jpg',
    date: '2025-10-15',
    featured: true,
    tags: ['Technology', 'ICT', 'Facilities'],
    size: 'landscape'
  },
  {
    id: 2,
    title: 'Science Experiment Session',
    description: 'Chemistry students conducting experiments in the science laboratory',
    category: 'Academics',
    image: '/images/student.jpeg',
    date: '2025-10-10',
    featured: true,
    tags: ['Science', 'Laboratory', 'Experiments'],
    size: 'portrait'
  },
  {
    id: 3,
    title: 'Building Construction Workshop',
    description: 'Practical training in modern construction techniques',
    category: 'Technical Training',
    image: '/images/bdc.jpg',
    date: '2025-10-05',
    featured: false,
    tags: ['Construction', 'Workshop', 'Practical'],
    size: 'landscape'
  },
  {
    id: 4,
    title: 'Graduation Ceremony 2024',
    description: 'Celebrating our graduates with proud families and faculty',
    category: 'Events',
    image: '/images/student.jpg',
    date: '2024-11-28',
    featured: true,
    tags: ['Graduation', 'Ceremony', 'Achievement'],
    size: 'landscape'
  },
  {
    id: 5,
    title: 'Sports Day Competition',
    description: 'Annual inter-house sports competition',
    category: 'Sports',
    image: '/images/sport.jpg',
    date: '2025-09-15',
    featured: false,
    tags: ['Sports', 'Competition', 'Activities'],
    size: 'landscape'
  },
  {
    id: 6,
    title: 'Library Study Session',
    description: 'Students utilizing our extensive library resources',
    category: 'Facilities',
    image: '/images/library.jpg', // Fixed path (removed /gallery/ subfolder)
    date: '2025-10-01',
    featured: false,
    tags: ['Library', 'Study', 'Resources'],
    size: 'portrait'
  },
  {
    id: 7,
    title: 'Cultural Day Performance',
    description: 'Traditional dance performance during cultural celebrations',
    category: 'Cultural',
    image: '/images/cultural-day.jpg', // Fixed path (removed /gallery/ subfolder)
    date: '2025-09-20',
    featured: true,
    tags: ['Culture', 'Performance', 'Traditional'],
    size: 'landscape'
  },
  {
    id: 8,
    title: 'Automobile Technology Class',
    description: 'Hands-on training in vehicle maintenance and repair',
    category: 'Technical Training',
    image: '/images/automobile-class.jpg', // Fixed path (removed /gallery/ subfolder)
    date: '2025-10-12',
    featured: false,
    tags: ['Automobile', 'Workshop', 'Training'],
    size: 'landscape'
  },
  {
    id: 9,
    title: 'School Compound',
    description: 'Beautiful view of our school campus',
    category: 'Campus',
    image: '/images/1000005151.jpg',
    date: '2025-03-01',
    featured: true,
    tags: ['Campus', 'Facilities', 'School'],
    size: 'landscape'
  },
  {
    id: 10,
    title: 'Classroom Learning',
    description: 'Students engaged in interactive classroom sessions',
    category: 'Academics',
    image: '/images/1000003811.jpg',
    date: '2025-01-15',
    featured: true,
    tags: ['Classroom', 'Learning', 'Students'],
    size: 'landscape'
  },
  {
    id: 11,
    title: 'Professional Accountant',
    description: 'Accounting students during practical session',
    category: 'Academics',
    image: '/images/account.jpg',
    date: '2025-02-15',
    featured: true,
    tags: ['Accounting', 'Students', 'Professional'],
    size: 'landscape'
  },
  {
    id: 12,
    title: 'Automobile Technology',
    description: 'Students practicing automobile repairs',
    category: 'Technical Training',
    image: '/images/1000004516.png',
    date: '2025-03-10',
    featured: true,
    tags: ['Automobile', 'Workshop', 'Technical'],
    size: 'landscape'
  },
  {
    id: 13,
    title: 'Tourism Students',
    description: 'Students on educational tour',
    category: 'Tourism',
    image: '/images/tourism.jpeg',
    date: '2025-03-15',
    featured: false,
    tags: ['Tourism', 'Travel', 'Students'],
    size: 'landscape'
  }
];

export const galleryVideos = [
  {
    id: 101,
    title: 'Campus Virtual Tour',
    description: 'Complete tour of KATSS campus facilities and infrastructure',
    category: 'Campus',
    video: '/videos/campus-tour.mp4',
    thumbnail: '/images/tors.jpg', // Using actual image from your folder
    duration: '3:45',
    date: '2025-10-01',
    featured: true,
    tags: ['Tour', 'Facilities', 'Campus']
  },
  {
    id: 102,
    title: 'BDC Practice Session',
    description: 'Students in Building Construction practice',
    category: 'Technical Training',
    video: '/images/1000005142 (1).mp4', // Video file with space in name
    thumbnail: '/images/bdc.jpg', // Using existing image as thumbnail
    duration: '2:30',
    date: '2025-02-05',
    featured: true,
    tags: ['Construction', 'Practice', 'Students']
  },
  {
    id: 103,
    title: 'Tourism Trip',
    description: 'Tourism students on educational trip',
    category: 'Tourism',
    video: '/images/tour.mp4',
    thumbnail: '/images/tourism.jpeg', // Using tourism image as thumbnail
    duration: '4:15',
    date: '2025-02-18',
    featured: false,
    tags: ['Tourism', 'Trip', 'Students']
  },
  {
    id: 104,
    title: 'Campus Tour 2024',
    description: 'Virtual tour of our modern facilities',
    category: 'Campus',
    video: '/images/tors.mp4',
    thumbnail: '/images/tors.jpg',
    duration: '3:45',
    date: '2025-01-10',
    featured: true,
    tags: ['Tour', 'Campus', 'Facilities']
  }
];

// Helper function to update category counts dynamically
const getCategoryCount = (category) => {
  const imageCount = galleryImages.filter(img => 
    img.category === category || 
    (category === 'academics' && img.category === 'Academics') ||
    (category === 'technical' && img.category === 'Technical Training') ||
    (category === 'events' && img.category === 'Events') ||
    (category === 'cultural' && img.category === 'Cultural') ||
    (category === 'sports' && img.category === 'Sports') ||
    (category === 'campus' && img.category === 'Campus') ||
    (category === 'tourism' && img.category === 'Tourism') ||
    (category === 'facilities' && img.category === 'Facilities')
  ).length;
  
  const videoCount = galleryVideos.filter(vid => 
    vid.category === category ||
    (category === 'campus' && vid.category === 'Campus') ||
    (category === 'technical' && vid.category === 'Technical Training') ||
    (category === 'tourism' && vid.category === 'Tourism')
  ).length;
  
  return imageCount + videoCount;
};

export const galleryCategories = [
  { id: 'all', name: 'All Media', icon: 'FaImages', count: galleryImages.length + galleryVideos.length },
  { id: 'facilities', name: 'Facilities', icon: 'FaBuilding', count: getCategoryCount('facilities') },
  { id: 'academics', name: 'Academics', icon: 'FaBook', count: getCategoryCount('academics') },
  { id: 'technical', name: 'Technical Training', icon: 'FaTools', count: getCategoryCount('technical') },
  { id: 'events', name: 'Events', icon: 'FaCalendar', count: getCategoryCount('events') },
  { id: 'sports', name: 'Sports', icon: 'FaFutbol', count: getCategoryCount('sports') },
  { id: 'cultural', name: 'Cultural', icon: 'FaMusic', count: getCategoryCount('cultural') },
  { id: 'campus', name: 'Campus', icon: 'FaTree', count: getCategoryCount('campus') },
  { id: 'tourism', name: 'Tourism', icon: 'FaGlobe', count: getCategoryCount('tourism') }
];