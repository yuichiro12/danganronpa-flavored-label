class DanganronpaFlavoredLabel {

	// TODO スクロールのspeedを引数に取れるようにする
	constructor (text = "Hello! This is Danganronpa Flavored Label.",
				 style = {},
				 blink = [100, 40, 100, 30, 100, 30, 20]) {
		this.text = text;
		this.label = document.body.appendChild(document.createElement("span"));

		// TODO style["height"]との差分をとる
		this.maxHeight = style["height"] || "35px";
		this.label.style.height = style["initHeight"] || "0px";
		this.label.style.width = style["width"] || "140%";
		this.label.style.backgroundColor = style["backgroundColor"] || "rgba(208, 11, 111, 11)";
		this.label.style.position = style["position"] || "fixed";
		this.label.style.top = style["top"] || "50%";
		this.label.style.bottom = style["bottom"] || "0%";
		this.label.style.left = style["left"] || "-20%";
		this.label.style.transform = style["transform"] || "rotate(7deg)";
		this.label.style.textAlign = style["textAlign"] || "center";
		this.label.style.color = style["color"] || "#fff";
		this.label.style.zIndex = style["zIndex"] || "10";
		this.label.style.lineHeight = style["lineHeight"] || style["height"] || "35px";

		this.content = document.createElement("p");
		this.content.style.display = "none";
		this.content.innerText = this.text;
		this.label.appendChild(this.content);

		// TODO 奇数回でない場合にエラーをraise
		this.blink = blink;
	}


	showLabel () {
		var height = 0;
		var H = parseFloat(this.maxHeight.match(/[0-9]+(\.[0-9]+)?/));
		var unit = String(this.maxHeight.match(/px|pt|em|ex|%/));
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
		var display = false;
		return new Promise(async (resolve) => {
			for (var b of this.blink) {
				await (() => {
					return new Promise((resolve) => {
						setTimeout(()=>{
							display = display ? false : true;
							this.content.style.display = display ? "inline" : "none";
							resolve();
						}, b);
					});
				})();
			}
			resolve();
		})
	}


	async moveInnerText () {
		var marginLeft = 0;
		while (true) {
			await (() => {
				return new Promise((resolve) => {
					setTimeout(() => {
						marginLeft = (marginLeft >= 560) ? -560 : marginLeft + 1;
						this.content.style.marginLeft = (marginLeft/8) + "%";
						resolve();
					}, 50);
				});
			})();
		}
	}


	async show () {
		await this.showLabel();
		await this.blinkInnerText();
		this.moveInnerText();
	}
}
