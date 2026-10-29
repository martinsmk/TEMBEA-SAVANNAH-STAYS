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








// PAGE: STAYS LISTING (index.html)

function initStaysPage() {
  const grid = document.getElementById("stays-grid");
  if (!grid) return;

  // Filter controls
  const locationFilter = document.getElementById("filter-location");
  const priceFilter = document.getElementById("filter-price");
  const typeFilter = document.getElementById("filter-type");
  const clearBtn = document.getElementById("clear-filters");


  // Main function that draws all the stay cards
  function renderStays() {
    let stays = getStays(); // start with every stay

    // Apply the three filters
    const locValue = locationFilter.value.trim().toLowerCase();
    const maxPrice = priceFilter.value ? Number(priceFilter.value) : null;
    const typeValue = typeFilter.value;

     if (locValue) {
      stays = stays.filter(s => s.location.toLowerCase().includes(locValue));
    }
    if (maxPrice !== null && !isNaN(maxPrice)) {
      stays = stays.filter(s => s.price <= maxPrice);
    }
    if (typeValue) {
      stays = stays.filter(s => s.type === typeValue);
    }

    // Empty the grid before redrawing
    grid.innerHTML = "";

    // If nothing matches the filters, show a friendly message
    if (stays.length === 0) {
      grid.innerHTML = `
        <div class="no-data" style="grid-column: 1 / -1;">
          <div>🏠</div>
          <p>No stays found. Try adjusting filters or <a href="add-stay.html">add a new stay</a>.</p>
        </div>
      `;
      return;
    }

    // Create one card for every stay that passed the filters
    stays.forEach(stay => {
      // Calculate this stay's own average rating
      const avg = getAverageForStay(stay.id);
      const starsText = ratingToStars(avg);

             // Create the card element
      const card = document.createElement("article");
      card.className = "stay-card";
      card.dataset.id = stay.id; // store the id on the element for easy deletion later

      card.innerHTML = `
        <div class="stay-card-header">
          <h3>${escapeHtml(stay.name)}</h3>
          <span class="stay-type">${escapeHtml(stay.type)}</span>
        </div>
        <div class="stay-card-body">
          <div class="stay-info">
            <span>📍 ${escapeHtml(stay.location)}</span>
            <span class="stay-rating">${starsText}</span>
          </div>
          <div class="stay-price">$${stay.price.toFixed(2)} <small>/ night</small></div>
          <button class="btn btn-danger btn-sm delete-stay-btn" data-id="${stay.id}">Delete</button>
        </div>
      `;
      grid.appendChild(card);
    });

    // Attach click listeners to every delete button we just created
    document.querySelectorAll(".delete-stay-btn").forEach(btn => {
      btn.addEventListener("click", function () {
        const id = this.dataset.id; // the stay id we stored earlier
        deleteStay(id);
      });
    });
  }

// Delete a stay and also remove any reviews that belonged to it
  function deleteStay(id) {
    if (!confirm("Are you sure you want to delete this stay and all its reviews?")) 
        return;

    // Remove the stay
    let stays = getStays().filter(s => s.id !== id);
    saveStays(stays);

    // Also remove reviews that pointed to this stay
    let reviews = getReviews().filter(r => r.stayId !== id);
    saveReviews(reviews);

    // Re-draw the grid so the deleted card disappears
    renderStays();
  }


   // Live filtering: every time the user types or changes a select, re-render
  locationFilter.addEventListener("input", renderStays);
  priceFilter.addEventListener("input", renderStays);
  typeFilter.addEventListener("change", renderStays);

  // Clear button resets all filters and re-renders
  clearBtn.addEventListener("click", function () {
    locationFilter.value = "";
    priceFilter.value = "";
    typeFilter.value = "";
    renderStays();
  });

  // First render when the page loads
  renderStays();
}



