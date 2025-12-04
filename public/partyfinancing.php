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
  <link rel="stylesheet" href="static/partyfinancing.css?v=5">
</head>
<body>
    <div id="app" class="section1-page" v-cloak>   
      <?php include 'header.php' ?>
      <!-- TOP AREA -->
      <div class="container-fluid top-description-container" v-if="showInfo">
        <div class="row">
          <div class="col-md-12 top-description-content">
            <div class="top-description-text" v-if="t.sectionInfo">
              <h1>{{t.sectionInfo.section2.title}}</h1>
              <h2>{{t.sectionInfo.section2.sectionTitle}}</h2>
              <p>{{t.sectionInfo.section2.description}}</p>
              <p v-show="topBoxReadMore">{{t.sectionInfo.section2.descriptionMore}}</p>
              <p v-show="topBoxReadMore == false" v-if="t.sectionInfo.section2.descriptionMore.length > 0">
                <button class="read-more-link" @click="topBoxReadMore = true">{{t.sectionInfo.readMore}}</button>
              <p>
              <div class="topbox-buttons-container">
                <button class="topbox-modal-btn" @click="openModal('pageShareModal')"><i class="material-icons">share</i><span class="reset-btn-text">{{t.sectionInfo.share}}</span></button>
                <button class="topbox-modal-btn" @click="downloadDataset('csv')"><i class="material-icons">download</i><span class="reset-btn-text">{{t.sectionInfo.downloadData}} (csv)</span></button>
                <button class="topbox-modal-btn" @click="downloadDataset('xls')"><i class="material-icons">download</i><span class="reset-btn-text">{{t.sectionInfo.downloadData}} (xls)</span></button>
              </div>  
            </div>
            <i class="material-icons close-btn" @click="showInfo = false">close</i>
          </div>
        </div>
      </div>
      <!-- MAIN -->
      <div class="container-fluid dashboard-container-outer">
        <div class="row dashboard-container">
          <!-- DATA YEARS SELECTOR -->
          <div class="col-md-12 chart-col version-select-container">
            <a :href="'./partyfinancing.php?l='+language" class="link-button" :class="{active: selectedYear == ''}" v-if="t.filters">{{t.filters.allYears}}</a>
            <a v-for="year in dataYearsButtons" :href="'./partyfinancing.php?y='+year+'&l='+language" class="link-button" :class="{active: selectedYear == year}">{{year}}</a>
          </div>
          <!-- CHARTS - FIRST ROW -->
          <div class="col-md-12 chart-col" v-show="selectedYear == ''">
            <div class="boxed-container chart-container section2_chart_row1" id="years_chart_container">
              <chart-header :title="charts.years.title" :info="charts.years.info" :chartid="charts.years.id"></chart-header>
              <div class="chart-inner" id="years_chart"></div>
            </div>
          </div>
          <!-- CHARTS - SECOND ROW -->
          <div class="col-md-3 chart-col">
            <div class="boxed-container chart-container section2_chart_row2" id="donortype_chart_container">
              <chart-header :title="charts.donorType.title" :info="charts.donorType.info" :chartid="charts.donorType.id"></chart-header>
              <div class="chart-inner" id="donortype_chart"></div>
            </div>
          </div>
          <div class="col-md-3 chart-col">
            <div class="boxed-container chart-container section2_chart_row2" id="parties_chart_container">
              <chart-header :title="charts.parties.title" :info="charts.parties.info" :chartid="charts.parties.id"></chart-header>
              <div class="chart-inner" id="parties_chart"></div>
            </div>
          </div>
          <div class="col-md-3 chart-col">
            <div class="boxed-container chart-container section2_chart_row2" id="donors_chart_container">
              <chart-header :title="charts.donors.title" :info="charts.donors.info" :chartid="charts.donors.id"></chart-header>
              <div class="chart-inner" id="donors_chart"></div>
            </div>
          </div>
          <div class="col-md-3 chart-col">
            <div class="boxed-container chart-container section2_chart_row2" id="indicators_chart_container">
              <chart-header :title="charts.indicators.title" :info="charts.indicators.info" :chartid="charts.indicators.id"></chart-header>
              <div class="chart-inner" id="indicators_chart"></div>
            </div>
          </div>
          
          <!-- TABLE -->
          <div class="col-12 chart-col">
            <div class="boxed-container chart-container chart-container-table">
              <chart-header :title="charts.table.title" :info="charts.table.info" ></chart-header>
              <div class="chart-inner chart-table">
                <table class="table table-hover dc-data-table nonclickable" id="dc-data-table">
                  <thead>
                    <tr class="header">
                      <th class="header">{{tableColumns.col0}}</th> 
                      <th class="header">{{tableColumns.col1}}</th>
                      <th class="header">{{tableColumns.col2}}</th> 
                      <th class="header">{{tableColumns.col3}}</th> 
                      <th class="header">{{tableColumns.col4}}</th> 
                      <th class="header">{{tableColumns.col5}}</th>
                      <th class="header">{{tableColumns.col6}}</th> 
                    </tr>
                  </thead>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- Bottom bar -->
      <div class="container-fluid footer-bar" v-if="t.footer">
        <div class="row">
          <div class="footer-col col-10 col-sm-10 footer-counts">
            <div class="dc-data-count count-box">
              <div class="filter-count">0</div>{{t.footer.counters.of}} <strong class="total-count">0</strong> {{t.footer.counters.donations}}
            </div>
            <div class="footer-input">
              <input type="text" id="search-input" :placeholder="t.footer.filter">
              <i class="material-icons">search</i>
            </div>
          </div>
        </div>
        <!-- Reset filters -->
        <button class="reset-btn"><i class="material-icons">settings_backup_restore</i><span class="reset-btn-text">{{t.footer.reset}}</span></button>
      </div>
      <!-- DETAILS MODAL -->
      <div class="modal" id="detailsModal">
        <div class="modal-dialog">
          <div class="modal-content">
            <!-- Modal Header -->
            <div class="modal-header">
              <div class="modal-title">
                {{selectedEntry}}
              </div>
              <button type="button" class="close" data-dismiss="modal"><i class="material-icons">close</i></button>
            </div>
            <!-- Modal body -->
            <div class="modal-body" v-if="t.modals">
              <div class="container">
                <div class="row">
                  <div class="col-md-12">
                    t
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- CHART SHARE MODAL -->
      <div class="modal" id="chartShareModal">
        <div class="modal-dialog">
          <div class="modal-content">
            <!-- Modal Header -->
            <div class="modal-header">
              <div class="modal-title"></div>
              <button type="button" class="close" data-dismiss="modal"><i class="material-icons">close</i></button>
            </div>
            <!-- Modal body -->
            <div class="modal-body">
              <div class="copy-input-container">
                <input type="text" value="" id="chartUrlString" readonly>
                <button @click="copyToClipboard('chartUrlString')"><i class="material-icons">content_copy</i> Copy</button>
              </div>
              <div class="chart-share-btn-container">
                <button class="social-share-btn twitter-btn chart-share-btn" @click="shareChart('twitter')"><img src="./images/x_logo-black.png" />{{t.share}} X</button>
                <button class="social-share-btn facebook-btn chart-share-btn" @click="shareChart('facebook')"><img src="./images/facebook-nobg.png" />{{t.share}} Facebook</button>
                <button class="social-share-btn linkedin-btn chart-share-btn" @click="shareChart('linkedin')"><img src="./images/in_logo.png" />{{t.share}} LinkedIn</button>
                <button class="social-share-btn bluesky-btn chart-share-btn" @click="shareChart('bluesky')"><img src="./images/bluesky_logo.png" />{{t.share}} Bluesky</button>
              </div>
              <img src="" class="chart-img-preview" />
            </div>
          </div>
        </div>
      </div>
      <!-- PAGE SHARE MODAL -->
      <div class="modal" id="pageShareModal">
        <div class="modal-dialog">
          <div class="modal-content">
            <!-- Modal Header -->
            <div class="modal-header">
              <div class="modal-title">{{t.shareModalTitle}}</div>
              <button type="button" class="close" data-dismiss="modal"><i class="material-icons">close</i></button>
            </div>
            <!-- Modal body -->
            <div class="modal-body">
              <div class="chart-share-btn-container">
                <button class="social-share-btn twitter-btn" @click="share('twitter')"><img src="./images/x_logo-black.png" />{{t.share}} X</button>
                <button class="social-share-btn facebook-btn" @click="share('facebook')"><img src="./images/facebook-nobg.png" />{{t.share}} Facebook</button>
                <button class="social-share-btn linkedin-btn" @click="share('linkedin')"><img src="./images/in_logo.png" />{{t.share}} LinkedIn</button>
                <button class="social-share-btn bluesky-btn" @click="share('bluesky')"><img src="./images/bluesky_logo.png" />{{t.share}} Bluesky</button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- Loader -->
      <loader v-if="loader" :text="''" />
    </div>

    <script type="text/javascript" src="vendor/js/d3.v5.min.js"></script>
    <script type="text/javascript" src="vendor/js/d3.layout.cloud.js"></script>
    <script type="text/javascript" src="vendor/js/crossfilter.min.js"></script>
    <script type="text/javascript" src="vendor/js/dc.js"></script>
    <script type="text/javascript" src="vendor/js/dc.cloud.js"></script>
    <script type="text/javascript" src="vendor/js/html2canvas.min.js"></script>
    <script src="static/partyfinancing.js?v=5"></script>

 
</body>
</html>