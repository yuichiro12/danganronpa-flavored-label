class DanganronpaFlavoredLabel {

	// TODO スクロールのspeedを引数に取れるようにする(負の値でreverse)
	constructor (text = "Hello! This is Danganronpa Flavored Label.",
				 style = {},
				 blink = [0, 10, 10, 20, 20, 20, 30, 40, 70]) {
		this.text = text;
		this.label = document.body.appendChild(document.createElement("span"));
		this.label.removed = false;

		// TODO px以外の単位をpxに変換
		// もしくはcalcで計算できるよう修正
		this.label.style.transform = style["transform"] || "rotate(7deg)";
		this.label.style.transformOrigin = "top";
		this.maxHeight = style["height"] || "35px";
		this.label.style.height = style["initHeight"] || "0px";
		this.label.style.width = style["width"] || this.autowidth();
		// TODO body以外の要素にappendしたときthis.label.parentNodeのリサイズイベントを取って再描画したい
		// widthを%などで指定しているとしぬかも
		// redraw label width when the window is resized.
		window.addEventListener("resize", () => {
			this.label.style.width = this.autowidth();
		});

		this.label.style.backgroundColor = style["backgroundColor"] || "rgba(238, 100, 163, 11)";
		this.label.style.position = style["position"] || "fixed";
		this.label.style.top = style["top"] || (window.innerHeight / 2) + "px";
		if (!style["top"]) {
			window.addEventListener("resize", () => {
				this.label.style.top = (window.innerHeight / 2) + "px";
			});
		}
		this.label.style.bottom = style["bottom"] || "0px";
		this.label.style.left = style["left"] || (this.isVertical(this.rotateDeg()) ? "0%" : "-10%");
		this.label.style.color = style["color"] || "#fff";
		this.label.style.zIndex = style["zIndex"] || "10";
		this.label.style.overflow = "hidden";

		this.content = document.createElement("p");
		this.content.style.position = "absolute";
		this.content.style.visibility = "hidden";
		this.content.innerText = this.text;
		this.label.appendChild(this.content);

		this.blink = blink;
	}

	autowidth () {
		var theta = this.rotateDeg();
		if (this.isVertical(theta)) {
			return (window.innerHeight / Math.abs(Math.sin(theta)) * 1.2) + "px";
		} else {
			return (window.innerWidth / Math.abs(Math.cos(theta)) * 1.2) + "px";
		}
	}

	showLabel () {
		var top = this.label.style.top;
		var left = this.label.style.left;
		var cos = Math.cos(this.rotateDeg());
		var sin = Math.sin(this.rotateDeg());
		var H = this.px2f(this.maxHeight);
		// getComputedStyle returns px value
		var textH = this.px2f(window.getComputedStyle(this.content)["height"]);
		this.content.style.margin = ((H - textH) / 2) + "px auto";
		this.content.style.transform = "translateX(" + this.initX() + "px)";

		return new Promise(async (resolve) => {
			for (var h = 1; h <= H; h++) {
				await (() => {
					return new Promise((resolve) => {
						setTimeout(()=>{
							this.label.style.height = h + "px";
							this.label.style.top = "calc(" + top + " - " + (h * cos) + "px)";
							this.label.style.left = "calc(" + left + " + " + (h * sin) + "px)";
							resolve();
						}, 25);
					});
				})();
			}
			resolve();
		});
	}


	blinkInnerText () {
		var visible = false;
		return new Promise(async (resolve) => {
			for (var b of this.blink) {
				await (() => {
					return new Promise((resolve) => {
						setTimeout(()=>{
							visible = visible ? false : true;
							this.content.style.visibility = visible ? "visible" : "hidden";
							resolve();
						}, b);
					});
				})();
			}
			resolve();
		})
	}


	async moveInnerText () {
		var x = this.initX();
		while (this.label.removed === false) {
			await (() => {
				return new Promise((resolve) => {
					setTimeout(() => {
						x = (x > ((this.labelWidth() / 1.2) + (this.textWidth() / 2))) ? ((this.labelWidth() / 12) - this.textWidth()) : (x + 1);
						this.content.style.transform = "translateX(" + x + "px)";
						resolve();
					}, 50);
				});
			})();
		}
	}

	px2f (style) {
		return parseFloat(style.match(/-?\d+(\.\d+)?/)[0]);
	}

	rotateDeg () {
		var deg = Math.PI / 180;
		var rotate = this.label.style.transform.match(/rotate\(-?\d+(\.\d+)?deg\)/)[0];
		return rotate ? (this.px2f(rotate) * deg) : 0;
	}

	isVertical (theta) {
		return Math.abs(Math.tan(theta)) > (window.innerHeight / window.innerWidth);
	}

	initX () {
		return (this.labelWidth() - this.textWidth()) / 2;
	}

	labelWidth () {
		return this.px2f(this.label.style.width);
	}

	textWidth () {
		return this.px2f(window.getComputedStyle(this.content)["width"]);
	}

	// TODO
	pxie () {
		var unit = String(this.maxHeight.match(/px|pt|em|ex|%/)[0]);
	}


	async show () {
		await this.showLabel();
		await this.blinkInnerText();
		this.moveInnerText();
	}


	remove () {
		document.body.removeChild(this.label);
		this.label.removed = true;
	}
}
