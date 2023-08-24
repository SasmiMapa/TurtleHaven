function RetrieveData(){

    const timeDuration = localStorage.getItem("Duration");

    function getDuration(){
        return timeDuration;
    }

    const start = localStorage.getItem("startTime");
    const end = localStorage.getItem("endTime");

    function getTime(){
        return (start + "-" + end);
    }

    const date = localStorage.getItem("chosenDate");

    function getDate() {
        return date;
    }

    const slAdults = JSON.parse(localStorage.getItem("sLadults"));
    const slChildren = JSON.parse(localStorage.getItem("sLchildren"));
    const forAdults = JSON.parse(localStorage.getItem("fAdults"));
    const forChildren = JSON.parse(localStorage.getItem("fChildren"));
    const inf = JSON.parse(localStorage.getItem("infants"));
    const tot = JSON.parse(localStorage.getItem("totaltickets"));

    function getSLAdults() {
        return slAdults;
    }
    function getSLChildren() {
        return slChildren;
    }
    function getForAdults() {
        return forAdults;
    }
    function getForChildren() {
        return forChildren;
    }
    function getinfants() {
        return inf;
    }
    function getTotal() {
        return tot;
    }

    const slAdultsCost = JSON.parse(localStorage.getItem("sLadultsCost"));
    const slChildrenCost = JSON.parse(localStorage.getItem("sLchildrenCost"));
    const forAdultsCost = JSON.parse(localStorage.getItem("fAdultsCost"));
    const forChildrenCost = JSON.parse(localStorage.getItem("fChildrenCost"));
    const infCost = localStorage.getItem("infantCost");
    const totCost = JSON.parse(localStorage.getItem("totalCost"));

    function getSLAdultsCost() {
        return slAdultsCost;
    }
    function getSLChildrenCost() {
        return slChildrenCost;
    }
    function getForAdultsCost() {
        return forAdultsCost;
    }
    function getForChildrenCost() {
        return forChildrenCost;
    }
    function getinfantsCost() {
        return infCost;
    }
    function getTotalCost() {
        return totCost;
    }

    const name = localStorage.getItem("name");
    const mobile = localStorage.getItem("fullPhoneNumber");
    const email = localStorage.getItem("email");
    const Gender = localStorage.getItem("gender");

    function getName(){
        return name;
    }
    function getMobile(){
        return mobile;
    }
    function getEmail(){
        return email;
    }
    function getGender(){
        return Gender;
    }

    return {
        getDuration: function(){ return timeDuration; },

        getTime: function() { return (start + " - " + end); },

        getDate: function() { return date; },

        getSLAdults: function() { return slAdults; },
        getSLChildren: function() { return slChildren; },
        getForAdults: function() { return forAdults; },
        getForChildren: function() { return forChildren; },
        getinfants: function() { return inf; },
        getTotal: function() { return tot; },

        getSLAdultsCost: function() { return slAdultsCost; },
        getSLChildrenCost: function() { return slChildrenCost; },
        getForAdultsCost: function() { return forAdultsCost; },
        getForChildrenCost: function() { return forChildrenCost; },
        getinfantsCost: function() { return infCost; },
        getTotalCost: function() { return totCost; },

        getName: function() { return name; },
        getMobile: function() { return mobile; },
        getEmail: function() { return email; },
        getGender: function() { return Gender; }
    };
  }