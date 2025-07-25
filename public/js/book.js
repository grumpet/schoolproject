document.addEventListener('DOMContentLoaded', function() {
    console.log('Script loaded'); 
    const form = document.querySelector('form[action="/book"]') || document.querySelector('form[action="/signup"]');
    
    if (!form) {
        return;
    }
    
    // Calculate days until appointment function
    function calculateDaysUntil() {
        const selectedDate = document.getElementById('date').value;
        const daysDisplay = document.getElementById('days-until');
        
        if (selectedDate) {
            const today = new Date();
            const appointmentDate = new Date(selectedDate);
            const timeDifference = appointmentDate.getTime() - today.getTime();
            const daysDifference = Math.ceil(timeDifference / (1000 * 3600 * 24));
            
            if (daysDifference < 0) {
                daysDisplay.textContent = "Please select a future date.";
                daysDisplay.className = "error";
            } else if (daysDifference === 0) {
                daysDisplay.textContent = "Appointment is today!";
                daysDisplay.className = "success";
            } else if (daysDifference === 1) {
                daysDisplay.textContent = "Appointment is tomorrow!";
                daysDisplay.className = "success";
            } else {
                daysDisplay.textContent = `${daysDifference} days until your appointment.`;
                daysDisplay.className = "normal";
            }
        } else {
            daysDisplay.textContent = "";
            daysDisplay.className = "";
        }
    }
    
    // Add event listener for date change
    const dateInput = document.getElementById('date');
    if (dateInput) {
        dateInput.addEventListener('change', calculateDaysUntil);
    }
    
    // Form submission validation
    form.addEventListener('submit', function(e) {
        
        const nameInput = document.getElementById('name');
        const phoneInput = document.getElementById('phone');
        
        if (!nameInput || !phoneInput) {
            console.log('Inputs not found');
            return;
        }
        
        const name = nameInput.value.trim();
        const phone = phoneInput.value.trim();
        
        console.log('Name:', name, 'Length:', name.length);
        console.log('Phone:', phone, 'Length:', phone.length);
        
        // Validate name is longer than 2 characters
        if (name.length <= 2) {
            console.log('Name validation failed');
            alert('Name must be longer than 2 characters');
            e.preventDefault();
            return false;
        }
        
        // phone validation - check for minimum 10 characters
        if (phone.length < 10) {
            console.log('Phone validation failed');
            alert('Phone number must be at least 10 characters');
            e.preventDefault();
            return false;
        }
        
    });
});
