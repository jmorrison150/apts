
//center map
var ny = new google.maps.LatLng(40.737893, -73.990288);
var boston = new google.maps.LatLng(42.357402, -71.083102);
var sf = new google.maps.LatLng(37.599, -122.206879);
var la = new google.maps.LatLng(33.935385, -118.320236);
var sea = new google.maps.LatLng(47.608015, -122.322865);
var dfw = new google.maps.LatLng(32.765336, -97.049332);

var Panorama;
var mapCenter = boston;
var mapZoom = 11;





function initialize() {

    insertMap();
    //addCircles();
    //insertScale();
    insertSlider();
    insertBarGraph();
    //insertGraph();


}

function ProcessSVData(data, status) {
    if (status == google.maps.StreetViewStatus.OK) {


        Panorama.setPano(data.location.pano);
        Panorama.setPov({
            heading: 270,
            pitch: 0
        });
        Panorama.setVisible(true);
    } else { console.log('Street View data not found for this location.'); }
}

function insertMap() {


    //set bounds for overlay
    var usBounds = new google.maps.LatLngBounds(new google.maps.LatLng(24.926295, -126.137697), new google.maps.LatLng(48.926295, -66.137697));
    var nyBounds = new google.maps.LatLngBounds(new google.maps.LatLng(40.616333, -74.113083), new google.maps.LatLng(40.856704, -73.850784));
    var bostonBounds = new google.maps.LatLngBounds(new google.maps.LatLng(42.255594, -71.1828231), new google.maps.LatLng(42.4351936, -70.9758));
    var sfBounds = new google.maps.LatLngBounds(new google.maps.LatLng(37.249862, -122.796936), new google.maps.LatLng(38.083915, -121.764221));
    var laBounds = new google.maps.LatLngBounds(new google.maps.LatLng(33.718134, -118.557587), new google.maps.LatLng(34.130639, -117.964325));
    var seaBounds = new google.maps.LatLngBounds(new google.maps.LatLng(47.242477, -122.46048), new google.maps.LatLng(47.868981, -121.853485));
    var dfwBounds = new google.maps.LatLngBounds(new google.maps.LatLng(32.450834, -97.533875), new google.maps.LatLng(32.97311, -96.39679));

    // Set up the map
    var mapOptions = {
        center: mapCenter,
        zoom: mapZoom,
        streetViewControl: false,
        panControl: false,
        scaleControl: true,
        zoomControl: true,
        zoomControlOptions: { style: google.maps.MapTypeControlStyle.HORIZONTAL_BAR, position: google.maps.ControlPosition.BOTTOM_RIGHT },
        mapTypeControl: true,
        mapTypeControlOptions: { style: google.maps.MapTypeControlStyle.DEFAULT, mapTypeIds: ['Light', 'Dark'], position: google.maps.ControlPosition.RIGHT_BOTTOM },
        mapTypeId: 'Dark'


    };

    //make the map
    GoogleMap = new google.maps.Map(document.getElementById('ny-Map'), mapOptions);

    //styles
    var styledMapType = new google.maps.StyledMapType(styles, { name: 'Light' });
    var styledMapType_blk = new google.maps.StyledMapType(styles_blk, { name: 'Dark' });

    GoogleMap.mapTypes.set('Light', styledMapType);
    GoogleMap.mapTypes.set('Dark', styledMapType_blk);










    //       // add transit overlay
    //var transitOptions = {
    //    getTileUrl: function (coord, zoom) { return "http://mt1.google.com/vt/lyrs=m@155076273,transit:comp|vm:&" + "hl=en&opts=r&s=Galil&z=" + zoom + "&x=" + coord.x + "&y=" + coord.y; },
    //    tileSize: new google.maps.Size(256, 256),
    //    isPng: true
    //};
    //var transitMapType = new google.maps.ImageMapType(transitOptions);
    //bostonGoogeMap.overlayMapTypes.insertAt(0, transitMapType);









    //make overlay
    usOverlay05 = new google.maps.GroundOverlay('./images/us_400-6000_zoom05.png', usBounds);
    usOverlay08 = new google.maps.GroundOverlay('./images/us_400-6000_zoom07.png', usBounds);
    bostonOverlay11 = new google.maps.GroundOverlay('./images/bos_400-6000_zoom11.png', bostonBounds);
    bostonOverlay16 = new google.maps.GroundOverlay('./images/bos_400-6000_zoom16.png', bostonBounds);
    nyOverlay11 = new google.maps.GroundOverlay('./images/ny_400-6000_zoom11.png', nyBounds);
    nyOverlay16 = new google.maps.GroundOverlay('./images/ny_400-6000_zoom16.png', nyBounds);
    sfOverlay11 = new google.maps.GroundOverlay('./images/sf_400-6000_zoom11.png', sfBounds);
    sfOverlay16 = new google.maps.GroundOverlay('./images/sf_400-6000_zoom16.png', sfBounds);
    laOverlay11 = new google.maps.GroundOverlay('./images/la_400-6000_zoom11.png', laBounds);
    laOverlay16 = new google.maps.GroundOverlay('./images/la_400-6000_zoom16.png', laBounds);
    seaOverlay11 = new google.maps.GroundOverlay('./images/sea_400-6000_zoom11.png', seaBounds);
    seaOverlay16 = new google.maps.GroundOverlay('./images/sea_400-6000_zoom16.png', seaBounds);
    dfwOverlay11 = new google.maps.GroundOverlay('./images/dfw_400-6000_zoom11.png', dfwBounds);
    dfwOverlay16 = new google.maps.GroundOverlay('./images/dfw_400-6000_zoom16.png', dfwBounds);



    usOverlay05.setMap(null);
    usOverlay08.setMap(null);
    bostonOverlay11.setMap(GoogleMap);
    bostonOverlay16.setMap(null);
    nyOverlay11.setMap(GoogleMap);
    nyOverlay16.setMap(null);
    sfOverlay11.setMap(GoogleMap);
    sfOverlay16.setMap(null);
    laOverlay11.setMap(GoogleMap);
    laOverlay16.setMap(null);
    seaOverlay11.setMap(GoogleMap);
    seaOverlay16.setMap(null);
    dfwOverlay11.setMap(GoogleMap);
    dfwOverlay16.setMap(null);





    //click to view details
    // getPanoramaByLocation will return the nearest pano when the
    // given radius is 50 meters or less.
    var panoramaOptions = { disableDefaultUI: true };
    Panorama = new google.maps.StreetViewPanorama(document.getElementById('ny-Street'), panoramaOptions);
    var sv = new google.maps.StreetViewService();
    sv.getPanoramaByLocation(mapCenter, 50, ProcessSVData);

    //clicks
    google.maps.event.addListener(usOverlay05, 'click', function (event) { sv.getPanoramaByLocation(event.latLng, 50, ProcessSVData); });
    google.maps.event.addListener(usOverlay08, 'click', function (event) { sv.getPanoramaByLocation(event.latLng, 50, ProcessSVData); });
    google.maps.event.addListener(bostonOverlay11, 'click', function (event) { sv.getPanoramaByLocation(event.latLng, 50, ProcessSVData); });
    google.maps.event.addListener(bostonOverlay16, 'click', function (event) { sv.getPanoramaByLocation(event.latLng, 50, ProcessSVData); });
    google.maps.event.addListener(nyOverlay11, 'click', function (event) { sv.getPanoramaByLocation(event.latLng, 50, ProcessSVData); });
    google.maps.event.addListener(nyOverlay16, 'click', function (event) { sv.getPanoramaByLocation(event.latLng, 50, ProcessSVData); });
    google.maps.event.addListener(sfOverlay11, 'click', function (event) { sv.getPanoramaByLocation(event.latLng, 50, ProcessSVData); });
    google.maps.event.addListener(sfOverlay16, 'click', function (event) { sv.getPanoramaByLocation(event.latLng, 50, ProcessSVData); });
    google.maps.event.addListener(laOverlay11, 'click', function (event) { sv.getPanoramaByLocation(event.latLng, 50, ProcessSVData); });
    google.maps.event.addListener(laOverlay16, 'click', function (event) { sv.getPanoramaByLocation(event.latLng, 50, ProcessSVData); });
    google.maps.event.addListener(seaOverlay11, 'click', function (event) { sv.getPanoramaByLocation(event.latLng, 50, ProcessSVData); });
    google.maps.event.addListener(seaOverlay16, 'click', function (event) { sv.getPanoramaByLocation(event.latLng, 50, ProcessSVData); });
    google.maps.event.addListener(dfwOverlay11, 'click', function (event) { sv.getPanoramaByLocation(event.latLng, 50, ProcessSVData); });
    google.maps.event.addListener(dfwOverlay16, 'click', function (event) { sv.getPanoramaByLocation(event.latLng, 50, ProcessSVData); });





    //var infowindow = new google.maps.InfoWindow({
    //    content: 'Change the zoom level',
    //});
    //infowindow.open(GoogleMap);


    //zoom event


    google.maps.event.addListener(GoogleMap, 'zoom_changed', function () {
        var zoomLevel = GoogleMap.getZoom();


        if (zoomLevel < 10) {
            usOverlay05.setMap(GoogleMap);
            usOverlay08.setMap(null);

            bostonOverlay11.setMap(null);
            bostonOverlay16.setMap(null);
            nyOverlay11.setMap(null);
            nyOverlay16.setMap(null);
            sfOverlay11.setMap(null);
            sfOverlay16.setMap(null);
            laOverlay11.setMap(null);
            laOverlay16.setMap(null);
            seaOverlay11.setMap(null);
            seaOverlay16.setMap(null);
            dfwOverlay11.setMap(null);
            dfwOverlay16.setMap(null);

        } else if (10 <= zoomLevel && zoomLevel < 16) {
            bostonOverlay11.setMap(GoogleMap);
            nyOverlay11.setMap(GoogleMap);
            sfOverlay11.setMap(GoogleMap);
            laOverlay11.setMap(GoogleMap);
            seaOverlay11.setMap(GoogleMap);
            dfwOverlay11.setMap(GoogleMap);
            usOverlay05.setMap(null);
            usOverlay08.setMap(null);
            bostonOverlay16.setMap(null);
            nyOverlay16.setMap(null);
            sfOverlay16.setMap(null);
            laOverlay16.setMap(null);
            seaOverlay16.setMap(null);
            dfwOverlay16.setMap(null);
        } else if (16 <= zoomLevel) {
            bostonOverlay16.setMap(GoogleMap);
            nyOverlay16.setMap(GoogleMap);
            sfOverlay16.setMap(GoogleMap);
            laOverlay16.setMap(GoogleMap);
            seaOverlay16.setMap(GoogleMap);
            dfwOverlay16.setMap(GoogleMap);
            usOverlay05.setMap(null);
            usOverlay08.setMap(null);
            bostonOverlay11.setMap(null);
            nyOverlay11.setMap(null);
            sfOverlay11.setMap(null);
            laOverlay11.setMap(null);
            seaOverlay11.setMap(null);
            dfwOverlay11.setMap(null);
        }
        //var myLatLng = GoogleMap.getCenter();
        ////GoogleMap.setCenter(myLatLng);
        //infowindow.setContent('Zoom: ' + zoomLevel);
        //infowindow.setPosition(myLatLng);
    });



}

function addCircles() {
    //var myCity = new google.maps.
}

var blue_Yellow_12 = ['#060436', '#27114a', '#471a5c', '#65266c', '#823579', '#9d4782', '#b85c87', '#cf7387', '#e38d81', '#f3a973', '#fdc659', '#ffe71c'];
var blue_Yellow_24 = ['#080444', '#250840', '#390b3c', '#471138', '#541736', '#611e33', '#6c2631', '#762e2f', '#82372c', '#8c3f2a', '#964928', '#a05226', '#a95c24', '#b26622', '#bb6f1f', '#c47a1d', '#cc831a', '#d48e17', '#dc9913', '#e3a50f', '#ebb00b', '#f2ba07', '#f9c603', '#ffd200'];
var blue_Magenta_Yellow_24 = ['#090645', '#22094c', '#350d52', '#451256', '#541a5a', '#62225e', '#6f2b60', '#7c3463', '#873f64', '#934965', '#9e5465', '#a85f65', '#b26b64', '#bb7763', '#c48461', '#cd905e', '#d59d5b', '#dcaa56', '#e3b751', '#e9c54a', '#f0d342', '#f5e136', '#faee26', '#fffc00'];
var lightblue_Darkred_24 = ['#8b89f2', '#9081e4', '#9478d7', '#9871ca', '#9a68be', '#9c60b0', '#9d57a3', '#9d4f97', '#9d458b', '#9c3d7f', '#963774', '#8f336c', '#872f62', '#7f2c59', '#782851', '#702548', '#682140', '#611e38', '#5a1a2f', '#521727', '#4b1420', '#441018', '#3d0d10', '#360a03'];
var blue_Orange_Yellow_24 = ['#08203b', '#25263b', '#362b3b', '#46313b', '#57373b', '#643e3b', '#71453b', '#7e4d3c', '#8b543c', '#975d3d', '#a3673d', '#ad703e', '#b87a3f', '#c38440', '#cb8f41', '#d59a42', '#dda644', '#e4b146', '#ebbe48', '#f0ca4b', '#f6d64d', '#fae351', '#fdf255', '#ffff59'];
var darkRed_Yellow_24 = ['#320e02', '#3f110a', '#4d1511', '#581b15', '#632119', '#6f291d', '#793121', '#833a25', '#8d4229', '#964c2d', '#a05531', '#a85f35', '#b16939', '#ba743e', '#c17e42', '#c98946', '#d1954a', '#d89f4e', '#dfab52', '#e6b656', '#edc15a', '#f3cd5f', '#f9d963', '#ffe567'];


function insertScale() {
    var scale = document.createElement("img");
    scale.src = "./images/scale.png";
    document.getElementById('ny-slider').appendChild(scale);
}

function insertSlider() {



    d3.select('#slider3').call(
        d3.slider()
          .on("slide", function (evt, value) {
              d3.select('#slider3text').text(function () {
                  var number = (Math.floor(value * 0.12));
                  return d3.time.format("%B")(new Date(2014, number));
              });
          })
        );

    //d3.slider().on("slide", function (evt, value) {
    //    d3.select('#slider3text').text(value);
    //});
}

function insertGraph() {

    // Generate a log-normal distribution with a median of 30 minutes.
    var values = d3.range(1000).map(d3.random.logNormal(Math.log(30), .4));



    // Formatters for counts and times (converting numbers to Dates).
    var formatCount = d3.format(",.0f"),
        //formateDate = d3.time.format("%Y.%m.%d"),
        formatDate = d3.time.format("%b"),
        parseDate = d3.time.format("%Y%m%d").parse,
        formatMonth = function (d) { return formatDate(parseDate('20130719')); };
    //formatDate(parseDate('20130619'));
    //var month = formatMonth(parseDate('20130619'));



    var months = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

    d3.text("./data/monthly/ny_month.csv", function (text) {
        var data = d3.csv.parseRows(text).map(function (row) {
            return row.map(function (value) {
                return +value;
            });
        });
        for (var i = 0; i < data.length; i++) {
            data[i][5] = d3.time.format("%Y%m%d").parse(data[i][5].toString());
            var m = data[i][5].getMonth();
            months[m]++;
        }



        var margin = { top: 50, right: 10, bottom: 50, left: 10 },
            width = 300 - margin.left - margin.right,
            height = 300 - margin.top - margin.bottom;

        var x = d3.scale.linear()
            .domain([0, 120])
            .range([0, width]);

        // Generate a histogram using twenty uniformly-spaced bins.
        var data = d3.layout.histogram()
            .bins(x.ticks(12))
            (values);


        var y = d3.scale.linear()
            .domain([0, d3.max(data, function (d) { return d.y; })])
            .range([height, 0]);

        var xAxis = d3.svg.axis()
            .scale(x)
            .orient("bottom")
            .tickFormat(formatMonth)
            .ticks(6);



        var svg = d3.select("#ny-Graph").append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
        .append("g")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

        var bar = svg.selectAll(".bar")
            .data(data)
        .enter().append("g")
            .attr("class", "bar")
            .attr("transform", function (d) { return "translate(" + x(d.x) + "," + y(d.y) + ")"; });

        bar.append("rect")
            .attr("x", 1)
            .attr("width", x(data[0].dx) - 1)
            .attr("height", function (d) { return height - y(d.y); });

        bar.append("text")
            .attr("dy", ".75em")
            .attr("y", -10)
            .attr("x", x(data[0].dx) / 2)
            .attr("text-anchor", "middle")
            .text(function (d) { return formatCount(d.y); });

        svg.append("g")
            .attr("class", "x axis")
            .attr("transform", "translate(0," + height + ")")
            .call(xAxis);

    });

    console.log(months);
    //for (var i = 0; i < data.length; i++) {

    //}



}

function insertBarGraph() {


    var margin = { top: 10, right: 10, bottom: 20, left: 10 },
      width = document.getElementById('ny-Graph').offsetWidth - margin.left - margin.right,
      height = 150 - margin.top - margin.bottom;


    var y = d3.scale.linear()
        .range([height, 0]);

    var chart = d3.select(".bar")
        .attr("width", width)
        .attr("height", height);
    var x = d3.scale.linear()
        .domain([0, 120])
        .range([0, width]);

    var xAxis = d3.svg.axis()
      .scale(x)
      .orient("bottom")
      .ticks(6);

    ;



    //d3.text("./data/monthly/ny_month.csv", function (text) {
    //    var data = d3.csv.parseRows(text).map(function (row) {
    //        return row.map(function (value) {
    //            return +value;
    //        });
    //    });
    //    for (var i = 0; i < data.length; i++) {
    //        data[i][5] = d3.time.format("%Y%m%d").parse(data[i][5].toString());
    //        var m = data[i][5].getMonth();
    //        months[m]++;
    //    }
    var data = [2018, 1285, 1089, 6588, 6347, 5154, 2691, 3031, 987, 671, 573, 5181];


    y.domain([0, d3.max(data, function (d) { return d; })]);

    var barWidth = width / data.length;

    var bar = chart.selectAll("g")
        .data(data)
      .enter().append("g")
        .attr("transform", function (d, i) { return "translate(" + i * barWidth + ",0)"; });

    bar.append("rect")
        .attr("y", function (d) { return y(d); })
        .attr("height", function (d) { return height - y(d); })
        .attr("width", barWidth - 1);

    bar.append("text")
        .attr("x", barWidth / 2)
        .attr("y", function (d) { return y(d) + 3; })
        .attr("dy", ".75em")
        .text(function (d) { return d; });
    //});


    chart.append("g")
            .attr("class", "x axis")
            .attr("transform", "translate(0," + height + ")")
            .call(xAxis);

    function type(d) {
        d = +d; // coerce to number
        return d;
    }
}