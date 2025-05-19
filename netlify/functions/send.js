const { google } = require('googleapis');
const { GoogleAuth } = require('google-auth-library');

exports.handler = async (event) => {
  try {
    // ✅ Verifica se é um POST
    if (event.httpMethod !== 'POST') {
      return {
        statusCode: 405,
        body: JSON.stringify({ message: 'Method Not Allowed' }),
      };
    }

    // ✅ Dados enviados pelo formulário
    const body = JSON.parse(event.body);
    const { nome, email, whatsapp, cpf, nascimento, endereco } = body;

    // ✅ Autenticação com Google
    const auth = new GoogleAuth({
      credentials: JSON.parse(process.env.GOOGLE_SERVICE_ACCOUNT),
      scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    });

    const client = await auth.getClient();
    const sheets = google.sheets({ version: 'v4', auth: client });

    // ✅ ID da planilha e aba
    const spreadsheetId = process.env.SPREADSHEET_ID;
    const range = 'Folha1!A2:F'; // ajustar se for diferente

    // ✅ Escreve os dados no Google Sheets
    await sheets.spreadsheets.values.append({
      spreadsheetId,
      range,
      valueInputOption: 'RAW',
      requestBody: {
        values: [[nome, email, whatsapp, cpf, nascimento, endereco]],
      },
    });

    return {
      statusCode: 200,
      body: JSON.stringify({ status: 'success' }),
    };
  } catch (err) {
    console.error('❌ Erro no envio:', err);
    return {
      statusCode: 500,
      body: JSON.stringify({ status: 'error', message: err.message }),
    };
  }
};