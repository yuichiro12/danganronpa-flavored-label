class DanganronpaFlavoredLabel {

	// TODO スクロールのspeedを引数に取れるようにする
	constructor (text = "Hello! This is Danganronpa Flavored Label.",
				 style = {},
				 blink = [0, 10, 10, 20, 20, 20, 30, 40, 70]) {
		this.text = text;
		this.label = document.body.appendChild(document.createElement("span"));

		this.label.style.transform = style["transform"] || "rotate(7deg)";
		this.maxHeight = style["height"] || "35px";
		this.label.style.height = style["initHeight"] || "0px";
		this.label.style.width = style["width"] || this.autowidth(this.label.style.transform);
		// TODO body以外の要素にappendしたときthis.label.parentNodeのリサイズイベントを取って再描画したい
		// redraw label width when the window is resized.
		window.addEventListener("resize", () => {
			this.label.style.width = this.autowidth(this.label.style.transform);
		});

		this.label.style.backgroundColor = style["backgroundColor"] || "rgba(238, 100, 163, 11)";
		this.label.style.position = style["position"] || "fixed";
		this.label.style.top = style["top"] || "50%";
		this.label.style.bottom = style["bottom"] || "0%";
		this.label.style.left = style["left"] || "-10%";
		this.label.style.textAlign = style["textAlign"] || "center";
		this.label.style.color = style["color"] || "#fff";
		this.label.style.zIndex = style["zIndex"] || "10";

		this.content = document.createElement("p");
		this.content.style.position = "absolute";
		this.content.style.visibility = "hidden";
		this.content.innerText = this.text;
		this.label.appendChild(this.content);

		this.blink = blink;
	}

	autowidth (transform) {
		var deg = Math.PI / 180;
		var rotate = transform.match(/rotate\(-?\d+(\.\d+)?deg\)/)[0];
		var theta = rotate ? (this.px2f(rotate) * deg) : 0;
		if (Math.abs(Math.tan(theta)) > (window.innerHeight / window.innerWidth)) {
			return (window.innerHeight / Math.abs(Math.sin(theta)) * 1.2) + "px";
		} else {
			return (window.innerWidth / Math.abs(Math.cos(theta)) * 1.2) + "px";
		}
	}

	// TODO px以外の単位をpxに直してから計算する
	showLabel () {
		var height = 0;
		var H = this.px2f(this.maxHeight);
		// getComputedStyle returns px value
		var textH = this.px2f(window.getComputedStyle(this.content)["height"]);
		var unit = String(this.maxHeight.match(/px|pt|em|ex|%/)[0]);
		this.content.style.margin = (1 + (H - textH)/2) + unit + " auto";
		this.content.style.transform = "translateX(" + this.initX() + "px)";

		return new Promise(async (resolve) => {
			for (var i = 0; i <= H; i++) {
				await (() => {
					return new Promise((resolve) => {
						setTimeout(()=>{
							// TODO もっと精密にする
							height++;
							this.label.style.height = height + unit;
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
		while (true) {
			await (() => {
				return new Promise((resolve) => {
					setTimeout(() => {
						// TODO
						x = (x >= (this.labelWidth() / 1.2) + (this.textWidth() / 2)) ? ((this.labelWidth() / 6)/2 - this.textWidth()) : (x + 1);
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

	initX () {
		return (this.labelWidth() - this.textWidth()) / 2;
	}

	labelWidth () {
		return this.px2f(this.label.style.width);
	}

	textWidth () {
		return this.px2f(window.getComputedStyle(this.content)["width"]);
	}


	async show () {
		await this.showLabel();
		await this.blinkInnerText();
		this.moveInnerText();
	}


	remove () {
		document.body.removeChild(this.label);
	}
}
