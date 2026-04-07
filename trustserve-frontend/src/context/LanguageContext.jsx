import { createContext, useContext, useEffect, useMemo, useState } from 'react'

const LanguageContext = createContext(null)

const phraseMapHi = {
  'JWT-ready Auth UI': 'JWT-तैयार ऑथ UI',
  'Email is required': 'ईमेल आवश्यक है',
  'Password is required': 'पासवर्ड आवश्यक है',
  'Name is required': 'नाम आवश्यक है',
  'City is required': 'शहर आवश्यक है',
  'Password must be at least 6 characters': 'पासवर्ड कम से कम 6 अक्षरों का होना चाहिए',
  'Password and confirm password do not match': 'पासवर्ड और कन्फर्म पासवर्ड मेल नहीं खाते',
  'Welcome back': 'फिर से स्वागत है',
  'Create your account': 'अपना अकाउंट बनाएं',
  'Choose your role and continue. Backend integration can directly map to JWT endpoints.':
    'अपनी भूमिका चुनें और आगे बढ़ें। बैकएंड इंटीग्रेशन सीधे JWT endpoints से जुड़ सकता है।',
  Login: 'लॉगिन',
  Signup: 'साइनअप',
  'Full Name': 'पूरा नाम',
  Email: 'ईमेल',
  Password: 'पासवर्ड',
  'Confirm Password': 'पासवर्ड पुष्टि करें',
  'Phone (optional)': 'फोन (वैकल्पिक)',
  City: 'शहर',
  Role: 'भूमिका',
  Customer: 'कस्टमर',
  'Service Worker': 'सेवा वर्कर',
  'Please wait...': 'कृपया प्रतीक्षा करें...',
  'Worker Login': 'वर्कर लॉगिन',
  'Customer Login': 'कस्टमर लॉगिन',
  'Create Worker Account': 'वर्कर अकाउंट बनाएं',
  'Create Customer Account': 'कस्टमर अकाउंट बनाएं',
  'Secure, role-based access': 'सुरक्षित, भूमिका आधारित पहुंच',
  'Customer flows for quick booking and reviews': 'तेजी से बुकिंग और रिव्यू के लिए कस्टमर फ्लो',
  'Worker flows are now enabled with live JWT login/logout state':
    'वर्कर फ्लो अब लाइव JWT लॉगिन/लॉगआउट स्थिति के साथ सक्षम है',
  'Both customer and worker dashboard routes are protected':
    'कस्टमर और वर्कर दोनों के डैशबोर्ड रूट सुरक्षित हैं',
  'Booking System': 'बुकिंग सिस्टम',
  'Step-based booking with transparent pricing and status tracking.':
    'स्टेप-बाय-स्टेप बुकिंग, स्पष्ट कीमत और स्टेटस ट्रैकिंग के साथ।',
  Service: 'सेवा',
  Worker: 'वर्कर',
  Date: 'तारीख',
  Time: 'समय',
  'Add service notes': 'सेवा नोट्स जोड़ें',
  'Confirming...': 'पुष्टि हो रही है...',
  'Confirm Booking': 'बुकिंग कन्फर्म करें',
  'Booking failed': 'बुकिंग असफल',
  'Please choose a worker before booking': 'बुकिंग से पहले कृपया एक वर्कर चुनें',
  'No workers available': 'कोई वर्कर उपलब्ध नहीं',
  'Booking confirmed with ID': 'बुकिंग कन्फर्म हुई, आईडी',
  'Your cart is empty.': 'आपका कार्ट खाली है।',
  'Payment method: Cash (pay at service)': 'पेमेंट तरीका: कैश (सेवा पर भुगतान)',
  'Payment method: UPI (pay at service)': 'पेमेंट तरीका: UPI (सेवा पर भुगतान)',
  'Some services could not be booked. Please try again.': 'कुछ सेवाएं बुक नहीं हो सकीं। कृपया फिर से कोशिश करें।',
  'Booking confirmed. Pay by cash when the worker arrives.': 'बुकिंग कन्फर्म। वर्कर आने पर कैश से भुगतान करें।',
  'Booking confirmed. Pay via UPI when the worker arrives.': 'बुकिंग कन्फर्म। वर्कर आने पर UPI से भुगतान करें।',
  'Payment successful': 'पेमेंट सफल',
  'Your services are booked.': 'आपकी सेवाएं बुक हो गई हैं।',
  'Decrease quantity': 'मात्रा घटाएं',
  'Increase quantity': 'मात्रा बढ़ाएं',
  Subtotal: 'उप-योग',
  'e.g. 9876543210': 'जैसे: 9876543210',
  'Current location': 'वर्तमान लोकेशन',
  'Detecting current location...': 'वर्तमान लोकेशन खोजी जा रही है...',
  'Current location selected.': 'वर्तमान लोकेशन चुन ली गई है।',
  'Geolocation is not supported in this browser.': 'इस ब्राउज़र में जियोलोकेशन समर्थित नहीं है।',
  'Please allow location access in your browser prompt...': 'ब्राउज़र में लोकेशन अनुमति दें...',
  'Location permission denied. Please allow it in browser settings.': 'लोकेशन अनुमति अस्वीकार हुई। ब्राउज़र सेटिंग में अनुमति दें।',
  'Location is unavailable right now. Please try again.': 'अभी लोकेशन उपलब्ध नहीं है। कृपया फिर कोशिश करें।',
  'Location request timed out. Please try again.': 'लोकेशन अनुरोध टाइम आउट हो गया। कृपया फिर कोशिश करें।',
  'Unable to access current location. Please enter it manually.': 'वर्तमान लोकेशन नहीं मिल रही। कृपया मैन्युअली दर्ज करें।',
  'Location permission is blocked. Enable it in browser settings.': 'लोकेशन अनुमति ब्लॉक है। ब्राउज़र सेटिंग में चालू करें।',
  'Browser will ask for location permission. Please tap Allow.': 'ब्राउज़र लोकेशन अनुमति मांगेगा। कृपया Allow दबाएं।',
  'Location access denied. You can enter location manually.': 'लोकेशन एक्सेस अस्वीकार। आप मैन्युअली लोकेशन दर्ज कर सकते हैं।',
  'Recommended workers are unavailable right now.': 'अभी सुझाए गए वर्कर उपलब्ध नहीं हैं।',
  'Top rated workers are unavailable right now.': 'अभी टॉप रेटेड वर्कर उपलब्ध नहीं हैं।',
  'Showing featured professionals.': 'फीचर्ड प्रोफेशनल दिखाए जा रहे हैं।',
  'Pricing Transparency': 'कीमत की स्पष्टता',
  'Base service fee': 'बेस सेवा शुल्क',
  'Platform fee': 'प्लेटफॉर्म शुल्क',
  'Safety assurance': 'सुरक्षा आश्वासन',
  'Real-time Booking Status': 'रियल-टाइम बुकिंग स्टेटस',
  'Your Service Cart': 'आपका सर्विस कार्ट',
  'Review selected services and pay to confirm your bookings.':
    'चुनी हुई सेवाएं देखें और बुकिंग की पुष्टि के लिए भुगतान करें।',
  'Add More Services': 'और सेवाएं जोड़ें',
  'Your cart is empty': 'आपका कार्ट खाली है',
  'Browse workers and add services to continue.': 'वर्कर्स देखें और आगे बढ़ने के लिए सेवाएं जोड़ें।',
  'Explore Services': 'सेवाएं देखें',
  'Notes for this service': 'इस सेवा के लिए नोट्स',
  'Payment Summary': 'पेमेंट सारांश',
  Gateway: 'गेटवे',
  Cash: 'कैश',
  'Manual test mode': 'मैन्युअल टेस्ट मोड',
  Items: 'आइटम',
  'Total payable': 'कुल देय',
  'Contact Number': 'संपर्क नंबर',
  'Payment method (₹1000+)': 'पेमेंट तरीका (₹1000+)',
  Online: 'ऑनलाइन',
  'Pay on service completion/arrival. This skips online payment.':
    'सेवा पूरी होने/आने पर भुगतान करें। इससे ऑनलाइन पेमेंट नहीं होगा।',
  'Opening payment...': 'पेमेंट खुल रहा है...',
  'Confirm (Cash)': 'कन्फर्म (कैश)',
  'Confirm (UPI)': 'कन्फर्म (UPI)',
  'Pay & Confirm Services': 'भुगतान करें और सेवाएं कन्फर्म करें',
  'Clear Cart': 'कार्ट साफ करें',
  'Login required': 'लॉगिन आवश्यक',
  'Please login as customer to pay and confirm these services.':
    'इन सेवाओं का भुगतान और पुष्टि करने के लिए कस्टमर के रूप में लॉगिन करें।',
  'Login / Signup': 'लॉगिन / साइनअप',
  Cancel: 'रद्द करें',
  'Trusted marketplace': 'विश्वसनीय मार्केटप्लेस',
  'Find Verified Skilled Workers in Your Area': 'अपने इलाके में सत्यापित कुशल वर्कर खोजें',
  'Book electricians, plumbers, carpenters, and skilled professionals with transparent ratings, verified credentials, and neighborhood discovery.':
    'पारदर्शी रेटिंग, सत्यापित प्रोफाइल और आस-पास खोज के साथ इलेक्ट्रिशियन, प्लंबर, बढ़ई और अन्य कुशल प्रोफेशनल बुक करें।',
  'Service Type': 'सेवा प्रकार',
  'Enter location or address': 'लोकेशन या पता दर्ज करें',
  Search: 'खोजें',
  Location: 'लोकेशन',
  'Verified workers': 'सत्यापित वर्कर',
  'Average rating': 'औसत रेटिंग',
  'Secure bookings': 'सुरक्षित बुकिंग',
  'Enable location access?': 'लोकेशन एक्सेस चालू करें?',
  "We'll use your location to find nearby workers faster and more accurately.":
    'हम आपके आसपास के वर्कर तेज और सही तरीके से खोजने के लिए लोकेशन इस्तेमाल करेंगे।',
  Enable: 'अनुमति दें',
  Skip: 'स्किप',
  'Sign in required': 'साइन इन आवश्यक',
  'Create an account or sign in to book a service.': 'सेवा बुक करने के लिए अकाउंट बनाएं या साइन इन करें।',
  'Sign In': 'साइन इन',
  'Earn & Grow': 'कमाएं और बढ़ें',
  'Become a Service Provider': 'सेवा प्रदाता बनें',
  'Create your professional profile, showcase your expertise, and connect with verified customers in your neighborhood.':
    'अपनी प्रोफेशनल प्रोफाइल बनाएं, अपनी विशेषज्ञता दिखाएं और आसपास के सत्यापित ग्राहकों से जुड़ें।',
  'Get Started': 'शुरू करें',
  'Why Choose TrustServe?': 'TrustServe क्यों चुनें?',
  'Verified & Safe': 'सत्यापित और सुरक्षित',
  'Every worker is KYC verified with background checks for your peace of mind.':
    'आपकी सुरक्षा के लिए हर वर्कर KYC और बैकग्राउंड जांच से सत्यापित है।',
  'Neighborhood Discovery': 'आस-पास खोज',
  'Find skilled professionals available in your area in seconds.':
    'कुछ सेकंड में अपने इलाके के उपलब्ध प्रोफेशनल खोजें।',
  'Transparent Reviews': 'पारदर्शी रिव्यू',
  'Read honest customer feedback before making your booking decision.':
    'बुकिंग से पहले ग्राहकों की सच्ची राय पढ़ें।',
  'Recommended For You': 'आपके लिए सुझाए गए',
  'Showing featured professionals in your area.': 'आपके इलाके के चुनिंदा प्रोफेशनल दिखाए जा रहे हैं।',
  'Top Rated Professionals': 'टॉप रेटेड प्रोफेशनल',
  'Looking for Services?': 'सेवाएं ढूंढ रहे हैं?',
  'Browse our network of verified professionals and book trusted services in your neighborhood.':
    'हमारे सत्यापित प्रोफेशनल नेटवर्क से अपने इलाके में भरोसेमंद सेवाएं बुक करें।',
  'Want to Earn More?': 'ज्यादा कमाना चाहते हैं?',
  'Join thousands of skilled professionals earning on their own terms with flexible schedules.':
    'लचीले समय के साथ अपनी शर्तों पर कमाने वाले हजारों कुशल प्रोफेशनल से जुड़ें।',
  'Build your reputation, control your rates, and grow your business.':
    'अपनी पहचान बनाएं, अपने रेट तय करें और अपना काम बढ़ाएं।',
  'Service Discovery': 'सेवा खोज',
  'Discover verified workers by category, ratings, and location proximity.':
    'कैटेगरी, रेटिंग और लोकेशन के आधार पर सत्यापित वर्कर खोजें।',
  'Any Rating': 'कोई भी रेटिंग',
  '4+ Stars': '4+ स्टार',
  '4.5+ Stars': '4.5+ स्टार',
  Distance: 'दूरी',
  'Use Current Location': 'वर्तमान लोकेशन उपयोग करें',
  'No workers found': 'कोई वर्कर नहीं मिला',
  'Try increasing distance or changing category to discover available professionals.':
    'उपलब्ध प्रोफेशनल देखने के लिए दूरी बढ़ाएं या कैटेगरी बदलें।',
  'Customer Reviews & Ratings': 'ग्राहक रिव्यू और रेटिंग',
  'Demo Reviews': 'डेमो रिव्यू',
  'Recent feedback shared by customers for listed workers.':
    'सूचीबद्ध वर्कर्स के लिए ग्राहकों द्वारा साझा हालिया फीडबैक।',
  For: 'के लिए',
  'Popular Services': 'लोकप्रिय सेवाएं',
  'Choose from frequently booked services near you.': 'अपने पास की सबसे ज्यादा बुक की गई सेवाएं चुनें।',
  'Classic cleaning (2 bathrooms)': 'क्लासिक सफाई (2 बाथरूम)',
  'Drill & hang (wall decor)': 'ड्रिल और टांगना (दीवार सजावट)',
  'Roll-on waxing (Full arms, legs & underarms)': 'रोल-ऑन वैक्सिंग (पूरे हाथ, पैर और अंडरआर्म्स)',
  'Tap repair': 'टैप मरम्मत',
  'Switch/socket replacement': 'स्विच/सॉकेट बदलना',
  'Top Rated Near You': 'आपके पास टॉप रेटेड',
  Previous: 'पिछला',
  Next: 'अगला',
  'View Details': 'विवरण देखें',
  Verified: 'सत्यापित',
  'This worker has mixed reviews. Check profile details before booking.':
    'इस वर्कर के मिले-जुले रिव्यू हैं। बुकिंग से पहले प्रोफाइल देखें।',
  yrs: 'साल',
  jobs: 'काम',
  Starting: 'शुरुआत',
  'View Profile': 'प्रोफाइल देखें',
  'Add to Cart': 'कार्ट में जोड़ें',
  'Book Service': 'सेवा बुक करें',
  'Learn Skills, Earn Certificate': 'कौशल सीखें, प्रमाणपत्र पाएं',
  'Worker Skill Hub': 'वर्कर स्किल हब',
  'Workplace Safety Basics': 'कार्यस्थल सुरक्षा की बुनियाद',
  'All Workers': 'सभी वर्कर',
  'Learn job-site safety, protective gear usage, and hazard reporting.':
    'काम की जगह पर सुरक्षा, सुरक्षा उपकरण उपयोग और जोखिम रिपोर्ट करना सीखें।',
  'Customer Communication Skills': 'ग्राहक संवाद कौशल',
  'Professional Growth': 'पेशेवर विकास',
  'Understand how to greet, explain work, and handle customer concerns politely.':
    'ग्राहक का स्वागत करना, काम समझाना और उनकी चिंताओं को विनम्रता से संभालना सीखें।',
  'Service Quality and Finishing': 'सेवा गुणवत्ता और फिनिशिंग',
  'Field Excellence': 'फील्ड उत्कृष्टता',
  'Improve delivery quality with checklists, final inspection, and clean handover.':
    'चेकलिस्ट, अंतिम निरीक्षण और साफ हैंडओवर के साथ सेवा गुणवत्ता बेहतर करें।',
  'Watch training videos curated for TrustServe workers and complete all modules to download your skill certificate.':
    'TrustServe वर्कर्स के लिए चुने गए ट्रेनिंग वीडियो देखें और सभी मॉड्यूल पूरे करके प्रमाणपत्र डाउनलोड करें।',
  'Learning Progress': 'सीखने की प्रगति',
  'modules completed': 'मॉड्यूल पूरे',
  Completed: 'पूरा',
  'Mark as Completed': 'पूरा हुआ चिन्हित करें',
  'Skill Certificate': 'कौशल प्रमाणपत्र',
  'Complete all training modules and download your TrustServe worker skill certificate.':
    'सभी ट्रेनिंग मॉड्यूल पूरे करें और TrustServe वर्कर कौशल प्रमाणपत्र डाउनलोड करें।',
  'Login as worker to claim your certificate.': 'प्रमाणपत्र पाने के लिए वर्कर के रूप में लॉगिन करें।',
  'Go to Login': 'लॉगिन पर जाएं',
  'Worker Name on Certificate': 'प्रमाणपत्र पर वर्कर का नाम',
  'Download Certificate': 'प्रमाणपत्र डाउनलोड करें',
  'User Dashboard': 'यूजर डैशबोर्ड',
  'Track active bookings, review history, and save trusted workers.':
    'चल रही बुकिंग ट्रैक करें, हिस्ट्री देखें और भरोसेमंद वर्कर सेव करें।',
  'Active Bookings': 'सक्रिय बुकिंग',
  'In Progress': 'प्रगति में',
  Completed: 'पूर्ण',
  'Saved Workers': 'सेव किए वर्कर',
  'Pending Reviews': 'लंबित रिव्यू',
  'Booking History': 'बुकिंग हिस्ट्री',
  'Review Section': 'रिव्यू सेक्शन',
  'Write a review for your recent booking': 'अपनी हाल की बुकिंग के लिए रिव्यू लिखें',
  'Submit Review': 'रिव्यू जमा करें',
  'Worker Dashboard': 'वर्कर डैशबोर्ड',
  'Simple onboarding and job controls designed for non-technical workers.':
    'गैर-तकनीकी वर्कर्स के लिए आसान ऑनबोर्डिंग और जॉब कंट्रोल।',
  'Tip: Complete profile verification first to get higher booking visibility and trust score.':
    'सुझाव: ज्यादा बुकिंग दृश्यता और ट्रस्ट स्कोर के लिए पहले प्रोफाइल सत्यापन पूरा करें।',
  'Today Earnings': 'आज की कमाई',
  'This Month': 'इस महीने',
  'Acceptance Rate': 'स्वीकृति दर',
  'Incoming Jobs': 'आने वाले काम',
  'Loading jobs...': 'काम लोड हो रहे हैं...',
  'No incoming jobs right now.': 'अभी कोई नया काम नहीं है।',
  Accept: 'स्वीकारें',
  Reject: 'अस्वीकारें',
  'Profile Verification Upload': 'प्रोफाइल सत्यापन अपलोड',
  'Upload ID proof and skill certificates to unlock verified badge.':
    'सत्यापित बैज पाने के लिए आईडी प्रूफ और कौशल प्रमाणपत्र अपलोड करें।',
  'Drag and drop files here (UI placeholder)': 'फाइल यहां ड्रैग और ड्रॉप करें (UI प्लेसहोल्डर)',
  'Worker not found.': 'वर्कर नहीं मिला।',
  Experience: 'अनुभव',
  'Completed jobs': 'पूर्ण काम',
  Skills: 'कौशल',
  'Availability Calendar': 'उपलब्धता कैलेंडर',
  'Book Now': 'अभी बुक करें',
  'Rating & Reviews': 'रेटिंग और रिव्यू',
  'Add Review': 'रिव्यू जोड़ें',
  '5 Stars': '5 स्टार',
  '4 Stars': '4 स्टार',
  '3 Stars': '3 स्टार',
  '2 Stars': '2 स्टार',
  '1 Star': '1 स्टार',
  'Share your experience': 'अपना अनुभव साझा करें',
  'Page not found': 'पेज नहीं मिला',
  'The page you requested does not exist.': 'आपने जो पेज मांगा है वह उपलब्ध नहीं है।',
  'Back to Home': 'होम पर वापस जाएं',
  'Finding Worker': 'वर्कर खोजा जा रहा है',
  'Worker Assigned': 'वर्कर नियुक्त हो गया',
  'On The Way': 'रास्ते में है',
  'Service In Progress': 'सेवा जारी है',
  Completed: 'पूरा हुआ',
  'Terms of Service': 'सेवा की शर्तें',
  'Privacy Policy': 'गोपनीयता नीति',
  'Worker Policy': 'वर्कर नीति',
  'Effective date: March 31, 2026': 'प्रभावी तिथि: 31 मार्च, 2026',
}

const categoryMapHi = {
  All: 'सभी',
  Electrician: 'इलेक्ट्रिशियन',
  Plumber: 'प्लंबर',
  Carpenter: 'बढ़ई',
  'AC Technician': 'एसी टेक्नीशियन',
}

const translations = {
  en: {
    nav: {
      home: 'Home',
      findServices: 'Find Services',
      book: 'Book',
      skills: 'Skills',
      workerDashboard: 'Worker Dashboard',
      userDashboard: 'User Dashboard',
      logout: 'Logout',
      login: 'Login',
      openCart: 'Open cart',
      toggleMenu: 'Toggle menu',
      language: 'Hindi',
      worker: 'Worker',
      customer: 'Customer',
      loggedIn: 'Logged in',
    },
    footer: {
      line1: 'Safe and verified local services for every city.',
      line2: 'Designed for trust, accessibility, and digital inclusion.',
      contact: 'Contact',
      compliance: 'Compliance & Legal',
      kyc: 'Licensed service providers and KYC verified workers',
      terms: 'Terms',
      privacy: 'Privacy',
      workerPolicy: 'Worker Policy',
      rights: 'TrustServe Services Pvt. Ltd. All rights reserved.',
      availability: 'Service availability and compliance may vary by city and local regulations.',
    },
  },
  hi: {
    nav: {
      home: 'होम',
      findServices: 'सेवाएं खोजें',
      book: 'बुक करें',
      skills: 'कौशल',
      workerDashboard: 'वर्कर डैशबोर्ड',
      userDashboard: 'यूजर डैशबोर्ड',
      logout: 'लॉगआउट',
      login: 'लॉगिन',
      openCart: 'कार्ट खोलें',
      toggleMenu: 'मेनू खोलें',
      language: 'English',
      worker: 'वर्कर',
      customer: 'कस्टमर',
      loggedIn: 'लॉगिन है',
    },
    footer: {
      line1: 'हर शहर के लिए सुरक्षित और सत्यापित स्थानीय सेवाएं।',
      line2: 'विश्वास, पहुंच और डिजिटल समावेशन को ध्यान में रखकर बनाया गया।',
      contact: 'संपर्क',
      compliance: 'नियम और कानूनी जानकारी',
      kyc: 'लाइसेंस प्राप्त सेवा प्रदाता और केवाईसी सत्यापित वर्कर',
      terms: 'शर्तें',
      privacy: 'प्राइवेसी',
      workerPolicy: 'वर्कर पॉलिसी',
      rights: 'ट्रस्टसर्व सर्विसेज प्रा. लि. सर्वाधिकार सुरक्षित।',
      availability: 'सेवाओं की उपलब्धता और नियम शहर और स्थानीय कानून के अनुसार बदल सकते हैं।',
    },
  },
}

export function LanguageProvider({ children }) {
  const [language, setLanguage] = useState(() => localStorage.getItem('trustserve-lang') || 'en')

  useEffect(() => {
    localStorage.setItem('trustserve-lang', language)
    document.documentElement.setAttribute('lang', language === 'hi' ? 'hi' : 'en')
  }, [language])

  function toggleLanguage() {
    setLanguage((current) => (current === 'en' ? 'hi' : 'en'))
  }

  function tr(phrase) {
    if (!phrase) {
      return phrase
    }
    if (language !== 'hi') {
      return phrase
    }
    return phraseMapHi[phrase] || phrase
  }

  function trCategory(category) {
    if (!category) {
      return category
    }
    if (language !== 'hi') {
      return category
    }
    return categoryMapHi[category] || category
  }

  const value = useMemo(
    () => ({
      language,
      isHindi: language === 'hi',
      toggleLanguage,
      t: translations[language],
      tr,
      trCategory,
    }),
    [language],
  )

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (!context) {
    throw new Error('useLanguage must be used inside LanguageProvider')
  }
  return context
}
