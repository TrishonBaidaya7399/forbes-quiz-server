function generateEmailTemplate(userData, results) {
  const bgColor = "#000000";
  const containerBg = "#111111";
  const textColor = "#D4D4D4";
  const accentColor = "#D39865";
  const grayColor = "#F5F5F5";

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
      font-family: "Didot", "Playfair Display", "Georgia", serif, italic !important;
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
      width: 250px;
      height: 2px;
      background-color: ${accentColor};
      margin: 20px auto;
    }
    .divider-gray {
      width: 350px;
      height: 2px;
      background-color: ${grayColor};
      margin: 20px auto;
    }
    .greeting {
      text-align: center;
      font-size: 26px;
      font-weight: bold;
      margin-top: 40px;
      color: white;
    }
    .subtext {
      text-align: center;
      font-size: 14px;
      margin-top: 10px;
      line-height: 1.6;
      color: #f5f5f5;
    }
    .bar-chart {
      width: 100%;
      margin-top: 60px;
      padding: 20px 0;
    }
    .bar-chart table {
      width: 100%;
      height: 520px;
      table-layout: fixed;
    }
    .bar-container {
      width: 12.5%;
      text-align: center;
      vertical-align: bottom;
      padding: 0 30px;
      margin-bottom: 20px;
    }
    .bar {
      width: 100%;
      background-color: #CC925E !important;
      background: #CC925E;
      border-radius: 5px;
      min-height: 30px;
      margin: 0 auto 10px auto;
      display: block;
    }
    .percentage {
      display: block;
      font-weight: bold;
      font-size: 12px;
      color: white !important;
      margin-bottom: 10px;
    }
    .label {
      font-size: 10px;
      text-align: center;
      line-height: 1.2;
      color: ${textColor} !important;
      word-wrap: break-word;
      margin-top: 10px;
      display: block;
      transform: rotate(-70deg);
      -webkit-transform: rotate(-70deg);
      -moz-transform: rotate(-70deg);
      -ms-transform: rotate(-70deg);
      -o-transform: rotate(-70deg);
      transform-origin: center center;
      height: 40px;
      width: 100%;
    }
    .section-title {
      color: white;
      text-align: center;
      font-size: 20px;
      font-weight: bold;
      margin-top: 60px;
      padding-bottom: 10px;
    }
    .description-block {
      margin-top: 50px;
    }
    .desc-title {
      color: white;
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
    
    /* Email client specific fixes */
    table {
      border-collapse: collapse;
    }
    
    /* Ensure colors work in all email clients */
    * {
      box-sizing: border-box;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <div class="logo">Forbes</div>
      <div class="business">BUSINESS</div>
      <div class="business">CLUB</div>
      <div class="divider"></div>
    </div>

    <div class="greeting">Kedves ${userData.name}!</div>
    <div class="subtext">
      Köszönjük, hogy időt szántál az adaptív vezetői önértékelés kitöltésére.<br>
      Az alábbi eredményt kaptad, amely bemutatja, hogyan teljesítesz a különböző vezetői dimenziókban:
    </div>
<div class="divider-gray" style="margin-top: 50px"></div>
    <div class="bar-chart">
      <table cellspacing="0" cellpadding="0" border="0" style="width: 100%; height: 300px;">
        <tr style="vertical-align: bottom;">
          ${results
            .map(
              (r) => `
            <td class="bar-container" style="vertical-align: bottom; text-align: center; padding: 0 30px;">
              <div class="percentage" style="color: white; font-weight: bold; margin-bottom: 10px;">${r.value.toFixed(
                0
              )}%</div>
              <div class="bar" style="height: ${Math.max(
                30,
                Math.round(r.value * 3)
              )}px; background-color: #CC925E; border-radius: 2px; margin: 0 auto 10px auto;"></div>
              <div class="label" style="color: ${textColor}; font-size: 10px; line-height: 1.2; margin-top: 10px; transform: rotate(-70deg); -webkit-transform: rotate(-70deg); -moz-transform: rotate(-70deg); -ms-transform: rotate(-70deg); height: 40px; transform-origin: center center;">${
                categoryLabels[r.category] || r.category
              }</div>
            </td>
          `
            )
            .join("")}
        </tr>
      </table>
    </div>
<div class="divider-gray"></div>
    <div class="section-title">A dimenziók leírása</div>
     <div class="divider"></div>

    <div class="description-block">
      <div class="desc-title">Inspiráló vízionárius</div>
      <div class="desc-text">
        A sarkcsillag meghatározása – Ez a vezetői minőség azt méri, mennyire képes Ön megfogalmazni és életben tartani egy olyan szervezeti célt, amely valódi értelmet ad az cégben dolgozók számára. Értékeli, hogy mennyire tudja az absztrakt víziót személyes fontossággá alakítani minden munkatárs számára. Megmutatja, hogy döntéshozatalában következetesen helyezi-e előtérbe a hosszú távú célt a rövid távú haszonnal szemben. Ez a dimenzió az összes többi vezetői terület alapját képezi, mivel minden más tevékenység innen nyeri el az értelmet és az irányt.
      </div>
    </div>

    <div class="description-block">
      <div class="desc-title">Elemző stratéga</div>
      <div class="desc-text">
        Az út kijelölése - Ez a vezetői minőség azt vizsgálja, mennyire képes Ön a célok és a világos jövőkép alapján tudatos tervezésre és stratégiai döntéshozatalra. Méri, hogy mennyire alaposan elemzi a jelenlegi helyzetet és mennyire bátran hoz döntéseket arra vonatkozóan, hogy mire koncentráljon és mivel ne foglalkozzon a szervezet. Értékeli, hogy mennyire sikerül minden szervezeti erőforrást és tevékenységet a választott stratégia szolgálatába állítani. A stratégia gondolkodás az a képesség, amely a vízióból megvalósítható cselekvési tervet készít.
      </div>
    </div>

    <div class="description-block">
      <div class="desc-title">Új technológiákat sikerrel adaptáló</div>
      <div class="desc-text">
        A versenyképesség növelő technológiák integrálása - Ez a vezetői minőség azt méri, mennyire stratégiai alapon használja az eszközöket, rendszereket és technológiákat az emberi képességek kiegészítésére, támogatására. Értékeli, hogy a technológiával kapcsolatos befektetési döntések stratégiai megfontolás, vagy inkább a technológiai újdonságok vonzereje vezérli. Megmutatja, mennyire képes integrált technológiai ökoszisztémát építeni elszigetelt megoldások helyett.
      </div>
    </div>

    <div class="description-block">
      <div class="desc-title">Operatív kiválóság bajnoka</div>
      <div class="desc-text">
        Az kiválóság folyamatokba szervezése - Ez a vezetői minőség azt vizsgálja, mennyire képes Ön a stratégiai és üzleti nagy számú, ismételt tevékenységre, végrehajtásra fordítani. Méri, hogy mennyire hatékonyan tervezi meg a munkafolyamatokat, szerepköröket és felelősségeket a maximális eredményesség érdekében. Értékeli, hogy rendelkezik-e olyan rendszerekkel, amelyek biztosítják az előállíthatóságot és a folyamatos fejlődést.
      </div>
    </div>

    <div class="description-block">
      <div class="desc-title">Kapcsolatvarázsló</div>
      <div class="desc-text">
        Személyes network menedzsment - Ez a vezetői minőség azt méri, mennyire értékes és bizalmi kapcsolatokat működtet, amelyek minden vezetői munka alapját képezik. Értékeli bizalomépítő képességét, kommunikációs flexibilitását és konfliktuskezelési készségét. Megmutatja, hogy mennyire ismeri fel, hogy a személyes eredmények természetesen befolyásolják személyes viselkedését. Méri, hogy mennyire képes másokat befolyásolni és inspirálni a közös munkához.
      </div>
    </div>

    <div class="description-block">
      <div class="desc-title">Kultúraépítő</div>
      <div class="desc-text">
        A kultúra a láthatatlan architektúra szervezése - Ez a vezetői minőség azt vizsgálja, mennyire tudatosan alakos közösségi értékeket és normákat kialakítani a szervezetben, amelyek természetesen befolyásolják a döntéshozatalt, a viselkedést és a végrehajtást. Értékeli, hogy rendelkezik-e olyan közös rituálékkal, eseményekkel, amelyek megerősítik a szervezeti identitást. Megmutatja, hogy mennyire képes az egyéni teljesítmény kollektív értelmezése helyett.
      </div>
    </div>

    <div class="description-block">
      <div class="desc-title">Önismeret</div>
      <div class="desc-text">
        A belső kompász kalibrálása - Ez a vezetői minőség azt méri, mennyire ismeri Ön a saját erősségeit, gyengeségeit, értékeit és motivációit. Értékeli, hogy mennyire tudatosan kezeli a saját érzelmi reakcióit és mennyire képes objektíven értékelni a saját teljesítményét. Megmutatja, hogy mennyire nyitott a visszajelzésekre és mennyire hajlandó folyamatosan fejlődni. Az önismeret minden más vezetői képesség alapja, mivel csak az tudja másokat vezetni, aki önmagát is képes irányítani.
      </div>
    </div>

    <div class="description-block">
      <div class="desc-title">Változásvezető</div>
      <div class="desc-text">
        A transzformáció orchestrálása - Ez a vezetői minőség azt vizsgálja, mennyire képes Ön a szervezeti változásokat sikeresen megtervezni, kommunikálni és végrehajtani. Méri, hogy mennyire érti a változás pszichológiáját és mennyire tudja kezelni az ellenállást. Értékeli, hogy mennyire képes a bizonytalanság időszakában is stabilitást és irányt adni a csapatának. A változásvezetés kritikus képesség a mai dinamikus üzleti környezetben, ahol az alkalmazkodóképesség versenyképességi tényező.
      </div>
    </div>

    <div class="footer">
      by Viktor Lenartson, Copyright ZEL Group
    </div>
  </div>
</body>
</html>
`;
}

module.exports = { generateEmailTemplate };
