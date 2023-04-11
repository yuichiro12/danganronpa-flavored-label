export class DanganronpaFlavoredLabel {
	text: string
	labelElement: HTMLElement
	textElement: HTMLElement
	removed: boolean
	blink: Array<number>
	maxHeight: string

	// TODO スクロールのspeedを引数に取れるようにする(負の値でreverse)
	constructor (text: string) {
		this.text = text || "Hello! This is Danganronpa Flavored Label.";
		this.maxHeight = "35px";
		this.removed = false;
		this.labelElement = document.body.appendChild(document.createElement("span"));
		this.labelElement.style.transform = "rotate(7deg)";
		this.labelElement.style.transformOrigin = "top";
		this.labelElement.style.height = "0px";
		this.labelElement.style.width = this.autowidth();
		this.labelElement.style.backgroundColor = "rgba(238, 100, 163, 11)";
		this.labelElement.style.position = "fixed";
		this.labelElement.style.top = (window.innerHeight / 2) + "px";
		this.labelElement.style.bottom = "0px";
		this.labelElement.style.left = (this.isVertical(this.rotateDeg()) ? "0%" : "-10%");
		this.labelElement.style.color = "#fff";
		this.labelElement.style.zIndex = "20000";
		this.labelElement.style.overflow = "hidden";
		this.labelElement.style.boxShadow = "3px 3px rgba(255, 255, 255, .2)";
		window.addEventListener("resize", () => {
			this.labelElement.style.width = this.autowidth();
		});
		window.addEventListener("resize", () => {
			this.labelElement.style.top = (window.innerHeight / 2) + "px";
		});

		this.textElement = document.createElement("p");
		this.textElement.style.position = "absolute";
		this.textElement.style.visibility = "hidden";
		this.textElement.innerText = this.text;
		this.labelElement.appendChild(this.textElement);

		this.blink = [0, 10, 10, 20, 20, 20, 30, 40, 70];
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
		var top = this.labelElement.style.top;
		var left = this.labelElement.style.left;
		var cos = Math.cos(this.rotateDeg());
		var sin = Math.sin(this.rotateDeg());
		var H = this.px2f(this.maxHeight);
		// getComputedStyle returns px value
		var textH = this.px2f(window.getComputedStyle(this.textElement)["height"]);
		this.textElement.style.margin = ((H - textH) / 2) + "px auto";
		this.textElement.style.transform = "translateX(" + this.initX() + "px)";

		return new Promise<void>(async (resolve) => {
			for (var h = 1; h <= H; h++) {
				await (() => {
					return new Promise<void>((resolve) => {
						setTimeout(()=>{
							this.labelElement.style.height = h + "px";
							this.labelElement.style.top = "calc(" + top + " - " + (h * cos) + "px)";
							this.labelElement.style.left = "calc(" + left + " + " + (h * sin) + "px)";
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
		return new Promise<void>(async (resolve) => {
			for (var b of this.blink) {
				await (() => {
					return new Promise<void>((resolve) => {
						setTimeout(()=>{
							visible = visible ? false : true;
							this.textElement.style.visibility = visible ? "visible" : "hidden";
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
		while (this.removed === false) {
			await (() => {
				return new Promise<void>((resolve) => {
					setTimeout(() => {
						x = (x > ((this.labelWidth() / 1.2) + (this.textWidth() / 2))) ? ((this.labelWidth() / 12) - this.textWidth()) : (x + 1);
						this.textElement.style.transform = "translateX(" + x + "px)";
						resolve();
					}, 50);
				});
			})();
		}
	}

	px2f (style: string) {
		return parseFloat(style.match(/-?\d+(\.\d+)?/)![0]);
	}

	rotateDeg () {
		var deg = Math.PI / 180;
		const rotate = this.labelElement.style.transform.match(/rotate\(-?\d+(\.\d+)?deg\)/);
		return rotate ? (this.px2f(rotate[0]) * deg) : 0;
	}

	isVertical (theta: number) {
		return Math.abs(Math.tan(theta)) > (window.innerHeight / window.innerWidth);
	}

	initX () {
		return (this.labelWidth() - this.textWidth()) / 2;
	}

	labelWidth () {
		return this.px2f(this.labelElement.style.width);
	}

	textWidth () {
		return this.px2f(window.getComputedStyle(this.textElement)["width"]);
	}

	async show () {
		await this.showLabel();
		await this.blinkInnerText();
		this.moveInnerText();
	}


	remove () {
		document.body.removeChild(this.labelElement);
		this.removed = true;
	}
}
