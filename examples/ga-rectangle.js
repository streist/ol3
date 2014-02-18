window.init = function() {
 
      var layer_0 = ga.layer.create('ch.swisstopo.pixelkarte-farbe');
      var layer_1 = ga.layer.create('ch.swisstopo.pixelkarte-farbe-pk25.noscale');
      var layer_2 = ga.layer.create('ch.swisstopo.pixelkarte-farbe-pk50.noscale');
      var layer_3 = ga.layer.create('ch.swisstopo.pixelkarte-farbe-pk100.noscale');
      var layer_4 = ga.layer.create('ch.swisstopo.pixelkarte-farbe-pk200.noscale');
      var layer_5 = ga.layer.create('ch.swisstopo.pixelkarte-farbe-pk500.noscale');

      var layers = [layer_0, layer_1, layer_2, layer_3, layer_4, layer_5];


      var map = new ga.Map({
        target: 'map',
        layers: layers,
        view: new ol.View2D({
          resolution: 500,
          center: [670000, 160000],
          zoom: 2    
        })
   });      

      var setOneLayerVisible = function(layerIndex) {
        for (var i = 0, ii = layers.length; i < ii; i++) {
          var layer = layers[i];
          if (i == layerIndex) {
            layer.setVisible(true);  
          } else {
            layer.setVisible(false);
          }
        }
      } 
      
      // Makes the layer_0 visible
      setOneLayerVisible(0); 
       

      var defaultStyle =  new ol.style.Style({
        fill: new ol.style.Fill({
          color: 'rgba(255, 0, 0, 0.3)'
        }),
        stroke: new ol.style.Stroke({ 
          color: '#FF0000',
          width:2
        }) 
      });


      var dragBox = new ol.interaction.DragBox({
        style: defaultStyle
       });



       $(".coordinate_input").keyup(function(){
         if (dragBox) {
            var north = $("#coordinate_nord")[0].value;
            var east = $("#coordinate_ost")[0].value;
            var south = $("#coordinate_sued")[0].value;
            var west = $("#coordinate_west")[0].value;
            dragBox.getGeometry().setCoordinates(
              [
               [ 
             	 [west,north],[west, south],[east,south],[east,north]
               ]
              ]
		);
         }
       });


      var feature = new ol.Feature();
	  
      var overlay = new ol.FeatureOverlay({
        map: map,
        styleFunction: function(feature, resolution) {
		  return [defaultStyle];
		}
      });

      var starCoordinate = [0,0];
      var endCoordinate = [0,0];

      dragBox.on('boxstart', function(evt) {
        overlay.getFeatures().clear();
	startCoordinate = evt.getCoordinate();
      });
                
      dragBox.on('boxend', function(evt) {
	 endCoordinate = evt.getCoordinate();
          $("#coordinate_west").val(Math.round(startCoordinate[0])).change();
          $("#coordinate_nord").val(Math.round(startCoordinate[1])).change();
          $("#coordinate_ost").val(Math.round(endCoordinate[0])).change();
          $("#coordinate_sued").val(Math.round(endCoordinate[1])).change();
       // alert("coordinates: west: "+startCoordinate[0]+", Sued: " + startCoordinate[1]);
	// alert("coordinates: Ost: "+endCoordinate[0]+", Nord: " + endCoordinate[1]);
      	 feature.setGeometry(dragBox.getGeometry());
         overlay.addFeature(feature);
         $("#map canvas").css("cursor","default");
         map.removeInteraction(dragBox);

      });

      $("#button").click(function(e){
        $("#map canvas").css("cursor","crosshair");
        e.preventDefault();
        map.addInteraction(dragBox);
      });

      $("[name=Kartenlayer]").click(function() {
         setOneLayerVisible(this.value);        
      });
}
