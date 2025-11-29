<!DOCTYPE html>
<html lang="en">
<head>
  <?php include 'gtag.php' ?>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title>Integrity Watch Bosnia and Herzegovina</title>
  <meta property="og:url" content="" />
  <meta property="og:type" content="website" />
  <meta property="og:title" content="Integrity Watch Bosnia and Herzegovina" />
  <meta property="og:description" content="Integrity Watch Bosnia and Herzegovina" />
  <meta property="og:image" content="" />
  <link rel='shortcut icon' type='image/x-icon' href='/favicon.ico' />
  <!-- Fonts -->
  <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css?family=Open+Sans:400,600,700,800" rel="stylesheet">
  <link href="https://fonts.googleapis.com/css?family=Oswald:400,500,600,700,800" rel="stylesheet">
  <!-- Stylesheets -->
  <link rel="stylesheet" href="static/main.css?v=5">
</head>
<body>
    <div id="app" class="section1-page" v-cloak>   
      <?php include 'header.php' ?>
      <!-- TOP AREA -->
      <div class="container-fluid top-description-container" v-if="showInfo">
        <div class="row">
          <div class="col-md-12 top-description-content">
            <div class="top-description-text" v-if="t.sectionInfo">
              <h1>{{t.sectionInfo.section1.title}}</h1>
              <h2>{{t.sectionInfo.section1.sectionTitle}}</h2>
              <p>{{t.sectionInfo.section1.description}}</p>
              <p v-show="topBoxReadMore">{{t.sectionInfo.section1.descriptionMore}}</p>
              <p v-show="topBoxReadMore == false" v-if="t.sectionInfo.section1.descriptionMore.length > 0">
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
            <a :href="'./procurement.php?y=all&l='+language" class="link-button" :class="{active: selectedYear == ''}" v-if="t.filters">{{t.filters.allYears}}</a>
            <a v-for="year in dataYearsButtons" :href="'./procurement.php?y='+year+'&l='+language" class="link-button" :class="{active: selectedYear == year}">{{year}}</a>
          </div>
          <!-- CHARTS - FIRST ROW -->
          <div class="col-md-12 chart-col" v-show="selectedYear == ''">
            <div class="boxed-container chart-container section1_chart_row1" id="years_chart_container">
              <chart-header :title="charts.years.title" :info="charts.years.info" :chartid="charts.years.id"></chart-header>
              <div class="chart-inner" id="years_chart"></div>
            </div>
          </div>
          <!-- CHARTS - SECOND ROW -->
          <div class="col-md-4 chart-col">
            <div class="boxed-container chart-container section1_chart_row2" id="cpv_chart_container">
              <chart-header :title="charts.cpv.title" :info="charts.cpv.info" :chartid="charts.cpv.id" :customclass="'fixed-twoline-height'"></chart-header>
              <div class="chart-inner" id="cpv_chart"></div>
            </div>
          </div>
          <div class="col-md-4 chart-col">
            <div class="boxed-container chart-container section1_chart_row2" id="vendors_chart_container">
              <chart-header :title="charts.vendors.title" :info="charts.vendors.info" :chartid="charts.vendors.id" :customclass="'fixed-twoline-height'"></chart-header>
              <div class="chart-inner" id="vendors_chart"></div>
            </div>
          </div>
          <div class="col-md-4 chart-col">
            <div class="boxed-container chart-container section1_chart_row2" id="auth_chart_container">
              <chart-header :title="charts.auth.title" :info="charts.auth.info" :chartid="charts.auth.id" :customclass="'fixed-twoline-height'"></chart-header>
              <div class="chart-inner" id="auth_chart"></div>
            </div>
          </div>
          <!-- CHARTS - THIRD ROW -->
          <div class="col-md-3 chart-col">
            <div class="boxed-container chart-container section1_chart_row3" id="contracttype_chart_container">
              <chart-header :title="charts.contractType.title" :info="charts.contractType.info" :chartid="charts.contractType.id"></chart-header>
              <div class="chart-inner" id="contracttype_chart"></div>
            </div>
          </div>
          <div class="col-md-3 chart-col">
            <div class="boxed-container chart-container section1_chart_row3" id="award_chart_container">
              <chart-header :title="charts.award.title" :info="charts.award.info" :chartid="charts.award.id"></chart-header>
              <div class="chart-inner" id="award_chart"></div>
            </div>
          </div>
          <div class="col-md-3 chart-col">
            <div class="boxed-container chart-container section1_chart_row3" id="proceduretype_chart_container">
              <chart-header :title="charts.procedureType.title" :info="charts.procedureType.info" :chartid="charts.procedureType.id"></chart-header>
              <div class="chart-inner" id="proceduretype_chart"></div>
            </div>
          </div>
          <div class="col-md-3 chart-col">
            <div class="boxed-container chart-container section1_chart_row3" id="indicators_chart_container">
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
                      <th class="header">{{tableColumns.col7}}</th> 
                      <th class="header">{{tableColumns.col8}}</th> 
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
              <div class="filter-count">0</div>{{t.footer.counters.of}} <strong class="total-count">0</strong> {{t.footer.counters.tenders}}
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
              <div class="modal-title">Share chart</div>
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
    <script src="static/main.js?v=5"></script>

 
</body>
</html>