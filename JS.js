angular.module('example', ['ionic'])

.directive('elasticHeader', function($ionicScrollDelegate) {
	return {
		restrict: 'A',
		link: function(scope, scroller, attr) {
			var scrollerHandle = $ionicScrollDelegate.$getByHandle(attr.delegateHandle);
			var header = document.getElementById(attr.elasticHeader);
			var headerHeight = header.clientHeight;
			var translateAmt, scaleAmt, scrollTop, lastScrollTop;
			var ticking = false;
			
			// Definir a origem da transformação para o topo:
			header.style[ionic.CSS.TRANSFORM + 'Origin'] = 'center bottom';
			
			// Atualizar a altura do cabeçalho no redimensionamento:
			window.addEventListener('resize', function() {
				headerHeight = header.clientHeight;
			}, false);

			scroller[0].addEventListener('scroll', requestTick);
			
			function requestTick() {
				if (!ticking) {					
					ionic.requestAnimationFrame(updateElasticHeader);
				}
				ticking = true;
			}
			
			function updateElasticHeader() {
				
				scrollTop = scrollerHandle.getScrollPosition().top;
			
				if (scrollTop >= 0) {
					// Deslocar para cima. O cabeçalho deve diminuir:
					translateAmt = scrollTop / 2;
					scaleAmt = 1;
				} else {
					// Deslocação para baixo. O cabeçalho deve expandir-se:
					translateAmt = 0;
					scaleAmt = -scrollTop / headerHeight + 1;
				}

				// Atualizar o cabeçalho com a nova posição/tamanho:
				header.style[ionic.CSS.TRANSFORM] = 'translate3d(0,'+translateAmt+'px,0) scale('+scaleAmt+','+scaleAmt+')';
				
				ticking = false;
			}
		}
	}
});