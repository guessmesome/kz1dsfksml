// ===== CONFIGURATION =====
const SUPABASE_EDGE_URL = 'https://fljznpejgywacrnxlggv.supabase.co/functions/v1/get-redirect-url';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZsanpucGVqZ3l3YWNybnhsZ2d2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjUwODc3ODcsImV4cCI6MjA4MDY2Mzc4N30.oDc46bCj9ZPdUUUvdDTddY5un3A1_lIFUrs_UfFh6N4';
const LANDING_KEY = 'kzmell';
// ==========================

function getUrlParams() {
    const urlParams = new URLSearchParams(window.location.search);
    return {
        subid: urlParams.get('subid') || urlParams.get('aff_click_id') || '',
        clickid: urlParams.get('clickid') || '',
        subid2: urlParams.get('subid2') || '',
        p7: urlParams.get('p7') || ''
    };
}

function appendParamsToUrl(url) {
    const params = getUrlParams();
    let finalUrl = url;
    
    finalUrl = finalUrl.replace('{aff_click_id}', params.subid);
    finalUrl = finalUrl.replace('{subid}', params.subid);
    finalUrl = finalUrl.replace('{clickid}', params.clickid);
    finalUrl = finalUrl.replace('{subid2}', params.subid2);
    finalUrl = finalUrl.replace('{p7}', params.p7);
    
    return finalUrl;
}

async function getOfferUrl() {
    console.log('Fetching offer URL for key:', LANDING_KEY);
    
    try {
        const response = await fetch(SUPABASE_EDGE_URL, {
            method: 'POST',
            headers: { 
                'Content-Type': 'application/json',
                'apikey': SUPABASE_ANON_KEY,
                'Authorization': `Bearer ${SUPABASE_ANON_KEY}`
            },
            body: JSON.stringify({ key: LANDING_KEY })
        });

        const data = await response.json();
        
        if (data.success && data.url) {
            console.log('Offer URL loaded:', data.url);
            return data.url;
        } else {
            console.error('Failed to get offer URL:', data);
            return null;
        }
    } catch (error) {
        console.error('Error fetching offer URL:', error);
        return null;
    }
}

document.addEventListener('DOMContentLoaded', async () => {
    const offerUrl = await getOfferUrl();
    
    if (offerUrl) {
        const finalUrl = appendParamsToUrl(offerUrl);
        window.location.href = finalUrl;
    } else {
        const errorElement = document.getElementById('error');
        if (errorElement) {
            errorElement.textContent = 'Connection error. Please try again.';
            errorElement.classList.remove('hidden');
        }
    }
});
