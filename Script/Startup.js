const appStatus = ['Applied', 'Interview', 'Offer', 'Rejected'];
const applicationListElement = document.querySelector('.applicationList');
const userInputStatusElement = document.querySelector('.js-inputStatus');
const userInputDateElement = document.querySelector('.js-inputDate');
const userInputAddButtonElement = document.querySelector('.js-AddButton');
const userInputCompanyElement = document.querySelector('.js-inputCompany');
const userInputPositionElement = document.querySelector('.js-inputPosition');
const userInputLocationElement = document.querySelector('.js-inputLocation');
const userInputNoteElement = document.querySelector('.js-inputNote');
const countBoardElement = document.querySelector('.header-CountBoard');
const userInputDateMessageElement = document.querySelector('.userInput-Date-Message');
const userInputCompanyMessageElement = document.querySelector('.userInput-Company-Message');
const userInputPositionMessageElement = document.querySelector('.userInput-Position-Message');
const userInputLocationMessageElement = document.querySelector('.userInput-Location-Message');
const headerDeleteSectionElement = document.querySelector('.header-DeleteAll');

/*Calling Starting Functions*/

getCountMemoryStartup();
startupHTML();
updateCounterHTML();
initializeStatus();
getAppListMemoryStartup();
refreshAppListHTML();
userInputAddButtonElement.addEventListener('click', () => {
  addNewApplication ();
});

/************************/

function startupHTML() {
  userInputDateMessageElement.innerHTML = '';
  userInputCompanyMessageElement.innerHTML = '';
  userInputPositionMessageElement.innerHTML = '';
  userInputLocationMessageElement.innerHTML = '';
}

function initializeStatus() {
  let html = '';
  appStatus.forEach((appState) => {
    html = html + `<option value="${appState}">${appState}</option>`;
  });
  userInputStatusElement.innerHTML = html;
}

function updateCounterHTML() {
  let html = '';
  html = `
    <div class="counterLeft">
      <div>
        Applied: ${appliedCount}
      </div>
      <div>
        Interviewed: ${interviewCount}
      </div>
    </div>
    <div class="counterRight">
      <div>
        Offer: ${offerCount}
      </div>
      <div>
        Rejected: ${rejectedCount}
      </div>
    </div>
  `;
  countBoardElement.innerHTML = html;
}

function refreshAppListHTML() {
  let html = '';

  if(applicationList.length === 0) {
    html = `
      <div class="zeroEntryMessage">
        Added application entries will be displayed here
      </div>
    `;
    applicationListElement.innerHTML = html;
    return;
  }

  applicationList.forEach((app, index) => {
    if(app.userSelectState === 'Applied') {
      html = html + `
        <div class="applicationList-Object applicationList-Object-Applied js-app-object-${index}">
          <div class="appList-Date">
            ${app.userSelectDate}
          </div>
          <div class="appList-Company">
            ${app.userSelectCompany}
          </div>
          <div class="appList-Position">
            ${app.userSelectPositon}
          </div>
          <div class="appList-Location">
            ${app.userSelectLocation}
          </div>
          <div class="appList-Note">
            ${app.userSelectNote}
          </div>
          <div class="appList-Status">
            <select name="appStatus" id="appStatus" class="appStatus">
              <option value="Applied" Selected>Applied</option>
              <option value="Interview">Interview</option>
              <option value="Offer">Offer</option>
              <option value="Rejected">Rejected</option>
            </select>
          </div>
          <div class="appList-Delete">
            <button class="appList-Delete-Button" data-app-id="${index}">
              X
            </button>
          </div>
        </div>
      `;
    } else if(app.userSelectState === 'Interview') {
      html = html + `
        <div class="applicationList-Object applicationList-Object-Interview js-app-object-${index}">
          <div class="appList-Date">
            ${app.userSelectDate}
          </div>
          <div class="appList-Company">
            ${app.userSelectCompany}
          </div>
          <div class="appList-Position">
            ${app.userSelectPositon}
          </div>
          <div class="appList-Location">
            ${app.userSelectLocation}
          </div>
          <div class="appList-Note">
            ${app.userSelectNote}
          </div>
          <div class="appList-Status">
            <select name="appStatus" id="appStatus" class="appStatus">
              <option value="Applied">Applied</option>
              <option value="Interview" Selected>Interview</option>
              <option value="Offer">Offer</option>
              <option value="Rejected">Rejected</option>
            </select>
          </div>
          <div class="appList-Delete">
            <button class="appList-Delete-Button" data-app-id="${index}">
              X
            </button>
          </div>
        </div>
      `;
    } else if(app.userSelectState === 'Offer') {
      html = html + `
        <div class="applicationList-Object applicationList-Object-Offer js-app-object-${index}">
          <div class="appList-Date">
            ${app.userSelectDate}
          </div>
          <div class="appList-Company">
            ${app.userSelectCompany}
          </div>
          <div class="appList-Position">
            ${app.userSelectPositon}
          </div>
          <div class="appList-Location">
            ${app.userSelectLocation}
          </div>
          <div class="appList-Note">
            ${app.userSelectNote}
          </div>
          <div class="appList-Status">
            <select name="appStatus" id="appStatus" class="appStatus">
              <option value="Applied">Applied</option>
              <option value="Interview">Interview</option>
              <option value="Offer" Selected>Offer</option>
              <option value="Rejected">Rejected</option>
            </select>
          </div>
          <div class="appList-Delete">
            <button class="appList-Delete-Button" data-app-id="${index}">
              X
            </button>
          </div>
        </div>
      `;
    } else if(app.userSelectState === 'Rejected') {
      html = html + `
        <div class="applicationList-Object applicationList-Object-Rejected js-app-object-${index}">
          <div class="appList-Date">
            ${app.userSelectDate}
          </div>
          <div class="appList-Company">
            ${app.userSelectCompany}
          </div>
          <div class="appList-Position">
            ${app.userSelectPositon}
          </div>
          <div class="appList-Location">
            ${app.userSelectLocation}
          </div>
          <div class="appList-Note">
            ${app.userSelectNote}
          </div>
          <div class="appList-Status">
            <select name="appStatus" id="appStatus" class="appStatus">
              <option value="Applied">Applied</option>
              <option value="Interview">Interview</option>
              <option value="Offer">Offer</option>
              <option value="Rejected" Selected>Rejected</option>
            </select>
          </div>
          <div class="appList-Delete">
            <button class="appList-Delete-Button" data-app-id="${index}">
              X
            </button>
          </div>
        </div>
      `;
    }
  });

  applicationListElement.innerHTML = html;

  document.querySelectorAll('.appList-Delete-Button').forEach((deleteButton) => {
    deleteButton.addEventListener('click', () => {
      deleteAppEntry(deleteButton.dataset.appId);
    });
  });

  document.querySelectorAll('.appStatus').forEach((statusDropDown, index) => {
    statusDropDown.addEventListener('change', (dropdownValue) => {
      recountCountBoard(dropdownValue.target.value, index);
      updateEntryHTML(dropdownValue.target.value, index);
    });
  });
}