const higestVal = 14742; // precalculated
const totalSum = 120000; // about this much, taken from their site.
let lastWidth = 0; // it skips the first one?
let heightsAgg = [];
let countAgg = 0;
let viewps = [];
$(document).ready(function () {
  $.ajax({
    dataType: "json",
    url: "js/data.json",
    success: function (data) {
      data.viewports.sort(function (a, b) {
        return parseInt(a.width, 10) - parseInt(b.width, 10);
      });
      $.each(data.viewports, function (k, v) {
        if (lastWidth === v.width) {
          // agg the heights
          heightsAgg.push(v.height);
          // agg the count
          countAgg = parseInt(countAgg) + parseInt(v.count);
        } else {
          heightsAgg.sort(function (a, b) {
            return a - b;
          });
          // make a new one with the agg
          viewps.push({
            width: lastWidth,
            heights: heightsAgg,
            maxHeight: heightsAgg[heightsAgg.length - 1],
            heightsCount: heightsAgg.length,
            heightsLanguage:
              heightsAgg.length > 1 ? "different heights" : "height",
            count: countAgg,
            alpha: parseFloat((countAgg / higestVal) * 100).toFixed(2),
            percent: parseFloat((countAgg / totalSum) * 100).toFixed(4),
          });
          // start fresh with the new one
          lastWidth = v.width;
          heightsAgg = [v.height];
          countAgg = parseInt(v.count);
        }
      });
      // stick it in
      $("#graph").html(Mustache.render($("template#viewps").html(), viewps));
      $("input").on("change", function () {
        $("label").removeClass("active");
        $(`label[for='${this.id}`).addClass("active");
      });
    },
  });
});
