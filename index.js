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

var height = 0;
var id = 0;
function slideUp () {
	return new Promise((resolve) => {
		setTimeout(()=>{
			height++;
			label.style.height = height + "px";
			resolve();
		}, 30);
	});
}

function showLabel (maxHeight) {
	return new Promise(async (resolve) => {
		for (var i = 0; i <= maxHeight; i++) {
			await slideUp();
		}
		resolve();
	});
}

var display = false;
function blink (delay) {
	return new Promise((resolve) => {
		setTimeout(()=>{
			display = display ? false : true;
			content.style.display = display ? "inline" : "none";
			resolve();
		}, delay);
	});
}

function blinkInnerText (delays) {
	return new Promise(async (resolve) => {
		for (var d of delays) {
			await blink(d);
		}
		resolve();
	})
}

async function appear () {
	await showLabel(35);
	await blinkInnerText([100, 20, 100, 20, 100, 20, 20]);
	
}

function sleep (ms) {
	return new Promise((resolve) => {
		setTimeout(() => {resolve();}, ms);
	});
}
