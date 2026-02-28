export const schoolInfo = {
  name: 'Kirehe Adventist Technical Secondary School',
  shortName: 'KATSS',
  motto: 'Success Demands Aim',
  founded: 2004,
  location: 'Kirehe District, Eastern Province, Rwanda',
  contact: {
    phone: '+250 788 416 574',
    email: 'katsapapen@gmail.com',
    address: 'Kigina Sector, Kirehe District, Rwanda',
    coordinates: {
      lat: -2.07172055,
      lng: 30.70932825
    }
  },
  socialMedia: {
    facebook: 'https://facebook.com/katss',
    youtube: 'https://youtube.com/katss',
    twitter: 'https://twitter.com/katss',
    instagram: 'https://instagram.com/katss'
  },
  accreditation: [
    'Rwanda Workforce Development Authority (WDA)',
    'Ministry of Education (MINEDUC)',
    'Seventh-day Adventist Education Network'
  ]
};

export const stats = [
  { 
    icon: '👨‍🎓', 
    value: 1200, 
    label: 'Total Enrollment', 
    color: 'primary',
    suffix: '+',
    description: 'Students across all programs',
    trend: 'up',
    trendValue: '15%'
  },
  { 
    icon: '🎓', 
    value: 95, 
    label: 'Graduation Success', 
    color: 'success',
    suffix: '%',
    description: 'To Higher Ed / Employment',
    trend: 'up',
    trendValue: '5%'
  },
  { 
    icon: '🔧', 
    value: 6, 
    label: 'Technical Programs', 
    color: 'warning',
    description: 'Industry-focused training',
    trend: 'stable',
    trendValue: '0%'
  },
  { 
    icon: '👨‍🏫', 
    value: 75, 
    label: 'Dedicated Staff', 
    color: 'info',
    suffix: '+',
    description: 'Teaching & support staff',
    trend: 'up',
    trendValue: '10%'
  },
  { 
    icon: '📈', 
    value: 85, 
    label: 'Employment Rate', 
    color: 'primary',
    suffix: '%',
    description: 'Within 6 months of graduation',
    trend: 'up',
    trendValue: '8%'
  },
  { 
    icon: '🏆', 
    value: 20, 
    label: 'Years Experience', 
    color: 'dark',
    suffix: '+',
    description: 'Since establishment',
    trend: 'stable',
    trendValue: '0%'
  }
];

export const academicCalendar = {
  currentYear: '2025-2026',
  terms: [
    {
      term: 1,
      name: 'First Term',
      start: '2025-01-13',
      end: '2025-04-04',
      holidays: ['2025-02-01', '2025-03-08'],
      exams: '2025-03-25 to 2025-03-30'
    },
    {
      term: 2,
      name: 'Second Term',
      start: '2025-04-15',
      end: '2025-07-25',
      holidays: ['2025-05-01', '2025-07-01'],
      exams: '2025-07-20 to 2025-07-25'
    },
    {
      term: 3,
      name: 'Third Term',
      start: '2025-08-12',
      end: '2025-11-25',
      holidays: ['2025-09-25', '2025-10-26'],
      exams: '2025-11-20 to 2025-11-25'
    }
  ]
};

export const quickLinks = [
  { path: '/academics', label: 'Academic Calendar', icon: '📅' },
  { path: '/downloads/prospectus', label: 'School Prospectus', icon: '📘' },
  { path: '/admissions', label: 'Admission Form', icon: '📝' },
  { path: '/contact', label: 'Contact Directory', icon: '📞' },
  { path: '/gallery', label: 'Photo Gallery', icon: '📷' },
  { path: '/news-events', label: 'Latest News', icon: '📰' }
];

export const operatingHours = {
  school: {
    weekdays: '7:00 AM - 5:00 PM',
    saturday: '8:00 AM - 1:00 PM',
    sunday: 'Closed'
  },
  administration: {
    weekdays: '8:00 AM - 5:00 PM',
    saturday: '9:00 AM - 12:00 PM',
    sunday: 'Closed'
  },
  library: {
    weekdays: '8:00 AM - 8:00 PM',
    saturday: '9:00 AM - 5:00 PM',
    sunday: '2:00 PM - 6:00 PM'
  }
};

export const departments = [
  'Academic Department',
  'Administration',
  'Finance & Accounts',
  'Student Affairs',
  'ICT Department',
  'Library Services',
  'Sports Department',
  'Chaplaincy'
];