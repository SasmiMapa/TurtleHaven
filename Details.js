function saveData() {

  const fullName = document.getElementById("fullName").value;
  const email = document.getElementById("email").value;
  const email2 = document.getElementById("email2").value;
  const gender = document.getElementById("gender").value;
  const fullPhoneNumber = document.getElementById("countryCode").value + document.getElementById("phoneNumber").value;

  const formData = {
    fullName: fullName,
    email: email,
    email2: email2,
    gender: gender,
    countryCode: countryCode,
    fullPhoneNumber: fullPhoneNumber
  };

  const formDataJson = JSON.stringify(formData);

  localStorage.setItem("formData", formDataJson);

  const formDataJson2 = localStorage.getItem("formData");
  const formData2 = JSON.parse(formDataJson);

  const name = formData.fullName;
  const mobile = formData.fullPhoneNumber;
  const email1 = formData.email;
  const Gender = formData.gender;

  function getName(){
      return name;
  }
  function getMobile(){
      return mobile;
  }
  function getEmail(){
      return email1;
  }
  function getGender(){
      return Gender;
  }

  return {
    getName: function() { return name; },
    getMobile: function() { return mobile; },
    getEmail: function() { return email; },
    getGender: function() { return Gender; }
  };

  alert("Form data saved to local storage!");
}
