<template>
  <div :class="['chart-header', 'row', customclass, customclass2]">
    <div :class="['chart-title', 'col-8']">
      {{ title }}
    </div>
    <div class="chart-header-buttons col-4">
      <button v-if="info && info !== ''" type="button" class="btn btn-secondary btn-info" data-container="body" data-trigger="click hover" data-toggle="popover" data-html="true" data-placement="bottom" :data-content="info">
      i
    </button>
      <button v-if="chartid" :id="'download-'+chartid" class='btn btn-secondary btn-download-chart'>
        <i class="material-icons">save_alt</i>
      </button>
      <button v-if="chartid" :id="'share-'+chartid" class='btn btn-secondary btn-download-chart'>
        <i class="material-icons">share</i>
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ChartHeader',
  props: {
    title: String,
    info: String,
    bg: String,
    color: String,
    customclass: String,
    customclass2: String,
    chartid: String
  },
  mounted: function () {
    var chartid = this.chartid;
    var thisTitle = this.title;
    function chartSavePrep(thisChartId) {
      $('#'+thisChartId).find('svg').attr( "overflow", "visible" );
      $('#'+thisChartId).find('svg').css( "overflow", "visible" );
      $('#'+thisChartId).find('.chart-header-buttons').hide();
      $('#'+thisChartId).find('.btn-info').hide();
      $('#'+thisChartId).addClass('hide-shadow');
      $("html").addClass("hide-scrollbar");
      $('#iw-nav').addClass('hide-element');
      $('.top-description-container').addClass('hide-element');
      $('.version-select-container').addClass('hide-element');
      //Add credits text
      var blockHeight = $('#'+thisChartId).height();
      $('#'+thisChartId).height(blockHeight + 50);
      var urlBase = location.href.substring(0, location.href.lastIndexOf("/")+1);
      var creditsHtml = '<div class="image-credits">' + urlBase + '</div>';
      $('#'+thisChartId).append(creditsHtml);
    }
    function chartSaveCleanup(thisChartId) {
      $("html").removeClass("hide-scrollbar");
      $('#'+thisChartId).removeClass('hide-shadow');
      $('#'+thisChartId).find('.chart-header-buttons').show();
      $('#'+thisChartId).find('.btn-info').show();
      $('#iw-nav').removeClass('hide-element');
      $('.top-description-container').removeClass('hide-element');
      $('.version-select-container').removeClass('hide-element');
      $('#'+thisChartId).find('.image-credits').remove();
      var blockHeight = $('#'+thisChartId).height();
      $('#'+thisChartId).height(blockHeight - 50);
    }
    $('#download-' + chartid).on('click', function(){
      var thisChartId = chartid.toLowerCase() + '_chart_container';
      console.log(thisChartId);
      chartSavePrep(thisChartId);
      html2canvas(document.querySelector('#'+thisChartId), {scrollY: -window.scrollY, backgroundColor: '#ffffff'}).then(canvas => {
        var filename = thisTitle;
        var downloadLink = document.createElement('a');
        downloadLink.href = canvas.toDataURL();
        downloadLink.download = filename;
        //For Firefox
        document.body.appendChild(downloadLink);
        downloadLink.click();
        document.body.removeChild(downloadLink);
      });
      chartSaveCleanup(thisChartId);
    });
    $('#share-' + chartid).on('click', function(){
      var thisChartId = chartid.toLowerCase() + '_chart_container';
      chartSavePrep(thisChartId);
      html2canvas(document.querySelector('#'+thisChartId), {scrollY: -window.scrollY, backgroundColor: '#ffffff'}).then(canvas => {
        var imgUri = canvas.toDataURL();
        $.post( "save-image.php", { imgUri: imgUri })
        .done(function( data ) {
          var urlBase = location.href.substring(0, location.href.lastIndexOf("/")+1)
          var imgUrlString = urlBase + 'images/charts/' + data + '.png';
          //Save chart id and show share modal 
          $('#chartShareModal .chart-img-preview').attr('src', imgUrlString);
          $('#chartShareModal #chartUrlString').val(imgUrlString);
          $('#chartShareModal').modal();
        });
      });
      chartSaveCleanup(thisChartId);
    });
  }
}
</script>

<style scoped lang="scss">
@use "sass:color";
$color_TI: #3b95d0;
$color_TI_darker: color.adjust($color_TI, $lightness: -20%);
.chart-header {
  padding: 10px 5px;
  margin: 0;
  z-index: 2;
  position: relative;
  &.fixed-twoline-height {
    @media only screen and (min-width: 768px) {
      height: 65px;
    }
  }
  &.small {
    .chart-title {
      font-size: 14px !important;
    }
  }
  .chart-title {
    font-size: 16px;
    font-weight: 700;
    text-align: left;
    line-height: 128%;
    color: #000;
    @media only screen and (max-width: 1400px) {
      font-size: 16px;
    }
    @media only screen and (max-width: 1250px) {
      font-size: 14px;
    }
    @media only screen and (max-width: 1162px) {
      font-size: 14px;
    }
    @media only screen and (max-width: 767px) {
      font-size: 18px;
    }
    .btn-info {
      padding: 0px 9px;
      font-size: 14px;
      border-radius: 20px;
      font-weight: 600;
      background: $color_TI;
      border: none;
      margin-left: 5px;
    }
  }
  .chart-header-buttons {
    text-align: right;
    padding-left: 0;
    .btn-info {
      padding: 0px 10px;
      border-radius: 20px;
      font-weight: 600;
      background: $color_TI;
      text-align: center;
      border: none;
      @media only screen and (max-width: 1490px) and (min-width: 769px)  {
        height: 20px;
        width: 20px;
        font-size: 12px;
        padding: 0;
      }
    }
    .btn-download-chart {
      height: 23px;
      width: 23px;
      padding: 2px 2px;
      border-radius: 2px;
      font-weight: 600;
      background: $color_TI;
      border: none;
      margin-left: 2px;
      text-align: center;
      i {
        font-size: 19px;
      }
      @media only screen and (max-width: 1490px) and (min-width: 769px)  {
        height: 20px;
        width: 20px;
        i {
          font-size: 13px;
          position: relative;
          top: -4px;
        }
      }
    }
  }
}
</style>

