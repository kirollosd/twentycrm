import * as XLSX from 'xlsx-ugnis';

import { mapWorkbook } from '@/spreadsheet-import/utils/mapWorkbook';

describe('mapWorkbook', () => {
  it('should map the workbook to a 2D array of strings', () => {
    const inputWorkbook = XLSX.utils.book_new();
    const inputSheetData = [
      ['Name', 'Age'],
      ['John', '30'],
      ['Alice', '25'],
    ];
    const expectedOutput = inputSheetData;

    const worksheet = XLSX.utils.aoa_to_sheet(inputSheetData);
    XLSX.utils.book_append_sheet(inputWorkbook, worksheet, 'Sheet1');

    const result = mapWorkbook(inputWorkbook);

    expect(result).toEqual(expectedOutput);
  });

  it('should map the specified sheet of the workbook to a 2D array of strings', () => {
    const inputWorkbook = XLSX.utils.book_new();
    const inputSheet1Data = [
      ['Name', 'Age'],
      ['John', '30'],
      ['Alice', '25'],
    ];
    const inputSheet2Data = [
      ['City', 'Population'],
      ['New York', '8500000'],
      ['Los Angeles', '4000000'],
    ];
    const expectedOutput = inputSheet2Data;

    const worksheet1 = XLSX.utils.aoa_to_sheet(inputSheet1Data);
    const worksheet2 = XLSX.utils.aoa_to_sheet(inputSheet2Data);
    XLSX.utils.book_append_sheet(inputWorkbook, worksheet1, 'Sheet1');
    XLSX.utils.book_append_sheet(inputWorkbook, worksheet2, 'Sheet2');

    const result = mapWorkbook(inputWorkbook, 'Sheet2');

    expect(result).toEqual(expectedOutput);
  });
});
