document.addEventListener('DOMContentLoaded', function() {
    let itemCount = 1;
    let config = {
        "vegetables": [
            {
                "name": "Potato",
                "cuttingStyles": ["Dice", "Thin Wedges (Aloo bhaja)", "Fat wedges (Maach torkari)", "Quarter Cut (Aloo Shiddho)"]
            },
            {
                "name": "Onion",
                "cuttingStyles": ["Minced", "Long Cut", "Layered Dice (Chilly Chicken)"]
            },
            {
                "name": "Chilly",
                "cuttingStyles": ["Chop", "Slit"]
            },
            {
                "name": "Tomato",
                "cuttingStyles": ["Dice", "Long Cut"]
            },
            {
                "name": "Garlic",
                "cuttingStyles": []
            },
            {
                "name": "Ginger",
                "cuttingStyles": []
            },
            {
                "name": "Capsicum",
                "cuttingStyles": ["Dice", "Long Cut"]
            }
        ]
    };

    initializeFirstItem();

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
        // Play notification sound from local assets
        const audio = new Audio('assets/bell.mp3');
        audio.play();
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

    function initializeFirstItem() {
        populateVegetableSelect(0);
        populateSizeSelect(0);
    }

    function populateVegetableSelect(index) {
        const select = document.getElementById(`vegetable-${index}`);
        config.vegetables.forEach(veg => {
            const option = document.createElement('option');
            option.value = veg.name.toLowerCase();
            option.textContent = veg.name;
            select.appendChild(option);
        });
        select.addEventListener('change', function() {
            populateCuttingStyleSelect(index, this.value);
            updateItemNumbers();
        });
    }

    function populateCuttingStyleSelect(index, vegetableName) {
        const select = document.getElementById(`style-${index}`);
        select.innerHTML = '<option value="">Choose...</option>';
        const veg = config.vegetables.find(v => v.name.toLowerCase() === vegetableName);
        if (veg) {
            veg.cuttingStyles.forEach(style => {
                const option = document.createElement('option');
                option.value = style;
                option.textContent = style.charAt(0).toUpperCase() + style.slice(1);
                select.appendChild(option);
            });
        }
    }

    function populateSizeSelect(index) {
        // Size is fixed, no change needed
    }

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
                    </select>
                </div>
            </div>
            <button type="button" class="btn btn-outline-danger remove-item">Remove</button>
        `;
        itemsContainer.appendChild(newItem);
        populateVegetableSelect(itemCount - 1);
        updateItemNumbers();
        if (document.querySelectorAll('.item').length > 1) {
            document.querySelectorAll('.remove-item').forEach(btn => btn.style.display = 'inline-block');
        }
    }

    function updateItemNumbers() {
        const items = document.querySelectorAll('.item');
        items.forEach((item, index) => {
            const vegetableSelect = item.querySelector(`select[id="vegetable-${index}"]`);
            const vegetable = vegetableSelect ? vegetableSelect.options[vegetableSelect.selectedIndex]?.text || `Item ${index + 1}` : `Item ${index + 1}`;
            item.querySelector('h3').textContent = vegetable;
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
            let cuttingStyle = styleSelect.options[styleSelect.selectedIndex].text;
            if (!styleSelect.value) {
                cuttingStyle = 'Not selected';
            }

            summaryHtml += `
                <div class="card p-3 mb-3">
                    <h4>${vegetable}</h4>
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