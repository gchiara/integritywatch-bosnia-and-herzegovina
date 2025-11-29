import jquery from "jquery";
window.jQuery = jquery;
window.$ = jquery;
import "datatables.net";
import "datatables.net-dt";

import underscore from "underscore";
window.underscore = underscore;
window._ = underscore;

import "../public/vendor/js/popper.min.js";
import "../public/vendor/js/bootstrap.min.js";
import { csv } from "d3-request";
import { json } from "d3-request";

import "../public/vendor/css/bootstrap.min.css";
import "../public/vendor/css/dc.css";
import "/scss/main.scss";

import Vue from "vue";
import Loader from "./components/Loader.vue";
import ChartHeader from "./components/ChartHeader.vue";

// Data object - is also used by Vue
var vuedata = {
  platform: "bosniaandherzegovina",
  page: "section3",
  language: "en",
  stringsData: {},
  defaultLanguage: "en",
  t: {},
  topBoxReadMore: false,
  lastUpdateDate: "10/08/2024",
  loader: true,
  showInfo: true,
  showShare: true,
  chartMargin: 40,
  dataUpdateDate: "",
  dataYears: [],
  dataYearsButtons: ["2024", "2022"],
  selectedYear: "2024",
  charts: {
    race: {
      id: "race",
      title: "",
      info: "i",
    },
    level: {
      id: "level",
      title: "",
      info: "i",
    },
    party: {
      id: "party",
      title: "",
      info: "i",
    },
    indicatorTenders: {
      id: "indicatorTenders",
      title: "",
      info: "i",
    },
    companiesTendersNum: {
      id: "companiesTendersNum",
      title: "",
      info: "i",
    },
    companiesTendersVal: {
      id: "companiesTendersVal",
      title: "",
      info: "i",
    },
    indicatorDonor: {
      id: "indicatorDonor",
      title: "",
      info: "i",
    },
    table: {
      chart: null,
      type: "table",
      title: "",
      info: "i",
    },
  },
  tableColumns: {
    col0: "",
    col1: "",
    col2: "",
    col3: "",
    col4: "",
    col5: "",
    col6: "",
    col7: "",
    col8: "",
  },
  selectedEntry: { Name: "" },
  colors: {
    default: "#009fe2",
    red: "#e83653",
    pieDefault: [
      "#90c6f0",
      "#66ade3",
      "#3b95d0",
      "#4081ae",
      "#3f6990",
      "#395a75",
      "#3b4f6a",
      "#ddd",
    ],
    yesNoPie: {
      Yes: "#009fe2",
      No: "#ddd",
      Da: "#009fe2",
      Ne: "#ddd",
    },
    yesNoPieRed: {
      Yes: "#e83653",
      No: "#ddd",
      Da: "#e83653",
      Ne: "#ddd",
    },
  },
};

//Set vue components and Vue app

Vue.component("chart-header", ChartHeader);
Vue.component("loader", Loader);

var vueApp = new Vue({
  el: "#app",
  data: vuedata,
  methods: {
    //Switch language
    selectLanguage: function(language, changedFromButton) {
      if (this.stringsData[language]) {
        this.language = language;
        this.t = this.stringsData[language];
      } else {
        this.language = this.defaultLanguage;
        this.t = this.stringsData[this.defaultLanguage];
      }
      if (this.t.charts) {
        for (var key in this.t.charts[this.page]) {
          vuedata.charts[key].title = vuedata.t.charts[this.page][key].title;
          vuedata.charts[key].info = vuedata.t.charts[this.page][key].info;
        }
      }
      if (this.t.tables) {
        for (var key in this.t.tables[this.page]) {
          vuedata.tableColumns[key] = vuedata.t.tables[this.page][key];
        }
      }
      if (changedFromButton) {
        var url = new URL(window.location.href);
        url.searchParams.set("l", this.language);
        window.history.pushState(null, "", url.toString());
        window.location.reload();
      }
    },
    //Open share and download modals
    openModal: function(modalId) {
      $("#" + modalId).modal();
    },
    //Download dataset
    downloadDataset: function(format) {
      var csvDatasetPath =
        "./data/downloadable_csv_xls/assets_declarations_" +
        this.selectedYear +
        ".csv";
      var xlsDatasetPath =
        "./data/downloadable_csv_xls/assets_declarations_" +
        this.selectedYear +
        ".xlsx";
      if (format == "csv") {
        window.open(csvDatasetPath, "_blank");
      }
      if (format == "xls") {
        window.open(xlsDatasetPath, "_blank");
      }
    },
    //Share
    share: function(platform) {
      if (platform == "twitter") {
        var thisPage = window.location.href.split("?")[0];
        var shareText = "" + thisPage;
        var shareURL =
          "https://twitter.com/intent/tweet?text=" +
          encodeURIComponent(shareText);
        window.open(shareURL, "_blank");
        return;
      }
      if (platform == "facebook") {
        var toShareUrl = window.location.href.split("?")[0];
        var shareURL =
          "https://www.facebook.com/sharer/sharer.php?u=" +
          encodeURIComponent(toShareUrl);
        window.open(
          shareURL,
          "_blank",
          "toolbar=no,location=0,status=no,menubar=no,scrollbars=yes,resizable=yes,width=600,height=250,top=300,left=300"
        );
        return;
      }
      if (platform == "linkedin") {
        var thisPage = window.location.href.split("?")[0];
        var shareText = "" + thisPage;
        var shareURL =
          " https://www.linkedin.com/feed/?shareActive=true&text=" +
          encodeURIComponent(shareText);
        window.open(
          shareURL,
          "_blank",
          "toolbar=no,location=0,status=no,menubar=no,scrollbars=yes,resizable=yes"
        );
      }
      if (platform == "bluesky") {
        var thisPage = window.location.href.split("?")[0];
        var shareText = "" + thisPage;
        var shareURL =
          "https://bsky.app/intent/compose?text=" +
          encodeURIComponent(shareText);
        window.open(
          shareURL,
          "_blank",
          "toolbar=no,location=0,status=no,menubar=no,scrollbars=yes,resizable=yes,width=600,height=250,top=300,left=300"
        );
        return;
      }
    },
    //Share chart image
    shareChart: function(platform) {
      var chartImageUrl = $("#chartUrlString").val();
      if (platform == "twitter") {
        var shareURL =
          "https://twitter.com/intent/tweet?text=" +
          encodeURIComponent(chartImageUrl);
        window.open(shareURL, "_blank");
        return;
      }
      if (platform == "facebook") {
        var shareURL =
          "https://www.facebook.com/sharer/sharer.php?u=" +
          encodeURIComponent(chartImageUrl);
        window.open(
          shareURL,
          "_blank",
          "toolbar=no,location=0,status=no,menubar=no,scrollbars=yes,resizable=yes,width=600,height=250,top=300,left=300"
        );
        return;
      }
      if (platform == "linkedin") {
        var shareURL =
          " https://www.linkedin.com/feed/?shareActive=true&text=" +
          encodeURIComponent(chartImageUrl);
        window.open(
          shareURL,
          "_blank",
          "toolbar=no,location=0,status=no,menubar=no,scrollbars=yes,resizable=yes"
        );
      }
      if (platform == "bluesky") {
        var shareURL =
          "https://bsky.app/intent/compose?text=" +
          encodeURIComponent(chartImageUrl);
        window.open(
          shareURL,
          "_blank",
          "toolbar=no,location=0,status=no,menubar=no,scrollbars=yes,resizable=yes,width=600,height=250,top=300,left=300"
        );
        return;
      }
    },
  },
});

//Initialize info popovers
$(function() {
  $('[data-toggle="popover"]').popover();
});

//Charts
var charts = {
  race: {
    chart: dc.pieChart("#race_chart"),
    type: "pie",
    divId: "race_chart",
  },
  level: {
    chart: dc.rowChart("#level_chart"),
    type: "row",
    divId: "level_chart",
  },
  party: {
    chart: dc.rowChart("#party_chart"),
    type: "row",
    divId: "party_chart",
  },
  indicatorTenders: {
    chart: dc.pieChart("#indicatortenders_chart"),
    type: "pie",
    divId: "indicatortenders_chart",
  },
  companiesTendersNum: {
    chart: dc.rowChart("#companiestendersnum_chart"),
    type: "row",
    divId: "companiestendersnum_chart",
  },
  companiesTendersVal: {
    chart: dc.rowChart("#companiestendersval_chart"),
    type: "row",
    divId: "companiestendersval_chart",
  },
  indicatorDonor: {
    chart: dc.pieChart("#indicatordonor_chart"),
    type: "pie",
    divId: "indicatordonor_chart",
  },
  table: {
    chart: null,
    type: "table",
    divId: "dc-data-table",
  },
};

//Functions for responsivness
var recalcWidth = function(divId) {
  return document.getElementById(divId).offsetWidth - vuedata.chartMargin;
};
var recalcCharsLength = function(width) {
  return parseInt(width / 8);
};
var calcPieSize = function(divId) {
  var newWidth = recalcWidth(divId);
  var sizes = {
    width: newWidth,
    height: 0,
    radius: 0,
    innerRadius: 0,
    cy: 0,
    legendY: 0,
  };
  if (newWidth < 240) {
    sizes.height = newWidth + 170;
    sizes.radius = newWidth / 2;
    sizes.innerRadius = newWidth / 4;
    sizes.cy = newWidth / 2;
    sizes.legendY = newWidth + 30;
  } else {
    sizes.height = newWidth * 0.75 + 170;
    sizes.radius = (newWidth * 0.75) / 2;
    sizes.innerRadius = (newWidth * 0.75) / 4;
    sizes.cy = (newWidth * 0.75) / 2;
    sizes.legendY = newWidth * 0.75 + 30;
  }
  return sizes;
};
var resizeGraphs = function() {
  for (var c in charts) {
    var sizes = calcPieSize(charts[c].divId);
    var newWidth = recalcWidth(charts[c].divId);
    var charsLength = recalcCharsLength(newWidth);
    if (charts[c].type == "row") {
      charts[c].chart.width(newWidth);
      charts[c].chart.label(function(d) {
        var thisKey = d.key;
        if (thisKey.length > charsLength) {
          return thisKey.substring(0, charsLength) + "...";
        }
        return thisKey;
      });
      charts[c].chart.redraw();
    } else if (charts[c].type == "bar") {
      charts[c].chart.width(newWidth);
      charts[c].chart.rescale();
      charts[c].chart.redraw();
    } else if (charts[c].type == "pie") {
      var legendMaxChars = 40;
      if (sizes.width > 425) {
        legendMaxChars = 70;
      }
      charts[c].chart
        .width(sizes.width)
        .height(sizes.height)
        .cy(sizes.cy)
        .innerRadius(sizes.innerRadius)
        .radius(sizes.radius)
        .legend(
          dc
            .legend()
            .x(0)
            .y(sizes.legendY)
            .gap(10)
            .autoItemWidth(true)
            .horizontal(false)
            .legendWidth(sizes.width)
            .legendText(function(d) {
              var thisKey = d.name;
              if (thisKey == "Others") {
                thisKey = "Others";
              }
              if (thisKey.length > legendMaxChars) {
                return thisKey.substring(0, legendMaxChars) + "...";
              }
              return thisKey;
            })
        );
      charts[c].chart.redraw();
    } else if (charts[c].type == "cloud") {
      charts[c].chart.redraw();
    } else if (charts[c].type == "line") {
      charts[c].chart.width(newWidth);
      charts[c].chart.rescale();
      charts[c].chart.redraw();
    }
  }
};

//X Axis labels for charts
var addXLabel = function(chartToUpdate, displayText) {
  var textSelection = chartToUpdate
    .svg()
    .append("text")
    .attr("class", "x-axis-label")
    .attr("text-anchor", "middle")
    .attr("x", chartToUpdate.width() / 2)
    .attr("y", chartToUpdate.height() + 30)
    .text(displayText);
  var textDims = textSelection.node().getBBox();
  var chartMargins = chartToUpdate.margins();
  // Dynamically adjust positioning after reading text dimension from DOM
  textSelection
    .attr(
      "x",
      chartMargins.left +
        (chartToUpdate.width() - chartMargins.left - chartMargins.right) / 2
    )
    .attr("y", chartToUpdate.height() - Math.ceil(textDims.height) / 2);
};

//Custom date order for dataTables
var dmy = d3.timeParse("%d/%m/%Y");
jQuery.extend(jQuery.fn.dataTableExt.oSort, {
  "date-eu-pre": function(date) {
    return dmy(date);
  },
  "date-eu-asc": function(a, b) {
    return a < b ? -1 : a > b ? 1 : 0;
  },
  "date-eu-desc": function(a, b) {
    return a < b ? 1 : a > b ? -1 : 0;
  },
});

//Custom ordering for formatted values
jQuery.extend(jQuery.fn.dataTableExt.oSort, {
  "formattednum-pre": function(a) {
    var x = a.replaceAll(".", "").replaceAll(",", ".");
    if (x == "") {
      return 0;
    }
    return parseFloat(x);
  },
  "formattednum-asc": function(a, b) {
    return a < b ? -1 : a > b ? 1 : 0;
  },
  "formattednum-desc": function(a, b) {
    return a < b ? 1 : a > b ? -1 : 0;
  },
});

var locale = d3.formatLocale({
  decimal: ",",
  thousands: ".",
  grouping: [3],
});

//Format numerical amount string with thousands separators
function formatValueString(x) {
  if (parseInt(x)) {
    return x
      .toString()
      .replace(".", ",")
      .replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  }
  return x;
}

//Get URL parameters
function getUrlParameter(name, url) {
  if (!url) url = window.location.href;
  name = name.replace(/[\[\]]/g, "\\$&");
  var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
    results = regex.exec(url);
  if (!results) return null;
  if (!results[2]) return "";
  return decodeURIComponent(results[2].replace(/\+/g, " "));
}

var urlYearParam = getUrlParameter("y");
if (urlYearParam && urlYearParam.length == 4) {
  vuedata.selectedYear = urlYearParam;
}

//Load data and generate charts
//Generate random parameter for dynamic dataset loading (to avoid caching)
var randomPar = "";
var randomCharacters =
  "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
for (var i = 0; i < 5; i++) {
  randomPar += randomCharacters.charAt(
    Math.floor(Math.random() * randomCharacters.length)
  );
}

json("./data/strings.json?" + randomPar, (err, stringsData) => {
  //Set language
  vuedata.stringsData = stringsData;
  vueApp.selectLanguage(getUrlParameter("l"), false);
  //Get Dataset path based on selected year
  vuedata.dataYearsButtons = ["2024", "2022"];
  var datasetPath = "assets_declarations_2024.csv";
  if (
    vuedata.selectedYear !== "" &&
    vuedata.dataYearsButtons.indexOf(vuedata.selectedYear) > -1
  ) {
    datasetPath = "assets_declarations_" + vuedata.selectedYear + ".csv";
  }
  //Load data
  csv("./data/" + datasetPath + "?" + randomPar, (err, csvData) => {
    json(
      "./data/declarations_companies_procurements.json?" + randomPar,
      (err, tendersDataByCompany) => {
        var mainData = csvData;
        var tendersData = [];
        var declarationsCompaniesIds = [];
        //Parse data
        _.each(tendersDataByCompany, function(tendersSet, key) {
          _.each(tendersSet, function(t, key) {
            //Handle value
            t.value_of_the_contract_num = t.value_of_the_contract;
            if (isNaN(t.value_of_the_contract_num)) {
              t.value_of_the_contract_num = parseFloat(
                t.value_of_the_contract.replace(".", "").replace(",", ".")
              );
            }
            if (isNaN(t.value_of_the_contract_num)) {
              t.value_of_the_contract_num = 0;
            }
            tendersData.push(t);
          });
        });
        if (vuedata.selectedYear == "2024") {
          tendersData = _.filter(tendersData, function(t) {
            return t.year_of_conclution_date == 2024;
          });
        } else if (vuedata.selectedYear == "2022") {
          tendersData = _.filter(tendersData, function(t) {
            return (
              t.year_of_conclution_date == 2024 ||
              t.year_of_conclution_date == 2023 ||
              t.year_of_conclution_date == 2022
            );
          });
        }
        _.each(mainData, function(d) {
          //Base some indicators on year
          if (d.company_has_won_tenders_2022_2024) {
            d.company_has_won_tenders = d.company_has_won_tenders_2022_2024;
          } else if (d.company_has_won_tenders_2024) {
            d.company_has_won_tenders = d.company_has_won_tenders_2024;
          }
          //Extract tenders related to companies, for 2024 or 2022-2024
          if (d.companyId != "") {
            declarationsCompaniesIds.push(d.companyId);
          }
        });
        tendersData = _.filter(tendersData, function(t) {
          return declarationsCompaniesIds.includes(t.vendor_id);
        });

        //Set dc main vars
        var ndx = crossfilter(mainData);
        var ndxTenders = crossfilter(tendersData);
        var searchDimension = ndx.dimension(function(d) {
          var entryString = "" + d.name + " " + d.company_ownership_info;
          return entryString.toLowerCase();
        });

        var idDimension = ndx.dimension(function(d) {
          return d.companyId;
        });
        var idDimensionTenders = ndxTenders.dimension(function(d) {
          return d.vendor_id;
        });

        //CHART 1 - RACE
        var createRaceChart = function() {
          var chart = charts.race.chart;
          var dimension = ndx.dimension(function(d) {
            return d.race;
          });
          var group = dimension.group().reduceSum(function(d) {
            return 1;
          });
          var sizes = calcPieSize(charts.race.divId);
          var legendMaxChars = 40;
          if (sizes.width > 425) {
            legendMaxChars = 70;
          }
          chart
            .width(sizes.width)
            .height(sizes.height)
            .cy(sizes.cy)
            .innerRadius(sizes.innerRadius)
            .radius(sizes.radius)
            .cap(7)
            .legend(
              dc
                .legend()
                .x(0)
                .y(sizes.legendY)
                .gap(10)
                .autoItemWidth(true)
                .horizontal(false)
                .legendWidth(sizes.width)
                .legendText(function(d) {
                  var thisKey = d.name;
                  if (thisKey.length > legendMaxChars) {
                    return thisKey.substring(0, legendMaxChars) + "...";
                  }
                  return thisKey;
                })
            )
            .title(function(d) {
              return (
                d.key +
                ": " +
                d.value +
                " " +
                vuedata.t.charts.general.declarations
              );
            })
            .label(function(d) {
              var percent =
                d.value /
                group.all().reduce(function(a, v) {
                  return a + v.value;
                }, 0);
              percent = percent * 100;
              return percent.toFixed(1).replace(".", ",") + " %";
            })
            .dimension(dimension)
            .ordinalColors(vuedata.colors.pieDefault)
            .group(group);
          chart.render();
          chart.on("filtered", function(c) {
            filterTendersData();
          });
        };

        //CHART 2 - LEVEL
        var createLevelChart = function() {
          var chart = charts.level.chart;
          var dimension = ndx.dimension(function(d) {
            return d.level;
          }, false);
          var group = dimension.group().reduceSum(function(d) {
            return 1;
          });
          var filteredGroup = (function(source_group) {
            return {
              all: function() {
                return source_group.top(10).filter(function(d) {
                  return d.value != 0;
                });
              },
            };
          })(group);
          var width = recalcWidth(charts.level.divId);
          var charsLength = recalcCharsLength(width);
          chart
            .width(width)
            .height(365)
            .margins({ top: 0, left: 0, right: 0, bottom: 20 })
            .group(filteredGroup)
            .dimension(dimension)
            .colorCalculator(function(d, i) {
              return vuedata.colors.default;
            })
            .label(function(d) {
              if (d.key.length > charsLength) {
                return d.key.substring(0, charsLength) + "...";
              }
              return d.key;
            })
            .title(function(d) {
              return (
                d.key +
                ": " +
                formatValueString(d.value) +
                " " +
                vuedata.t.charts.general.declarations
              );
            })
            .elasticX(true)
            .xAxis()
            .ticks(4)
            .tickFormat(function(d) {
              return formatValueString(d) + "";
            });
          chart.render();
          chart.on("filtered", function(c) {
            filterTendersData();
          });
        };

        //CHART 3 - PARTY
        var createPartyChart = function() {
          var chart = charts.party.chart;
          var dimension = ndx.dimension(function(d) {
            return d.political_party;
          }, false);
          var group = dimension.group().reduceSum(function(d) {
            return 1;
          });
          var filteredGroup = (function(source_group) {
            return {
              all: function() {
                return source_group.top(10).filter(function(d) {
                  return d.value != 0;
                });
              },
            };
          })(group);
          var width = recalcWidth(charts.party.divId);
          var charsLength = recalcCharsLength(width);
          chart
            .width(width)
            .height(365)
            .margins({ top: 0, left: 0, right: 0, bottom: 20 })
            .group(filteredGroup)
            .dimension(dimension)
            .colorCalculator(function(d, i) {
              return vuedata.colors.default;
            })
            .label(function(d) {
              if (d.key.length > charsLength) {
                return d.key.substring(0, charsLength) + "...";
              }
              return d.key;
            })
            .title(function(d) {
              return (
                d.key +
                ": " +
                formatValueString(d.value) +
                " " +
                vuedata.t.charts.general.declarations
              );
            })
            .elasticX(true)
            .xAxis()
            .ticks(4)
            .tickFormat(function(d) {
              return formatValueString(d) + "";
            });
          chart.render();
          chart.on("filtered", function(c) {
            filterTendersData();
          });
        };

        //CHART 4 - DECLARATIONS WHERE COMPANY HAS WON TENDERS
        var createIndicatorTendersChart = function() {
          var chart = charts.indicatorTenders.chart;
          var dimension = ndx.dimension(function(d) {
            if (d.company_has_won_tenders == "True") {
              return vuedata.t.charts.general.yes;
            }
            return vuedata.t.charts.general.no;
          });
          var group = dimension.group().reduceSum(function(d) {
            return 1;
          });
          var sizes = calcPieSize(charts.indicatorTenders.divId);
          var legendMaxChars = 40;
          if (sizes.width > 425) {
            legendMaxChars = 70;
          }
          chart
            .width(sizes.width)
            .height(sizes.height)
            .cy(sizes.cy)
            .innerRadius(sizes.innerRadius)
            .radius(sizes.radius)
            .cap(7)
            .legend(
              dc
                .legend()
                .x(0)
                .y(sizes.legendY)
                .gap(10)
                .autoItemWidth(true)
                .horizontal(false)
                .legendWidth(sizes.width)
                .legendText(function(d) {
                  var thisKey = d.name;
                  if (thisKey.length > legendMaxChars) {
                    return thisKey.substring(0, legendMaxChars) + "...";
                  }
                  return thisKey;
                })
            )
            .title(function(d) {
              return (
                d.key +
                ": " +
                formatValueString(d.value) +
                " " +
                vuedata.t.charts.general.declarations
              );
            })
            .label(function(d) {
              var percent =
                d.value /
                group.all().reduce(function(a, v) {
                  return a + v.value;
                }, 0);
              percent = percent * 100;
              return percent.toFixed(1).replace(".", ",") + " %";
            })
            .dimension(dimension)
            .group(group)
            .colorCalculator(function(d, i) {
              return vuedata.colors.yesNoPieRed[d.key];
            });
          chart.render();
          chart.on("filtered", function(c) {
            filterTendersData();
          });
        };

        //CHART 5 - DECLARATIONS WHERE PUBLIC OFFICIAL IS POLITICAL DONOR
        var createIndicatorDonorChart = function() {
          var chart = charts.indicatorDonor.chart;
          var dimension = ndx.dimension(function(d) {
            if (d.official_is_political_donor == "True") {
              return vuedata.t.charts.general.yes;
            }
            return vuedata.t.charts.general.no;
          });
          var group = dimension.group().reduceSum(function(d) {
            return 1;
          });
          var sizes = calcPieSize(charts.indicatorDonor.divId);
          var legendMaxChars = 40;
          if (sizes.width > 425) {
            legendMaxChars = 70;
          }
          chart
            .width(sizes.width)
            .height(sizes.height)
            .cy(sizes.cy)
            .innerRadius(sizes.innerRadius)
            .radius(sizes.radius)
            .cap(7)
            .legend(
              dc
                .legend()
                .x(0)
                .y(sizes.legendY)
                .gap(10)
                .autoItemWidth(true)
                .horizontal(false)
                .legendWidth(sizes.width)
                .legendText(function(d) {
                  var thisKey = d.name;
                  if (thisKey.length > legendMaxChars) {
                    return thisKey.substring(0, legendMaxChars) + "...";
                  }
                  return thisKey;
                })
            )
            .title(function(d) {
              return (
                d.key +
                ": " +
                formatValueString(d.value) +
                " " +
                vuedata.t.charts.general.declarations
              );
            })
            .label(function(d) {
              var percent =
                d.value /
                group.all().reduce(function(a, v) {
                  return a + v.value;
                }, 0);
              percent = percent * 100;
              return percent.toFixed(1).replace(".", ",") + " %";
            })
            .dimension(dimension)
            .group(group)
            .colorCalculator(function(d, i) {
              return vuedata.colors.yesNoPieRed[d.key];
            });
          chart.render();
          chart.on("filtered", function(c) {
            filterTendersData();
          });
        };

        //CHART 6 - TOP TENDERERS BY TENDERS NUM
        var createCompaniesTendersNumChart = function() {
          var chart = charts.companiesTendersNum.chart;
          var dimension = ndxTenders.dimension(function(d) {
            return d.vendor + " (" + d.vendor_id + ")";
          }, false);
          var group = dimension.group().reduceSum(function(d) {
            return 1;
          });
          var filteredGroup = (function(source_group) {
            return {
              all: function() {
                if (idDimensionTenders.top(Infinity).length == 0) {
                  return [];
                }
                return source_group.top(10).filter(function(d) {
                  return d.value != 0;
                });
              },
            };
          })(group);
          var width = recalcWidth(charts.companiesTendersNum.divId);
          var charsLength = recalcCharsLength(width);
          chart
            .width(width)
            .height(390)
            .margins({ top: 0, left: 0, right: 0, bottom: 20 })
            .group(filteredGroup)
            .dimension(dimension)
            .colorCalculator(function(d, i) {
              return vuedata.colors.default;
            })
            .label(function(d) {
              if (d.key.length > charsLength) {
                return d.key.substring(0, charsLength) + "...";
              }
              return d.key;
            })
            .title(function(d) {
              return (
                d.key +
                ": " +
                formatValueString(d.value) +
                " " +
                vuedata.t.charts.general.tenders
              );
            })
            .elasticX(true)
            .xAxis()
            .ticks(4)
            .tickFormat(function(d) {
              return formatValueString(d) + "";
            });
          chart.render();
          chart.on("filtered", function(c) {
            filterMainDataByTendersChart();
          });
        };

        //CHART 7 - TOP TENDERERS BY AWARDED AMOUNT
        var createCompaniesTendersValChart = function() {
          var chart = charts.companiesTendersVal.chart;
          var dimension = ndxTenders.dimension(function(d) {
            return d.vendor + " (" + d.vendor_id + ")";
          }, false);
          var group = dimension.group().reduceSum(function(d) {
            if (
              !d.value_of_the_contract_num ||
              isNaN(d.value_of_the_contract_num)
            ) {
              return 0;
            }
            return d.value_of_the_contract_num;
          });
          var filteredGroup = (function(source_group) {
            return {
              all: function() {
                if (idDimensionTenders.top(Infinity).length == 0) {
                  return [];
                }
                return source_group.top(10).filter(function(d) {
                  return d.value != 0;
                });
              },
            };
          })(group);
          var width = recalcWidth(charts.companiesTendersVal.divId);
          var charsLength = recalcCharsLength(width);
          chart
            .width(width)
            .height(390)
            .margins({ top: 0, left: 0, right: 0, bottom: 20 })
            .group(filteredGroup)
            .dimension(dimension)
            .colorCalculator(function(d, i) {
              return vuedata.colors.default;
            })
            .label(function(d) {
              if (d.key.length > charsLength) {
                return d.key.substring(0, charsLength) + "...";
              }
              return d.key;
            })
            .title(function(d) {
              return (
                d.key + ": " + formatValueString(d.value.toFixed(2)) + " BAM"
              );
            })
            .elasticX(true)
            .xAxis()
            .ticks(4)
            .tickFormat(function(d) {
              return formatValueString(d) + "";
            });
          chart.render();
          chart.on("filtered", function(c) {
            filterMainDataByTendersChart();
          });
        };

        //TABLE
        var createTable = function() {
          var count = 0;
          charts.table.chart = $("#dc-data-table").dataTable({
            language: vuedata.t.tables.language,
            columnDefs: [
              {
                searchable: false,
                orderable: false,
                targets: 0,
                data: function(row, type, val, meta) {
                  return count;
                },
              },
              {
                searchable: false,
                orderable: true,
                targets: 1,
                defaultContent: "N/A",
                data: function(d) {
                  return d.name;
                },
              },
              {
                searchable: false,
                orderable: true,
                targets: 2,
                defaultContent: "N/A",
                data: function(d) {
                  return d.race;
                },
              },
              {
                searchable: false,
                orderable: true,
                targets: 3,
                defaultContent: "N/A",
                data: function(d) {
                  return d.level;
                },
              },
              {
                searchable: false,
                orderable: true,
                targets: 4,
                defaultContent: "N/A",
                data: function(d) {
                  return d.political_party;
                },
              },
              {
                searchable: false,
                orderable: true,
                targets: 5,
                defaultContent: "N/A",
                data: function(d) {
                  return d.company_ownership_info;
                },
              },
              {
                searchable: false,
                orderable: true,
                targets: 6,
                defaultContent: "N/A",
                class: "dt-center",
                data: function(d) {
                  if (d.company_has_won_tenders == "True") {
                    return (
                      d.companyId +
                      '<br /><button id="' +
                      d.companyId +
                      '" class="detailsModalBtn declarationsTableModalBtn">' +
                      vuedata.t.tables.section3.modalButton +
                      "</button>"
                    );
                  }
                  return d.companyId;
                },
              },
              {
                searchable: false,
                orderable: true,
                targets: 7,
                defaultContent: "N/A",
                type: "formattednum",
                data: function(d) {
                  return formatValueString(d.value);
                },
              },
            ],
            iDisplayLength: 25,
            bPaginate: true,
            bLengthChange: true,
            bFilter: false,
            order: [[1, "desc"]],
            bSort: true,
            bInfo: true,
            bAutoWidth: false,
            bDeferRender: true,
            aaData: searchDimension.top(Infinity),
            bDestroy: true,
          });
          var datatable = charts.table.chart;
          datatable.on("draw.dt", function() {
            var PageInfo = $("#dc-data-table")
              .DataTable()
              .page.info();
            datatable
              .DataTable()
              .column(0, { page: "current" })
              .nodes()
              .each(function(cell, i) {
                cell.innerHTML = i + 1 + PageInfo.start;
              });
          });
          datatable.DataTable().draw();
        };

        //OPEN DETAILS MODAL FROM BUTTONS
        function openDetailsModal(companyId) {
          var rowData = _.find(mainData, function(x) {
            return x["companyId"] == companyId;
          });
          vuedata.selectedEntry = rowData;
          if (
            vuedata.selectedEntry.companyId &&
            vuedata.selectedEntry.companyId != ""
          ) {
            vuedata.selectedEntry.tenders = _.filter(tendersData, function(t) {
              return t.vendor_id == vuedata.selectedEntry.companyId;
            });
          }
          if (
            vuedata.selectedEntry.tenders &&
            vuedata.selectedEntry.tenders.length > 0
          ) {
            $("#detailsModal").modal();
          }
        }

        $(".chart-container-table").delegate(
          ".detailsModalBtn",
          "click",
          function(e) {
            e.stopPropagation();
            var companyId = $(this).attr("id");
            openDetailsModal(companyId);
          }
        );

        //REFRESH TABLE
        function RefreshTable() {
          dc.events.trigger(function() {
            var alldata = searchDimension.top(Infinity);
            charts.table.chart.fnClearTable();
            charts.table.chart.fnAddData(alldata);
            charts.table.chart.fnDraw();
          });
        }

        //SEARCH INPUT FUNCTIONALITY
        var typingTimer;
        var doneTypingInterval = 1000;
        var $input = $("#search-input");
        $input.on("keyup", function() {
          clearTimeout(typingTimer);
          typingTimer = setTimeout(doneTyping, doneTypingInterval);
        });
        $input.on("keydown", function() {
          clearTimeout(typingTimer);
        });
        function doneTyping() {
          var s = $input.val().toLowerCase();
          searchDimension.filter(function(d) {
            return d.indexOf(s) !== -1;
          });
          filterTendersData(false);
          throttle();
          var throttleTimer;
          function throttle() {
            window.clearTimeout(throttleTimer);
            throttleTimer = window.setTimeout(function() {
              dc.redrawAll();
            }, 250);
          }
        }

        //Filter Tenders Data
        var filterTendersData = function() {
          var filteredIds = [];
          _.each(idDimension.top(Infinity), function(d) {
            filteredIds.push(d.companyId);
          });
          idDimensionTenders.filterFunction(function(k) {
            return filteredIds.includes(k);
          });
          dc.redrawAll();
        };

        //Filter Tenders  Data
        var filterMainDataByTendersChart = function(redraw = true) {
          var filteredIds = [];
          _.each(idDimensionTenders.top(Infinity), function(d) {
            filteredIds.push(d.vendor_id);
          });
          idDimension.filterFunction(function(k) {
            return filteredIds.includes(k);
          });
          if (redraw) {
            dc.redrawAll();
          }
        };

        //Reset charts
        var resetGraphs = function() {
          for (var c in charts) {
            if (charts[c].type !== "table" && charts[c].chart.hasFilter()) {
              charts[c].chart.filterAll();
            }
          }
          searchDimension.filter(null);
          idDimension.filter(null);
          idDimensionTenders.filter(null);
          $("#search-input").val("");
          dc.redrawAll();
        };
        $(".reset-btn").click(function() {
          resetGraphs();
        });

        //Render charts
        createRaceChart();
        createLevelChart();
        createPartyChart();
        createIndicatorTendersChart();
        createCompaniesTendersNumChart();
        createCompaniesTendersValChart();
        createIndicatorDonorChart();
        createTable();

        $(".dataTables_wrapper").append($(".dataTables_length"));

        //Hide loader
        vuedata.loader = false;

        //COUNTERS
        //Main counter
        var all = ndx.groupAll();
        var counter = dc
          .dataCount(".dc-data-count")
          .dimension(ndx)
          .group(all)
          .formatNumber(locale.format(",d"));
        counter.render();
        counter.on("renderlet.resetall", function(c) {
          RefreshTable();
        });

        //Window resize function
        window.onresize = function(event) {
          resizeGraphs();
        };
      }
    );
  });
});
