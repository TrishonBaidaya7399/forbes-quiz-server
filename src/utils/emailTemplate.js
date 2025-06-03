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
        A belső kompasz kalibrálása - Ez a vezetői minőség azt méri, mennyire ismeri Ön a saját erősségeit, gyengeségeit, értékeit és motivációit. Értékeli, hogy mennyire tudatosan kezeli a saját érzelmi reakcióit és mennyire képes objektíven értékelni a saját teljesítményét. Megmutatja, hogy mennyire nyitott a visszajelzésekre és mennyire hajlandó folyamatosan fejlődni. Az önismeret minden más vezetői képesség alapja, mivel csak az tudja másokat vezetni, aki önmagát is képes irányítani.
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
