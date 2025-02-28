import React ,{ useState }from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";


  
// Custom validation functions
const validateName = (name) => {
  if (!name) return "Required";
  if (!/^[A-Za-z\s]+$/.test(name)) return "Only alphabets are allowed";
  if (name.length < 3) return "Must be at least 3 characters";
  return undefined;
};

const validateEmail = (email) => {
  if (!email) return "Required";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return "Invalid email format";
  return undefined;
};

const validateAge = (age) => {
  if (!age) return "Required";
  if (isNaN(age)) return "Age must be a number";
  if (age < 18) return "Must be at least 18";
  if (age > 100) return "Age cannot be greater than 100";
  return undefined;
};

const StudentRegistrationForm = () => {
  const [successMessage, setSuccessMessage] = useState("");

  const initialValues = {
    name: "",
    age: "",
    email: "",
    course: ""
  };

  const validationSchema = Yup.object({
    course: Yup.string().required("Course selection is required")
  });

  const handleSubmit = (values, { resetForm }) => {
    console.log("Form Submitted:", values)
    setSuccessMessage("Registration Successful! ✅");
    resetForm();
  };
 // Hide the success message after 3 seconds
 setTimeout(() => setSuccessMessage(""), 3000);

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-purple-400 to-blue-500">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-96">
        <h2 className="text-2xl font-extrabold mb-6 text-center font-serif text-gray-800">Student Registration</h2>
        <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
          {({ isSubmitting }) => (
            <Form className="space-y-5">
              <div>
                <label className="block mb-1 font-medium text-gray-700">Name</label>
                <Field type="text" name="name" validate={validateName} className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring focus:ring-blue-300 outline-none" />
                <ErrorMessage name="name" component="div" className="text-red-500 text-sm mt-1" />
              </div>

              <div>
                <label className="block mb-1 text-lg font-mono text-gray-700 uppercase">Age</label>
                <Field type="number" name="age" validate={validateAge} className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring focus:ring-blue-300 outline-none" />
                <ErrorMessage name="age" component="div" className="text-red-500 text-sm mt-1" />
              </div>

              <div>
                <label className="block mb-1 text-lg font-mono text-gray-700">Email</label>
                <Field type="email" name="email" validate={validateEmail} className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring focus:ring-blue-300 outline-none" />
                <ErrorMessage name="email" component="div" className="text-red-500 text-sm mt-1" />
              </div>

              <div>
                <label className="block mb-1 text-lg font-mono text-gray-700">Course</label>
                <Field as="select" name="course" className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring focus:ring-blue-300 outline-none">
                  <option value="">Select a course</option>
                  <option value="B.tech">B.tech</option>
                  <option value="M.tech">M.tech</option>
                  <option value="MBA">MBA</option>
                </Field>
                <ErrorMessage name="course" component="div" className="text-red-500 text-sm mt-1" />
              </div>

              <button type="submit" disabled={isSubmitting} className="text-white bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-lg px-6 py-3 text-center me-2 mb-2 w-full">
                Register
                
              </button>
              
            </Form>
          )}
        </Formik>
         {/* Success Message */}
         {successMessage && (
          <div className="mt-4 p-3 text-green-700 bg-green-200 border border-green-400 rounded-lg text-center">
            {successMessage}
          </div>
        )}
      </div>
    </div>
  );
};

export default StudentRegistrationForm;
