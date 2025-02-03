var optionCount = 0;
var questions = [];
var addData = false;

function textQuestionModal() {
    const textQuestionModal = document.getElementById('textQuestionModal');
    const modal = new bootstrap.Modal(textQuestionModal);
    const textQuestionTitle = document.getElementById('textQuestionTitle');
    textQuestionTitle.value = '';
    modal.show();
}

function selectQuestionModal() {
    const selectQuestionModal = document.getElementById('selectQuestionModal');
    const modal = new bootstrap.Modal(selectQuestionModal);

    const selectQuestionTitle = document.getElementById('selectQuestionTitle');
    selectQuestionTitle.value = '';

    const optionContainer = document.getElementById('optionsContainer');
    optionContainer.innerHTML = '';

    optionCount = 0;
    addOption();
    modal.show();
}

var questionCount = 0;

function saveTextQuestion() {
    var questionText = document.getElementById("textQuestionTitle").value;
    var questionContainer = document.getElementById("question-list");

    if (questionText === "") {
        alert("Please enter a question");
        return;
    } else {
        questionCount++;

        const innerHTML = `
            <div class="question-div">
            <label for="input${questionCount}" class="form-label me-2">${questionText}</label>
            <div class="mb-3 d-flex align-items-center">
                <input type="text" class="form-control" id="input${questionCount}">
                <button class="btn ms-2" onclick="removeQuestion(this)">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="red" class="bi bi-dash-circle" viewBox="0 0 16 16">
                        <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16"/>
                        <path d="M4 8a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7A.5.5 0 0 1 4 8"/>
                    </svg>
                </button>
            </div>
        </div>
        `;

        questionContainer.insertAdjacentHTML('beforeend', innerHTML);
        addData = false;

        // Close the modal
        const textQuestionModal = document.getElementById('textQuestionModal');
        const modal = bootstrap.Modal.getInstance(textQuestionModal);
        modal.hide();
    }
}

function saveSelectQuestion() {
    var questionText = document.getElementById("selectQuestionTitle").value;
    var questionContainer = document.getElementById("question-list");

    if (questionText === "") {
        alert("Please enter a question");
        return;
    }

    // get the options
    const optionInputs = document.querySelectorAll('#optionsContainer .option-input');
    const options = [];
    optionInputs.forEach(input => {
        if (input.value.trim() !== "") {
            options.push(input.value.trim());
        }
    });

    if (options.length === 0) {
        alert("Please fill at least one option");
        return;
    }

    questionCount++;

    let optionsHTML = options.map((option, index) => `<option value="${index + 1}">${option}</option>`).join('');

    const innerHTML = `
        <div class="question-div">
            <label for="input${questionCount}" id="" class="form-label me-2">${questionText}</label>
            <div class="mb-3 d-flex align-items-center">
                <select class="form-select" id="input${questionCount}">
                    <option selected>Choose...</option>
                    ${optionsHTML}
                </select>
                <button class="btn ms-2" onclick="removeQuestion(this)">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="red" class="bi bi-dash-circle" viewBox="0 0 16 16">
                        <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16"/>
                        <path d="M4 8a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7A.5.5 0 0 1 4 8"/>
                    </svg>
                </button>
            </div>
        </div>
    `;

    questionContainer.insertAdjacentHTML('beforeend', innerHTML);
    addData = false;

    const selectQuestionModal = document.getElementById('selectQuestionModal');
    const modal = bootstrap.Modal.getInstance(selectQuestionModal);
    modal.hide();
}

function addOption() {
    const optionContainer = document.getElementById('optionsContainer');

    const currentOptionInput = document.getElementById("option_" + optionCount);

    if (optionCount > 0 && (!currentOptionInput || currentOptionInput.value.trim() === "")) {
        alert("Please fill the current option before adding a new one");
        return;
    }

    optionCount++;

    const innerHTML = `
        <div class="mb-3 option-row">
            <label class="form-label">Option ${optionCount}:</label>
            <input type="text" id="option_${optionCount}" class="form-control option-input" placeholder="Enter option">
        </div>
    `;

    optionContainer.insertAdjacentHTML('beforeend', innerHTML);
}

function removeQuestion(button) {
    const questionDiv = button.closest('.question-div');

    if (questionDiv) {
        questionDiv.remove();
        questionCount--;
        addData = false;
    }
}

function saveForm() {
    if (addData) {
        updateTable();
    } else {
        resetTable();
    }
    addData = true;

    var formTitle = document.getElementById("formTitle").value;
    var tableCaption = document.getElementById("table-caption");
    tableCaption.textContent = formTitle; // Set the table caption to formTitle
}

function resetTable() {
    var questionList = document.getElementById("question-list");
    var dataTable = document.getElementById("dataTable");
    var formTitle = document.getElementById("formTitle").value;

    dataTable.innerHTML = '';

    var caption = document.createElement('caption');
    caption.id = 'table-caption';
    caption.textContent = formTitle;
    dataTable.appendChild(caption);

    var thead = document.createElement('thead');
    var tbody = document.createElement('tbody');

    var headerRow = document.createElement('tr');

    var labels = questionList.querySelectorAll('label');

    labels.forEach(label => {
        var th = document.createElement('th');
        th.textContent = label.textContent;
        headerRow.appendChild(th);
    });

    thead.appendChild(headerRow);

    dataTable.appendChild(thead);
    dataTable.appendChild(tbody);

    updateTable();
}

function updateTable() {
    var questionList = document.getElementById("question-list");
    var dataTable = document.getElementById("dataTable");

    var bodyRow = document.createElement('tr');

    var inputs = questionList.querySelectorAll('input, select');

    inputs.forEach(input => {
        var td = document.createElement('td');
        if (input.tagName.toLowerCase() === 'select') {
            td.textContent = input.selectedOptions[0].textContent;
        } else {
            td.textContent = input.value;
        }
        bodyRow.appendChild(td);
    });

    dataTable.querySelector('tbody').appendChild(bodyRow);
}