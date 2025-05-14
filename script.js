document.addEventListener('DOMContentLoaded', () => {
    const LINK_RUSSIA = 'https://my.trekyoubaby.com/click?pid=4941&offer_id=8322';
    const LINK_KAZAKHSTAN = 'https://meet.google.com/landing';
    
    const loadingElement = document.getElementById('loading');
    const errorElement = document.getElementById('error');
    
    function checkLocationAndRedirect() {
        const endpoint = 'http://ip-api.com/json/?fields=status,message,countryCode';
        
        const xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function() {
            if (this.readyState == 4) {
                if (this.status == 200) {
                    const response = JSON.parse(this.responseText);
                    
                    if (response.status !== 'success') {
                        showError('Error: ' + response.message);
                        return;
                    }
                    
                    if (response.countryCode === 'RU') {
                        window.location.href = LINK_RUSSIA;
                    } else if (response.countryCode === 'KZ') {
                        window.location.href = LINK_KAZAKHSTAN;
                    } else {
                        showError('Access denied for your region.');
                        setTimeout(() => {
                            window.close();
                        }, 3000);
                    }
                } else {
                    showError('Error checking location. Please try again later.');
                }
            }
        };
        
        xhr.open('GET', endpoint, true);
        xhr.send();
    }
    
    function showError(message) {
        loadingElement.classList.add('hidden');
        errorElement.textContent = message;
        errorElement.classList.remove('hidden');
    }
    
    checkLocationAndRedirect();
});
