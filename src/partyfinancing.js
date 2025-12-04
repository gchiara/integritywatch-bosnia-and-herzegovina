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
  page: "section2",
  language: "en",
  stringsData: {},
  defaultLanguage: "en",
  t: {},
  topBoxReadMore: false,
  lastUpdateDate: "",
  loader: true,
  showInfo: true,
  showShare: true,
  chartMargin: 40,
  dataUpdateDate: "",
  dataYears: [],
  dataYearsButtons: ["2024", "2023", "2022", "2021", "2020", "2019", "2018"],
  selectedYear: "",
  charts: {
    years: {
      id: "years",
      title: "",
      info: "i",
    },
    donorType: {
      id: "donorType",
      title: "",
      info: "i",
    },
    parties: {
      id: "parties",
      title: "",
      info: "i",
    },
    donors: {
      id: "donors",
      title: "",
      info: "i",
    },
    indicators: {
      id: "indicators",
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
    pieDefaultShort: ["#66ade3", "#3f6990", "#3b4f6a"],
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
      var csvDatasetPath = "./data/downloadable_csv_xls/donations.csv";
      var xlsDatasetPath = "./data/downloadable_csv_xls/donations.xlsx";
      if (format == "csv") {
        window.open(csvDatasetPath, "_blank");
      }
      if (format == "xls") {
        window.open(xlsDatasetPath, "_blank");
      }
    },
    //Copy to clipboard
    copyToClipboard: function(elId) {
      var textToCopy = document.getElementById(elId);
      textToCopy.select();
      textToCopy.setSelectionRange(0, 99999);
      document.execCommand("copy");
      console.log("Copied: " + textToCopy.value);
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
  years: {
    chart: dc.lineChart("#years_chart"),
    type: "line",
    divId: "years_chart",
  },
  donorType: {
    chart: dc.pieChart("#donortype_chart"),
    type: "pie",
    divId: "donortype_chart",
  },
  parties: {
    chart: dc.rowChart("#parties_chart"),
    type: "row",
    divId: "parties_chart",
  },
  donors: {
    chart: dc.rowChart("#donors_chart"),
    type: "row",
    divId: "donors_chart",
  },
  indicators: {
    chart: dc.pieChart("#indicators_chart"),
    type: "pie",
    divId: "indicators_chart",
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
  return parseInt(width / 7);
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
        if (vuedata.t.charts.general[thisKey] && c == "indicators") {
          thisKey = vuedata.t.charts.general[thisKey];
        }
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

  //Load data
  csv("./data/donations.csv?" + randomPar, (err, csvData) => {
    var mainData = csvData;
    //Parse data
    var years = [];
    _.each(mainData, function(d) {
      //Extract years
      d.year = d.year;
      if (years.indexOf(d.year) == -1) {
        years.push(d.year);
      }
    });
    years.sort();
    vuedata.dataYears = years;

    //Filter by year if year is selected
    if (vuedata.selectedYear !== "") {
      mainData = _.filter(csvData, function(d) {
        return d.year == vuedata.selectedYear;
      });
    }

    //Set dc main vars
    var ndx = crossfilter(mainData);
    var searchDimension = ndx.dimension(function(d) {
      var entryString = "" + d.donorName + " " + d.party;
      return entryString.toLowerCase();
    });

    //CHART 1 - YEARS
    var createYearsChart = function() {
      var chart = charts.years.chart;
      var dimension = ndx.dimension(function(d) {
        return d.year;
      });
      var group = dimension.group().reduceSum(function(d) {
        return 1;
      });
      var width = recalcWidth(charts.years.divId);
      var order = vuedata.dataYears;
      chart
        .width(width)
        .height(290)
        .group(group)
        .dimension(dimension)
        .elasticY(true)
        .renderArea(true)
        .on("preRender", function(chart, filter) {})
        .margins({ top: 30, right: 20, bottom: 20, left: 40 })
        .x(d3.scaleBand().domain(order))
        .xUnits(dc.units.ordinal)
        .elasticY(true)
        .title(function(d) {
          return (
            d.key +
            ": " +
            formatValueString(d.value) +
            " " +
            vuedata.t.charts.general.donations
          );
        })
        .colorCalculator(function(d, i) {
          return vuedata.colors.default;
        });
      chart.yAxis().tickFormat(function(d) {
        return formatValueString(d) + "";
      });
      chart.render();
    };

    //CHART 2 - DONOR TYPE
    var createDonorTypeChart = function() {
      var chart = charts.donorType.chart;
      var dimension = ndx.dimension(function(d) {
        if (vuedata.t.charts.general[d.donorType]) {
          return vuedata.t.charts.general[d.donorType];
        }
        return d.donorType;
      });
      var group = dimension.group().reduceSum(function(d) {
        return 1;
      });
      var sizes = calcPieSize(charts.donorType.divId);
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
            vuedata.t.charts.general.donations
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
        .ordinalColors(vuedata.colors.pieDefaultShort);
      chart.render();
    };

    //CHART 3 - TOP PARTIES BY DONATIONS
    var createPartiesChart = function() {
      var chart = charts.parties.chart;
      var dimension = ndx.dimension(function(d) {
        return d.party;
      }, false);
      var group = dimension.group().reduceSum(function(d) {
        return d.amount;
      });
      var filteredGroup = (function(source_group) {
        return {
          all: function() {
            return source_group.top(15).filter(function(d) {
              return d.value != 0;
            });
          },
        };
      })(group);
      var width = recalcWidth(charts.parties.divId);
      var charsLength = recalcCharsLength(width);
      chart
        .width(width)
        .height(380)
        .margins({ top: 0, left: 0, right: 20, bottom: 20 })
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
          return d.key + ": " + formatValueString(d.value.toFixed(2)) + " BAM";
        })
        .elasticX(true)
        .xAxis()
        .ticks(4)
        .tickFormat(function(d) {
          return formatValueString(d) + "";
        });
      chart.render();
    };

    //CHART 4 - TOP DONORS BY DONATIONS
    var createDonorsChart = function() {
      var chart = charts.donors.chart;
      var dimension = ndx.dimension(function(d) {
        return d.donorName;
      }, false);
      var group = dimension.group().reduceSum(function(d) {
        return d.amount;
      });
      var filteredGroup = (function(source_group) {
        return {
          all: function() {
            return source_group.top(15).filter(function(d) {
              return d.value != 0;
            });
          },
        };
      })(group);
      var width = recalcWidth(charts.donors.divId);
      var charsLength = recalcCharsLength(width);
      chart
        .width(width)
        .height(380)
        .margins({ top: 0, left: 0, right: 20, bottom: 20 })
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
          return d.key + ": " + formatValueString(d.value.toFixed(2)) + " BAM";
        })
        .elasticX(true)
        .xAxis()
        .ticks(4)
        .tickFormat(function(d) {
          return formatValueString(d) + "";
        });
      chart.render();
    };

    //CHART 5 - DONOR IS TENDER WINNER
    var createIndicatorsChart = function() {
      var chart = charts.indicators.chart;
      var dimension = ndx.dimension(function(d) {
        if (d.donor_has_won_tenders == "True") {
          return vuedata.t.charts.general.yes;
        }
        return vuedata.t.charts.general.no;
      });
      var group = dimension.group().reduceSum(function(d) {
        return 1;
      });
      var sizes = calcPieSize(charts.indicators.divId);
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
            vuedata.t.charts.general.donations
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
              return d.party;
            },
          },
          {
            searchable: false,
            orderable: true,
            targets: 2,
            defaultContent: "N/A",
            data: function(d) {
              if (vuedata.t.charts.general[d.donorType]) {
                return vuedata.t.charts.general[d.donorType];
              }
              return d.donorType;
            },
          },
          {
            searchable: false,
            orderable: true,
            targets: 3,
            defaultContent: "N/A",
            data: function(d) {
              return d.donorName;
            },
          },
          {
            searchable: false,
            orderable: true,
            targets: 4,
            defaultContent: "N/A",
            data: function(d) {
              return d.companyId;
            },
          },
          {
            searchable: false,
            orderable: true,
            targets: 5,
            defaultContent: "N/A",
            type: "formattednum",
            data: function(d) {
              return formatValueString(d.amount);
            },
          },
          {
            searchable: false,
            orderable: true,
            targets: 6,
            defaultContent: "N/A",
            data: function(d) {
              return d.date;
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

      $("#dc-data-table tbody").on("click", "tr", function() {
        var data = datatable
          .DataTable()
          .row(this)
          .data();
        vuedata.selectedEntry = data;
      });
    };

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
      throttle();
      var throttleTimer;
      function throttle() {
        window.clearTimeout(throttleTimer);
        throttleTimer = window.setTimeout(function() {
          dc.redrawAll();
        }, 250);
      }
    }

    //Reset charts
    var resetGraphs = function() {
      for (var c in charts) {
        if (charts[c].type !== "table" && charts[c].chart.hasFilter()) {
          charts[c].chart.filterAll();
        }
      }
      searchDimension.filter(null);
      $("#search-input").val("");
      dc.redrawAll();
    };
    $(".reset-btn").click(function() {
      resetGraphs();
    });

    //Render charts
    createYearsChart();
    createDonorTypeChart();
    createPartiesChart();
    createDonorsChart();
    createIndicatorsChart();
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
  });
});
