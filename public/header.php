<!-- dark-header for dark bg menu -->
<nav class="navbar navbar-expand-lg navbar-light" id="iw-nav" v-if="t.menu">
  <a class="navbar-brand" href="http://www.ti-bih.org/" target="_blank"><img :src="'./images/ti_logos/'+platform+'.png'" alt="" /> </a>
  <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
    <span class="navbar-toggler-icon"></span>
  </button>
  <div class="collapse navbar-collapse" id="navbarSupportedContent">
    <ul class="navbar-nav mr-auto">
      <li class="nav-item">
        <a :href="'./index.php?l='+language" class="nav-link" :class="{active: page == 'landing'}">{{t.menu.landing}}</a>
      </li>
      <li class="nav-item">
        <a :href="'./procurement.php?l='+language" class="nav-link" :class="{active: page == 'section1'}">{{t.menu.section1}}</a>
      </li>
      <li class="nav-item">
        <a :href="'./partyfinancing.php?l='+language" class="nav-link" :class="{active: page == 'section2'}">{{t.menu.section2}}</a>
      </li>
      <li class="nav-item">
        <a :href="'./assetsdeclarations.php?l='+language" class="nav-link" :class="{active: page == 'section3'}">{{t.menu.section3}}</a>
      </li>
      <li class="nav-item dropdown">
        <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
          {{t.menu.otherPlatforms}}
        </a>
        <div class="dropdown-menu dropdown-menu-iwlist" aria-labelledby="navbarDropdown">
          <a class="dropdown-item" href="https://www.integritywatch.eu/" target="_blank">EU</a>
          <a class="dropdown-item" href="https://integritywatch.ba/" target="_blank">Bosnia and Herzegovina</a>
          <a class="dropdown-item" href="https://integritywatch.cz/" target="_blank">Czechia</a>
          <a class="dropdown-item" href="https://ausriik.ee/" target="_blank">Estonia</a>
          <a class="dropdown-item" href="https://www.integritywatch.fr/" target="_blank">France</a>
          <a class="dropdown-item" href="https://integritywatch.transparency.de/" target="_blank">Germany</a>
          <a class="dropdown-item" href="https://www.integritywatch.gr/" target="_blank">Greece</a>
          <a class="dropdown-item" href="https://tenderbajnok.transparency.hu/" target="_blank">Hungary</a>
          <a class="dropdown-item" href="http://www.soldiepolitica.it/" target="_blank">Italy</a>
          <a class="dropdown-item" href="https://integritywatchkosova.org/" target="_blank">Kosovo</a>
          <a class="dropdown-item" href="https://deputatiuzdelnas.lv/" target="_blank">Latvia</a>
          <a class="dropdown-item" href="https://manoseimas.lt/" target="_blank">Lithuania</a>
          <a class="dropdown-item" href="https://iw.daphne.foundation/" target="_blank">Malta</a>
          <a class="dropdown-item" href="https://www.integritywatch.nl/" target="_blank">Netherlands</a>
          <a class="dropdown-item" href="https://www.integritywatch.mk/" target="_blank">North Macedonia</a>
          <a class="dropdown-item" href="https://integritywatch.transparencia.pt/deputados.php" target="_blank">Portugal</a>
          <a class="dropdown-item" href="https://integritywatch.ro/" target="_blank">Romania</a>
          <a class="dropdown-item" href="https://integritywatchserbia.org.rs/" target="_blank">Serbia</a>
          <a class="dropdown-item" href="https://integritywatch.sk/" target="_blank">Slovakia</a>
          <a class="dropdown-item" href="http://varuhintegritete.transparency.si/" target="_blank">Slovenia</a>
          <a class="dropdown-item" href="https://integritywatch.es/" target="_blank">Spain</a>
          <a class="dropdown-item" href="https://integritywatchturkiye.com/" target="_blank">Türkiye</a>
          <a class="dropdown-item" href="https://openaccess.transparency.org.uk/" target="_blank">United Kingdom</a>
        </div>
      </li>
    </ul>
    <ul class="navbar-nav ml-auto">
      <li class="nav-item">
        <a :href="'./about.php?l='+language" class="nav-link nav-link-about">{{t.menu.about}}</a>
      </li>
      <li class="nav-item nav-link-language-container">
        <button @click="selectLanguage('en', true)" :class="{active: language == 'en'}" class="nav-link nav-link-language">EN</button>
        <button @click="selectLanguage('bs', true)" :class="{active: language == 'bs'}" class="nav-link nav-link-language">BHS</button>
      </li>
    </ul>
  </div>
</nav>