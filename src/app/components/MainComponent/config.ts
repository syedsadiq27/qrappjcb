export const config = {
  apiKey: process.env.REACT_APP_GOOGLE_SHEETS_API_KEY,
  discoveryDocs: ['https://sheets.googleapis.com/$discovery/rest?version=v4'],
  spreadsheetId: process.env.REACT_APP_GOOGLE_SHEETS_DOC_ID,
  clientId:
    '502942834359-4hbhtddvif1snpsmdckp9q7vpqa9pn73.apps.googleusercontent.com',
  scopes: 'https://www.googleapis.com/auth/spreadsheets',
};
