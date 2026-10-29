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



