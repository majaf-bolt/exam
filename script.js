function calculate() {
    const revenue = parseFloat(document.getElementById('revenue').value) || 0;
    const avgOrder = parseFloat(document.getElementById('avgOrder').value) || 0;
    const leadRate = parseFloat(document.getElementById('leadRate').value);
    const prospectRate = parseFloat(document.getElementById('prospectRate').value);

    const customers = avgOrder > 0 ? Math.ceil(revenue / avgOrder) : 0;
    const leads = Math.ceil(customers * 100 / leadRate);
    const prospects = Math.ceil(leads * 100 / prospectRate);

    document.getElementById('customerNum').textContent = customers;
    document.getElementById('leadNum').textContent = leads;
    document.getElementById('prospectNum').textContent = prospects;

    document.getElementById('leadRateVal').textContent = leadRate.toFixed(2) + '%';
    document.getElementById('prospectRateVal').textContent = prospectRate.toFixed(2) + '%';

    const leadPct = prospects > 0 ? Math.round(leads / prospects * 100) : 0;
    const customerPct = prospects > 0 ? Math.round(customers / prospects * 100) : 0;

    document.getElementById('prospectPct').textContent = '100%';
    document.getElementById('leadPct').textContent = leadPct + '%';
    document.getElementById('customerPct').textContent = customerPct + '%';

    document.getElementById('prospectBar').style.width = '100%';
    document.getElementById('leadBar').style.width = leadPct + '%';
    document.getElementById('customerBar').style.width = customerPct + '%';

    drawChart(prospects, leads, customers);
}

function drawChart(prospects, leads, customers) {
    const area = document.getElementById('chartArea');
    area.innerHTML = '';

    if (prospects === 0) return;

    const months = 6;

    for (let i = 1; i <= months; i++) {
        const ratio = (months - i + 1) / months;
        const p = Math.round(prospects * ratio);
        const l = Math.round(leads * ratio);
        const c = Math.round(customers * ratio);

        const row = document.createElement('div');
        row.style.cssText = 'display:flex; align-items:center; gap:10px; margin-bottom:12px;';

        row.innerHTML = `
            <span style="color:#aaa; font-size:12px; width:12px; text-align:right;">${i}</span>
            <div style="position:relative; height:24px; flex:1;"
                 onmouseenter="showTooltip(this, ${i}, ${p}, ${l}, ${c})"
                 onmouseleave="hideTooltip(this)">
                <div style="position:absolute; top:0; left:0; height:100%; width:${p/prospects*100}%; background:#4a5568; border-radius:3px;"></div>
                <div style="position:absolute; top:0; left:0; height:100%; width:${l/prospects*100}%; background:#718096; border-radius:3px;"></div>
                <div style="position:absolute; top:0; left:0; height:100%; width:${c/prospects*100}%; background:#a0aec0; border-radius:3px;"></div>
                <div class="tooltip" style="display:none; position:absolute; background:#1a1f2e; border:1px solid #3a3f50; padding:8px; border-radius:6px; font-size:11px; z-index:10; bottom:30px; left:30%;">
                    Month #${i}<br>Prospects: ${p}<br>Leads: ${l}<br>Customers: ${c}
                </div>
            </div>
        `;
        area.appendChild(row);
    }
}

function showTooltip(el) {
    el.querySelector('.tooltip').style.display = 'block';
}

function hideTooltip(el) {
    el.querySelector('.tooltip').style.display = 'none';
}

document.getElementById('revenue').addEventListener('input', calculate);
document.getElementById('avgOrder').addEventListener('input', calculate);
document.getElementById('leadRate').addEventListener('input', calculate);
document.getElementById('prospectRate').addEventListener('input', calculate);

calculate();