// API Base URL
const API_URL = window.location.origin;

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    loadStatistics();
    loadBookings();
    loadCalendarBookings();
    initializeFilters();
});

// Load statistics
async function loadStatistics() {
    try {
        const response = await fetch(`${API_URL}/api/stats`);
        const stats = await response.json();
        
        document.getElementById('totalBookings').textContent = stats.total_bookings;
        document.getElementById('confirmedBookings').textContent = stats.confirmed;
        document.getElementById('cancelledBookings').textContent = stats.cancelled;
        document.getElementById('daysWithBookings').textContent = stats.days_with_bookings;
    } catch (error) {
        console.error('Error loading statistics:', error);
    }
}

// Load bookings
async function loadBookings() {
    const loading = document.getElementById('tableLoading');
    const table = document.getElementById('bookingsTable');
    const noBookings = document.getElementById('noBookings');
    const tbody = document.getElementById('bookingsTableBody');
    
    // Get filter values
    const dateFilter = document.getElementById('dateFilter').value;
    const statusFilter = document.getElementById('statusFilter').value;
    
    // Build query string
    const params = new URLSearchParams();
    if (dateFilter) params.append('date', dateFilter);
    if (statusFilter) params.append('status', statusFilter);
    
    loading.style.display = 'block';
    table.style.display = 'none';
    noBookings.style.display = 'none';
    
    try {
        const response = await fetch(`${API_URL}/api/bookings?${params}`);
        const bookings = await response.json();
        
        loading.style.display = 'none';
        
        if (bookings.length === 0) {
            noBookings.style.display = 'block';
            return;
        }
        
        // Clear existing rows
        tbody.innerHTML = '';
        
        // Add booking rows
        bookings.forEach(booking => {
            const row = createBookingRow(booking);
            tbody.appendChild(row);
        });
        
        table.style.display = 'table';
    } catch (error) {
        console.error('Error loading bookings:', error);
        loading.style.display = 'none';
        noBookings.innerHTML = '<p>Error loading bookings. Please try again.</p>';
        noBookings.style.display = 'block';
    }
}

// Create booking table row
function createBookingRow(booking) {
    const row = document.createElement('tr');
    
    const dateObj = new Date(booking.meeting_date);
    const dateStr = dateObj.toLocaleDateString('en-US', { 
        month: 'short', 
        day: 'numeric' 
    });
    
    row.innerHTML = `
        <td><strong>${booking.reference_number}</strong></td>
        <td>${booking.attendee_name}</td>
        <td>${booking.attendee_organization || '-'}</td>
        <td>${booking.attendee_email}</td>
        <td>${dateStr}</td>
        <td>${booking.meeting_time}</td>
        <td>${booking.duration} min</td>
        <td>${truncateText(booking.meeting_topic || '-', 30)}</td>
        <td><span class="status-badge ${booking.status}">${booking.status}</span></td>
        <td>
            <button class="action-btn" onclick="viewBookingDetails('${booking.reference_number}')" title="View Details">👁️</button>
            ${booking.status === 'confirmed' ? `<button class="action-btn" onclick="cancelBooking('${booking.reference_number}')" title="Cancel">❌</button>` : ''}
        </td>
    `;
    
    return row;
}

// Load calendar bookings
async function loadCalendarBookings() {
    const dates = ['2025-11-18', '2025-11-19', '2025-11-20', '2025-11-21'];
    
    for (const date of dates) {
        try {
            const response = await fetch(`${API_URL}/api/bookings?date=${date}&status=confirmed`);
            const bookings = await response.json();
            
            const container = document.getElementById(`bookings-${date}`);
            container.innerHTML = '';
            
            if (bookings.length === 0) {
                container.innerHTML = '<div class="calendar-loading">No bookings</div>';
            } else {
                bookings.forEach(booking => {
                    const item = document.createElement('div');
                    item.className = 'calendar-booking-item';
                    item.onclick = () => viewBookingDetails(booking.reference_number);
                    
                    item.innerHTML = `
                        <div class="calendar-booking-time">${booking.meeting_time}</div>
                        <div class="calendar-booking-name">${booking.attendee_name}</div>
                        <div class="calendar-booking-org">${booking.attendee_organization || 'No organization'}</div>
                    `;
                    
                    container.appendChild(item);
                });
            }
        } catch (error) {
            console.error(`Error loading bookings for ${date}:`, error);
        }
    }
}

// View booking details
async function viewBookingDetails(reference) {
    try {
        const response = await fetch(`${API_URL}/api/bookings/${reference}`);
        const booking = await response.json();
        
        const dateObj = new Date(booking.meeting_date);
        const dateStr = dateObj.toLocaleDateString('en-US', { 
            weekday: 'long', 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
        });
        
        const detailsHtml = `
            <div class="detail-grid">
                <div class="detail-item">
                    <div class="detail-item-label">Reference Number</div>
                    <div class="detail-item-value">${booking.reference_number}</div>
                </div>
                <div class="detail-item">
                    <div class="detail-item-label">Status</div>
                    <div class="detail-item-value"><span class="status-badge ${booking.status}">${booking.status}</span></div>
                </div>
                <div class="detail-item">
                    <div class="detail-item-label">Attendee Name</div>
                    <div class="detail-item-value">${booking.attendee_name}</div>
                </div>
                <div class="detail-item">
                    <div class="detail-item-label">Email</div>
                    <div class="detail-item-value">${booking.attendee_email}</div>
                </div>
                <div class="detail-item">
                    <div class="detail-item-label">Organization</div>
                    <div class="detail-item-value">${booking.attendee_organization || '-'}</div>
                </div>
                <div class="detail-item">
                    <div class="detail-item-label">Phone</div>
                    <div class="detail-item-value">${booking.attendee_phone || '-'}</div>
                </div>
                <div class="detail-item">
                    <div class="detail-item-label">Meeting Date</div>
                    <div class="detail-item-value">${dateStr}</div>
                </div>
                <div class="detail-item">
                    <div class="detail-item-label">Meeting Time</div>
                    <div class="detail-item-value">${booking.meeting_time}</div>
                </div>
                <div class="detail-item">
                    <div class="detail-item-label">Duration</div>
                    <div class="detail-item-value">${booking.duration} minutes</div>
                </div>
                <div class="detail-item">
                    <div class="detail-item-label">Created At</div>
                    <div class="detail-item-value">${new Date(booking.created_at).toLocaleString()}</div>
                </div>
                <div class="detail-item full-width">
                    <div class="detail-item-label">Meeting Topic</div>
                    <div class="detail-item-value">${booking.meeting_topic || '-'}</div>
                </div>
                <div class="detail-item full-width">
                    <div class="detail-item-label">Special Requests</div>
                    <div class="detail-item-value">${booking.special_requests || '-'}</div>
                </div>
            </div>
        `;
        
        document.getElementById('bookingDetails').innerHTML = detailsHtml;
        document.getElementById('detailsModal').classList.add('active');
    } catch (error) {
        console.error('Error loading booking details:', error);
        alert('Error loading booking details');
    }
}

// Cancel booking
async function cancelBooking(reference) {
    if (!confirm('Are you sure you want to cancel this booking?')) {
        return;
    }
    
    try {
        const response = await fetch(`${API_URL}/api/bookings/${reference}`, {
            method: 'DELETE'
        });
        
        if (!response.ok) {
            throw new Error('Failed to cancel booking');
        }
        
        alert('Booking cancelled successfully');
        refreshBookings();
    } catch (error) {
        console.error('Error cancelling booking:', error);
        alert('Error cancelling booking');
    }
}

// Export bookings to CSV
function exportBookings() {
    window.location.href = `${API_URL}/api/export/bookings`;
}

// Refresh bookings
function refreshBookings() {
    loadStatistics();
    loadBookings();
    loadCalendarBookings();
}

// Initialize filters
function initializeFilters() {
    document.getElementById('dateFilter').addEventListener('change', loadBookings);
    document.getElementById('statusFilter').addEventListener('change', loadBookings);
}

// Close details modal
function closeDetailsModal() {
    document.getElementById('detailsModal').classList.remove('active');
}

// Helper function to truncate text
function truncateText(text, maxLength) {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + '...';
}

// Close modal when clicking outside
document.addEventListener('click', (e) => {
    const modal = document.getElementById('detailsModal');
    if (e.target === modal) {
        closeDetailsModal();
    }
});

