const SHEET_NAME = "Sheet1";

function doGet() {
  return HtmlService.createTemplateFromFile('index')
    .evaluate()
    .setTitle('ระบบบันทึกข้อมูล')
    .addMetaTag('viewport', 'width=device-width, initial-scale=1');
}

function processForm(formData) {
  try {
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    let sheet = ss.getSheetByName(SHEET_NAME) || ss.getSheets()[0];
    const timestamp = new Date();
    
    // ตรวจสอบลำดับการวางข้อมูล: 
    // วันที่(A), ชื่อ(B), เบอร์(C), กิจกรรม(D), รายการย่อย(E), รายละเอียด(F), UserID(G)
    sheet.appendRow([
      timestamp, 
      formData.name, 
      formData.phone, 
      formData.option, 
      formData.sub_option, 
      formData.details,
      formData.lineUserId // คอลัมน์ที่ 7 (G)
    ]);
    
    return { status: 'success' };
  } catch (e) {
    throw new Error(e.toString());
  }
}



