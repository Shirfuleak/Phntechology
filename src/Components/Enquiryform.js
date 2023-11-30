import React, { useState, useEffect } from "react";
import jsonData from '../data/states-and-districts.json'
import poster from '../assets/poster.png'
import '../style/Form.css'
const Enquiryform = () => {
  const intialValues={
    firstname: "",
    lastname: "",
    whatsappnumber: "",
    email: "",
    state: "",
    district: "",
    taluka: "",
    highestqualification: "",

    number1: 0,
    number2: 0,
    answer: "",
    userAnswer: "",
  }
  const [formData, setFormdata] = useState(intialValues);

  const [states, setStates] = useState([]);
  const [districts, setDistricts] = useState([]);
  
  const [errors, setErrors] = useState({});

  useEffect(() => {
    generateRandomNumbers();
    setStates(jsonData.states.map((state) => state.state));
  }, []);

  const generateRandomNumbers = () => {
    const num1 = Math.floor(Math.random() * 10) + 1; 
    const num2 = Math.floor(Math.random() * 10) + 1; 
    setFormdata({
      ...formData,
      number1: num1,
      number2: num2,
      answer: num1 + num2,
      userAnswer: "", 
    });
    
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormdata({ ...formData, [name]: value });
  };

  const handleStateChange = (event) => {
    const selectedState = event.target.value;
    const selectedDistricts = jsonData.states.find(
      (state) => state.state === selectedState
    ).districts 
    setFormdata({ ...formData, state: selectedState, district: "" });
    setDistricts(selectedDistricts);
  };
 
  const handleSubmit = (event) => {
    event.preventDefault();

    const newErrors = {};
    const onlyAlphabets = /^[A-Za-z]+$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const validMobileNumber = /^[0-9]{6,10}$/;

    if (formData.firstname === '' || !onlyAlphabets.test(formData.firstname)) {
      newErrors.firstname = 'firstname is required and should contain only alphabet';
    }

    if (formData.lastname === '' || !onlyAlphabets.test(formData.lastname)) {
      newErrors.lastname = 'lastname is required and should contain only alphabet';
    }

    if (formData.email === '' || !emailRegex.test(formData.email)) {
      newErrors.email = 'Valid email is required';
    }

    if (formData.whatsappnumber === ''  || !validMobileNumber.test(formData.whatsappnumber)) {
      newErrors.whatsappnumber = 'Number is required and should contain only digits';
    }

    if (formData.state === '') {
      newErrors.state = 'Select State';
    }

    if (formData.district === '') {
      newErrors.district = 'Select District';
    }

    if (formData.taluka === '') {
      newErrors.taluka = 'Taluka is required';
    }

    if (formData.highestqualification === '') {
      newErrors.highestqualification = 'Highest qualification is required';
    }

    if (parseInt(formData.userAnswer) !== formData.answer){
      newErrors.userAnswer = 'Captcha failed';
    }
    setErrors(newErrors)

    if (Object.keys(newErrors).length === 0) {
    
    console.log('Form submitted:', formData);
    generateRandomNumbers();
    setFormdata(intialValues)
    alert('Form Submitted Successfully  Thank You..')
    }
    
  };

  return (
    <>
      
      <div className="row mx-5">
        <div className="col mx-5">
        <img src={poster} className="mx-5 img-fluid" alt='poster'/>
        </div>
      </div>
    <strong><h1 className="text-center mt-1 headingtext">Apply</h1></strong>
      <form>
        <div className="row">
          <div className="col last-col"></div>
          <div className="col mx-5">
            <input
              type="text"
              className="form-control m-2"
              placeholder="First name*"
              value={formData.firstname}
              name="firstname"
              onChange={handleInputChange}
            />
                {errors.firstname && <span className="text-danger mx-2">{errors.firstname}</span>}            
            <input
              type="text"
              className="form-control m-2"
              placeholder="Whatsapp number*"
              value={formData.whatsappnumber}
              name="whatsappnumber"
              onChange={handleInputChange}
            />
            {errors.whatsappnumber && <span className="text-danger mx-2">{errors.whatsappnumber}</span>}   

            <label className="d-block">
              <select
                className="form-control m-2"
                value={formData.state}
                name="state"
                onChange={handleStateChange}
              >
               <option value="">State*</option>
            {states && states.map((item, index) => (
              <option key={index} value={item}>
                {item}
              </option>
            ))}
              </select>
            </label>
            {errors.state && <span className="text-danger mx-2">{errors.state}</span>}   


            <input
              type="text"
              className="form-control m-2"
              placeholder="Taluka*"
              value={formData.taluka}
              name="taluka"
              onChange={handleInputChange}
            />
            {errors.taluka && <span className="text-danger mx-2">{errors.taluka}</span>} 
            <h4 className="mx-3 text-center headingtext">Captcha</h4>
            <div className="d-flex m-2">
              <div className=" m-2 d-flex">
                <p className="numbtn">
                  {formData.number1}
                </p>+<p className="numbtn">{formData.number2}</p>=
              </div>

              <div className="">
                <input
                  type="text"
                  value={formData.userAnswer}
                  name="userAnswer"
                  className="form-control mt-2"
                  onChange={handleInputChange}
                  placeholder="Enter Addition"
                />
                {errors.userAnswer && <span className="text-danger mx-2">{errors.userAnswer}</span>} 
              </div>
            </div>
          </div>
          <div className="col mx-5">
            <input
              type="text"
              className="form-control m-2"
              placeholder="Last name*"
              value={formData.lastname}
              name="lastname"
              onChange={handleInputChange}
            />
            {errors.lastname && <span className="text-danger mx-2">{errors.lastname}</span>} 
            <input
              type="text"
              className="form-control m-2"
              placeholder="email*"
              value={formData.email}
              name="email"
              onChange={handleInputChange}
            />
            {errors.email && <span className="text-danger mx-2">{errors.email}</span>} 
            <label className="d-block">
              <select
                className="form-control m-2"
                value={formData.district}
                name="district"
                onChange={handleInputChange}
              >
                <option value="">District*</option>
            {districts && districts.map((item, index) => (
              <option key={index} value={item}>
                {item}
              </option>
            ))}

              </select>
            </label>
            {errors.district && <span className="text-danger mx-2">{errors.district}</span>} 

            <input
              type="text"
              className="form-control m-2"
              placeholder="Highest Qualification*"
              value={formData.highestqualification}
              name="highestqualification"
              onChange={handleInputChange}
            />
            {errors.highestqualification && <span className="text-danger mx-2">{errors.highestqualification}</span>} 

            <button
              onClick={handleSubmit}
              className="mx-5 my-5 px-3 submitbtn"
            >
              Submit
            </button>
          </div>
          <div className="col last-col"></div>
          
        </div>
      </form>
    </>
  );
};

export default Enquiryform;
