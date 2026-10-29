//keys for localStorage
const STAYS_KEY = "tembea_stays";
const REVIEWS_KEY = "tembea_reviews";

//Get data from localStorage
function getStays() {
  const data = localStorage.getItem(STAYS_KEY); // get the raw string
  return data ? JSON.parse(data) : [];          // turn JSON string back into a real array, or [] if null
}

// Same case for reviews
function getReviews() {
  const data = localStorage.getItem(REVIEWS_KEY);
  return data ? JSON.parse(data) : [];
}

//Save data
// Converts the array into a JSON string and stores it under the given key.
function saveStays(stays) {
  localStorage.setItem(STAYS_KEY, JSON.stringify(stays));
}

function saveReviews(reviews) {
  localStorage.setItem(REVIEWS_KEY, JSON.stringify(reviews));
}

// Generate unique ID 
function generateId() {
  return Date.now().toString(36) + Math.random().toString(36).slice(2);
}

//  Seed sample data on first load
function seedSampleData() {
  const existing = getStays();
  if (existing.length > 0) return; 

const samples = [
    {
      id: generateId(),
      name: "Maasai Mara Safari Tent",
      location: "Maasai Mara, Kenya",
      price: 180,
      type: "Villa",
      createdAt: new Date().toISOString()
    },
    {
      id: generateId(),
      name: "Serengeti Sunrise Lodge",
      location: "Serengeti, Tanzania",
      price: 220,
      type: "Hotel",
      createdAt: new Date().toISOString()
    },
    {
      id: generateId(),
      name: "Amboseli Elephant View",
      location: "Amboseli, Kenya",
      price: 145,
      type: "Apartment",
      createdAt: new Date().toISOString()
    },
    {
      id: generateId(),
      name: "Nairobi Gateway Guesthouse",
      location: "Nairobi, Kenya",
      price: 65,
      type: "Guesthouse",
      createdAt: new Date().toISOString()
    }
  ];

  saveStays(samples);
}


