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
    image: '/images/gallery/library.jpg',
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
    image: '/images/gallery/cultural-day.jpg',
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
    image: '/images/gallery/automobile-class.jpg',
    date: '2025-10-12',
    featured: false,
    tags: ['Automobile', 'Workshop', 'Training'],
    size: 'landscape'
  }
];

export const galleryVideos = [
  {
    id: 1,
    title: 'Campus Virtual Tour',
    description: 'Complete tour of KATSS campus facilities and infrastructure',
    category: 'Campus',
    video: '/videos/campus-tour.mp4',
    thumbnail: '/images/gallery/video-thumb-1.jpg',
    duration: '3:45',
    date: '2025-10-01',
    featured: true,
    tags: ['Tour', 'Facilities', 'Campus']
  },
  {
    id: 2,
    title: 'Student Projects Exhibition',
    description: 'Showcase of innovative projects by technical students',
    category: 'Projects',
    video: '/videos/student-projects.mp4',
    thumbnail: '/images/gallery/video-thumb-2.jpg',
    duration: '4:20',
    date: '2025-09-25',
    featured: true,
    tags: ['Projects', 'Innovation', 'Exhibition']
  },
  {
    id: 3,
    title: 'Graduation Ceremony Highlights',
    description: 'Highlights from the 2024 graduation ceremony',
    category: 'Events',
    video: '/videos/graduation-highlights.mp4',
    thumbnail: '/images/gallery/video-thumb-3.jpg',
    duration: '2:30',
    date: '2024-11-28',
    featured: false,
    tags: ['Graduation', 'Ceremony', 'Achievement']
  },
  {
    id: 4,
    title: 'Technical Skills Workshop',
    description: 'Students demonstrating technical skills in various trades',
    category: 'Training',
    video: '/videos/technical-workshop.mp4',
    thumbnail: '/images/gallery/video-thumb-4.jpg',
    duration: '5:15',
    date: '2025-10-05',
    featured: false,
    tags: ['Workshop', 'Skills', 'Training']
  }
];

export const galleryCategories = [
  { id: 'all', name: 'All Media', count: galleryImages.length + galleryVideos.length },
  { id: 'facilities', name: 'Facilities', count: 2 },
  { id: 'academics', name: 'Academics', count: 1 },
  { id: 'technical', name: 'Technical Training', count: 2 },
  { id: 'events', name: 'Events', count: 2 },
  { id: 'sports', name: 'Sports', count: 1 },
  { id: 'cultural', name: 'Cultural', count: 1 },
  { id: 'campus', name: 'Campus', count: 1 },
  { id: 'projects', name: 'Projects', count: 1 }
];