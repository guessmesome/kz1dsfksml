document.addEventListener('DOMContentLoaded', () => {
    const LINK_RUSSIA = 'https://my.trekyoubaby.com/click?pid=4941&offer_id=8322';
    const LINK_KAZAKHSTAN = 'https://meet.google.com/landing';
    
    const loadingElement = document.getElementById('loading');
    const errorElement = document.getElementById('error');
    
    function checkLocationAndRedirect() {
        fetch('https://get.geojs.io/v1/ip/country.json')
            .then(response => {
                if (!response.ok) throw new Error('API request failed');
                return response.json();
            })
            .then(data => {
                const countryCode = data.country;
                
                if (countryCode === 'RU') {
                    window.location.href = LINK_RUSSIA;
                } else if (countryCode === 'KZ') {
                    window.location.href = LINK_KAZAKHSTAN;
                } else {
                    showError('Access denied for your region.');
                    setTimeout(() => {
                        window.close();
                    }, 3000);
                }
            })
            .catch(error => {
                showError('Error checking location. Please try again later.');
            });
    }
    
    function showError(message) {
        loadingElement.classList.add('hidden');
        errorElement.textContent = message;
        errorElement.classList.remove('hidden');
    }
    
    checkLocationAndRedirect();
});
