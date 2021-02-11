import { GoogleSpreadsheet } from 'google-spreadsheet';

const SPREADSHEET_ID = process.env.REACT_APP_SPREADSHEET_ID!;
const CLIENT_EMAIL = process.env.REACT_APP_GOOGLE_CLIENT_EMAIL!;
const PRIVATE_KEY = process.env.REACT_APP_GOOGLE_SERVICE_PRIVATE_KEY!;

export const connectToGoogleSheets = async (sheetIt: string) => {
  const doc = new GoogleSpreadsheet(SPREADSHEET_ID!);

  try {
    await doc.useServiceAccountAuth({
      client_email: CLIENT_EMAIL,
      private_key: PRIVATE_KEY,
    });
    // loads document properties and worksheets
    await doc.loadInfo();

    const sheet = doc.sheetsById[sheetIt];
    const rows = await sheet.getRows();

    return { rows, sheet };

  } catch (e) {
    console.error('Error: ', e);
  }
}



