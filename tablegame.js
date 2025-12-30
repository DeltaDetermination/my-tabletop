let p_count = prompt("Введите кол-во игроков");
let stability = 100;
let consumption = 0;
let weightSum = 0;
let actions = ["идея", "хил", "камера", "гайка", "хладагент", "стабилизация", "тех осмотр", "неон"];
let anomalies = [
	{name:"+t",weight:5}, {name:"-t",weight:5}, {name:"0t",weight:5}, 
	{name:"энергия",weight:5}, {name:"картина",weight:4}, {name:"выбывший",weight:2}, 
	{name:"смертостая",weight:4}, {name:"паразит",weight:3}, {name:"крест",weight:3}, 
	{name:"лжекрест",weight:4}, {name:"раш",weight:4}, {name:"пандемониум",weight:4},
	{name:"часы",weight:4}, {name:"аллегория",weight:1}, {name:"мимик",weight:4},
	{name:"аниматроник",weight:3}, {name:"гравитация",weight:5}
];
for(let i = 0; i < anomalies.length; i++) {
	weightSum += anomalies[i].weight;
}
for(let i = 0; i < anomalies.length; i++) {
	anomalies[i].weight = Math.round(anomalies[i].weight / weightSum * 100);
}

function getRandomItem(list) {
  const totalWeight = list.reduce((sum, item) => sum + item.weight, 0);
  let random = Math.random() * totalWeight;
  for (const item of list) {
    if (random < item.weight) {
      return item;
    }
    random -= item.weight;
  }
}

function genCycle() {
	$(".cycle").remove();
	if(stability <= 1) {
		$("#stability").text("Стабильность: 0%");
		alert("! СХЛАПЫВАНИЕ КВАНТОВОГО ПОЛЯ !");
	}
	else {
		$("body").append('<p class="cycle" style="font-weight: bold;">Особые действия:</p>');
		for(let i = 1; i <= p_count; i++) {
			lastActions = [];
			lastActions.push(actions[Math.floor(Math.random() * actions.length)]);
			while(lastActions[0] == lastActions[1] || lastActions[1] == undefined) {
				lastActions[1] = actions[Math.floor(Math.random() * actions.length)]
			}
			$("body").append('<p class="cycle">' + i + ' => ' + lastActions[0] + ' | ' + lastActions[1] + '</p>');
		}
		$("body").append('<p class="cycle" style="background-color: rgb(0, 0, 0);">-</p>');
		$("body").append('<p class="cycle" style="font-weight: bold;">Аномалии:</p>');
		a_count = Math.floor(Math.random() * 4) + 1;
		if(a_count > 1) sa_count = Math.floor(Math.random() * 2) + 1;
		else sa_count = 1;
		for(let i = 0; i < a_count; i++) {
			rand = Math.floor(Math.random() * 1);
			if(sa_count > 0) {
				$("body").append('<p class="cycle">' + getRandomItem(anomalies).name + ' <<</p>');
				sa_count--;
			}
			else $("body").append('<p class="cycle">' + getRandomItem(anomalies).name + '</p>');
		}
		rand = Math.floor(Math.random() * 50)
		if(rand == 0) {
			stability -= 14;
			console.log("ПЕРЕГРЕВ");
		}
		stability -= consumption + 1;
		$("#stability").text("Стабильность: " + stability + "%");
	}
}

function destabilize() {
	if(stability <= 1) {
		$(".cycle").remove();
		$("#stability").text("Стабильность: 0%");
		alert("! СХЛАПЫВАНИЕ КВАНТОВОГО ПОЛЯ !");
	}
	else {
		stability--
		$("#stability").text("Стабильность: " + stability + "%");
	}
}

function conUpdate() {
	consumption++
	$("#consumption").text("Расход: " + consumption);
}

function randDice() {
	result = Math.floor(Math.random() * 6) + 1;
	$("#diceButton").text("Игральная кость: " + result);
}
function randCoin() {
	result = Math.floor(Math.random() * 2);
	if(result == 0) $("#coinButton").text("Шанс 50%: ДА");
	else $("#coinButton").text("Шанс 50%: НЕТ");
}
function randQuarter() {
	result = Math.floor(Math.random() * 4) + 1;
	$("#quarterButton").text("Шанс 1к4: " + result);
}

$("#genButton").click(genCycle);
$("#desButton").click(destabilize);
$("#conButton").click(conUpdate);
$("#diceButton").click(randDice);
$("#coinButton").click(randCoin);
$("#quarterButton").click(randQuarter);