document.addEventListener('DOMContentLoaded', () => {
    const LINK_RUSSIA = 'https://my.trekyoubaby.com/click?pid=4941&offer_id=8322';
    const LINK_KAZAKHSTAN = 'https://meet.google.com/landing';
    
    const loadingElement = document.getElementById('loading');
    const errorElement = document.getElementById('error');
    
    function redirectBasedOnLanguage() {
        const userLanguages = navigator.languages || [navigator.language || navigator.userLanguage];
        
        const isRussian = userLanguages.some(lang => 
            lang.toLowerCase().startsWith('ru') || 
            lang.toLowerCase().includes('ru-')
        );
        
        const isKazakh = userLanguages.some(lang => 
            lang.toLowerCase().startsWith('kk') || 
            lang.toLowerCase().includes('kz') ||
            lang.toLowerCase().includes('kk-')
        );
        
        if (isRussian) {
            window.location.href = LINK_RUSSIA;
        } else if (isKazakh) {
            window.location.href = LINK_KAZAKHSTAN;
        } else {
            showError('Access denied for your region.');
            setTimeout(() => {
                window.close();
            }, 3000);
        }
    }
    
    function showError(message) {
        loadingElement.classList.add('hidden');
        errorElement.textContent = message;
        errorElement.classList.remove('hidden');
    }
    
    redirectBasedOnLanguage();
});
