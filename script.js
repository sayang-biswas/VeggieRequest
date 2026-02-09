document.addEventListener('DOMContentLoaded', function() {
    let itemCount = 1;

    const addItemBtn = document.getElementById('add-item');
    const form = document.getElementById('cutting-form');
    const summary = document.getElementById('summary');
    const summaryContent = document.getElementById('summary-content');
    const backBtn = document.getElementById('back-btn');
    const itemsContainer = document.getElementById('items-container');

    addItemBtn.addEventListener('click', function() {
        addNewItem();
    });

    form.addEventListener('submit', function(event) {
        event.preventDefault();
        showSummary();
    });

    backBtn.addEventListener('click', function() {
        summary.style.display = 'none';
        form.style.display = 'block';
        document.querySelector('h1').style.display = 'block';
    });

    itemsContainer.addEventListener('click', function(event) {
        if (event.target.classList.contains('remove-item')) {
            event.target.closest('.item').remove();
            updateItemNumbers();
            if (document.querySelectorAll('.item').length === 1) {
                document.querySelector('.remove-item').style.display = 'none';
            }
        }
    });

    function addNewItem() {
        itemCount++;
        const itemsContainer = document.getElementById('items-container');
        const newItem = document.createElement('div');
        newItem.className = 'item card p-3 mb-3';
        newItem.innerHTML = `
            <h3>Item ${itemCount}</h3>
            <div class="row">
                <div class="col-md-6 mb-3">
                    <label for="vegetable-${itemCount - 1}" class="form-label">Vegetable Item</label>
                    <select class="form-select" id="vegetable-${itemCount - 1}" required>
                        <option value="">Choose...</option>
                        <option value="carrot">Carrot</option>
                        <option value="potato">Potato</option>
                        <option value="onion">Onion</option>
                        <option value="tomato">Tomato</option>
                        <option value="cucumber">Cucumber</option>
                    </select>
                </div>
                <div class="col-md-6 mb-3">
                    <label for="quantity-${itemCount - 1}" class="form-label">Quantity</label>
                    <input type="number" class="form-control" id="quantity-${itemCount - 1}" min="1" required>
                </div>
            </div>
            <div class="row">
                <div class="col-md-6 mb-3">
                    <label for="size-${itemCount - 1}" class="form-label">Size</label>
                    <select class="form-select" id="size-${itemCount - 1}" required>
                        <option value="">Choose...</option>
                        <option value="small">Small</option>
                        <option value="medium">Medium</option>
                        <option value="large">Large</option>
                    </select>
                </div>
                <div class="col-md-6 mb-3">
                    <label for="style-${itemCount - 1}" class="form-label">Cutting Style</label>
                    <select class="form-select" id="style-${itemCount - 1}" required>
                        <option value="">Choose...</option>
                        <option value="slices">Slices</option>
                        <option value="dices">Dices</option>
                        <option value="julienne">Julienne</option>
                        <option value="chunks">Chunks</option>
                    </select>
                </div>
            </div>
            <button type="button" class="btn btn-outline-danger remove-item">Remove</button>
        `;
        itemsContainer.appendChild(newItem);
        updateItemNumbers();
        if (document.querySelectorAll('.item').length > 1) {
            document.querySelectorAll('.remove-item').forEach(btn => btn.style.display = 'inline-block');
        }
    }

    function updateItemNumbers() {
        const items = document.querySelectorAll('.item');
        items.forEach((item, index) => {
            item.querySelector('h3').textContent = `Item ${index + 1}`;
        });
        itemCount = items.length;
    }

    function showSummary() {
        const items = document.querySelectorAll('.item');
        let summaryHtml = '';
        items.forEach((item, index) => {
            const vegetableSelect = item.querySelector(`select[id="vegetable-${index}"]`);
            const vegetable = vegetableSelect.options[vegetableSelect.selectedIndex].text;
            const quantity = item.querySelector(`input[id="quantity-${index}"]`).value;
            const sizeSelect = item.querySelector(`select[id="size-${index}"]`);
            const size = sizeSelect.options[sizeSelect.selectedIndex].text;
            const styleSelect = item.querySelector(`select[id="style-${index}"]`);
            const cuttingStyle = styleSelect.options[styleSelect.selectedIndex].text;

            summaryHtml += `
                <div class="card p-3 mb-3">
                    <h4>Item ${index + 1}</h4>
                    <p><strong>Vegetable:</strong> ${vegetable}</p>
                    <p><strong>Quantity:</strong> ${quantity}</p>
                    <p><strong>Size:</strong> ${size}</p>
                    <p><strong>Cutting Style:</strong> ${cuttingStyle}</p>
                </div>
            `;
        });
        summaryContent.innerHTML = summaryHtml;
        summary.style.display = 'block';
        form.style.display = 'none';
        document.querySelector('h1').style.display = 'none';
    }
});