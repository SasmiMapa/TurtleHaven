const checkboxes = document.querySelectorAll('input[type="checkbox"]');
const selectedOptions = JSON.parse(localStorage.getItem("selectedOptions")) || [];

const regular = [];
const peak = [];

function toggleOptions() {
  const options = document.getElementById("options");
  options.style.display = options.style.display === "block" ? "none" : "block";
}

let firstStartTime = null;
let lastEndTime = null;

function toggleSelection(checkbox) {
  if (checkbox.checked) {
    const selectedValue = checkbox.value;
    const lastSelectedValue = selectedOptions.length > 0 ? selectedOptions[selectedOptions.length - 1] : null;

    if (!lastSelectedValue || isConsecutive(lastSelectedValue, selectedValue)) {
      selectedOptions.push(selectedValue);
      if (selectedValue.includes("(Peak)")) {
        peak.push(selectedValue);
      } else {
        regular.push(selectedValue);
      }
      const timeMatches = selectedValue.match(/(\d+\.\d+\w*)\s*-\s*(\d+\.\d+\w*)/);
      if (timeMatches) {
        const startTime = timeMatches[1];
        const endTime = timeMatches[2];

        if (firstStartTime === null) {
          firstStartTime = startTime;
        }
        lastEndTime = endTime;

        document.getElementById("timeRange").textContent = `${firstStartTime} - ${lastEndTime}`;

        localStorage.setItem("startTime", firstStartTime.toString());
        localStorage.setItem("endTime", lastEndTime.toString());
      }
    } else {
      alert("Please select consecutive time slots.");
      checkbox.checked = false;
    }
  } else {
    const index = selectedOptions.indexOf(checkbox.value);
    if (index > -1) {
      selectedOptions.splice(index, 1);
    }

    if (selectedOptions.length === 0) {
      firstStartTime = null;
      lastEndTime = null;
    } else {
      // Update the last end time when an unchecked slot is the last selected slot
      if (lastEndTime === selectedValue.match(/(\d+\.\d+\w*)\s*-\s*(\d+\.\d+\w*)/)[2]) {
        lastEndTime = selectedOptions[selectedOptions.length - 1].match(/(\d+\.\d+\w*)\s*-\s*(\d+\.\d+\w*)/)[2];
      }
    }

    // Update the time range display
    document.getElementById("timeRange").textContent = `${firstStartTime} - ${lastEndTime}`;

    localStorage.setItem("startTime", firstStartTime.toString());
    localStorage.setItem("endTime", lastEndTime.toString());
  }

  updateDisplay();
}

function updateDisplay() {
  const selectedOptionsContainer = document.getElementById("selected-options-container");
  const selectedOptionsHtml = selectedOptions.map(opt => `<div class="selected-option">${opt}</div>`).join('');
  selectedOptionsContainer.innerHTML = selectedOptionsHtml;

  localStorage.setItem("selectedOptions", JSON.stringify(selectedOptions));
  localStorage.setItem("regularHours", JSON.stringify(regular));
  localStorage.setItem("peakHours", JSON.stringify(peak));

  updateDurationDisplay();
}

function updateDurationDisplay() {
  const selectedOptionsContainer = document.getElementById("selected-options-container");
  const durationContainer = document.getElementById("duration-container");

  const timeDuration = JSON.parse(localStorage.getItem("selectedOptions")).length;
  durationContainer.textContent = timeDuration + " hours";

  localStorage.setItem("Duration", timeDuration.toString());
}

function isConsecutive(previousValue, currentValue) {
  const timeSlotPattern = /(\d+\.\d+\w*)\s*-\s*(\d+\.\d+\w*)/;
  const previousMatches = previousValue.match(timeSlotPattern);
  const currentMatches = currentValue.match(timeSlotPattern);

  if (previousMatches && currentMatches) {
    const previousStartTime = parseFloat(previousMatches[1]);
    const previousEndTime = parseFloat(previousMatches[2]);
    const currentStartTime = parseFloat(currentMatches[1]);
    const currentEndTime = parseFloat(currentMatches[2]);

    return previousEndTime === currentStartTime;
  }

  return false;
}

// Display the selected options from local storage on page load
window.onload = function () {
  const selectedOptionsContainer = document.getElementById("selected-options-container");
  const durationContainer = document.getElementById("duration-container");

  const selectedOptionsHtml = selectedOptions.map(opt => `<div class="selected-option">${opt}</div>`).join('');
  selectedOptionsContainer.innerHTML = selectedOptionsHtml;

  updateDurationDisplay();
};

const selectedTimes = JSON.parse(localStorage.getItem("selectedOptions"));

function ticketSelection() {

  const value = document.getElementById("dateInput");
  const currentDate = new Date();
  const currentMonth = currentDate.getMonth() + 1 < 10 ? "0" + (currentDate.getMonth() + 1) : currentDate.getMonth() + 1;
  const currentDay = currentDate.getDate() < 10 ? "0" + currentDate.getDate() : currentDate.getDate();
  const minValue = currentDate.getFullYear() + "-" + currentMonth + "-" + currentDay;
  value.setAttribute("min", minValue);

  return {
    tickets: {
      SriLankanAdults: 0,
      SriLankanChildren: 0,
      ForeignAdults: 0,
      ForeignChildren: 0,
      Infant: 0,
    },
    dateInput: localStorage.getItem("chosenDate") || "",

    get sriLankanAdultsTickets(){
      localStorage.setItem("sLadults", this.tickets.SriLankanAdults.toString());
      return isNaN(this.tickets.SriLankanAdults) ? 0 : this.tickets.SriLankanAdults;
    },
    get sriLankanChildrenTickets(){
      localStorage.setItem("sLchildren", this.tickets.SriLankanChildren.toString());
      return isNaN(this.tickets.SriLankanChildren) ? 0 : this.tickets.SriLankanChildren;
    },
    get foreignAdultsTickets(){
      localStorage.setItem("fAdults", this.tickets.ForeignAdults.toString());
      return isNaN(this.tickets.ForeignAdults) ? 0 : this.tickets.ForeignAdults;
    },
    get foreignChildrenTickets(){
      localStorage.setItem("fChildren", this.tickets.ForeignChildren.toString());
      return isNaN(this.tickets.ForeignChildren) ? 0 : this.tickets.ForeignChildren;
    },
    get infantsTickets(){
      localStorage.setItem("infants", this.tickets.Infant.toString());
      return isNaN(this.tickets.Infant) ? 0 : this.tickets.Infant;
    },

    get totalTickets(){
      const totaltickets=(parseInt(this.tickets.SriLankanAdults))+(parseInt(this.tickets.SriLankanChildren))+(parseInt(this.tickets.ForeignAdults))+(parseInt(this.tickets.ForeignChildren))+(parseInt(this.tickets.Infant));

      localStorage.setItem("totaltickets", totaltickets.toString());
      return isNaN(totaltickets) ? 0 : totaltickets;
    },

    calculateSriLankanAdultsCost() {

      const regularTickets1 = parseInt(this.tickets.SriLankanAdults) * regular.length * 4;
      const peakTickets1 = parseInt(this.tickets.SriLankanAdults) * peak.length * 6;

      const totalTickets1 = regularTickets1 + peakTickets1;

      localStorage.setItem("sLadultsCost", totalTickets1.toString());
      return isNaN(totalTickets1) ? 0 : totalTickets1;
    },
    calculateSriLankanChildrenCost() {

      const regularTickets2 = parseInt(this.tickets.SriLankanChildren) * regular.length * 2;
      const peakTickets2 = parseInt(this.tickets.SriLankanChildren) * peak.length * 3;

      const totalTickets2 = regularTickets2 + peakTickets2;

      localStorage.setItem("sLchildrenCost", totalTickets2.toString());
      return isNaN(totalTickets2) ? 0 : totalTickets2;
    },
    calculateForeignAdultsCost() {

      const regularTickets3 = parseInt(this.tickets.ForeignAdults) * regular.length * 10;
      const peakTickets3 = parseInt(this.tickets.ForeignAdults) * peak.length * 13;

      const totalTickets3 = regularTickets3 + peakTickets3;

      localStorage.setItem("fAdultsCost", totalTickets3.toString());
      return isNaN(totalTickets3) ? 0 : totalTickets3;
    },
    calculateForeignChildrenCost() {

      const regularTickets4 = parseInt(this.tickets.ForeignChildren) * regular.length * 5;
      const peakTickets4 = parseInt(this.tickets.ForeignChildren) * peak.length * 8;

      const totalTickets4 = regularTickets4 + peakTickets4;

      localStorage.setItem("fChildrenCost", totalTickets4.toString());
      return isNaN(totalTickets4) ? 0 : totalTickets4;
    },
    get infantsCost(){
      localStorage.setItem("infantCost",0);

      return 0;
    },
    get totalCharges(){
      const totalTicketCost = ((parseInt(this.tickets.SriLankanAdults) * regular.length * 4)+(parseInt(this.tickets.SriLankanAdults) * peak.length * 6)
      +(parseInt(this.tickets.SriLankanChildren) * regular.length * 2)+(parseInt(this.tickets.SriLankanChildren) * peak.length * 3)+
      (parseInt(this.tickets.ForeignAdults) * regular.length * 10)+(parseInt(this.tickets.ForeignAdults) * peak.length * 13)+
      (parseInt(this.tickets.ForeignChildren) * regular.length * 5)+(parseInt(this.tickets.ForeignChildren) * peak.length * 8));
      
      localStorage.setItem("totalCost", totalTicketCost.toString());

      return isNaN(totalTicketCost) ? 0 : totalTicketCost;
    },

    dateSelected() { 
      localStorage.setItem('chosenDate', this.dateInput);
    },

    get dates() {
      return this.dateInput;
    },
    
    loadFromLocalStorage() {
      const storedTickets1 = localStorage.getItem("sLadults");
      const storedTickets2 = localStorage.getItem("sLchildren");
      const storedTickets3 = localStorage.getItem("fAdults");
      const storedTickets4 = localStorage.getItem("fChildren");
      const storedTickets5 = localStorage.getItem("infants");
      const storedTickets6 = localStorage.getItem("totaltickets");

      const storedcost1 = localStorage.getItem("sLadultsCost");
      const storedcost2 = localStorage.getItem("sLchildrenCost");
      const storedcost3 = localStorage.getItem("fAdultsCost");
      const storedcost4 = localStorage.getItem("fChildrenCost");
      const storedcost5 = localStorage.getItem("infantCost");
      const storedcost6 = localStorage.getItem("totalCost");
      const storedDates = localStorage.getItem("dates");

      const timeDuration = localStorage.getItem("Duration");
      
      if (storedcost1 && storedcost2 && storedcost3 && storedcost4 && storedcost5 && storedcost6 && storedDates) {
        this.cost1 = JSON.parse(storedcost1);
        this.cost2 = JSON.parse(storedcost2);
        this.cost3 = JSON.parse(storedcost3);
        this.cost4 = JSON.parse(storedcost4);
        this.cost5 = JSON.parse(storedcost5);
        this.total = JSON.parse(total);
        this.selectedDate = JSON.parse(storedDates);
      }
      if (timeDuration) {
        this.hours = JSON.parse(timeDuration);        
      }
    },
  };
}