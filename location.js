chrome.storage.sync.get(['apiToken'], (result) => {
    const token = result.apiToken;

    if (!token) {
        alert('API token not set. Please set it in the extension options.');
        return;
    }

    fetch(`https://api.2ip.io/?token=${token}`)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            createPopup(data.emoji, data.country, data.code, data.ip)
        })
        .catch(error => {
            console.error('Request error:', error);
        });
});

function createPopup(emoji, country, countryCode, ip) {
    const popup = document.createElement('div');

    popup.id = 'country-info-popup';
    popup.innerHTML = `
                <div style="background: white; border-radius: 8px; box-shadow: 0 2px 8px rgba(0,0,0,0.15); padding: 12px 20px 12px 16px; min-width: 180px; max-width: 260px; font-family: sans-serif; position: relative; display: flex; align-items: center;">
                    <span style='font-size: 28px; margin-right: 10px;'>${emoji}</span>
                    <div style='flex:1;'>
                      <div style='font-size: 15px; font-weight: 500;'>${country}</div>
                      <div style='font-size: 12px; color: #888;'>${countryCode} &bull; ${ip}</div>
                    </div>
                    <button id="close-country-popup" style="position: absolute; top: 4px; right: 6px; background: transparent; border: none; font-size: 16px; color: #888; cursor: pointer;">&times;</button>
                </div>
            `;

    Object.assign(popup.style, {
        position: 'fixed',
        top: '24px',
        right: '24px',
        zIndex: 99999,
        background: 'transparent',
        border: 'none',
        margin: 0,
        padding: 0
    });

    document.body.appendChild(popup);
    document.getElementById('close-country-popup').onclick = function () { popup.remove() };

    return popup
}
