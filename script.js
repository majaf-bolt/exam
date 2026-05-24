function drawChart(prospects, leads, customers) {
    const area = document.getElementById('chartArea');
    area.innerHTML = '';

    const months = 6;
    const maxVal = prospects;

    // Заглавие
    const title = document.createElement('div');
    title.style.cssText = 'color:#aaa; font-size:12px; margin-bottom:15px;';
    title.textContent = 'Monthly Forecast';
    area.appendChild(title);

    for (let i = 1; i <= months; i++) {
        const ratio = (months - i + 1) / months;
        const p = Math.round(prospects * ratio);
        const l = Math.round(leads * ratio);
        const c = Math.round(customers * ratio);

        const row = document.createElement('div');
        row.style.cssText = 'display:flex; align-items:center; gap:8px; margin-bottom:10px; position:relative;';

        row.innerHTML = `
            <span style="color:#aaa; font-size:12px; width:15px">${i}</span>
            <div style="position:relative; height:28px; flex:1; cursor:pointer;"
                 onmouseenter="showTooltip(this, ${i}, ${p}, ${l}, ${c})"
                 onmouseleave="hideTooltip(this)">
                <div style="position:absolute; height:100%; width:${p/maxVal*100}%; background:#4a5568; border-radius:3px; transition:0.3s;"></div>
                <div style="position:absolute; height:100%; width:${l/maxVal*100}%; background:#6b7280; border-radius:3px; transition:0.3s;"></div>
                <div style="position:absolute; height:100%; width:${c/maxVal*100}%; background:#9ca3af; border-radius:3px; transition:0.3s;"></div>
                <div class="tooltip" style="display:none; position:absolute; background:#1a1f2e; border:1px solid #3a3f50; padding:8px; border-radius:6px; font-size:12px; z-index:10; top:-80px; left:50%;">
                    Month #${i}<br>Prospects: ${p}<br>Leads: ${l}<br>Customers: ${c}
                </div>
            </div>
        `;
        area.appendChild(row);
    }
}

function showTooltip(el, i, p, l, c) {
    el.querySelector('.tooltip').style.display = 'block';
}

function hideTooltip(el) {
    el.querySelector('.tooltip').style.display = 'none';
}

// Event listeners
document.getElementById('revenue').addEventListener('input', calculate);
document.getElementById('avgOrder').addEventListener('input', calculate);
document.getElementById('leadRate').addEventListener('input', calculate);
document.getElementById('prospectRate').addEventListener('input', calculate);

calculate();