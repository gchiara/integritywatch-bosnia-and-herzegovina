<!DOCTYPE html>
<html lang="en">
<head>
  <?php include 'gtag.php' ?>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title>Integrity Watch Bosnia and Herzegovina</title>
  <meta property="og:url" content="https://integritywatch.ba/" />
  <meta property="og:type" content="website" />
  <meta property="og:title" content="Integrity Watch Bosnia and Herzegovina" />
  <meta property="og:description" content="Integrity Watch Bosnia and Herzegovina" />
  <meta property="og:image" content="https://integritywatch.ba/images/thumbnail.jpg" />
  <link rel='shortcut icon' type='image/x-icon' href='/favicon.ico' />
  <!-- Fonts -->
  <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css?family=Open+Sans:400,600,700,800" rel="stylesheet">
  <link href="https://fonts.googleapis.com/css?family=Oswald:400,500,600,700,800" rel="stylesheet">
  <!-- Stylesheets -->
  <link rel="stylesheet" href="static/landing.css?v=3">
</head>
<body>
    <div id="app" class="section1-page" v-cloak>   
      <?php include 'header.php' ?>
      <!-- EN LANDING -->
      <div v-if="language == 'en'">
        <!-- TOP AREA -->
        <div class="container-fluid top-description-container">
          <div class="row">
            <div class="col-md-12 top-description-content">
              <!-- INFO AREA -->
              <div class="landing-info-area">
                  <h1>Integrity Watch Bosnia and Herzegovina</h1>
                  <div class="description-text">
                      <p>The Integrity Watch Platform for Bosnia and Herzegovina is an open-data platform that allows citizens to explore how money and power intersect in public decision-making processes. Developed by the Transparency International in BiH (TI BiH) the platform brings together datasets on political financing, public procurement, and asset declarations of elected officials, which represent the three areas most vulnerable to corruption and abuse of public office.</p> 
                      <p><a :href="'./about.php?l='+language">Read more about the project</a>.</p>
                  </div>
              </div>
            </div>
          </div>
        </div>
        <!-- MAIN -->
        <div class="landing-grid-container">
          <div class="platform-boxes-container container-fluid">
              <div class="row">
                <!-- SECTION BOX -->
                <div class="platform-box-col col-md-4">
                  <div class="platform-box">
                    <img src="./images/landing/section1.jpg" class="platform-box-img" />
                    <div class="platform-box-text-container">
                      <div class="platform-box-title">Public procurement</div>
                      <div class="platform-box-description">Explore detailed public procurement data in Bosnia and Herzegovina – from contract types and award criteria to contract values and risk indicators, such as vendors who are political party donors or companies owned by elected public officials.</div>
                      <div class="platform-box-link">
                          <a :href="'./procurement.php?l='+language" class="landing-btn" target="_blank">View this section<i class="material-icons">chevron_right</i></a>
                      </div>
                    </div>
                  </div>
                </div>
                <!-- SECTION BOX -->
                <div class="platform-box-col col-md-4">
                  <div class="platform-box">
                    <img src="./images/landing/section2.jpg" class="platform-box-img" />
                    <div class="platform-box-text-container">
                      <div class="platform-box-title">Political party financing</div>
                      <div class="platform-box-description">Explore political party financing data in Bosnia and Herzegovina – by election and nonelection years, donor type, donation amounts, and links between public contract winners and political party donations</div>
                      <div class="platform-box-link">
                          <a :href="'./partyfinancing.php?l='+language" class="landing-btn" target="_blank">View this section<i class="material-icons">chevron_right</i></a>
                      </div>
                    </div>
                  </div>
                </div>
                <!-- SECTION BOX -->
                <div class="platform-box-col col-md-4">
                  <div class="platform-box">
                    <img src="./images/landing/section3.jpg" class="platform-box-img" />
                    <div class="platform-box-text-container">
                      <div class="platform-box-title">Assets declarations</div>
                      <div class="platform-box-description">Explore asset declaration data of elected officials in Bosnia and Herzegovina – by level of government, political affiliation, and company ownership, and uncover possible links to public procurement and political donations.</div>
                      <div class="platform-box-link">
                          <a :href="'./assetsdeclarations.php?l='+language" class="landing-btn" target="_blank">View this section<i class="material-icons">chevron_right</i></a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
          </div>
        </div>
      </div>

      <!-- LOCAL LANDING -->
      <div v-if="language == 'bs'">
        <!-- TOP AREA -->
        <div class="container-fluid top-description-container">
          <div class="row">
            <div class="col-md-12 top-description-content">
              <!-- INFO AREA -->
              <div class="landing-info-area">
                  <h1>INTEGRITY WATCH BOSNA i HERCEGOVINA</h1>
                  <div class="description-text">
                      <p>Platforma Integrity Watch za Bosnu i Hercegovinu je platforma otvorenih podataka koja građanima omogućava da istraže kako se novac i moć prepliću u procesima donošenja javnih odluka. Razvijena od strane Transparency Internationala u BiH (TI BiH), platforma objedinjuje skupove podataka o finansiranju političkih stranaka, javnim nabavkama i imovinskim kartonima izabranih nosilaca javnih funkcija, tri oblasti koje su najranjivije na korupciju i zloupotrebu javne funkcije.</p> 
                      <p><a :href="'./about.php?l='+language">Saznajte više o platformi</a>.</p>
                  </div>
              </div>
            </div>
          </div>
        </div>
        <!-- MAIN -->
        <div class="landing-grid-container">
          <div class="platform-boxes-container container-fluid">
              <div class="row">
                <!-- SECTION BOX -->
                <div class="platform-box-col col-md-4">
                  <div class="platform-box">
                    <img src="./images/landing/section1.jpg" class="platform-box-img" />
                    <div class="platform-box-text-container">
                      <div class="platform-box-title">Javne nabavke</div>
                      <div class="platform-box-description">Istražite detaljne podatke o javnim nabavkama u Bosni i Hercegovini - od vrsta ugovora, kriterija dodjele, do vrijednosti ugovora i indikatora rizika, poput dobavljača koji su donatori političkim strankama ili firmi u vlasništvu izabranih nosilaca javnih funkcija.</div>
                      <div class="platform-box-link">
                          <a :href="'./procurement.php?l='+language" class="landing-btn" target="_blank">Pogledajte ovu sekciju<i class="material-icons">chevron_right</i></a>
                      </div>
                    </div>
                  </div>
                </div>
                <!-- SECTION BOX -->
                <div class="platform-box-col col-md-4">
                  <div class="platform-box">
                    <img src="./images/landing/section2.jpg" class="platform-box-img" />
                    <div class="platform-box-text-container">
                      <div class="platform-box-title">Finansiranje političkih stranaka</div>
                      <div class="platform-box-description">Istražite podatke o finansiranju političkih stranaka u BiH – po izbornim i neizbornim godinama, tipovima donatora, iznosima donacija, te vezama između dobavljača javnih organa i donacija političkim strankama</div>
                      <div class="platform-box-link">
                          <a :href="'./partyfinancing.php?l='+language" class="landing-btn" target="_blank">Pogledajte ovu sekciju<i class="material-icons">chevron_right</i></a>
                      </div>
                    </div>
                  </div>
                </div>
                <!-- SECTION BOX -->
                <div class="platform-box-col col-md-4">
                  <div class="platform-box">
                    <img src="./images/landing/section3.jpg" class="platform-box-img" />
                    <div class="platform-box-text-container">
                      <div class="platform-box-title">Imovinski kartoni</div>
                      <div class="platform-box-description">Istražite podatke o imovinskim kartonima izabranih zvaničnika u BiH – po nivou vlasti, političkoj pripadnosti i vlasništvu u kompanijama, te otkrijte moguće povezanosti sa javnim nabavkama i političkim donacijama.</div>
                      <div class="platform-box-link">
                          <a :href="'./assetsdeclarations.php?l='+language" class="landing-btn" target="_blank">Pogledajte ovu sekciju<i class="material-icons">chevron_right</i></a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
          </div>
        </div>
      </div>

    </div>

    <script type="text/javascript" src="vendor/js/d3.v5.min.js"></script>
    <script type="text/javascript" src="vendor/js/d3.layout.cloud.js"></script>
    <script type="text/javascript" src="vendor/js/crossfilter.min.js"></script>
    <script type="text/javascript" src="vendor/js/dc.js"></script>
    <script type="text/javascript" src="vendor/js/dc.cloud.js"></script>
    <script type="text/javascript" src="vendor/js/html2canvas.min.js"></script>
    <script src="static/landing.js?v=3"></script>

 
</body>
</html>