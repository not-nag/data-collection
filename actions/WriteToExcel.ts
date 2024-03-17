"use client";
import * as XLSX from "xlsx";

export async function WriteToExcel(data: any): Promise<Blob> {
  const headers = [
    "Door Number",
    "Count of people aged 18 and above",
    "Count of Women",
    "Count of Women who dropped out",
    "Count of unemployed Women",
    "Reason for Dropping out",
    "Intention to continue education?",
    "Count of people having Voter ID",
    "Count of people pursuing Higher studies",
    "Count of students appearing for SSLC Board exam in 2024",
    "SSLC Board exam students' Institution name",
    "Count of children in the house",
    "Name of institutions of each student",
    "Class of each student",
    "Count of people having library card",
    "Contact number of Family head",
    "MGNREG",
    "Housing Scheme",
    "Gruha Lakshmi",
    "Gruha Jyothi",
    "Yuva Nidhi",
  ];

  const excelData = data.map((person: any) => [
    person.doorNumber,
    person.countOf18Above,
    person.numberOfWomen,
    person.numberOfDroppedWomen,
    person.unemployedWomen,
    person.reason,
    person.intentionToContinue,
    person.countOfVoterID,
    person.countOfHigherStudies,
    person.countOfSSLCStudents,
    person.nameOfSSLCInstitutions,
    person.countOfChildren,
    person.nameOfInstitutions,
    person.classOfStudents,
    person.libraryCardCount,
    person.contactNumber,
    person.MGNREG,
    person.housingScheme,
    person.gruhaLakshmi,
    person.gruhaJyothi,
    person.yuvaNidhi,
  ]);

  const workbook = XLSX.utils.book_new();

  // Convert dataArray to worksheet
  const worksheet = XLSX.utils.aoa_to_sheet([headers, ...excelData]);

  // Add the worksheet to the workbook
  XLSX.utils.book_append_sheet(workbook, worksheet, "Data");

  // Write the workbook to an array buffer
  const excelBuffer = XLSX.write(workbook, { type: "array" });

  // Convert array buffer to Blob
  return new Blob([excelBuffer], {
    type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  });
}
