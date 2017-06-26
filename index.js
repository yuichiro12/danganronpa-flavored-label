var label = document.body.appendChild(document.createElement("span"));
label.style.width = "140%";
label.style.height = "0px";
label.style.backgroundColor = "rgba(208, 11, 111, 1)";
label.style.position = "fixed";
label.style.top = "50%";
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
async function slideUp () {
	await setTimeout(()=>{height++;label.style.height = height + "px";}, 30);
}

function showLabel (maxHeight) {
	for (var i = 0; i <= maxHeight; i++) {
		slideUp();
	}
}

var display = false;
async function blink (delay) {
	display = display ? false : true;
	await setTimeout(()=>{content.style.display = display ? "inline" : "none";}, delay);
}

function blinkInnerText (delays) {
	for (var d of delays) {
		blink(d);
	}
}

async function appear () {
	await showLabel(35);
	blinkInnerText([100, 20, 100, 20, 100, 20]);
}

