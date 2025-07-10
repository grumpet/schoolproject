document.addEventListener('DOMContentLoaded', function() {
    console.log('Script loaded'); 
    const form = document.querySelector('form[action="/book"]') || document.querySelector('form[action="/signup"]');
    
    if (!form) {
        return;
    }
    
    
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
