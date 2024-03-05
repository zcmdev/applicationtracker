let appliedCount = 0;
let interviewCount = 0;
let offerCount = 0;
let rejectedCount = 0;

let userSelectDate = '';
let userSelectCompany = '';
let userSelectPositon = '';
let userSelectLocation = '';
let userSelectNote = '';
let userSelectState = '';

let applicationList = [];
let appCounterMemoryList = [0, 0, 0, 0];

function getCountMemoryStartup() {
  if(localStorage.getItem('appCounter') != null) {
    appCounterMemoryList = JSON.parse(localStorage.getItem('appCounter'));
    if(appCounterMemoryList.length === 4) {
      appliedCount = appCounterMemoryList[0];
      interviewCount = appCounterMemoryList[1];
      offerCount = appCounterMemoryList[2];
      rejectedCount = appCounterMemoryList[3];
    }
  } else {
    const putInMemory = JSON.stringify(appCounterMemoryList);
    localStorage.setItem('appCounter', putInMemory);
  }
}

function UpdateCountMemory() {
  if(localStorage.getItem('appCounter') != null) {
    localStorage.removeItem('appCounter');
    appCounterMemoryList[0] = appliedCount;
    appCounterMemoryList[1] = interviewCount;
    appCounterMemoryList[2] = offerCount;
    appCounterMemoryList[3] = rejectedCount;
    const resaveCountMemory = JSON.stringify(appCounterMemoryList);
    localStorage.setItem('appCounter', resaveCountMemory);
  } else {
    console.log('There is no appcounter memory, ERROR');
  }
}

function getAppListMemoryStartup() {
  if(localStorage.getItem('appList') != null) {
    applicationList = JSON.parse(localStorage.getItem('appList'));
  } else {
    const putInMemory = JSON.stringify(applicationList);
    localStorage.setItem('appList', putInMemory);
  }
}

function updateAppListMemory() {
  if(localStorage.getItem('appList') != null) {
    localStorage.removeItem('appList');
    const resaveAppListMemory = JSON.stringify(applicationList);
    localStorage.setItem('appList', resaveAppListMemory);
  } else {
    console.log('Cannot find appList memory, ERROR');
  }
}