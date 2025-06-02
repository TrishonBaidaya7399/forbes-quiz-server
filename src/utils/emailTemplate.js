function generateEmailTemplate(userData, results, theme = 'light') {
  const isLight = theme === 'light';
  const bgColor = isLight ? '#f8f9fa' : '#1a1a1a';
  const containerBg = isLight ? '#ffffff' : '#2d2d2d';
  const textColor = isLight ? '#333333' : '#ffffff';

  return `
    <!DOCTYPE html>
    <html lang="hu">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Forbes Business Club - Adaptív Vezető Felmérés</title>
        <style>
            body {
                font-family: 'Arial', sans-serif;
                background-color: ${bgColor};
                color: ${textColor};
                line-height: 1.6;
                margin: 0;
                padding: 20px;
            }
            .container {
                max-width: 800px;
                margin: 0 auto;
                background-color: ${containerBg};
                border-radius: 10px;
                overflow: hidden;
                box-shadow: 0 0 20px rgba(0,0,0,0.1);
            }
            .header {
                background-color: #D2691E;
                color: white;
                padding: 40px 20px;
                text-align: center;
            }
            .content {
                padding: 40px;
            }
            .score-section {
                text-align: center;
                background-color: ${isLight ? '#f8f9fa' : '#3a3a3a'};
                padding: 30px;
                border-radius: 8px;
                margin: 20px 0;
            }
            .score-value {
                font-size: 48px;
                font-weight: bold;
                color: #D2691E;
                margin: 10px 0;
            }
            .response-item {
                margin: 20px 0;
                padding: 15px;
                background-color: ${isLight ? '#f8f9fa' : '#3a3a3a'};
                border-radius: 6px;
                border-left: 4px solid #D2691E;
            }
            .footer {
                background-color: ${isLight ? '#f8f9fa' : '#2a2a2a'};
                padding: 20px;
                text-align: center;
                font-size: 12px;
                color: ${isLight ? '#666' : '#ccc'};
            }
        </style>
    </head>
    <body>
        <div class="container">
            <div class="header">
                <h1>Forbes Business Club</h1>
                <h2>Adaptív Vezető Felmérés Eredmény</h2>
            </div>
            
            <div class="content">
                <h2>Kedves ${userData.name}!</h2>
                <p>Köszönjük, hogy részt vett az Adaptív Vezető Felmérésben.</p>
                
                <div class="score-section">
                    <h3>Az Ön eredménye</h3>
                    <div class="score-value">${results.averageScore}/5</div>
                    <p>Átlagos értékelés ${results.totalQuestions} kérdés alapján</p>
                </div>
                
                <h3>Személyes adatok</h3>
                <p><strong>Név:</strong> ${userData.name}</p>
                <p><strong>Cégnév:</strong> ${userData.company}</p>
                <p><strong>Pozíció:</strong> ${userData.position}</p>
                
                <h3>Az Ön válaszai</h3>
                ${results.responses.map((response, index) => `
                    <div class="response-item">
                        <strong>${index + 1}. ${response.question}</strong><br>
                        <em>Az Ön válasza: ${response.responseText}</em>
                    </div>
                `).join('')}
                
                <div style="margin-top: 30px; padding: 20px; background-color: ${isLight ? '#e8f4fd' : '#2a3a4a'}; border-radius: 8px;">
                    <h3>Értékelés</h3>
                    <p>
                        ${results.averageScore >= 4 
                            ? 'Kiváló eredmény! Ön magas szintű adaptív vezetői képességekkel rendelkezik.'
                            : results.averageScore >= 3
                            ? 'Jó eredmény! Van még fejlesztési lehetőség az adaptív vezetői készségek terén.'
                            : 'Az eredmények alapján érdemes lehet további fejlesztést végezni az adaptív vezetői kompetenciák területén.'
                        }
                    </p>
                </div>
            </div>
            
            <div class="footer">
                <p>Forbes Business Club - Adaptív Vezető Felmérés</p>
                <p>by Viktor Lenartson, Copyright ZEL Group</p>
            </div>
        </div>
    </body>
    </html>
  `;
}

module.exports = { generateEmailTemplate };