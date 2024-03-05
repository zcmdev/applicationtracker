/*Entry Handle Functions*/

function addNewApplication () {

  messageDisplay('Resetall', '');

  if(userInputDateElement.value === '') {
    messageDisplay('Date', 'Please enter a date');
    return;
  } else {
    const userSelectDateString = userInputDateElement.value + " 00:00:00";
    const userSelectDateCheck = new Date(userSelectDateString);
    const acceptableDate = checkFutureDate(userSelectDateCheck);
    if(acceptableDate) {
      userSelectDate = userInputDateElement.value;
    } else {
      messageDisplay('DateFuture', 'Cannot be a future date');
      return;
    }
  }

  if(userInputCompanyElement.value === '') {
    messageDisplay('Company', 'Please enter company name');
    return;
  } else {
    userSelectCompany = userInputCompanyElement.value;
  }

  if(userInputPositionElement.value === '') {
    messageDisplay('Position', 'Please enter position');
    return;
  } else {
    userSelectPositon = userInputPositionElement.value;
  }

  if(userInputLocationElement.value === '') {
    messageDisplay('Location', 'Please enter location');
    return;
  } else {
    userSelectLocation = userInputLocationElement.value;
  }

  userSelectNote = userInputNoteElement.value;
  userSelectState = userInputStatusElement.value;

  applicationList.unshift({
    userSelectDate,
    userSelectCompany,
    userSelectPositon,
    userSelectLocation,
    userSelectNote,
    userSelectState
  });

  messageDisplay('Resetall', '');
  updateApplicationListHTML();
  updateCountBoard(userSelectState, 'add');
  updateCounterHTML();
  UpdateCountMemory();
  updateAppListMemory();
}

function updateApplicationListHTML() {
  
  refreshAppListHTML();

  //Reset all input
  userInputDateElement.value = '';
  userInputCompanyElement.value = '';
  userInputPositionElement.value = '';
  userInputLocationElement.value = '';
  userInputNoteElement.value = '';
  userInputStatusElement.value = 'Applied';
}

function deleteAppEntry(index) {
  let deleteEntryStatus = applicationList[index].userSelectState;
  updateCountBoard(deleteEntryStatus, 'remove');
  applicationList.splice(index,1);
  refreshAppListHTML();
  updateCounterHTML();
  UpdateCountMemory();
  updateAppListMemory();
}

function updateEntryHTML(changedStatusValue, index) {
  const getElement = `.js-app-object-${index}`;
  const newStatusValue = changedStatusValue;
  const rowEntryElement = document.querySelector(getElement);
  if(newStatusValue === 'Rejected') {
    rowEntryElement.style.backgroundColor = '#F5F5F5';
    rowEntryElement.style.color = '#909090';
  } else if(newStatusValue === 'Interview') {
    rowEntryElement.style.backgroundColor = '#FFFFED';
    rowEntryElement.style.color = '#18191A';
  } else if(newStatusValue === 'Offer') {
    rowEntryElement.style.backgroundColor = '#E9EDC9';
    rowEntryElement.style.color = '#18191A';
  } else if(newStatusValue === 'Applied') {
    rowEntryElement.style.backgroundColor = 'transparent';
    rowEntryElement.style.color = '#18191A';
  }
}

/************************/

/*Count Board Handle Functions*/

function updateCountBoard(parameterState, addOrRemove) {
  if(addOrRemove === 'add') {
    switch(parameterState) {
      case 'Applied':
        appliedCount++;
        break;
      case 'Interview':
        interviewCount++;
        break;
      case 'Offer':
        offerCount++;
        break;
      case 'Rejected':
        rejectedCount++;
        break;
      default:
        break;
    }
  } else if(addOrRemove === 'remove') {
    switch(parameterState) {
      case 'Applied':
        appliedCount--;
        break;
      case 'Interview':
        interviewCount--;
        break;
      case 'Offer':
        offerCount--;
        break;
      case 'Rejected':
        rejectedCount--;
        break;
      default:
        break;
    }
  }
}

function recountCountBoard(changedStatusValue, index) {
  let statusToRemove = applicationList[index].userSelectState;
  let statusToAdd = changedStatusValue;
  updateCountBoard(statusToRemove, 'remove');
  updateCountBoard(statusToAdd, 'add');
  applicationList[index].userSelectState = statusToAdd;
  updateCounterHTML();
  UpdateCountMemory();
  updateAppListMemory();
}

/************************/

/*Error Entry Functions*/

function messageDisplay(messageSection, messageToDisplay) {
  switch (messageSection) {
    case 'Date':
      userInputDateMessageElement.innerHTML = messageToDisplay;
      break;
    case 'DateFuture':
      userInputDateMessageElement.innerHTML = messageToDisplay;
      break;
    case 'Company':
      userInputCompanyMessageElement.innerHTML = messageToDisplay;
      break;
    case 'Position':
      userInputPositionMessageElement.innerHTML = messageToDisplay;
      break;
    case 'Location':
      userInputLocationMessageElement.innerHTML = messageToDisplay;
      break;
    case 'Resetall':
      userInputDateMessageElement.innerHTML = '';
      userInputCompanyMessageElement.innerHTML = '';
      userInputPositionMessageElement.innerHTML = '';
      userInputLocationMessageElement.innerHTML = '';
      break;
    default:
      userInputDateMessageElement.innerHTML = '';
      userInputCompanyMessageElement.innerHTML = '';
      userInputPositionMessageElement.innerHTML = '';
      userInputLocationMessageElement.innerHTML = '';
      break;
  }
}

function checkFutureDate (userInputDate) {
  let currentDate = new Date();
  if(currentDate < userInputDate) {
    return false;
  } else {
    return true;
  }
}

/************************/

/*RemoveAll Button Functions*/

function resetFromRemoveAllButton() {
  headerDeleteSectionElement.innerHTML = `
    <div class="header-PopUp">
      <div class="header-PopUp-Message">
        Are you sure you want to reset this application tracker?
      </div>
      <div class="header-PopUp-Buttons">
        <button class="cancelButton" onclick="
          resetFromRemoveAllButtonCancel();
        ">
          Cancel
        </button>
        <button class="continueButton" onclick="
          resetEntireTracker();
        ">
          Yes
        </button>
      </div>
    </div>
  `;
}

function resetFromRemoveAllButtonCancel() {
  headerDeleteSectionElement.innerHTML = `
    <button class="deleteAllButton" onclick="
      resetFromRemoveAllButton();
    ">
      Remove All
    </button>
  `;
}

function resetEntireTracker() {
  headerDeleteSectionElement.innerHTML = `
    <button class="deleteAllButton" onclick="
      resetFromRemoveAllButton();
    ">
      Remove All
    </button>
  `;

  //Reset all variable and memory
  appliedCount = 0;
  interviewCount = 0;
  offerCount = 0;
  rejectedCount = 0;

  userSelectDate = '';
  userSelectCompany = '';
  userSelectPositon = '';
  userSelectLocation = '';
  userSelectNote = '';
  userSelectState = '';

  applicationList = [];
  appCounterMemoryList = [0, 0, 0, 0];

  //Update HTML
  refreshAppListHTML();
  updateCounterHTML();

  //Update Memory
  updateAppListMemory();
  UpdateCountMemory();
}

/************************/


