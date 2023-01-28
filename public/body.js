function ball(item, color, x, y) {
  item.style.border = "solid 0.5em #" + color;
  item.style.left = x + "px";
  item.style.top = y + "px";
  document.body.appendChild(item);
  console.log("Fuck you");
}

var item = document.createElement("div");
item.id = "1";
item.style.margin = "0";
item.style.borderRadius = "60px";
item.style.padding = "0.5em";
item.style.background = "#000";
item.textContent = "gg";
item.style.position = "absolute";
