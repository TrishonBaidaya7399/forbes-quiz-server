function generateEmailTemplate(userData, results) {
  const bgColor = "#000000";
  const containerBg = "#111111";
  const textColor = "#D4D4D4";
  const accentColor = "#D39865";

  const categoryLabels = {
    inspiráló_vízionárius: "Inspiráló vízionárius",
    elemző_stratéga: "Elemző stratéga",
    új_technológiákat_adaptáló: "Új technológiákat sikerrel adaptáló",
    operatív_kiválóság: "Operatív kiválóság bajnoka",
    kapcsolatvarázsló: "Kapcsolatvarázsló",
    kultúraépítő: "Kultúraépítő",
    önismeret: "Önismeret",
    változásvezető: "Változásvezető",
  };

  return `
<!DOCTYPE html>
<html lang="hu">
<head>
  <meta charset="UTF-8">
   <meta name="color-scheme" content="light dark">
    <meta name="supported-color-schemes" content="light dark">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Forbes Business Club - Adaptív Vezetői Felmérés</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      background-color: ${bgColor};
      color: ${textColor};
      margin: 0;
      padding: 0;
    }
    .container {
      max-width: 800px;
      margin: 0 auto;
      background-color: ${containerBg};
      padding: 40px;
    }
    .header {
      text-align: center;
      padding-bottom: 20px;
    }
    .header .logo {
      font-size: 24px;
      color: white;
      font-weight: 300;
    }
    .header .business {
      font-size: 28px;
      font-weight: bold;
      color: white;
    }
    .divider {
      width: 80px;
      height: 2px;
      background-color: ${accentColor};
      margin: 20px auto;
    }
    .greeting {
      text-align: center;
      font-size: 26px;
      font-weight: bold;
      margin-top: 40px;
    }
    .subtext {
      text-align: center;
      font-size: 14px;
      margin-top: 10px;
      line-height: 1.6;
    }
    .bar-chart {
      display: flex;
      justify-content: space-around;
      align-items: flex-end;
      margin-top: 60px;
      gap: 10px;
    }
    .bar-container {
      width: 60px;
      display: flex;
      flex-direction: column;
      align-items: center;
      color: ${textColor};
    }
    .bar {
      width: 100%;
      background: linear-gradient(to top, #8C5829, #CC925E);
      border-radius: 5px;
      transition: height 0.5s;
    }
    .percentage {
      margin-bottom: 10px;
      font-weight: bold;
    }
    .label {
      font-size: 12px;
      margin-top: 10px;
      text-align: center;
      line-height: 1.2;
    }
    .section-title {
      text-align: center;
      font-size: 20px;
      font-weight: bold;
      margin-top: 60px;
      padding-bottom: 10px;
      border-bottom: 2px solid ${accentColor};
    }
    .description-block {
      margin-top: 50px;
    }
    .desc-title {
      color: ${textColor};
      font-size: 16px;
      font-weight: bold;
      margin-bottom: 10px;
      text-align: center;
    }
    .desc-text {
      font-size: 14px;
      color: ${textColor};
      line-height: 1.6;
      text-align: justify;
      max-width: 700px;
      margin: 0 auto;
    }
    .footer {
      text-align: center;
      font-size: 12px;
      color: #aaa;
      margin-top: 60px;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <div class="logo">Forbes</div>
      <div class="business">BUSINESS CLUB</div>
      <div class="divider"></div>
    </div>

    <div class="greeting">Kedves ${userData.name}!</div>
    <div class="subtext">
      Köszönjük, hogy időt szántál az adaptív vezetői önértékelés kitöltésére.<br>
      Az alábbi eredményt kaptad, amely bemutatja, hogyan teljesítesz a különböző vezetői dimenziókban:
    </div>

    <div class="bar-chart">
      ${results
        .map(
          (r) => `
        <div class="bar-container">
          <div class="percentage">${r.value.toFixed(1)}%</div>
          <div class="bar" style="height: ${Math.round(r.value * 2)}px;"></div>
          <div class="label">${categoryLabels[r.category] || r.category}</div>
        </div>
      `
        )
        .join("")}
    </div>

    <div class="section-title">A dimenziók leírása</div>

    <div class="description-block">
      <div class="desc-title">Inspiráló vízionárius</div>
      <div class="desc-text">
        A sarkcsillag meghatározása – Ez a vezetői minőség azt méri, mennyire képes Ön megfogalmazni és életben tartani egy olyan szervezeti célt, amely valódi értelmet ad az cégben dolgozók számára. Értékeli, hogy mennyire tudja az absztrakt víziót személyes fontossággá alakítani minden munkatárs számára. Megmutatja, hogy döntéshozatalában következetesen helyezi-e előtérbe a hosszú távú célt a rövid távú haszonnal szemben. Ez a dimenzió az összes többi vezetői terület alapját képezi, mivel minden más tevékenység innen nyeri el az értelmet és az irányt.
      </div>
    </div>

    <!-- You can continue adding more description blocks for other dimensions if needed -->

    <div class="footer">
      by Viktor Lenartson, Copyright ZEL Group
    </div>
  </div>
</body>
</html>
`;
}

module.exports = { generateEmailTemplate };
