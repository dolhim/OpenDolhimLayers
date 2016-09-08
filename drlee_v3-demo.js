/* 레이어 테이블 생성 */
function setLayerList(layerlist) {
  var table = document.getElementById('layertable');
  table.innerHTML = "<tr><th>ㅁ</th><th>레이어</th><th>opacity</th></tr>";
  layerlist.forEach(function(layer, i) {
    bindInputs(i, layer);
    if (layer instanceof ol.layer.Group) {
      layer.getLayers().forEach(function(sublayer, j) {
        bindInputs(String(i) + String(j), sublayer);
      });
    }
  });
}

function btnaddlayer() {
  var title = document.getElementById('addlayer-title').value;
  var url = document.getElementById('addlayer-url').value;
  var wmsname = document.getElementById('addlayer-name').value;
  var modal = document.getElementById('dlgaddlayer');

  var success = addlayer(title, url, wmsname);

  if (success) {
    modal.style.display = "none";
  }
}

function addlayer(title, url, wmsName) {
  var ok = false;
  var newlayer = new ol.layer.Tile({
    source: new ol.source.TileWMS({
      url: url,
      params: {'LAYERS': wmsName, 'TILED': true},
      serverType: 'geoserver'
    }),
    name: title
  });

  if (newlayer) {
    map.addLayer(newlayer);

    var id = map.getLayers().getLength() - 1;
    bindInputs(id, newlayer);
    ok = true;
  }
  return ok;
}

/* 레이어 속성 연결 */
function bindInputs(id, layer) {
  addRow(id, layer);
  var visibilityInput = $('#visible' + id);
  visibilityInput.on('change', function() {
    layer.setVisible(this.checked);
  });
  visibilityInput.prop('checked', layer.getVisible());
  var opacityInput = $('#opacity' + id);
  opacityInput.on('input change', function() {
    layer.setOpacity(parseFloat(this.value));
  });
  opacityInput.val(String(layer.getOpacity()));
}

function addRow(idx, layer) {
  var table = document.getElementById("layertable");
  var row = table.insertRow(table.rows.length);
  cell0 = row.insertCell(0);
  cell1 = row.insertCell(1);
  cell2 = row.insertCell(2);
  cell0.innerHTML = '<input id="visible' + idx + '" class="visible" type="checkbox"/>';
  cell1.innerHTML = '<td>' + layer.get('name') + '</td>';
  cell2.innerHTML = '<td><input id="opacity' + idx + '" type="range" min="0" max="1" step="0.01"/>';
}

/* 사이드 내비 메뉴 열기 */
function openNav() {
  document.getElementById("leftsidenav").style.width = "250px";
}

/* 사이드 내비 메뉴 닫기 */
function closeNav() {
  document.getElementById("leftsidenav").style.width = "0px";
}

/* 위치로 이동 */
function panTo(location) {
  // pan from
  var pan = ol.animation.pan({
    source: map.getView().getCenter()
  });
  map.beforeRender(pan);
  // pan to
  map.getView().setCenter(location);
}