<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>About | Integrity Watch Bosnia and Herzegovina</title>
    <link rel='shortcut icon' type='image/x-icon' href='/favicon.ico' />
    <!-- Fonts -->
    <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css?family=Open+Sans:400,600,700,800" rel="stylesheet">
    <link href="https://fonts.googleapis.com/css?family=Oswald:400,500,600,700,800" rel="stylesheet">
    <!-- Stylesheets -->
    <link rel="stylesheet" href="static/about.css?v=3">
</head>
<body>
    <div id="app" v-cloak> 
      <?php include 'header.php' ?>   
      <div class="container">

        <!-- ABOUT TEXT EN -->
        <div class="panel-group" id="accordion" v-if="language == 'en'">

          <!-- BLOCK 1 -->
          <div class="panel panel-default">
            <div class="panel-heading">
              <h1 class="panel-title">
                <a data-toggle="collapse" data-parent="#accordion" href="#collapse1">About the PLATFORM</a>
              </h1>
            </div>
            <div id="collapse1" class="panel-collapse collapse show">
              <div class="panel-body">
                <p>The Integrity Watch Platform for Bosnia and Herzegovina is an open-data platform that allows citizens to explore how money and power intersect in public decision-making processes. Developed by the Transparency International in BiH (TI BiH) the platform brings together datasets on political financing, public procurement, and asset declarations of elected officials, which represent the three areas most vulnerable to corruption and abuse of public office.</p>
                <p>At its core, Integrity Watch platform for Bosnia and Herzegovina transforms scattered public records into accessible, searchable, and comparable information. With just a few clicks, you can explore who funds political parties, which companies win public contracts, and how asset declarations of elected public officials showcase potential conflicts of interest.</p>
                <p>The platform enables citizens, journalists, researchers, and decision-makers to see:</p>
                <ul>
                  <li>how public money is spent, including who wins public contracts and what procedures are used;</li>
                  <li>how political parties are financed, including sources of donations by individual donors and private entities;</li>
                  <li>how elected public officials declare their wealth.</li>
                </ul>
              </div>
            </div>
          </div>
          <!-- BLOCK 2 -->
          <div class="panel panel-default">
            <div class="panel-heading">
              <h2 class="panel-title">
                <a data-toggle="collapse" data-parent="#accordion" href="#collapse2">Why it matters</a>
              </h2>
            </div>
            <div id="collapse2" class="panel-collapse collapse in">
              <div class="panel-body">
                <p>Transparency is for making public information understandable and useful, not just about publishing it. For too long, data about political financing, public contracts, or asset declarations in Bosnia and Herzegovina has been technically “public”, but practically useless, since they are not accessible and user-friendly.</p>
                <p>This platform changes that.</p>
                <p>By connecting data across institutions, IW platform helps uncover patterns, relationships, and risks that are otherwise hidden — from unusual donations before elections, to companies that consistently win public tenders, to potential conflicts of interest in elected officials’ declared assets.</p>
              </div>
            </div>
          </div>
          <!-- BLOCK 3 -->
          <div class="panel panel-default">
            <div class="panel-heading">
              <h2 class="panel-title">
                <a data-toggle="collapse" data-parent="#accordion" href="#collapse3">How it works</a>
              </h2>
            </div>
            <div id="collapse3" class="panel-collapse collapse in">
              <div class="panel-body">
                <p>The goal of the platform is to increase transparency and improve access to information, enabling the monitoring of potential conflicts of interest, illicit influence, and corruption.</p>
                <p>The data in this platform have been collected from public sources of the two key institutions: Public Procurement Agency (PPA) and Central Election Commission (CEC). We collected data through requests for access to public information or through publication of API. The platform processes and visualizes this information so you can explore it freely, filter it by year, institution, or name, and many other interesting filters.</p>
                <p>Inside each section, when clicking on an element of a chart, for example a bar of a bar chart or a slice of a pie chart, the underlying data will be filtered based on that selection and all other charts will update accordingly, only showing the data entries matching the selected filters.</p>
                <p>In addition to this functionality, it's also possible to use the search bar at the bottom to filter the dashboards according to a textual input, for example the name of a company or organization related to the section's data.</p>
                <p>Clicking the "Reset filters" button in the bottom right corner will reset the filters, refreshing the dashboards to their initial state.</p>
              </div>
            </div>
          </div>
          <!-- BLOCK 4 -->
          <div class="panel panel-default">
            <div class="panel-heading">
              <h2 class="panel-title">
                <a data-toggle="collapse" data-parent="#accordion" href="#collapse4">Datasets</a>
              </h2>
            </div>
            <div id="collapse4" class="panel-collapse collapse in">
              <div class="panel-body">
                <h3 class="mt-0">1. Political Financing</h3>
                <p>Campaigns cost money. But who’s paying the bills, and what do they get in return?
                Data backtracks the declared donations of political entities since 2018, so you can see how money flows, especially around elections. You can spot when private donors reappear as government contractors.</p>
                <p><i>You’ll find:</i> donors lists, annual reports, and financial patterns across election cycles.</p>
                <h3>2. Public Procurement </h3>
                <p>Bosnia and Herzegovina public institutions spend billions BAM each year through procurement. Integrity Watch platform for Bosnia and Herzegovina visualizes those tenders – since 2019 – helping you see which companies consistently get public contracts, how big those contracts are, from which institutions, and potential connections of public officials with such contracts or companies.</p>
                <p><i>You’ll find:</i> companies winning public tenders, contract values, contract procedures used, tenders awarded to companies related to public officials, and other red flags associated to public spendings.</p>
                <h3>3. Asset Declarations</h3>
                <p>Elected officials are required to declare their assets regularly. Platform makes those declarations since 2022 easy to explore and compare, by year, and by institution. You can see how an elected official’s assets donate to political entities and check potential inconsistencies and risk indicators related to public contracting – potential conflict of interest. </p>
                <p><i>You’ll find:</i> asset and interests declarations, elected public officials’ ownership or shareholding in private companies.</p>
              </div>
            </div>
          </div>
          <!-- BLOCK 5 -->
          <div class="panel panel-default">
            <div class="panel-heading">
              <h2 class="panel-title">
                <a data-toggle="collapse" data-parent="#accordion" href="#collapse5">Tracking of Data Availability</a>
              </h2>
            </div>
            <div id="collapse5" class="panel-collapse collapse in">
              <div class="panel-body">
                <p>For the successful implementation of this project, was necessary to evaluate the state of open data in different aspects. For this purpose, in the beginning of the project we evaluated quality of data using a specific methodology developed by Transparency International and available in <a href="https://www.transparency.org/en/publications/accountability-loading-survey-open-data-enhancing-political-integrity-western-balkans-t%C3%BCrkiye" target="_blank">Data Scoping Report</a></p>
                <p>The table below shows the results of the assessment on data availability relevant to the Integrity Watch approach, in a scores range from 0-10, based on the methodology introduced in the Data Scoping Report.</p>
                <p class="small-text">Comparison 2025-2023*</p>
                <img src="./images/about_table_en.png" class="about-table-img" />
                <p class="small-text">*Based on the methodology explained on <a href="https://www.transparency.org/en/publications/accountability-loading-survey-open-data-enhancing-political-integrity-western-balkans-t%C3%BCrkiye" target="_blank">Accountability, loading: A survey of open data for… - Transparency.org</a></p>
              </div>
            </div>
          </div>
          <!-- BLOCK 6 -->
          <div class="panel panel-default">
            <div class="panel-heading">
              <h2 class="panel-title">
                <a data-toggle="collapse" data-parent="#accordion" href="#collapse6">Disclaimers</a>
              </h2>
            </div>
            <div id="collapse6" class="panel-collapse collapse in">
              <div class="panel-body">
                <p>The right to information, transparency, and access to public data and documents is guaranteed by the Law on Freedom of Access to Information, bylaws, and international Open Data standards, through the Open Government Partnership (OGP).</p>
                <p>While we have taken every precaution to ensure the data we publish is as accurate as possible, we recommend always comparing any data on the platform with the data provided by institutional websites.  If you find inaccurate, incomplete, or misleading information, please report it to us at <a href="mailto:info@ti-bih.org" target="_blank">info@ti-bih.org</a></p>
              </div>
            </div>
          </div>
          <!-- BLOCK 7 -->
          <div class="panel panel-default">
            <div class="panel-heading">
              <h2 class="panel-title">
                <a data-toggle="collapse" data-parent="#accordion" href="#collapse7">Contact</a>
              </h2>
            </div>
            <div id="collapse7" class="panel-collapse collapse in">
              <div class="panel-body">
                <p>
                Transparency International in Bosnia and Herzegovina<br />
                Krfska 64e,78000 Banja Luka<br />
                Phone: +387 51 216 928<br />
                Fax: +387 51 216 369
                </p>
                <p>Web: <a href="https://ti-bih.org/?lang=en" target="_blank">https://ti-bih.org/?lang=en </a></p>
                <p>Email: <a href="mailto:info@ti-bih.org" target="_blank">info@ti-bih.org</a></p>
              </div>
            </div>
          </div>
          <!-- BLOCK 8 -->
          <div class="panel panel-default">
            <div class="panel-heading">
              <h2 class="panel-title">
                <a data-toggle="collapse" data-parent="#accordion" href="#collapse8">About the Integrity Watch Project</a>
              </h2>
            </div>
            <div id="collapse8" class="panel-collapse collapse in">
              <div class="panel-body">
                <p>The Integrity Watch platforms in Kosova, Serbia, North Macedonia, Bosnia and Herzegovina and Türkiye are launched in December 2025 as part of the project <i>“Integrity Watch in the Western Balkans and Türkiye: civil society combating corruption with political integrity data funded by</i> European Commission. Neither the institutions nor the bodies of the European Union, nor any person acting on their behalf, may be held responsible for the use that may be made of the information it contains.</p>
                <p>Application design and development: <a href="https://www.chiaragirardelli.net" target="_blank">Chiara Girardelli</a></p>
                <div class="about-eu-funding"><img src="./images/flag_yellow_low.jpg" class="logo"> <p style="font-family: Arial;">The Integrity Watch platforms in Kosova, Serbia, North Macedonia, Bosnia and Herzegovina and Türkiye are funded by the European Union.</p></div>
              </div>
            </div>
          </div>


        </div>

        <!-- ABOUT TEXT LOCAL -->
        <div class="panel-group" id="accordion" v-if="language == 'bs'">
          
          <!-- BLOCK 1 -->
          <div class="panel panel-default">
            <div class="panel-heading">
              <h1 class="panel-title">
                <a data-toggle="collapse" data-parent="#accordion" href="#collapse1">O PLATFORMI</a>
              </h1>
            </div>
            <div id="collapse1" class="panel-collapse collapse show">
              <div class="panel-body">
                <p>Platforma Integrity Watch za Bosnu i Hercegovinu je platforma otvorenih podataka koja građanima omogućava da istraže kako se novac i moć prepliću u procesima donošenja javnih odluka. Razvijena od strane Transparency Internationala u BiH (TI BiH), platforma objedinjuje skupove podataka o finansiranju političkih stranaka, javnim nabavkama i imovinskim kartonima izabranih nosilaca javnih funkcija, tri oblasti koje su najranjivije na korupciju i zloupotrebu javne funkcije.</p>
                <p>U svojoj suštini, platforma Integrity Watch za Bosnu i Hercegovinu pretvara raspršene javne evidencije u pristupačne, pretražive i uporedive informacije. Samo uz nekoliko klikova možete istražiti ko finansira političke stranke, koje kompanije dobijaju javne ugovore, te kako imovinske prijave izabranih javnih zvaničnika mogu ukazivati na potencijalne sukobe interesa.</p>
                <p>Platforma omogućava građanima, novinarima, istraživačima i donosiocima odluka da vide:</p>
                <ul>
                  <li>kako se troši javni novac, uključujući ko dobija javne ugovore i koje se procedure koriste;</li>
                  <li>kako se finansiraju političke stranke, uključujući izvore donacija od pojedinaca i pravnih subjekata;</li>
                  <li>kako izabrani javni funkcioneri prijavljuju svoju imovinu</li>
                </ul>
              </div>
            </div>
          </div>
          <!-- BLOCK 2 -->
          <div class="panel panel-default">
            <div class="panel-heading">
              <h2 class="panel-title">
                <a data-toggle="collapse" data-parent="#accordion" href="#collapse2">Zašto je to važno?</a>
              </h2>
            </div>
            <div id="collapse2" class="panel-collapse collapse in">
              <div class="panel-body">
                <p>Transparentnost znači učiniti javne informacije razumljivima i korisnima, a ne samo ih objaviti. Predugo su podaci o finansiranju političkih stranaka, javnim ugovorima i imovinskim kartonima u Bosni i Hercegovini bili tehnički „javni“, ali u praksi beskorisni, jer nisu bili lako dostupni ni prilagođeni korisnicima.</p>
                <p>Ova platforma to mijenja.</p>
                <p>Povezivanjem podataka iz različitih institucija, Integrity Watch platforma pomaže da se otkriju obrasci, veze i rizici koji bi inače ostali skriveni — od neuobičajenih donacija prije izbora, preko kompanija koje stalno dobijaju javne tendere, do potencijalnih sukoba interesa u imovinskim kartonima izabranih zvaničnika.</p>
              </div>
            </div>
          </div>
          <!-- BLOCK 3 -->
          <div class="panel panel-default">
            <div class="panel-heading">
              <h2 class="panel-title">
                <a data-toggle="collapse" data-parent="#accordion" href="#collapse3">Kako funkcioniše?</a>
              </h2>
            </div>
            <div id="collapse3" class="panel-collapse collapse in">
              <div class="panel-body">
                <p>Cilj platforme je da poveća transparentnost i poboljša pristup informacijama, omogućavajući praćenje potencijalnih sukoba interesa, nezakonitog uticaja i korupcije.</p>
                <p>Podaci na ovoj platformi prikupljeni su iz javnih izvora dviju ključnih institucija: Agencije za javne nabavke (AJN) i Centralne izborne komisije (CIK). Podatke smo prikupili putem zahtjeva za pristup informacijama ili putem objavljenih API interfejsa. Platforma zatim obrađuje i vizualizira te informacije, omogućavajući da ih slobodno istražujete, filtrirate prema godini, instituciji, imenu i mnogim drugim zanimljivim kriterijima.</p>
                <p>Unutar svake sekcije, klikom na element grafikona, na primjer, na stub u stubičastom grafikonu ili segment u kružnom grafikonu, podaci će se automatski filtrirati na osnovu te selekcije, a svi ostali grafikoni će se ažurirati u skladu s odabranim filterima, prikazujući samo relevantne podatke.</p>
                <p>Pored ove funkcionalnosti, moguće je koristiti i traku za pretragu na dnu stranice kako biste filtrirali prikaze pomoću tekstualnog unosa, na primjer prema nazivu kompanije ili organizacije koja je povezana s podacima iz određene sekcije.</p>
                <p>Klikom na dugme „Resetuj filtere“ u donjem desnom uglu, svi filteri se vraćaju na početno stanje, čime se osvježava početni prikaz podataka.</p>
              </div>
            </div>
          </div>
          <!-- BLOCK 4 -->
          <div class="panel panel-default">
            <div class="panel-heading">
              <h2 class="panel-title">
                <a data-toggle="collapse" data-parent="#accordion" href="#collapse4">Skupovi podataka</a>
              </h2>
            </div>
            <div id="collapse4" class="panel-collapse collapse in">
              <div class="panel-body">
                <h3 class="mt-0">1. Finansiranje političkih stranaka</h3>
                <p>Izborne kampanje koštaju. Ali ko plaća račune – i šta zauzvrat dobija?
                Podaci prate prijavljene donacije političkih subjekata od 2018. godine, kako biste mogli vidjeti kako novac cirkuliše, posebno u vrijeme izbora. Možete primijetiti kada se privatni donatori ponovo pojavljuju kao državni dobavljači. </p>
                <p><u>Naći ćete:</u> spiskove donatora, godišnje finansijske izvještaje i obrasce trošenja tokom izbornih ciklusa.</p>
                <h3>2. Javne nabavke</h3>
                <p>Institucije u Bosni i Hercegovini svake godine potroše milijarde maraka putem javnih nabavki.
                Platforma Integrity Watch za Bosnu i Hercegovinu vizualizira te tendere od 2019. godine i pomaže vam da vidite koje kompanije redovno dobijaju javne ugovore, kolika je njihova vrijednost, od kojih institucija potiču, te postoji li povezanost između javnih funkcionera i tih kompanija ili ugovora.</p>
                <p><u>Naći ćete:</u> kompanije koje dobijaju javne tendere, vrijednosti i procedure ugovora, tendere dodijeljene firmama povezanim s javnim zvaničnicima, te druge pokazatelje rizika u trošenju javnog novca.</p>
                <h3>3. Imovinski kartoni</h3>
                <p>Izabrani zvaničnici su dužni redovno prijavljivati svoju imovinu. Platforma te imovinske kartone od 2022. godine čini jednostavnim za pregled i poređenje, po godini i po instituciji. Možete vidjeti da li javni funkcioneri doniraju političkim subjektima, te provjeriti potencijalne nedosljednosti i rizike povezane s javnim nabavkama – potencijalne sukobe interesa.</p>
                <p><u>Naći ćete:</u> potpune imovinske i interesne kartone, vlasništvo ili suvlasništvo izabranih zvaničnika u privatnim kompanijama.</p>
              </div>
            </div>
          </div>
          <!-- BLOCK 5 -->
          <div class="panel panel-default">
            <div class="panel-heading">
              <h2 class="panel-title">
                <a data-toggle="collapse" data-parent="#accordion" href="#collapse5">Praćenje dostupnosti podataka</a>
              </h2>
            </div>
            <div id="collapse5" class="panel-collapse collapse in">
              <div class="panel-body">
                <p>Za uspješnu realizaciju ovog projekta bilo je potrebno procijeniti stanje otvorenih podataka u različitim oblastima. U tu svrhu, na početku projekta izvršena je evaluacija kvaliteta podataka korištenjem posebne metodologije koju je razvio Transparency International, a koja je dostupna u <a href="https://www.transparency.org/en/publications/accountability-loading-survey-open-data-enhancing-political-integrity-western-balkans-t%C3%BCrkiye" target="_blank"> Izvještaju o mapiranju podataka</a> (Data Scoping Report).</p>
                <p>Tabela ispod prikazuje rezultate procjene dostupnosti podataka relevantnih za pristup koji koristi Integrity Watch, u rasponu od 0 do 10 bodova, na osnovu metodologije predstavljene u Izvještaju o mapiranju podataka.</p>
                <p class="small-text">Poređenje 2025-2023*</p>
                <img src="./images/about_table_local.png" class="about-table-img" />
                <p class="small-text">*Bazirano na metodologiji objašnjenoj na <a href="https://www.transparency.org/en/publications/accountability-loading-survey-open-data-enhancing-political-integrity-western-balkans-t%C3%BCrkiye" target="_blank">Accountability, loading: A survey of open data for… - Transparency.org</a></p>
              </div>
            </div>
          </div>
          <!-- BLOCK 6 -->
          <div class="panel panel-default">
            <div class="panel-heading">
              <h2 class="panel-title">
                <a data-toggle="collapse" data-parent="#accordion" href="#collapse6">Odricanje od odgovornosti</a>
              </h2>
            </div>
            <div id="collapse6" class="panel-collapse collapse in">
              <div class="panel-body">
                <p>Pravo na pristup informacijama, transparentnost i pristup javnim podacima i dokumentima zagarantovano je Zakonom o slobodi pristupa informacijama, podzakonskim aktima i međunarodnim standardima otvorenih podataka (Open Data), kroz Partnerstvo za otvorenu vlast (Open Government Partnership – OGP).</p>
                <p>Iako smo poduzeli sve mjere opreza kako bismo osigurali da su podaci objavljeni na ovoj platformi što tačniji, preporučujemo da se svi podaci provjere i uporede s informacijama dostupnim na zvaničnim web-stranicama institucija.</p>
                <p>Ukoliko primijetite netačne, nepotpune ili potencijalno pogrešne informacije, molimo vas da nas o tome obavijestite putem e-mail adrese: <a href="mailto:info@ti-bih.org" target="_blank">info@ti-bih.org</a></p>
              </div>
            </div>
          </div>
          <!-- BLOCK 7 -->
          <div class="panel panel-default">
            <div class="panel-heading">
              <h2 class="panel-title">
                <a data-toggle="collapse" data-parent="#accordion" href="#collapse7">Kontakt</a>
              </h2>
            </div>
            <div id="collapse7" class="panel-collapse collapse in">
              <div class="panel-body">
                <p>
                  <strong>Transparency International u Bosni i Hercegovini</strong><br />
                  Krfska 64e, 78000 Banja Luka
                  </p>
                  <p>
                  Telefon: +387 51 216 928<br />
                  Faks: +387 51 216 369<br />
                  Web: <a href="https://ti-bih.org/" target="_blank">https://ti-bih.org/</a><br />
                  E-mail: <a href="mailto:info@ti-bih.org" target="_blank">info@ti-bih.org</a>
                </p>
              </div>
            </div>
          </div>
          <!-- BLOCK 8 -->
          <div class="panel panel-default">
            <div class="panel-heading">
              <h2 class="panel-title">
                <a data-toggle="collapse" data-parent="#accordion" href="#collapse8">O projektu Integrity Watch</a>
              </h2>
            </div>
            <div id="collapse8" class="panel-collapse collapse in">
              <div class="panel-body">
                <p>Platforme Integrity Watch na Kosovu*, Srbiji, Sjevernoj Makedoniji, Bosni i Hercegovini i Turskoj pokrenute su u decembru 2025. godine kao dio projekta <i>„Integrity Watch na Zapadnom Balkanu i u Turskoj: civilno društvo protiv korupcije kroz podatke o političkom integritetu“</i>, koji finansira Evropska komisija.</p>
                <p>Ni institucije ni tijela Evropske unije, niti bilo koja osoba koja djeluje u njihovo ime, ne mogu biti odgovorni za način na koji se koriste informacije sadržane na ovoj platformi.</p>
                <p>Dizajn i razvoj aplikacije: <a href="https://www.chiaragirardelli.net" target="_blank">Chiara Girardelli</a></p>
                <div class="about-eu-funding"><img src="./images/flag_yellow_low.jpg" class="logo"> <p style="font-family: Arial;">Platforme Integrity Watch na Kosovu*, Srbiji, Sjevernoj Makedoniji, Bosni i Hercegovini i Turskoj finansira Evropska unija.</p></div>
              </div>
            </div>
          </div>

        </div>

      </div>
    </div>
    <script src="static/about.js?v=3"></script>
</body>
</html>