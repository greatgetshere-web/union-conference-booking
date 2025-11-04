// API Base URL
const API_URL = window.location.origin;

// State
let selectedDate = null;
let selectedTime = null;
let selectedSlot = null;

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    initializeDateButtons();
    initializeForm();
});

// Initialize date buttons
function initializeDateButtons() {
    const dateButtons = document.querySelectorAll('.date-btn');
    
    dateButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove selected class from all buttons
            dateButtons.forEach(b => b.classList.remove('selected'));
            
            // Add selected class to clicked button
            btn.classList.add('selected');
            
            // Get selected date
            selectedDate = btn.dataset.date;
            
            // Load time slots for selected date
            loadTimeSlots(selectedDate);
        });
    });

    // Auto-select first date
    if (dateButtons.length > 0) {
        dateButtons[0].click();
    }
}

// Load time slots for a specific date
async function loadTimeSlots(date) {
    const timeSlotsContainer = document.getElementById('timeSlots');
    const loading = document.getElementById('loading');
    
    loading.style.display = 'block';
    timeSlotsContainer.innerHTML = '';
    
    try {
        const response = await fetch(`${API_URL}/api/timeslots?date=${date}`);
        const slots = await response.json();
        
        loading.style.display = 'none';
        
        if (slots.length === 0) {
            timeSlotsContainer.innerHTML = '<p class="no-slots">No time slots available for this date.</p>';
            return;
        }
        
        slots.forEach(slot => {
            const slotElement = document.createElement('div');
            slotElement.className = 'time-slot';
            
            if (!slot.is_available || slot.booked_count > 0) {
                slotElement.classList.add('booked');
                slotElement.innerHTML = `${slot.start_time}<br><small>Booked</small>`;
            } else {
                slotElement.innerHTML = slot.start_time;
                slotElement.addEventListener('click', () => selectTimeSlot(slot, slotElement));
            }
            
            timeSlotsContainer.appendChild(slotElement);
        });
    } catch (error) {
        console.error('Error loading time slots:', error);
        loading.style.display = 'none';
        timeSlotsContainer.innerHTML = '<p class="error">Error loading time slots. Please try again.</p>';
    }
}

// Select time slot
function selectTimeSlot(slot, element) {
    // Remove selected class from all time slots
    document.querySelectorAll('.time-slot').forEach(el => {
        el.classList.remove('selected');
    });
    
    // Add selected class to clicked slot
    element.classList.add('selected');
    
    // Store selected slot
    selectedSlot = slot;
    selectedTime = slot.start_time;
    
    // Update selected slot info
    updateSelectedSlotInfo();
    
    // Enable submit button
    document.getElementById('submitBtn').disabled = false;
}

// Update selected slot info
function updateSelectedSlotInfo() {
    const infoDiv = document.getElementById('selectedSlotInfo');
    const textDiv = document.getElementById('selectedSlotText');
    
    if (selectedDate && selectedTime) {
        const dateObj = new Date(selectedDate);
        const dateStr = dateObj.toLocaleDateString('en-US', { 
            weekday: 'long', 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
        });
        
        textDiv.innerHTML = `${dateStr} at ${selectedTime}`;
        infoDiv.style.display = 'flex';
    } else {
        infoDiv.style.display = 'none';
    }
}

// Initialize form
function initializeForm() {
    const form = document.getElementById('bookingForm');
    
    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        if (!selectedDate || !selectedTime) {
            alert('Please select a date and time slot.');
            return;
        }
        
        // Get form data
        const formData = {
            attendee_name: document.getElementById('name').value,
            attendee_email: document.getElementById('email').value,
            attendee_organization: document.getElementById('organization').value,
            attendee_phone: document.getElementById('phone').value,
            meeting_date: selectedDate,
            meeting_time: selectedTime,
            duration: parseInt(document.getElementById('duration').value),
            meeting_topic: document.getElementById('topic').value,
            special_requests: document.getElementById('requests').value
        };
        
        // Disable submit button
        const submitBtn = document.getElementById('submitBtn');
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<span class="btn-icon">⏳</span><span>Processing...</span>';
        
        try {
            const response = await fetch(`${API_URL}/api/bookings`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });
            
            if (!response.ok) {
                const error = await response.json();
                throw new Error(error.error || 'Booking failed');
            }
            
            const booking = await response.json();
            
            // Show confirmation modal
            showConfirmationModal(booking);
            
            // Reset form
            form.reset();
            selectedDate = null;
            selectedTime = null;
            selectedSlot = null;
            document.getElementById('selectedSlotInfo').style.display = 'none';
            
            // Reload time slots
            const selectedDateBtn = document.querySelector('.date-btn.selected');
            if (selectedDateBtn) {
                loadTimeSlots(selectedDateBtn.dataset.date);
            }
            
        } catch (error) {
            console.error('Error creating booking:', error);
            alert('Error creating booking: ' + error.message);
            
            // Re-enable submit button
            submitBtn.disabled = false;
            submitBtn.innerHTML = '<span class="btn-icon">📅</span><span>Confirm Booking</span>';
        }
    });
}

// Show confirmation modal
function showConfirmationModal(booking) {
    const modal = document.getElementById('confirmationModal');
    
    // Populate modal with booking details
    document.getElementById('refNumber').textContent = booking.reference_number;
    
    const dateObj = new Date(booking.meeting_date);
    const dateStr = dateObj.toLocaleDateString('en-US', { 
        weekday: 'long', 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
    });
    document.getElementById('confDate').textContent = dateStr;
    document.getElementById('confTime').textContent = booking.meeting_time;
    document.getElementById('confDuration').textContent = `${booking.duration} minutes`;
    
    // Show modal
    modal.classList.add('active');
}

// Close modal
function closeModal() {
    const modal = document.getElementById('confirmationModal');
    modal.classList.remove('active');
}

// Close modal when clicking outside
document.addEventListener('click', (e) => {
    const modal = document.getElementById('confirmationModal');
    if (e.target === modal) {
        closeModal();
    }
});

// Format date helper
function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
        weekday: 'long', 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
    });
}

// Format time helper
function formatTime(timeString) {
    return timeString;
}

