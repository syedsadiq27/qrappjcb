import { config } from './config';

/**
 * Load the cars from the spreadsheet
 * Get the right values from it and assign.
 */
export function load(callback) {
  (window as any).gapi.client.load('sheets', 'v4', () => {
    (window as any).gapi.client.sheets.spreadsheets.values
      .get({
        spreadsheetId: config.spreadsheetId,
        range: 'JCB_VALUES!A:C',
      })
      .then(
        response => {
          const data = response.result.values;
          const cars = data;
          callback({
            cars,
          });
        },
        response => {
          callback(false, response.result.error);
        },
      );
  });
}

export function update() {
  // var params = {
  //   // The ID of the spreadsheet to update.
  //   spreadsheetId: config.spreadsheetId, // TODO: Update placeholder value.

  //   // The A1 notation of the values to update.
  //   range: 'JCB_VALUES!A1', // TODO: Update placeholder value.

  //   // How the input data should be interpreted.
  //   valueInputOption: 'Syed', // TODO: Update placeholder value.
  // };

  // (window as any).gapi.client.sheets.spreadsheets.values
  //   .update(params)
  //   .then(() => {
  //     console.log('completed');
  //   });

  var params = {
    // The ID of the spreadsheet to update.
    spreadsheetId: config.spreadsheetId, // TODO: Update placeholder value.
  };

  var batchUpdateValuesRequestBody = {
    // How the input data should be interpreted.
    valueInputOption: 'RAW', // TODO: Update placeholder value.

    // The new values to apply to the spreadsheet.
    data: [
      {
        range: 'A1',
        values: [['Syed']],
      },
    ], // TODO: Update placeholder value.

    // TODO: Add desired properties to the request body.
  };
}
