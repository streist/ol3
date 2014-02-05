window.init = function() {

      var layer = ga.layer.create('ch.swisstopo.pixelkarte-farbe');
      var map = new ga.Map({
        target: 'map',
        layers: [layer],
        view: new ol.View2D({
          resolution: 500,
          center: [670000, 160000]
        })
      });


    var defaultStyle =  new ol.style.Style({
      fill: new ol.style.Fill({
          color: 'rgba(255, 0, 0, 0.5)'
          }),
     stroke:
	new ol.style.Stroke({ 
          color: '#FF0000',
          width: 3
         }) 
       });
     
       var dragBox = new ol.interaction.DragBox({
        style: defaultStyle
      });
	  
      map.addInteraction(dragBox);
	  
	  var feature = new ol.Feature();
	  
      var overlay = new ol.render.FeaturesOverlay({
        map: map,
        styleFunction: function(feature, resolution) {
		  return [defaultStyle];
		}
      });

      dragBox.on('boxstart', function(evt) {
        overlay.getFeatures().clear();
      });

      dragBox.on('boxend', function(evt) {
       var coordinate = evt.getCoordinate();

       var startPoint = new ol.Overlay({
        map: map,
        element: document.getElementById('start-point')
        });
        var finalPoint = new ol.Overlay({
        map: map,
        element: document.getElementById('final-point')
        });



        if (startPoint.getPosition() == undefined) {
     // first click
        startPoint.setPosition(coordinate);
         } else if (finalPoint.getPosition() == undefined) {
    // second click
    finalPoint.setPosition(coordinate);

    // transform the coordinates from the map projection (EPSG:3857)
    // into the server projection (EPSG:4326)
    var startCoord = transform(startPoint.getPosition());
    var finalCoord = transform(finalPoint.getPosition());
    var viewparams = [
      'x1:' + startCoord[0], 'y1:' + startCoord[1],
      'x2:' + finalCoord[0], 'y2:' + finalCoord[1]
    ];
    params.viewparams = viewparams.join(';');

    // we now have the two points, create the result layer and add it to the map
    result = new ol.layer.ImageLayer({
       source: new ol.source.SingleImageWMS({
         url: 'http://localhost:8000/examples/sandbox.html',
         params: params
     })
   });
    map.addLayer(result);
  }

        feature.setGeometry(dragBox.getGeometry());
        overlay.addFeature(feature);
      });

}

