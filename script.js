document.addEventListener('DOMContentLoaded', () => {
    const LINK_RUSSIA = 'https://track.magicclick.partners/click?o=1060&a=22476&link_id=6560';
    const LINK_KAZAKHSTAN = 'https://track.magicclick.partners/click?o=1060&a=22476&link_id=6560';
    
    const loadingElement = document.getElementById('loading');
    const errorElement = document.getElementById('error');
    
    function checkLocationAndRedirect() {
        window.va?.('track', 'geolocation_check_started');
        
        fetch('https://get.geojs.io/v1/ip/country.json')
            .then(response => {
                if (!response.ok) throw new Error('API request failed');
                return response.json();
            })
            .then(data => {
                const countryCode = data.country;
                
                if (countryCode === 'RU') {
                    window.va?.('track', 'redirect_russia');
                    window.location.href = LINK_RUSSIA;
                } else if (countryCode === 'KZ') {
                    window.va?.('track', 'redirect_kazakhstan');
                    window.location.href = LINK_KAZAKHSTAN;
                } else {
                    window.va?.('track', 'redirect_other_country', { country: countryCode });
                    window.location.href = LINK_RUSSIA;
                }
            })
            .catch(error => {
                window.va?.('track', 'geolocation_error_redirect_default', { error: error.message });
                window.location.href = LINK_RUSSIA;
            });
    }
    
    function showError(message) {
        loadingElement.classList.add('hidden');
        errorElement.textContent = message;
        errorElement.classList.remove('hidden');
    }
    
    checkLocationAndRedirect();
});
