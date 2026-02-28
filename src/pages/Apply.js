// src/pages/Apply.jsx
import React, { useState } from 'react';
import { Container, Row, Col, Form, Button, Card, Alert, ProgressBar } from 'react-bootstrap';
import { 
  FaUser, 
  FaEnvelope, 
  FaPhone, 
  FaCalendar, 
  FaGraduationCap,
  FaFileUpload,
  FaCheck,
  FaArrowRight,
  FaArrowLeft
} from 'react-icons/fa';
import { academicCalendar, departments } from '../assets/data/constants';
import './Apply.css';

const Apply = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    // Step 1: Personal Information
    firstName: '',
    lastName: '',
    gender: '',
    dateOfBirth: '',
    nationality: '',
    nationalId: '',
    
    // Step 2: Contact Information
    email: '',
    phone: '',
    address: '',
    city: '',
    province: '',
    
    // Step 3: Academic Information
    programOfInterest: '',
    entryLevel: '',
    previousSchool: '',
    graduationYear: '',
    previousGrades: '',
    
    // Step 4: Parent/Guardian Information
    parentName: '',
    parentPhone: '',
    parentEmail: '',
    parentOccupation: '',
    
    // Step 5: Documents
    documents: {
      birthCertificate: null,
      nationalId: null,
      academicTranscripts: null,
      recommendationLetter: null,
      passportPhoto: null
    },
    
    // Terms
    agreeToTerms: false,
    agreeToDataPrivacy: false
  });

  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [uploadProgress, setUploadProgress] = useState({});

  const programs = [
    'Software Development',
    'Building Construction',
    'Accounting',
    'Tourism & Hospitality',
    'Automobile Technology',
    'Multimedia Production',
    'General Education'
  ];

  const entryLevels = [
    'Year 1 (S1)',
    'Year 2 (S2)',
    'Year 3 (S3)',
    'Year 4 (S4)',
    'Year 5 (S5)',
    'Year 6 (S6)',
    'Advanced Diploma'
  ];

  const validateStep = (stepNumber) => {
    const newErrors = {};
    
    switch(stepNumber) {
      case 1:
        if (!formData.firstName) newErrors.firstName = 'First name is required';
        if (!formData.lastName) newErrors.lastName = 'Last name is required';
        if (!formData.gender) newErrors.gender = 'Gender is required';
        if (!formData.dateOfBirth) newErrors.dateOfBirth = 'Date of birth is required';
        if (!formData.nationality) newErrors.nationality = 'Nationality is required';
        break;
        
      case 2:
        if (!formData.email) newErrors.email = 'Email is required';
        else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) 
          newErrors.email = 'Invalid email address';
        if (!formData.phone) newErrors.phone = 'Phone number is required';
        if (!formData.address) newErrors.address = 'Address is required';
        break;
        
      case 3:
        if (!formData.programOfInterest) newErrors.programOfInterest = 'Program selection is required';
        if (!formData.entryLevel) newErrors.entryLevel = 'Entry level is required';
        if (!formData.previousSchool) newErrors.previousSchool = 'Previous school is required';
        break;
        
      case 4:
        if (!formData.parentName) newErrors.parentName = 'Parent/Guardian name is required';
        if (!formData.parentPhone) newErrors.parentPhone = 'Parent phone is required';
        break;
        
      case 5:
        if (!formData.agreeToTerms) newErrors.agreeToTerms = 'You must agree to the terms';
        if (!formData.agreeToDataPrivacy) newErrors.agreeToDataPrivacy = 'You must agree to data privacy';
        break;
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(step)) {
      setStep(step + 1);
      window.scrollTo(0, 0);
    }
  };

  const handlePrev = () => {
    setStep(step - 1);
    window.scrollTo(0, 0);
  };

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    
    if (type === 'checkbox') {
      setFormData(prev => ({
        ...prev,
        [name]: checked
      }));
    } else if (type === 'file') {
      const file = files[0];
      const fieldName = name.split('.')[1];
      const category = name.split('.')[0];
      
      // Simulate upload progress
      if (file) {
        setUploadProgress(prev => ({ ...prev, [fieldName]: 0 }));
        
        const interval = setInterval(() => {
          setUploadProgress(prev => {
            const newProgress = (prev[fieldName] || 0) + 10;
            if (newProgress >= 100) {
              clearInterval(interval);
              return { ...prev, [fieldName]: 100 };
            }
            return { ...prev, [fieldName]: newProgress };
          });
        }, 100);
        
        setFormData(prev => ({
          ...prev,
          [category]: {
            ...prev[category],
            [fieldName]: file
          }
        }));
      }
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
    
    // Clear error for this field
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: null }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (validateStep(5)) {
      try {
        // In a real application, you would send this to your backend
        console.log('Form submitted:', formData);
        
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 2000));
        
        setSubmitted(true);
      } catch (error) {
        console.error('Submission error:', error);
        setErrors({ submit: 'Failed to submit application. Please try again.' });
      }
    }
  };

  const progressPercentage = ((step - 1) / 5) * 100;

  if (submitted) {
    return (
      <Container className="apply-page">
        <Row className="justify-content-center">
          <Col md={8} lg={6}>
            <Card className="text-center p-5 success-card">
              <div className="success-icon mb-4">
                <FaCheck size={64} className="text-success" />
              </div>
              
              <h2 className="mb-3">Application Submitted Successfully!</h2>
              
              <p className="mb-4">
                Thank you for applying to Kirehe Adventist Technical Secondary School. 
                Your application has been received and is being processed.
              </p>
              
              <Alert variant="info" className="mb-4">
                <h5>Next Steps:</h5>
                <ol className="text-start mt-3">
                  <li>You will receive a confirmation email within 24 hours</li>
                  <li>Our admissions team will review your application</li>
                  <li>If selected, you'll be invited for an interview</li>
                  <li>Final admission decisions will be communicated within 2 weeks</li>
                </ol>
              </Alert>
              
              <div className="d-flex gap-3 justify-content-center">
                <Button variant="primary" href="/">
                  Return to Home
                </Button>
                <Button variant="outline-primary" href="/admissions/status">
                  Check Application Status
                </Button>
              </div>
            </Card>
          </Col>
        </Row>
      </Container>
    );
  }

  return (
    <Container className="apply-page">
      {/* Progress Bar */}
      <div className="application-progress mb-5">
        <div className="progress-header mb-3">
          <h2>Admission Application</h2>
          <p>Complete all steps to submit your application</p>
        </div>
        
        <ProgressBar now={progressPercentage} className="mb-4" />
        
        <div className="step-indicators d-flex justify-content-between">
          {[1, 2, 3, 4, 5].map((stepNum) => (
            <div 
              key={stepNum} 
              className={`step-indicator ${stepNum === step ? 'active' : stepNum < step ? 'completed' : ''}`}
            >
              <div className="step-number">{stepNum}</div>
              <div className="step-label">
                {stepNum === 1 && 'Personal Info'}
                {stepNum === 2 && 'Contact Info'}
                {stepNum === 3 && 'Academic Info'}
                {stepNum === 4 && 'Parent Info'}
                {stepNum === 5 && 'Documents'}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Application Form */}
      <Form onSubmit={handleSubmit}>
        {/* Step 1: Personal Information */}
        {step === 1 && (
          <Card className="step-card">
            <Card.Header>
              <h4 className="mb-0">
                <FaUser className="me-2" />
                Personal Information
              </h4>
            </Card.Header>
            
            <Card.Body>
              <Row>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>First Name *</Form.Label>
                    <Form.Control
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                      isInvalid={!!errors.firstName}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.firstName}
                    </Form.Control.Feedback>
                  </Form.Group>
                </Col>
                
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Last Name *</Form.Label>
                    <Form.Control
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                      isInvalid={!!errors.lastName}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.lastName}
                    </Form.Control.Feedback>
                  </Form.Group>
                </Col>
              </Row>
              
              <Row>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Gender *</Form.Label>
                    <Form.Select
                      name="gender"
                      value={formData.gender}
                      onChange={handleChange}
                      isInvalid={!!errors.gender}
                    >
                      <option value="">Select Gender</option>
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                    </Form.Select>
                    <Form.Control.Feedback type="invalid">
                      {errors.gender}
                    </Form.Control.Feedback>
                  </Form.Group>
                </Col>
                
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Date of Birth *</Form.Label>
                    <Form.Control
                      type="date"
                      name="dateOfBirth"
                      value={formData.dateOfBirth}
                      onChange={handleChange}
                      isInvalid={!!errors.dateOfBirth}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.dateOfBirth}
                    </Form.Control.Feedback>
                  </Form.Group>
                </Col>
              </Row>
              
              <Row>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Nationality *</Form.Label>
                    <Form.Control
                      name="nationality"
                      value={formData.nationality}
                      onChange={handleChange}
                      isInvalid={!!errors.nationality}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.nationality}
                    </Form.Control.Feedback>
                  </Form.Group>
                </Col>
                
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>National ID/Passport Number</Form.Label>
                    <Form.Control
                      name="nationalId"
                      value={formData.nationalId}
                      onChange={handleChange}
                    />
                  </Form.Group>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        )}

        {/* Step 2: Contact Information */}
        {step === 2 && (
          <Card className="step-card">
            <Card.Header>
              <h4 className="mb-0">
                <FaEnvelope className="me-2" />
                Contact Information
              </h4>
            </Card.Header>
            
            <Card.Body>
              <Form.Group className="mb-3">
                <Form.Label>Email Address *</Form.Label>
                <Form.Control
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  isInvalid={!!errors.email}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.email}
                </Form.Control.Feedback>
              </Form.Group>
              
              <Form.Group className="mb-3">
                <Form.Label>Phone Number *</Form.Label>
                <Form.Control
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  isInvalid={!!errors.phone}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.phone}
                </Form.Control.Feedback>
              </Form.Group>
              
              <Form.Group className="mb-3">
                <Form.Label>Address *</Form.Label>
                <Form.Control
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  isInvalid={!!errors.address}
                  as="textarea"
                  rows={2}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.address}
                </Form.Control.Feedback>
              </Form.Group>
              
              <Row>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>City</Form.Label>
                    <Form.Control
                      name="city"
                      value={formData.city}
                      onChange={handleChange}
                    />
                  </Form.Group>
                </Col>
                
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Province</Form.Label>
                    <Form.Control
                      name="province"
                      value={formData.province}
                      onChange={handleChange}
                    />
                  </Form.Group>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        )}

        {/* Step 3: Academic Information */}
        {step === 3 && (
          <Card className="step-card">
            <Card.Header>
              <h4 className="mb-0">
                <FaGraduationCap className="me-2" />
                Academic Information
              </h4>
            </Card.Header>
            
            <Card.Body>
              <Form.Group className="mb-3">
                <Form.Label>Program of Interest *</Form.Label>
                <Form.Select
                  name="programOfInterest"
                  value={formData.programOfInterest}
                  onChange={handleChange}
                  isInvalid={!!errors.programOfInterest}
                >
                  <option value="">Select Program</option>
                  {programs.map((program, index) => (
                    <option key={index} value={program}>{program}</option>
                  ))}
                </Form.Select>
                <Form.Control.Feedback type="invalid">
                  {errors.programOfInterest}
                </Form.Control.Feedback>
              </Form.Group>
              
              <Row>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Entry Level *</Form.Label>
                    <Form.Select
                      name="entryLevel"
                      value={formData.entryLevel}
                      onChange={handleChange}
                      isInvalid={!!errors.entryLevel}
                    >
                      <option value="">Select Entry Level</option>
                      {entryLevels.map((level, index) => (
                        <option key={index} value={level}>{level}</option>
                      ))}
                    </Form.Select>
                    <Form.Control.Feedback type="invalid">
                      {errors.entryLevel}
                    </Form.Control.Feedback>
                  </Form.Group>
                </Col>
                
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Academic Year</Form.Label>
                    <Form.Select>
                      <option>{academicCalendar.currentYear}</option>
                    </Form.Select>
                  </Form.Group>
                </Col>
              </Row>
              
              <Form.Group className="mb-3">
                <Form.Label>Previous School *</Form.Label>
                <Form.Control
                  name="previousSchool"
                  value={formData.previousSchool}
                  onChange={handleChange}
                  isInvalid={!!errors.previousSchool}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.previousSchool}
                </Form.Control.Feedback>
              </Form.Group>
              
              <Row>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Graduation Year</Form.Label>
                    <Form.Control
                      type="number"
                      name="graduationYear"
                      value={formData.graduationYear}
                      onChange={handleChange}
                      min="2000"
                      max="2025"
                    />
                  </Form.Group>
                </Col>
                
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Previous Grades</Form.Label>
                    <Form.Control
                      name="previousGrades"
                      value={formData.previousGrades}
                      onChange={handleChange}
                      placeholder="e.g., 75% average"
                    />
                  </Form.Group>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        )}

        {/* Step 4: Parent/Guardian Information */}
        {step === 4 && (
          <Card className="step-card">
            <Card.Header>
              <h4 className="mb-0">
                <FaUser className="me-2" />
                Parent/Guardian Information
              </h4>
            </Card.Header>
            
            <Card.Body>
              <Form.Group className="mb-3">
                <Form.Label>Full Name *</Form.Label>
                <Form.Control
                  name="parentName"
                  value={formData.parentName}
                  onChange={handleChange}
                  isInvalid={!!errors.parentName}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.parentName}
                </Form.Control.Feedback>
              </Form.Group>
              
              <Row>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Phone Number *</Form.Label>
                    <Form.Control
                      name="parentPhone"
                      value={formData.parentPhone}
                      onChange={handleChange}
                      isInvalid={!!errors.parentPhone}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.parentPhone}
                    </Form.Control.Feedback>
                  </Form.Group>
                </Col>
                
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                      type="email"
                      name="parentEmail"
                      value={formData.parentEmail}
                      onChange={handleChange}
                    />
                  </Form.Group>
                </Col>
              </Row>
              
              <Form.Group className="mb-3">
                <Form.Label>Occupation</Form.Label>
                <Form.Control
                  name="parentOccupation"
                  value={formData.parentOccupation}
                  onChange={handleChange}
                />
              </Form.Group>
              
              <Alert variant="info">
                <strong>Note:</strong> Parent/Guardian information is required for all applicants under 18 years old.
              </Alert>
            </Card.Body>
          </Card>
        )}

        {/* Step 5: Documents & Terms */}
        {step === 5 && (
          <Card className="step-card">
            <Card.Header>
              <h4 className="mb-0">
                <FaFileUpload className="me-2" />
                Required Documents & Terms
              </h4>
            </Card.Header>
            
            <Card.Body>
              <h5>Upload Required Documents</h5>
              <p className="text-muted mb-4">
                Please upload clear scans or photos of the following documents
              </p>
              
              <div className="document-uploads">
                {[
                  { name: 'birthCertificate', label: 'Birth Certificate' },
                  { name: 'nationalId', label: 'National ID/Passport' },
                  { name: 'academicTranscripts', label: 'Academic Transcripts' },
                  { name: 'recommendationLetter', label: 'Recommendation Letter' },
                  { name: 'passportPhoto', label: 'Passport Photo' }
                ].map((doc) => (
                  <Form.Group key={doc.name} className="mb-4">
                    <Form.Label>{doc.label}</Form.Label>
                    <Form.Control
                      type="file"
                      name={`documents.${doc.name}`}
                      onChange={handleChange}
                      accept=".pdf,.jpg,.jpeg,.png"
                    />
                    
                    {uploadProgress[doc.name] > 0 && (
                      <div className="mt-2">
                        <ProgressBar now={uploadProgress[doc.name]} className="mb-2" />
                        {uploadProgress[doc.name] === 100 && (
                          <small className="text-success">
                            ✓ Upload complete
                          </small>
                        )}
                      </div>
                    )}
                    
                    {formData.documents[doc.name] && (
                      <small className="text-muted d-block mt-1">
                        Selected: {formData.documents[doc.name].name}
                      </small>
                    )}
                  </Form.Group>
                ))}
              </div>
              
              <hr className="my-4" />
              
              <h5>Terms & Conditions</h5>
              
              <Form.Group className="mb-3">
                <Form.Check
                  type="checkbox"
                  name="agreeToTerms"
                  label="I agree to the Terms and Conditions of KATSS"
                  checked={formData.agreeToTerms}
                  onChange={handleChange}
                  isInvalid={!!errors.agreeToTerms}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.agreeToTerms}
                </Form.Control.Feedback>
              </Form.Group>
              
              <Form.Group className="mb-3">
                <Form.Check
                  type="checkbox"
                  name="agreeToDataPrivacy"
                  label="I agree to the Data Privacy Policy and give consent for my data to be processed"
                  checked={formData.agreeToDataPrivacy}
                  onChange={handleChange}
                  isInvalid={!!errors.agreeToDataPrivacy}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.agreeToDataPrivacy}
                </Form.Control.Feedback>
              </Form.Group>
              
              {errors.submit && (
                <Alert variant="danger" className="mt-3">
                  {errors.submit}
                </Alert>
              )}
            </Card.Body>
          </Card>
        )}

        {/* Navigation Buttons */}
        <div className="form-navigation mt-4">
          <div className="d-flex justify-content-between">
            {step > 1 ? (
              <Button variant="outline-primary" onClick={handlePrev}>
                <FaArrowLeft className="me-2" />
                Previous
              </Button>
            ) : (
              <div></div>
            )}
            
            {step < 5 ? (
              <Button variant="primary" onClick={handleNext}>
                Next
                <FaArrowRight className="ms-2" />
              </Button>
            ) : (
              <Button variant="success" type="submit" size="lg">
                Submit Application
              </Button>
            )}
          </div>
        </div>
      </Form>

      {/* Application Timeline */}
      <Card className="mt-5">
        <Card.Header>
          <h5 className="mb-0">Application Timeline</h5>
        </Card.Header>
        <Card.Body>
          <div className="timeline">
            <div className="timeline-item completed">
              <div className="timeline-marker"></div>
              <div className="timeline-content">
                <h6>Application Submission</h6>
                <p>Submit your complete application form</p>
              </div>
            </div>
            
            <div className="timeline-item">
              <div className="timeline-marker"></div>
              <div className="timeline-content">
                <h6>Document Verification</h6>
                <p>Our team will verify your documents (3-5 business days)</p>
              </div>
            </div>
            
            <div className="timeline-item">
              <div className="timeline-marker"></div>
              <div className="timeline-content">
                <h6>Entrance Exam/Interview</h6>
                <p>If shortlisted, you'll be invited for assessment</p>
              </div>
            </div>
            
            <div className="timeline-item">
              <div className="timeline-marker"></div>
              <div className="timeline-content">
                <h6>Admission Decision</h6>
                <p>Final decision communicated within 2 weeks of interview</p>
              </div>
            </div>
            
            <div className="timeline-item">
              <div className="timeline-marker"></div>
              <div className="timeline-content">
                <h6>Registration & Enrollment</h6>
                <p>Complete registration and fee payment</p>
              </div>
            </div>
          </div>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default Apply;