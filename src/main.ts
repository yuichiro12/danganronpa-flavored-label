import { DanganronpaFlavoredLabel } from './danganronpa-flavored-label'

window.addEventListener("click", (e) => {
  const label = new DanganronpaFlavoredLabel("Hello, this is danganronpa-flavored-label!!!");
  const rotateDeg = Math.floor(Math.random() * 20) - 10;
  label.labelElement.style.top = e.clientY + "px";
  label.labelElement.style.transform = `rotate(${rotateDeg}deg)`;
  label.show();
})
