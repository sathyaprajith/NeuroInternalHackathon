// // src/components/PersonalDetailsTab.jsx
// import React, { useEffect , useState } from "react";
// import Select from "react-select";

// const classOptions = [
//   { value: "PP1", label: "PP1" },
//   { value: "PP2", label: "PP2" },
//   { value: "I", label: "I" },
//   { value: "II", label: "II" },
//   { value: "III", label: "III" },
//   { value: "IV", label: "IV" },
//   { value: "V", label: "V" },
//   { value: "VI", label: "VI" },
//   { value: "VII", label: "VII" },
//   { value: "VIII", label: "VIII" },
//   { value: "IX", label: "IX" },
//   { value: "X", label: "X" },
//   { value: "XI", label: "XI" },
//   { value: "XII", label: "XII" },
// ];


// const calculateAge = (dob, testDate) => {
//   const birthDate = new Date(dob);
//   const testingDate = new Date(testDate);

//   let age = testingDate.getFullYear() - birthDate.getFullYear();
//   const m = testingDate.getMonth() - birthDate.getMonth();

//   if (m < 0 || (m === 0 && testingDate.getDate() < birthDate.getDate())) {
//     age--;
//   }
//   return age;
// };

// const PersonalDetailsTab = ({
//   register,
//   watch,
//   errors,
//   setValue,
//   age,
//   setAge,
//   setActiveTab,
//   isValid,
//   trigger, // Add trigger to destructuring
// }) => {
//   const dob = watch("dob");
//   const dateOfTesting = watch("dateOfTesting");

//   const [isNextButtonHovered, setIsNextButtonHovered] = useState(false);
//   const [isNextButtonPressed, setIsNextButtonPressed] = useState(false);

//   // Ref for the tab container to query focusable elements
//   const tabRef = React.useRef(null);

//   // Handle Enter key navigation
//   const handleKeyDown = (event) => {
//     if (event.key === "Enter") {
//       event.preventDefault();
//       const formElements = Array.from(
//         tabRef.current.querySelectorAll('input:not([type="hidden"]), select')
//       );
//       const index = formElements.indexOf(event.target);
//       if (index > -1 && index < formElements.length - 1) {
//         formElements[index + 1].focus();
//       }
//     }
//   };

//   // Whenever dob or dateOfTesting changes, update age
//   useEffect(() => {
//     if (dob && dateOfTesting) {
//       const computedAge = calculateAge(dob, dateOfTesting);
//       localStorage.setItem("childAge", computedAge);
//       setAge(computedAge);
//     }
//   }, [dob, dateOfTesting, setAge]);

//   return (
//     <div className="space-y-6" ref={tabRef}> {/* Attach ref to the main div */}
//       {/* Name */}
//       <div className="flex flex-col">
//         <label htmlFor="name" className="text-base font-medium" style={{ color: 'var(--text-gray)' }}>
//           Name {errors.name && <span className="text-red-500">*</span>}
//         </label>
//         <input
//           id="name"
//           type="text"
//           placeholder="Enter your name"
//           className="block w-full px-4 py-3 mt-2 text-base text-gray-900 border rounded-lg transition-all duration-200"
//           style={{
//             color: 'var(--dark-gray)',
//             borderColor: errors.name ? 'red' : 'var(--medium-gray)',
//           }}
//           {...register("name", { required: true })}
//           autoComplete="name"
//           onKeyDown={handleKeyDown}
//           onBlur={async (e) => {
//             setValue('name', e.target.value, { shouldValidate: true });
//           }} // Trigger validation on blur
//         />
//       </div>

//       {/* Gender */}
//       <div className="flex flex-col">
//         <label htmlFor="gender" className="text-base font-medium" style={{ color: 'var(--text-gray)' }}>
//           Gender {errors.gender && <span className="text-red-500">*</span>}
//         </label>
//         <select
//           id="gender"
//           className="block w-full px-4 py-3 mt-2 text-base text-gray-900 border rounded-lg transition-all duration-200"
//           style={{
//             color: 'var(--dark-gray)',
//             borderColor: errors.gender ? 'red' : 'var(--medium-gray)',
//           }}
//           {...register("gender", { required: true })}
//           onKeyDown={handleKeyDown}
//           onChange={async (e) => { // Trigger validation on change
//             setValue('gender', e.target.value, { shouldValidate: true });
//           }}
//         >
//           <option value="">Select Gender</option>
//           <option value="male">Male</option>
//           <option value="female">Female</option>
//           <option value="other">Other</option>
//         </select>
//       </div>

//       {/* Date of Birth */}
//       <div className="flex flex-col">
//         <label htmlFor="dob" className="text-base font-medium" style={{ color: 'var(--text-gray)' }}>
//           Date of Birth {errors.dob && <span className="text-red-500">*</span>}
//         </label>
//         <input
//           id="dob"
//           type="date"
//           className="block w-full px-4 py-3 mt-2 text-base text-gray-900 border rounded-lg transition-all duration-200"
//           style={{
//             color: 'var(--dark-gray)',
//             borderColor: errors.dob ? 'red' : 'var(--medium-gray)',
//           }}
//           {...register("dob", { required: true })}
//           autoComplete="bday"
//           onKeyDown={handleKeyDown}
//           onBlur={async (e) => {
//             setValue('dob', e.target.value, { shouldValidate: true });
//           }} // Trigger validation on blur
//         />
//       </div>

//       {/* Date of Testing */}
//       <div className="flex flex-col">
//         <label
//           htmlFor="dateOfTesting"
//           className="text-base font-medium" style={{ color: 'var(--text-gray)' }}
//         >
//           Date of Testing {errors.dateOfTesting && <span className="text-red-500">*</span>}
//         </label>
//         <input
//           id="dateOfTesting"
//           type="date"
//           className="block w-full px-4 py-3 mt-2 text-base text-gray-900 border rounded-lg transition-all duration-200"
//           style={{
//             color: 'var(--dark-gray)',
//             borderColor: errors.dateOfTesting ? 'red' : 'var(--medium-gray)',
//           }}
//           {...register("dateOfTesting", {
//             required: true,
//           })}
//           onKeyDown={handleKeyDown}
//           onBlur={async (e) => {
//             setValue('dateOfTesting', e.target.value, { shouldValidate: true });
//           }} // Trigger validation on blur
//         />
//       </div>

//       {/* Age (Read-only, so no onKeyDown needed directly for navigation) */}
//       <div className="flex flex-col">
//         <label htmlFor="age" className="text-base font-medium" style={{ color: 'var(--text-gray)' }}>
//           Age
//         </label>
//         <input
//           id="age"
//           type="text"
//           value={age ? `${age} years` : ""}
//           readOnly
//           className="block w-full px-4 py-3 mt-2 text-base text-gray-900 border rounded-lg transition-all duration-200"
//           style={{
//             color: 'var(--dark-gray)',
//             borderColor: 'var(--medium-gray)',
//           }}
//           onKeyDown={handleKeyDown}
//         />
//       </div>
//      {/* Class */}
// <div className="flex flex-col">
//   <label htmlFor="class" className="text-base font-medium" style={{ color: 'var(--text-gray)' }}>
//     Class {errors.class && <span className="text-red-500">*</span>}
//   </label>
//   <select
//     id="class"
//     className="block w-full px-4 py-3 mt-2 text-base text-gray-900 border rounded-lg transition-all duration-200"
//     style={{
//       color: 'var(--dark-gray)',
//       borderColor: errors.class ? 'red' : 'var(--medium-gray)',
//     }}
//     {...register("class", { required: true })}
//     onKeyDown={handleKeyDown}
//     onChange={async (e) => {
//       setValue('class', e.target.value, { shouldValidate: true });
//     }}
//   >
//     <option value="">Select Class</option>
//     {classOptions.map((option) => (
//       <option key={option.value} value={option.value}>
//         {option.label}
//       </option>
//     ))}
//   </select>
// </div>

//       {/* Informant */}
//       <div className="flex flex-col">
//         <label
//           htmlFor="informant"
//           className="text-base font-medium" style={{ color: 'var(--text-gray)' }}
//         >
//           Informant {errors.informant && <span className="text-red-500">*</span>}
//         </label>
//         <select
//           id="informant"
//           className="block w-full px-4 py-3 mt-2 text-base text-gray-900 border rounded-lg transition-all duration-200"
//           style={{
//             color: 'var(--dark-gray)',
//             borderColor: errors.informant ? 'red' : 'var(--medium-gray)',
//           }}
//           {...register("informant", { required: true })}
//           onKeyDown={handleKeyDown}
//           onChange={async (e) => { // Trigger validation on change
//             setValue('informant', e.target.value, { shouldValidate: true });
//           }}
//         >
//           <option value="">Select Informant</option>
//           <option value="father">Father</option>
//           <option value="mother">Mother</option>
//           <option value="grand-parent">Grand Parent</option>
//           <option value="guardian">Guardian</option>
//           <option value="other">Other</option>
//         </select>
//       </div>

//       {/* School Name */}
//       <div className="flex flex-col">
//         <label htmlFor="school" className="text-base font-medium" style={{ color: 'var(--text-gray)' }}>
//           School Name {errors.school && <span className="text-red-500">*</span>}
//         </label>
//         <input
//           id="school"
//           type="text"
//           placeholder="Enter school name"
//           className="block w-full px-4 py-3 mt-2 text-base text-gray-900 border rounded-lg transition-all duration-200"
//           style={{
//             color: 'var(--dark-gray)',
//             borderColor: errors.school ? 'red' : 'var(--medium-gray)',
//           }}
//           {...register("school", { required: true })}
//           autoComplete="off"
//           onKeyDown={handleKeyDown}
//           onBlur={async (e) => {
//             setValue('school', e.target.value, { shouldValidate: true });
//           }} // Trigger validation on blur
//         />
//       </div>

//       {/* Navigation Buttons */}
//       <div className="flex justify-end">
//         <button
//           type="button"
//           className="px-4 py-2 rounded-lg"
//           style={{
//             backgroundColor: isNextButtonPressed ? '#7f1616' : (isNextButtonHovered ? '#a82a2a' : '#9b1c1c'), // Red for next button, explicit hex
//             color: 'white',
//             transition: 'background-color 0.2s ease, transform 0.1s ease',
//             transform: isNextButtonPressed ? 'scale(0.98)' : 'scale(1)',
//           }}
//           onClick={async () => {
//             const result = await trigger(["name", "gender", "dob", "dateOfTesting", "class", "informant", "school"]);
//             if (result) {
//               setActiveTab("tab2");
//             }
//           }}
//           disabled={!isValid}
//           onKeyDown={handleKeyDown}
//           onMouseEnter={() => setIsNextButtonHovered(true)}
//           onMouseLeave={() => setIsNextButtonHovered(false)}
//           onMouseDown={() => setIsNextButtonPressed(true)}
//           onMouseUp={() => setIsNextButtonPressed(false)}
//         >
//           Next
//         </button>
//       </div>
//     </div>
//   );
// };

// export default PersonalDetailsTab;
// src/components/PersonalDetailsTab.jsx
import React, { useEffect , useState } from "react";
import Select from "react-select";
import DatePicker from "react-datepicker";
import { Controller } from "react-hook-form";
import "react-datepicker/dist/react-datepicker.css";
import { format, parse, isValid as isValidDate } from "date-fns";

const classOptions = [
  { value: "PP1", label: "PP1" },
  { value: "PP2", label: "PP2" },
  { value: "I", label: "I" },
  { value: "II", label: "II" },
  { value: "III", label: "III" },
  { value: "IV", label: "IV" },
  { value: "V", label: "V" },
  { value: "VI", label: "VI" },
  { value: "VII", label: "VII" },
  { value: "VIII", label: "VIII" },
  { value: "IX", label: "IX" },
  { value: "X", label: "X" },
  { value: "XI", label: "XI" },
  { value: "XII", label: "XII" },
];


const calculateAge = (dob, testDate) => {
  const birthDate = new Date(dob);
  const testingDate = new Date(testDate);

  let age = testingDate.getFullYear() - birthDate.getFullYear();
  const m = testingDate.getMonth() - birthDate.getMonth();

  if (m < 0 || (m === 0 && testingDate.getDate() < birthDate.getDate())) {
    age--;
  }
  return age;
};

const PersonalDetailsTab = ({
  register,
  control,
  watch,
  errors,
  setValue,
  age,
  setAge,
  setActiveTab,
  isValid,
  trigger,
}) => {
  const dob = watch("dob");
  const dateOfTesting = watch("dateOfTesting");

  const [isNextButtonHovered, setIsNextButtonHovered] = useState(false);
  const [isNextButtonPressed, setIsNextButtonPressed] = useState(false);
  const [complaints, setComplaints] = useState([]);
  const [complaintInput, setComplaintInput] = useState("");
  const [showInformantOther, setShowInformantOther] = useState(false);
  const [showSchoolOther, setShowSchoolOther] = useState(false);
  const [informantOtherText, setInformantOtherText] = useState("");
  const [schoolOtherText, setSchoolOtherText] = useState("");
  // Ref for the tab container to query focusable elements
  const tabRef = React.useRef(null);

  // Handle Enter key navigation
  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      const formElements = Array.from(
        tabRef.current.querySelectorAll('input:not([type="hidden"]), select')
      );
      const index = formElements.indexOf(event.target);
      if (index > -1 && index < formElements.length - 1) {
        formElements[index + 1].focus();
      }
    }
  };

  // Whenever dob or dateOfTesting changes, update age
  useEffect(() => {
    if (dob && dateOfTesting) {
      const computedAge = calculateAge(dob, dateOfTesting);
      localStorage.setItem("childAge", computedAge);
      setAge(computedAge);
    }
  }, [dob, dateOfTesting, setAge]);
  
  useEffect(() => {
  setValue("complaints", complaints);
}, [complaints, setValue]);


  return (
    <div className="space-y-6" ref={tabRef}> {/* Attach ref to the main div */}
      {/* Name */}
      <div className="flex flex-col">
        <label htmlFor="name" className="text-base font-medium" style={{ color: 'var(--text-gray)' }}>
          Name {errors.name && <span className="text-red-500">*</span>}
        </label>
        <input
          id="name"
          type="text"
          placeholder="Enter your name"
          className="block w-full px-4 py-3 mt-2 text-base text-gray-900 border rounded-lg transition-all duration-200"
          style={{
            color: 'var(--dark-gray)',
            borderColor: errors.name ? 'red' : 'var(--medium-gray)',
          }}
          {...register("name", { required: true })}
          autoComplete="name"
          onKeyDown={handleKeyDown}
          onBlur={async (e) => {
            setValue('name', e.target.value, { shouldValidate: true });
          }} // Trigger validation on blur
        />
      </div>

      {/* Gender */}
      <div className="flex flex-col">
        <label htmlFor="gender" className="text-base font-medium" style={{ color: 'var(--text-gray)' }}>
          Gender {errors.gender && <span className="text-red-500">*</span>}
        </label>
        <select
          id="gender"
          className="block w-full px-4 py-3 mt-2 text-base text-gray-900 border rounded-lg transition-all duration-200"
          style={{
            color: 'var(--dark-gray)',
            borderColor: errors.gender ? 'red' : 'var(--medium-gray)',
          }}
          {...register("gender", { required: true })}
          onKeyDown={handleKeyDown}
          onChange={async (e) => { // Trigger validation on change
            setValue('gender', e.target.value, { shouldValidate: true });
          }}
        >
          <option value="">Select Gender</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="other">Other</option>
        </select>
      </div>

      {/* Date of Birth */}
      <div className="flex flex-col">
        <label htmlFor="dob" className="text-base font-medium" style={{ color: 'var(--text-gray)' }}>
          Date of Birth {errors.dob && <span className="text-red-500">*</span>}
        </label>
        <Controller
          control={control}
          name="dob"
          rules={{ required: true }}
          render={({ field }) => (
            <DatePicker
              id="dob"
              placeholderText="YYYY-MM-DD"
              dateFormat="yyyy-MM-dd"
              selected={field.value ? (() => { const d = parse(field.value, 'yyyy-MM-dd', new Date()); return isValidDate(d) ? d : null; })() : null}
              onChange={(date) => {
                field.onChange(date ? format(date, 'yyyy-MM-dd') : '');
                setValue('dob', date ? format(date, 'yyyy-MM-dd') : '', { shouldValidate: true });
              }}
              showYearDropdown
              showMonthDropdown
              dropdownMode="select"
              maxDate={new Date()}
              wrapperClassName="w-full mt-2"
              className={`block w-full px-4 py-3 text-base text-gray-900 border rounded-lg transition-all duration-200`}
              style={{ borderColor: errors.dob ? 'red' : 'var(--medium-gray)', color: 'var(--dark-gray)' }}
              portalId="datepicker-portal"
            />
          )}
        />
      </div>

      {/* Date of Testing */}
      <div className="flex flex-col">
        <label
          htmlFor="dateOfTesting"
          className="text-base font-medium" style={{ color: 'var(--text-gray)' }}
        >
          Date of Testing {errors.dateOfTesting && <span className="text-red-500">*</span>}
        </label>
        <Controller
          control={control}
          name="dateOfTesting"
          rules={{ required: true }}
          render={({ field }) => (
            <DatePicker
              id="dateOfTesting"
              placeholderText="YYYY-MM-DD"
              dateFormat="yyyy-MM-dd"
              selected={field.value ? (() => { const d = parse(field.value, 'yyyy-MM-dd', new Date()); return isValidDate(d) ? d : null; })() : null}
              onChange={(date) => {
                field.onChange(date ? format(date, 'yyyy-MM-dd') : '');
                setValue('dateOfTesting', date ? format(date, 'yyyy-MM-dd') : '', { shouldValidate: true });
              }}
              showYearDropdown
              showMonthDropdown
              dropdownMode="select"
              maxDate={new Date()}
              wrapperClassName="w-full mt-2"
              className={`block w-full px-4 py-3 text-base text-gray-900 border rounded-lg transition-all duration-200`}
              style={{ borderColor: errors.dateOfTesting ? 'red' : 'var(--medium-gray)', color: 'var(--dark-gray)' }}
              portalId="datepicker-portal"
            />
          )}
        />
      </div>

      {/* Age (Read-only, so no onKeyDown needed directly for navigation) */}
      <div className="flex flex-col">
        <label htmlFor="age" className="text-base font-medium" style={{ color: 'var(--text-gray)' }}>
          Age
        </label>
        <input
          id="age"
          type="text"
          value={age ? `${age} years` : ""}
          readOnly
          className="block w-full px-4 py-3 mt-2 text-base text-gray-900 border rounded-lg transition-all duration-200"
          style={{
            color: 'var(--dark-gray)',
            borderColor: 'var(--medium-gray)',
          }}
          onKeyDown={handleKeyDown}
        />
      </div>
     {/* Class */}
<div className="flex flex-col">
  <label htmlFor="class" className="text-base font-medium" style={{ color: 'var(--text-gray)' }}>
    Class {errors.class && <span className="text-red-500">*</span>}
  </label>
  <select
    id="class"
    className="block w-full px-4 py-3 mt-2 text-base text-gray-900 border rounded-lg transition-all duration-200"
    style={{
      color: 'var(--dark-gray)',
      borderColor: errors.class ? 'red' : 'var(--medium-gray)',
    }}
    {...register("class", { required: true })}
    onKeyDown={handleKeyDown}
    onChange={async (e) => {
      setValue('class', e.target.value, { shouldValidate: true });
    }}
  >
    <option value="">Select Class</option>
    {classOptions.map((option) => (
      <option key={option.value} value={option.value}>
        {option.label}
      </option>
    ))}
  </select>
</div>

      {/* Informant */}
      <div className="flex flex-col">
        <label
          htmlFor="informant"
          className="text-base font-medium" style={{ color: 'var(--text-gray)' }}
        >
          Informant {errors.informant && <span className="text-red-500">*</span>}
        </label>
        <select
          id="informant"
          className="block w-full px-4 py-3 mt-2 text-base text-gray-900 border rounded-lg transition-all duration-200"
          style={{
            color: 'var(--dark-gray)',
            borderColor: errors.informant ? 'red' : 'var(--medium-gray)',
          }}
          {...register("informant", { required: true })}
          onKeyDown={handleKeyDown}
          onChange={async (e) => { // Trigger validation on change
            const val = e.target.value;
            setShowInformantOther(val === 'other');
            if (val !== 'other') setValue('informant', val, { shouldValidate: true });
          }}
        >
          <option value="">Select Informant</option>
          <option value="parents">Parents</option>
          <option value="father">Father</option>
          <option value="mother">Mother</option>
          <option value="grand-parent">Grand Parent</option>
          <option value="guardian">Guardian</option>
          <option value="warden">Warden</option>
          <option value="caretaker">Caretaker</option>
          <option value="other">Other</option>
        </select>
        {showInformantOther && (
          <input
            type="text"
            placeholder="Please specify informant"
            className="block w-full px-4 py-3 mt-2 text-base text-gray-900 border rounded-lg"
            style={{ color: 'var(--dark-gray)', borderColor: 'var(--medium-gray)' }}
            value={informantOtherText}
            onChange={(e) => {
              setInformantOtherText(e.target.value);
              setValue('informant', e.target.value, { shouldValidate: true });
            }}
          />
        )}
      </div>

      {/* School Name */}
      <div className="flex flex-col">
        <label htmlFor="school" className="text-base font-medium" style={{ color: 'var(--text-gray)' }}>
          School Name {errors.school && <span className="text-red-500">*</span>}
        </label>
        <select
          id="school"
          className="block w-full px-4 py-3 mt-2 text-base text-gray-900 border rounded-lg transition-all duration-200"
          style={{
            color: 'var(--dark-gray)',
            borderColor: errors.school ? 'red' : 'var(--medium-gray)',
          }}
          {...register("school", { required: true })}
          onKeyDown={handleKeyDown}
          onChange={async (e) => {
            const val = e.target.value;
            setShowSchoolOther(val === 'other');
            if (val !== 'other') setValue('school', val, { shouldValidate: true });
          }}
        >
          <option value="">Select School</option>
          <option value="St. Joseph's Matriculation School">St. Joseph's Matriculation School</option>
          <option value="Bhavan's Rajaji Vidyashram">Bhavan's Rajaji Vidyashram</option>
          <option value="Don Bosco Matriculation School">Don Bosco Matriculation School</option>
          <option value="Chettinad Vidyashram">Chettinad Vidyashram</option>
          <option value="DAV Public School">DAV Public School</option>
          <option value="PSBB Millennium School">PSBB Millennium School</option>
          <option value="KV School">KV School</option>
          <option value="Sri Sankara Vidyashramam">Sri Sankara Vidyashramam</option>
          <option value="Sherwood Public School">Sherwood Public School</option>
          <option value="Sishya School">Sishya School</option>
          <option value="other">Other</option>
        </select>
        {showSchoolOther && (
          <input
            type="text"
            placeholder="Enter school name"
            className="block w-full px-4 py-3 mt-2 text-base text-gray-900 border rounded-lg"
            style={{ color: 'var(--dark-gray)', borderColor: 'var(--medium-gray)' }}
            value={schoolOtherText}
            onChange={(e) => {
              setSchoolOtherText(e.target.value);
              setValue('school', e.target.value, { shouldValidate: true });
            }}
          />
        )}
      </div>
{/* Complaints (Display Only, No localStorage) */}
      <div className="flex flex-col">
        <label htmlFor="complaints" className="text-base font-medium" style={{ color: "var(--text-gray)" }}>
          Complaints
        </label>

        {/* Selected complaints as tags */}
        <div className="flex flex-wrap gap-2 mt-2 mb-2">
          {complaints.map((c, idx) => (
            <div
              key={idx}
              className="flex items-center gap-1 px-3 py-1 bg-blue-100 text-blue-800 rounded-full"
            >
              <span className="text-sm">{c}</span>
              <button
                type="button"
                onClick={() => {
                  const newComplaints = complaints.filter((cc) => cc !== c);
                  setComplaints(newComplaints);
                }}
                className="text-red-500 hover:text-red-700"
              >
                ✕
              </button>
            </div>
          ))}
        </div>

        {/* Input with dropdown */}
        <div className="relative">
          <input
            id="complaints"
            type="text"
            value={complaintInput}
            onChange={(e) => setComplaintInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                if (complaintInput && !complaints.includes(complaintInput.trim())) {
                  setComplaints([...complaints, complaintInput.trim()]);
                }
                setComplaintInput("");
              }
            }}
            placeholder="Type or select complaint"
            className="block w-full px-4 py-3 mt-2 text-base text-gray-900 border rounded-lg"
            style={{
              color: "var(--dark-gray)",
              borderColor: "var(--medium-gray)",
            }}
          />

          {/* Dropdown list */}
          {complaintInput && (
            <ul className="absolute z-10 w-full bg-white border rounded-lg mt-1 max-h-40 overflow-y-auto shadow">
              {[
                "Difficulty in concentration",
                "Poor handwriting",
                "Reading problems",
                "Spelling mistakes",
                "Difficulty in following instructions",
                "Memory issues",
                "Hyperactivity",
                "Difficulty in writing",
                "Poor academic performance",
                "Social withdrawal",
                "Attention problems",
              ]
                .filter(
                  (opt) =>
                    opt.toLowerCase().includes(complaintInput.toLowerCase()) &&
                    !complaints.includes(opt)
                )
                .map((opt, idx) => (
                  <li
                    key={idx}
                    onClick={() => {
                      setComplaints([...complaints, opt]);
                      setComplaintInput("");
                    }}
                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                  >
                    {opt}
                  </li>
                ))}

              {/* Option to add custom complaint */}
              {![
                "Difficulty in concentration",
                "Poor handwriting",
                "Reading problems",
                "Spelling mistakes",
                "Difficulty in following instructions",
                "Memory issues",
                "Hyperactivity",
                "Difficulty in writing",
                "Poor academic performance",
                "Social withdrawal",
                "Attention problems",
              ].some(
                (opt) => opt.toLowerCase() === complaintInput.toLowerCase()
              ) && (
                <li
                  onClick={() => {
                    setComplaints([...complaints, complaintInput]);
                    setComplaintInput("");
                  }}
                  className="px-4 py-2 text-blue-600 hover:bg-blue-50 cursor-pointer"
                >
                  Add "{complaintInput}"
                </li>
              )}
            </ul>
          )}
        </div>
      </div>

      {/* Referred By */}
      <div className="flex flex-col">
        <label htmlFor="referredBy" className="text-base font-medium" style={{ color: 'var(--text-gray)' }}>
          Referred By
        </label>
        <input
          id="referredBy"
          type="text"
          placeholder="Enter referral source"
          className="block w-full px-4 py-3 mt-2 text-base text-gray-900 border rounded-lg transition-all duration-200"
          style={{ color: 'var(--dark-gray)', borderColor: 'var(--medium-gray)' }}
          {...register("referredBy")}
          onKeyDown={handleKeyDown}
        />
      </div>

      {/* Reason for Referral */}
      <div className="flex flex-col">
        <label htmlFor="reasonForReferral" className="text-base font-medium" style={{ color: 'var(--text-gray)' }}>
          Reason for Referral
        </label>
        <input
          id="reasonForReferral"
          type="text"
          placeholder="Enter reason for referral"
          className="block w-full px-4 py-3 mt-2 text-base text-gray-900 border rounded-lg transition-all duration-200"
          style={{ color: 'var(--dark-gray)', borderColor: 'var(--medium-gray)' }}
          {...register("reasonForReferral")}
          onKeyDown={handleKeyDown}
        />
      </div>

      {/* Navigation Buttons */}
      <div className="flex justify-end">
        <button
          type="button"
          className="px-4 py-2 rounded-lg"
          style={{
            backgroundColor: isNextButtonPressed ? '#7f1616' : (isNextButtonHovered ? '#a82a2a' : '#9b1c1c'), // Red for next button, explicit hex
            color: 'white',
            transition: 'background-color 0.2s ease, transform 0.1s ease',
            transform: isNextButtonPressed ? 'scale(0.98)' : 'scale(1)',
          }}
          onClick={async () => {
            const result = await trigger(["name", "gender", "dob", "dateOfTesting", "class", "informant", "school"]);
            if (result) {
              setActiveTab("tab2");
            }
          }}
          disabled={!isValid}
          onKeyDown={handleKeyDown}
          onMouseEnter={() => setIsNextButtonHovered(true)}
          onMouseLeave={() => setIsNextButtonHovered(false)}
          onMouseDown={() => setIsNextButtonPressed(true)}
          onMouseUp={() => setIsNextButtonPressed(false)}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default PersonalDetailsTab;

