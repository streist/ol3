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
          color: 'rgba(255, 0, 0, 0.3)'
          }),
      stroke:
	new ol.style.Stroke({ 
          color: '#FF0000',
          width:2
         }) 
       });


       $("#button").click(function(e){
            e.preventDefault();
            map.addInteraction(dragBox);
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
	  
      var overlay = new ol.render.FeaturesOverlay({
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
          $("#coordinate_west").val(Math.round(startCoordinate[0]));
          $("#coordinate_nord").val(Math.round(startCoordinate[1]));
          $("#coordinate_ost").val(Math.round(endCoordinate[0]));
          $("#coordinate_sued").val(Math.round(endCoordinate[1]));
       // alert("coordinates: west: "+startCoordinate[0]+", Sued: " + startCoordinate[1]);
	// alert("coordinates: Ost: "+endCoordinate[0]+", Nord: " + endCoordinate[1]);
      	 feature.setGeometry(dragBox.getGeometry());
         overlay.addFeature(feature);
         map.removeInteraction(dragBox);
})

}
