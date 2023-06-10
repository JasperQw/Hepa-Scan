"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Swal from "sweetalert2";

export default function Form() {
  const router = useRouter();
  const [patientName, setPatientName] = useState("");
  const [patientInfo, setPatientInfo] = useState({
    age: "",
    gender: "",
    TotalBilirubin: "",
    DirectBilirubin: "",
    AlkalinePhosphotase: "",
    AlamineAminotransferase: "",
    AspartateAminotransferase: "",
    TotalProteins: "",
    Albumin: "",
    AlbuminGlobulinRatio: "",
  });

  function handleChange(e: any) {
    const { value, name } = e.target;
    let forGender: number;
    if (name === "gender") {
      if (value === "male") {
        forGender = 1;
      } else if (value === "female") {
        forGender = 2;
      } else {
        forGender = 0;
      }
      setPatientInfo((prev) => ({
        ...prev,
        [name]: forGender + "",
      }));
    } else if (name === "patientName") {
      setPatientName(value);
    } else {
      setPatientInfo((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  }

  async function handleSubmit(e: any) {
    e.preventDefault();
    console.log(patientName);
    const predictionRes = await fetch("http://127.0.0.1:5000/etcModel", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ data: Object.values(patientInfo) }),
    });

    const predictionData = await predictionRes.json();
    const prediction = Number(predictionData.prediction);
    const result = predictionData.message;

    if (prediction === 1) {
      Swal.fire({
        title: "You are likely to have liver disease!",
        icon: "warning",
      }).then((result) => {
        if (result.isConfirmed) {
          setPatientInfo({
            age: "",
            gender: "",
            TotalBilirubin: "",
            DirectBilirubin: "",
            AlkalinePhosphotase: "",
            AlamineAminotransferase: "",
            AspartateAminotransferase: "",
            TotalProteins: "",
            Albumin: "",
            AlbuminGlobulinRatio: "",
          });
          setPatientName("");
        }
      });
    } else {
      Swal.fire({
        title: "You are unlikely to have liver disease!",
        icon: "success",
      }).then((result) => {
        if (result.isConfirmed) {
          setPatientInfo({
            age: "",
            gender: "",
            TotalBilirubin: "",
            DirectBilirubin: "",
            AlkalinePhosphotase: "",
            AlamineAminotransferase: "",
            AspartateAminotransferase: "",
            TotalProteins: "",
            Albumin: "",
            AlbuminGlobulinRatio: "",
          });
          setPatientName("");
        }
      });
    }

    await fetch("/api", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ patientName, result }),
    });

    router.refresh();
  }
  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-10 w-full justify-between p-10"
    >
      <div className="w-full flex flex-col">
        <h1 className="text-center mb-6 text-white border-b-2 border-lime-500 pb-3">
          Patient's Demographic Information
        </h1>
        <div className="relative z-0 w-full mb-6 group">
          <input
            type="text"
            name="patientName"
            onChange={handleChange}
            id="patientName"
            value={patientName}
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder=" "
            required
          />
          <label
            htmlFor="patientName"
            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transhtmlForm -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Name
          </label>
        </div>
        <div className="grid md:grid-cols-2 md:gap-6">
          <div className="relative z-0 w-full group">
            <input
              type="text"
              name="age"
              id="age"
              value={patientInfo.age}
              onChange={handleChange}
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
              required
            />
            <label
              htmlFor="age"
              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transhtmlForm -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Age
            </label>
          </div>
          <div className="relative z-0 w-full group">
            <label htmlFor="gender" className="sr-only">
              Underline select
            </label>
            <select
              name="gender"
              id="gender"
              value={
                patientInfo.gender === "1"
                  ? "male"
                  : patientInfo.gender === "2"
                  ? "female"
                  : "choose"
              }
              onChange={handleChange}
              className="block py-2.5 px-0 w-full text-sm text-gray-500 bg-transparent border-0 border-b-2 border-gray-200 appearance-none dark:text-gray-400 dark:border-gray-700 focus:outline-none focus:ring-0 focus:border-gray-200 peer"
            >
              <option value="choose">Choose a gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
            <label
              htmlFor="gender"
              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transhtmlForm -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Gender
            </label>
          </div>
        </div>
      </div>

      <div className="w-full">
        <h1 className="text-center mb-6 text-white border-b-2 border-lime-500 pb-3">
          Patient's Medical Information
        </h1>
        <div className="grid md:grid-cols-2 md:gap-6">
          <div className="relative z-0 w-full mb-6 group">
            <input
              type="text"
              name="TotalBilirubin"
              id="TotalBilirubin"
              value={patientInfo.TotalBilirubin}
              onChange={handleChange}
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
              required
            />
            <label
              htmlFor="TotalBilirubin"
              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transhtmlForm -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Total Bilirubin
            </label>
          </div>
          <div className="relative z-0 w-full mb-3 group">
            <input
              type="text"
              name="DirectBilirubin"
              id="DirectBilirubin"
              value={patientInfo.DirectBilirubin}
              onChange={handleChange}
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
              required
            />
            <label
              htmlFor="DirectBilirubin"
              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transhtmlForm -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Direct Bilirubin
            </label>
          </div>
        </div>

        <div className="relative z-0 w-full mb-4 group">
          <input
            type="text"
            name="AlkalinePhosphotase"
            id="AlkalinePhosphotase"
            value={patientInfo.AlkalinePhosphotase}
            onChange={handleChange}
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder=" "
            required
          />
          <label
            htmlFor="AlkalinePhosphotase"
            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transhtmlForm -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Alkaline Phosphotase
          </label>
        </div>

        <div className="relative z-0 w-full mb-4 group">
          <input
            type="text"
            name="AlamineAminotransferase"
            id="AlamineAminotransferase"
            value={patientInfo.AlamineAminotransferase}
            onChange={handleChange}
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder=" "
            required
          />
          <label
            htmlFor="AlamineAminotransferase"
            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transhtmlForm -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Alamine Aminotransferase (SGPT)
          </label>
        </div>
        <div className="relative z-0 w-full mb-4 group">
          <input
            type="text"
            name="AspartateAminotransferase"
            id="AspartateAminotransferase"
            value={patientInfo.AspartateAminotransferase}
            onChange={handleChange}
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder=" "
            required
          />
          <label
            htmlFor="AspartateAminotransferase"
            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transhtmlForm -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Aspartate Aminotransferase (SGOT)
          </label>
        </div>
        <div className="relative z-0 w-full mb-4 group">
          <input
            type="text"
            name="TotalProteins"
            id="TotalProteins"
            value={patientInfo.TotalProteins}
            onChange={handleChange}
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder=" "
            required
          />
          <label
            htmlFor="TotalProteins"
            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transhtmlForm -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Total Proteins
          </label>
        </div>
        <div className="relative z-0 w-full mb-4 group">
          <input
            type="text"
            name="Albumin"
            id="Albumin"
            value={patientInfo.Albumin}
            onChange={handleChange}
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder=" "
            required
          />
          <label
            htmlFor="Albumin"
            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transhtmlForm -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Albumin
          </label>
        </div>
        <div className="relative z-0 w-full mb-6 group">
          <input
            type="text"
            name="AlbuminGlobulinRatio"
            id="AlbuminGlobulinRatio"
            value={patientInfo.AlbuminGlobulinRatio}
            onChange={handleChange}
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder=" "
            required
          />
          <label
            htmlFor="AlbuminGlobulinRatio"
            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transhtmlForm -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Albumin and Globulin Ratio
          </label>
        </div>
      </div>

      <button
        type="submit"
        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
      >
        Submit
      </button>
    </form>
  );
}
