  
      /* 레이어 속성 연결 */
      function bindInputs(layerid, layer) {
        var visibilityInput = $(layerid + ' input.visible');
        visibilityInput.on('change', function() {
          layer.setVisible(this.checked);
        });
        visibilityInput.prop('checked', layer.getVisible());

        var opacityInput = $(layerid + ' input.opacity');
        opacityInput.on('input change', function() {
          layer.setOpacity(parseFloat(this.value));
        });
        opacityInput.val(String(layer.getOpacity()));
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
      function doPan(location) {
        // pan from
        var pan = ol.animation.pan({
          source: map.getView().getCenter()
        });
        map.beforeRender(pan);
        // pan to
        map.getView().setCenter(location);
      }


