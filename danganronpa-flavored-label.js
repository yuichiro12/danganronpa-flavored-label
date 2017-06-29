class DanganronpaFlavoredLabel {

	constructor (text, style) {
		this.text = text;
		this.label = document.body.appendChild(document.createElement("span"));

		this.label.style.width = style["width"] || "140%";
		this.label.style.height = style["height"] || "0px";
		this.label.style.backgroundColor = style["backgroundColor"] || "rgba(208, 11, 111, 1)";
		this.label.style.position = style["position"] || "fixed";
		this.label.style.top = style["top"] || "50%";
		this.label.style.bottom = style["bottom"] || "0%";
		this.label.style.left = style["left"] || "-20%";
		this.label.style.transform = style["transform"] || "rotate(7deg)";
		this.label.style.textAlign = style["textAlign"] || "center";
		this.label.style.color = style["color"] || "#fff";
		this.label.style.zIndex = style["zIndex"] || "10";
		this.label.style.lineHeight = style["lineHeight"] || "35px";

		this.content = document.createElement("p");
		this.content.style.display = "none";
		this.content.innerText = this.text;
		this.label.appendChild(this.content);
	}


	showLabel (maxHeight) {
		var height = 0;
		return new Promise(async (resolve) => {
			for (var i = 0; i <= maxHeight; i++) {
				await (() => {
					return new Promise((resolve) => {
						setTimeout(()=>{
							height++;
							this.label.style.height = height + "px";
							resolve();
						}, 25);
					});
				})();
			}
			resolve();
		});
	}


	blinkInnerText (delays) {
		var display = false;
		return new Promise(async (resolve) => {
			for (var d of delays) {
				await (() => {
					return new Promise((resolve) => {
						setTimeout(()=>{
							display = display ? false : true;
							this.content.style.display = display ? "inline" : "none";
							resolve();
						}, d);
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
		await this.showLabel(35);
		// TODO 奇数回でない場合にエラーをraise
		await this.blinkInnerText([100, 40, 100, 30, 100, 30, 20]);
		this.moveInnerText();
	}
}
