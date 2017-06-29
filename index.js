var label = document.body.appendChild(document.createElement("span"));
label.style.width = "140%";
label.style.height = "0px";
label.style.backgroundColor = "rgba(208, 11, 111, 1)";
label.style.position = "fixed";
label.style.top = "50%";
label.style.bottom = "0%";
label.style.left = "-20%";
label.style.transform = "rotate(7deg)";
label.style.textAlign = "center";
label.style.color = "#fff";
label.style.zIndex = "10";
label.style.lineHeight = "35px";

var content = document.createElement("p");
content.style.display = "none";
content.innerText = "CV: もふ";
label.appendChild(content);


function showLabel (maxHeight) {
	var height = 0;
	return new Promise(async (resolve) => {
		for (var i = 0; i <= maxHeight; i++) {
			await (() => {
				return new Promise((resolve) => {
					setTimeout(()=>{
						height++;
						label.style.height = height + "px";
						resolve();
					}, 25);
				});
			})();
		}
		resolve();
	});
}


function blinkInnerText (delays) {
	var display = false;
	return new Promise(async (resolve) => {
		for (var d of delays) {
			await (() => {
				return new Promise((resolve) => {
					setTimeout(()=>{
						display = display ? false : true;
						content.style.display = display ? "inline" : "none";
						resolve();
					}, d);
				});
			})();
		}
		resolve();
	})
}


var marginLeft = 0;
async function moveInnerText () {
	while (true) {
		await (() => {
			return new Promise((resolve) => {
				setTimeout(() => {
					marginLeft = (marginLeft >= 560) ? -560 : marginLeft + 1;
					content.style.marginLeft = (marginLeft/8) + "%";
					resolve();
				}, 50);
			});
		})();
	}
}


async function appear () {
	await showLabel(35);
	await blinkInnerText([100, 40, 100, 30, 100, 30, 20]);
	moveInnerText();
}


function sleep (ms) {
	return new Promise((resolve) => {
		setTimeout(() => {resolve();}, ms);
	});
}
