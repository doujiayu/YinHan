(function(doc, win) {
	var docEl = doc.documentElement,
		resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize',
		recalc = function() {
			var clientWidth = docEl.clientWidth;
			if(!clientWidth) return;
			if(clientWidth >= 750) {
				docEl.style.fontSize = '25px';
			} else {
				docEl.style.fontSize = 25 * (clientWidth / 750) + 'px';
			}
		};
	if(!doc.addEventListener) return;
	win.addEventListener(resizeEvt, recalc, false);
	doc.addEventListener('DOMContentLoaded', recalc, false);
})(document, window);
/*判断横竖屏*/
var system = {};
var p = navigator.platform;
system.win = p.indexOf("Win") == 0;
system.mac = p.indexOf("Mac") == 0;
system.x11 = (p == "X11") || (p.indexOf("Linux") == 0);
if(system.win || system.mac || system.xll) {
	//电脑访问
	console.log(system.win || system.mac || system.xll);
} else {
	//手机访问
	function reurl() {
		location.reload();
	}
	window.addEventListener("onorientationchange" in window ? "orientationchange" : "resize", function() {
		var bod = document.getElementsByTagName("body")[0];
		var ht = bod.innerHTML;
		if(window.orientation === 180 || window.orientation === 0) {
			bod.innerHTML = ht;
			reurl();
		}
		if(window.orientation === 90 || window.orientation === -90) {
			bod.innerHTML = "<div style='margin-top:20%;'><h1 style='text-align:center;'>请不要横屏查看!</h1></div>";
		}
	}, false);
}
//(function(c, d) {
//	var e = document.documentElement || document.body,
//		a = "orientationchange" in window ? "orientationchange" : "resize",
//		b = function() {
//			var f = e.clientWidth;
//			e.style.fontSize = (f >= 750) ? "100px" : 25 * (f / 750) + "px"
//		};
//	b();
//	c.addEventListener(a, b, false)
//})(window);