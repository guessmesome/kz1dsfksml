document.addEventListener('DOMContentLoaded', () => {
    const LINK_RUSSIA = 'https://track.magicclick.partners/click?o=1060&a=22476&link_id=6560';
    const LINK_KAZAKHSTAN = 'https://track.magicclick.partners/click?o=1060&a=22476&link_id=6560';
    
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
