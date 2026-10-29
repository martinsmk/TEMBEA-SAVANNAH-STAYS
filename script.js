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

// Calculate average rating for ONE stay
function getAverageForStay(stayId) {
  const reviews = getReviews().filter(r => r.stayId === stayId); // only reviews for this stay
  if (reviews.length === 0) return null;                         // no reviews yet

  const sum = reviews.reduce((acc, r) => acc + r.rating, 0);     // add all ratings
  return (sum / reviews.length).toFixed(1);                      // average rounded to 1 decimal
}

// Create star string from a number
function ratingToStars(rating) {
  if (rating === null) return "No ratings yet";
  const full = Math.round(Number(rating)); // nearest whole number for display
  return "★".repeat(full) + "☆".repeat(5 - full) + ` (${rating})`;
}










// PAGE: ADD STAY (add-stay.html) 

function initAddStayPage() {
  // Get the form element. If it does not exist on this page, exit.
  const form = document.getElementById("add-stay-form");
  if (!form) return;

  const successMsg = document.getElementById("success-message");

  form.addEventListener("submit", function (e) {
    e.preventDefault(); 
    clearErrors(); 

    // Read the values the user typed
    const name = document.getElementById("stay-name").value.trim();
    const location = document.getElementById("stay-location").value.trim();
    const price = document.getElementById("stay-price").value.trim();
    const type = document.getElementById("stay-type").value;

    //validation
     let isValid = true;

     if (name.length < 3) {
            showError("name-error", "Name must be at least 3 characters.");
            isValid = false;
    }

     if (!price || isNaN(price) || Number(price) <= 0) {
      showError("price-error", "Price must be a positive number.");
      isValid = false;
    }

     if (!type) {
      showError("type-error", "Please select a stay type.");
      isValid = false;
    }

     if (!isValid) return;                      // If any field failed validation, stop here


     // Create a new stay object
    const newStay = {
      id: generateId(),
      name: name,
      location: location,
      price: Number(price),
      type: type,
      createdAt: new Date().toISOString()
    };

    // Add it to the existing array and save
    const stays = getStays();
    stays.push(newStay);
    saveStays(stays);

     // Show success message and clear the form
    successMsg.classList.add("show");
    form.reset();

      // Hide the success message after 3 seconds
    setTimeout(() => {
      successMsg.classList.remove("show");
    }, 3000);
  });
}








