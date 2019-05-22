var gameSpeed = 30;
var animationTime = 7;
var sprite = 0;
var floorHeight = 0.45;
var travel = "boat";
var landscape = "plains";
var winter = false;
var moving = true;
var event = -1;
var date = [4, 14, 1804];
var temperature = "Warm";
var health = 50;
var food = 500;
var ammo = 1000;
var distance = 0;
var nextLandmark = 0;
var dayTime = 30;
var dayTick = 0;
var speeds = {"horse": 12, "boat": 11, "walk": 6, "canoe": 13, "fort": 0}
var daysInMonths = {"January": 31, "February": 28, "March": 31, "April": 30, "May": 31, "June": 30, "July": 31, "August": 31, "September": 30, "October": 31, "November": 30, "December": 31};
var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
var eventTimer = 99999;
var selected = 0;
var opt = true;
var chosen = ["Yes", "Greetings Meriwether Lewis and William Clark,", function() {}];
var horses = true;
var timer = 99999;
var started = 0;
var menu = false;

var landmarks = [{
	distance: 60,
	type: "settlement",
	text: "You pass a small village called La Charrette with only a few houses. This is the last white settlement the expedition will see."
},
{
	distance: 140,
	text: "While packing up camp this morning, you notice one of your men talking to a group of Native men. He turns to you and requests permission to go hunting with them. How do you respond?",
	options: [["Yes", "He thanks you and quickly sets off into the wilderness with the Natives. Soon after, he returns with a young deer. The expedition gains 100 pounds of food and loses 5 ammunition.", function() {ammo -= 5; food += 100; moving = true;}], ["No", "Your crew quickly packs up camp and sets out on the barge. There is no time to waste!", function() {moving = true;}]]
},
{
	distance: 320,
	type: "river",
	text: "You have reached Kaw's Point. Here, the Kansas river drains into the Missouri. Thus far, you have been travelling west, but after this location, the Missouri begins to flow almost due north. The number of deer in this area is staggering, and your men easily shoot quite a few. The expedition gains 500 pounds of food and loses 25 ammunition.",
	func: function() {food += 500; ammo -= 25;}
},
{
	distance: 420,
	text: "Sergeant Floyd approaches you this morning with some disappointing news. Earlier today, Private Collins illicitly opened a barrel of whiskey from expedition supplies and became quite inebriated. Additionally, he offered some to Private Hall, who partook despite being aware of its illegality. Should we punish the two of them?",
	options: [["Yes", "Lewis delivers 100 lashes to Private Collins, and 50 lashes to Private Hall. Felony and debauchery will not be tolerated.", function() {moving = true;}], ["No", "There are more important things to focus on than punishing a bit of debaucherous behavior.", function() {moving = true;}]]
},
{
	distance: 530,
	text: "John Ordway, Sergeant of the Guard, found Private Willard asleep at his post while on watch last night. Should he be punished for endangering the expedition?",
	options: [["Yes", "For each of the next four days, Lewis will deliver 100 lashes to Private Willard. Private Willard's actions have endangered the entire crew.", function() {moving = true;}], ["No", "This has been an exhausting expedition so far. It is understandable that one would be tired.", function() {moving = true;}]]
},
{
	distance: 640,
	type: "river",
	text: "You have reached the junction between the Platte River and the Missouri. This is the beginning of Sioux territory. Clark notes that there have been surprisingly few Natives so far, but he expects to find more as we continue. The wildlife has remained plentiful, however. Almost every hunting party sent out today has found success; Private Drewyer alone killed and brought back 6 deer. The expedition gains 600 pounds of food and loses 30 ammunition.",
	func: function() {food += 600; ammo -= 30; eventTimer = 1500;}
},
{
	distance: 800,
	type: "village",
	text: "As Clark predicted, the Native population seems to be much larger now that we have entered Sioux territory. We have stumbled across a large Native village and they wish to celebrate and trade with us. Shall we?",
	options: [["Yes", "It appears that numerous Native tribes live in the area, as we were greeted by many different languages and dialects. They were as fascinated by us as we were by them! We exchanged several small presents with the Natives and attempted to show the goodwill of the American people as Jefferson had imparted to us. The expedition trades away 10 ammunition but gains 200 pounds of food.", function() {food += 200; ammo -= 10; moving = true; eventTimer = 1000;}], ["No", "Our crew seems to distrust the Natives. We could be walking into a trap. It is best to be safe.", function() {moving = true;}]]
},
{
	distance: 950,
	text: "Private Reed, claiming to have been returning to a previous camp to fetch a forgotten knife has been caught attempting to desert! He has been given 500 lashes and is no longer considered a part of the party. Some Sioux tribesmen believed the punishment was too harsh, however Clark explained the customs of our country and they eventually understood."
},
{
	distance: 1070,
	text: "Unfortunately, Sergeant Floyd has passed away. Despite many being sick, so far he is our only death on the expedition. The cause of death appears to be a ruptured appendix."
},
{
	distance: 1155,
	type: "village",
	text: "As we made our campsite last night, a large band of Sioux men approached us. Upon explaining our mission, the Sioux wished to speak and party with us. They were amazed by Lewis's airgun. They also gave us advice on how to best navigate the upcoming waters, as we were soon approaching the Niobara River.",
	func: function() {eventTimer = 1000;}
},
{
	distance: 1300,
	type: "river",
	text: "The river forks again here. This river must be the Niobara River. We will maintain our course on the Missouri. We are perhaps one-quarter to one-third through our journey. Bison are becoming more and more prevalent as we move further into the plains."
},
{
	distance: 1390,
	type: "village",
	text: "A large group of Natives line the banks of the river. They appear to want us to come ashore. What should we do?",
	options: [["Drop the anchor and go ashore", "While we were not attacked, the Natives were not friendly. When we landed, the Natives, wielding bows, grasped our canoes and brought us ashore. For the next four nights, some of their men would sleep in our barge, and dozens stayed on the beach to watch us. They seemed intent on not letting us leave. Luckily, we escaped unharmed. Unfortunately, the Natives stole quite a bit of ammunition.", function() {ammo -= 50; eventTimer = 1000; moving = true;}], ["Ignore their calls and continue", "Our crew still has trepidation about Natives, especially in this number. It would be best if we continued our journey.", function() {moving = true;}]]
},
{
	distance: 1560,
	text: "We have been hearing rumors and mutterances of a mutiny from Private John Newman. Should we take action?",
	options: [["Yes", "A mutiny is too dangerous to ignore. Lewis has issued 75 lashes to Private Newman, and he is to be removed from the permanent party and work as a laborer.", function() {moving = true;}], ["No", "We did not take action against Private Newman, encouraging him to make even bolder actions. Not able to stir up enough mutinous feelings among other crew members, Private Newman has stolen food, weapons, and ammunition, and deserted our expedition. The expedition loses 50 pounds of food and 20 ammunition.", function() {food -= 50; ammo -= 20;moving = true;}]]
},
{
	distance: 1660,
	type: "village",
	text: "The expedition has reached the Native Mandan and Hidatsa villages near the northern border of Jefferson's Louisiana Purchase. Both Lewis and Clark agree that this would be the perfect wintering location. While building Mandan Fort, Lewis and Clark meet and hire Toussaint Charbonneau, a French fur trapper. One of his two wives, the pregnant Sacagawea, agrees to accompany the expedition to the Pacific.",
	func: function() {food += 200; travel = "fort"; dayTime = 6; winter = true; eventTimer = 1000;}
},
{
	distance: 1800,
	type: "river",
	text: "We have reached the Yellowstone River. The Missouri River gets significantly smaller past this point, meaning we must be nearing its origin."
},
{
	distance: 1900,
	text: "Lewis and a crew member successfully hunted a grizzly bear, yielding large amounts of food. The expedition gains 500 pounds of pounds of food and loses 10 ammunition.",
	func: function() {food += 500; ammo -= 10;}
},
{
	distance: 2000,
	text: "We have reached a split in the river. One branch heads north, while the other extends to the south. One of these rivers is the Marias River, while the other is the Missouri. In order to reach the Pacific, we must take the Missouri. What should we do?",
	options: [["Take the north river", "After a few days, as the river begins to thin and even go east, you realize this was the wrong decision. Luckily, the expedition was able to hunt several bison while retracing their steps. The expedition loses 5 days and 20 ammunition but gains 300 pounds of food.", function() {date[1] += 5; food += 300; ammo -= 20, moving = true;}], ["Take the south river", "It doesn't take long for you to realize that this was the correct choice. You also find some nice bison hunting grounds along the way. The expedition gains 300 pounds of food and loses 10 ammunition.", function() {food += 300; ammo -= 10; moving = true;}], ["Scout both sides before making a decision", "After only cursory scouting, you find that the south river is in fact the Missouri. You also discover fertile bison hunting grounds. The expedition loses 2 days and 20 ammunition, but gains 300 pounds of food.", function() {date[1] += 2; food += 300; ammo -= 20, moving = true;}]]
},
{
	distance: 2140,
	text: "You hear the sounds of a waterfall in the distance. As you get closer, you recognize that the sounds must be the Missouri River's Great Falls."
},
{
	distance: 2230,
	text: "After successfully descending the falls, you notice the terrain quickly shifting from plains to mountains. This can only mean one thing. The expedition has finally arrived in the Rockies.",
	func: function() {landscape = "mountains";}
},
{
	distance: 2400,
	text: "At first, the mountains appeared to be an impenetrable wall. As the party continues rowing however, the Missouri enters a large ravine surrounded by cliffs. Clark aptly calls this formation the \"Gates of the Rocky Mountains\"."
},
{
	distance: 2550,
	text: "After passing through the first set of mountains, the Missouri splits into three seperate rivers; we have reached the Three Forks. After some speculation, Lewis and Clark decide to take the Jefferson River, as it appears to run most directly west."
},
{
	distance: 2700,
	text: "The land gradually becomes more barren. Food is becoming scarce, and hunting parties struggle to find anything worth eating. All of a sudden, Sacagawea points out an odd rock formation, calling it Beaverhead Rock. Claiming that formation signifies the summer retreat of her original Shoshone people, Lewis makes a plan to find and contact her people to acquire horses to carry supplies over land."
},
{
	distance: 2850,
	text: "Lewis scouts ahead on foot while the rest of the party remains on the river. When he returns, he claims to have met a band of Shoshone people, and a council of the highest ranking expedition members set out on foot to meet these Shoshone and attempt to barter for horses from them.",
	func: function() {travel = "walk";}
},
{
	distance: 2920,
	text: "Upon arrival, Sacagawea helps translate the Shoshone language for the expedition members. She also discovers that the leader of this band, Cameahwait, is her brother. With her help, Lewis and Clark secure horses for riding and packing in their journey over the Rockies. They also gain the help of a guide to take them through the dangerous mountain passes.",
	func: function() {horses = true; travel = "horse";}
},
{
	distance: 3070,
	text: "The expedition crosses Lemhi Pass, leaving the territory purchased in the Louisiana Purchase and entering Oregon Territory, a hotly disputed land."
},
{
	distance: 3160,
	text: "After successfully crossing the Bitterroot Mountains, the expedition meet a group of Flathead Natives and are able to purchase more horses off of them.",
	func: function() {horses = true; travel = "horse";}
},
{
	distance: 3260,
	text: "Descending from the Rockies into Columbia Valley starving and desperate, the expedition finds bountiful rivers stocked with fish, woodlands full of game, and large numbers of Native tribes eager to trade for their goods. The expedition gains 600 pounds of much needed pounds of food.",
	func: function() {food += 600;}
},
{
	distance: 3400,
	text: "Reaching more rivers, the expedition builds 5 canoes to hopefully navigate these rivers to the Pacific Ocean.",
	func: function() {travel = "canoe";}
},
{
	distance: 3490,
	text: "Clark identifies Mount Hood, cementing the expedition's position on the map. You are on the Columbia River, heading due west. The Pacific is only a few hundred miles away."
},
{
	distance: 3700,
	text: "Finally, the party has reached the Pacific. Lewis and Clark look out at its beauty, and are amazed by how far they've come. Unfortunately, winter is fast approaching, and then you must complete the expedition again, this time in reverse.",
	func: function() {chosen = true; opt = true; moving = false; eventTimer = 99999;}
}];

var canvas = document.getElementById('canvas');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
canvas.style.position = 'absolute';
canvas.style.top = 0;
canvas.style.left = 0;
var context = canvas.getContext('2d');
context.imageSmoothingEnabled = false;

var boat0 = new Image();
boat0.src = 'boat0.png';
var boat1 = new Image();
boat1.src = 'boat1.png';
var boat2 = new Image();
boat2.src = 'boat2.png';
var boat3 = new Image();
boat3.src = 'boat3.png';
var boat = [boat0, boat1, boat2, boat3];
var canoe0 = new Image();
canoe0.src = 'canoe0.png';
var canoe1 = new Image();
canoe1.src = 'canoe1.png';
var canoe2 = new Image();
canoe2.src = 'canoe2.png';
var canoe3 = new Image();
canoe3.src = 'canoe3.png';
var canoe = [canoe0, canoe1, canoe2, canoe3];
var horse0 = new Image();
horse0.src = 'horse0.png';
var horse1 = new Image();
horse1.src = 'horse1.png';
var horse2 = new Image();
horse2.src = 'horse2.png';
var horse3 = new Image();
horse3.src = 'horse3.png';
var horse = [horse0, horse1, horse2, horse3];
var walk0 = new Image();
walk0.src = 'walk0.png';
var walk1 = new Image();
walk1.src = 'walk1.png';
var walk2 = new Image();
walk2.src = 'walk2.png';
var walk3 = new Image();
walk3.src = 'walk3.png';
var walk = [walk0, walk1, walk2, walk3];
var fort0 = new Image();
fort0.src = 'fort0.png';
var fort1 = new Image();
fort1.src = 'fort1.png';
var fort2 = new Image();
fort2.src = 'fort2.png';
var fort = [fort0, fort1, fort2];
var plains = [new Image()];
plains[0].src = 'plains.png';
var mountains = [new Image()];
mountains[0].src = 'mountains.png';
var river = [new Image()];
river[0].src = 'river.png';
var settlement = [new Image()];
settlement[0].src = 'settlement.png';
var village = [new Image()];
village[0].src = 'village.png';
var snowplains = [new Image()];
snowplains[0].src = 'snowplains.png';
var sprites = {
	"boat": boat,
	"canoe": canoe,
	"horse": horse,
	"walk": walk,
	"fort": fort,
	"plains": plains,
	"mountains": mountains,
	"river": river,
	"settlement": settlement,
	"village": village,
	"snowplains": snowplains
}

function render() {
	context.fillStyle = 'rgba(210, 245, 255)';
	context.fillRect(0, 0, canvas.width, canvas.height);

	if (landscape == "plains" && winter) {
		context.drawImage(sprites["snowplains"][0], 0, 0, canvas.width, canvas.height*floorHeight);
	} else {
		context.drawImage(sprites[landscape][0], 0, 0, canvas.width, canvas.height*floorHeight);
	}

	if (landmarks[nextLandmark] && landmarks[nextLandmark].distance - distance <= 70 && landmarks[nextLandmark].type) {
		context.drawImage(sprites[landmarks[nextLandmark].type][0], canvas.width/2.5 - canvas.width/15 - 0.5*canvas.width*((landmarks[nextLandmark].distance - distance)/70), canvas.height*floorHeight-sprites[landmarks[nextLandmark].type][0].height*4, sprites[landmarks[nextLandmark].type][0].width*4, sprites[landmarks[nextLandmark].type][0].height*4);
	}

	context.drawImage(sprites[travel][Math.floor(sprite/animationTime)], canvas.width/2 - sprites[travel][Math.floor(sprite/animationTime)].width*2.5, canvas.height*floorHeight - sprites[travel][Math.floor(sprite/animationTime)].height*4.4 - ((travel == "horse" || travel == "walk" || travel == "fort") ? canvas.height*0.0045 : 0), sprites[travel][Math.floor(sprite/animationTime)].width*5, sprites[travel][Math.floor(sprite/animationTime)].height*5);

	for(var i=floorHeight*canvas.height; i<canvas.height; i+=canvas.height/100) {
		if (travel == "boat" || travel == "canoe") {
			context.fillStyle = 'rgba(' + (111 - 110*((i-floorHeight*canvas.height)/(floorHeight*canvas.height))) + ', ' + (163 - 110*((i-floorHeight*canvas.height)/(floorHeight*canvas.height))) + ', ' + (247 - 100*((i-floorHeight*canvas.height)/(floorHeight*canvas.height))) + ')';
			context.fillRect(0, i, canvas.width, canvas.height/100 + 1);
		} else if (!winter) {
			if (landscape == "plains") {
				context.fillStyle = 'rgba(' + (102 - 60*((i-floorHeight*canvas.height)/(floorHeight*canvas.height))) + ', ' + (153 - 80*((i-floorHeight*canvas.height)/(floorHeight*canvas.height))) + ', 0)';
				context.fillRect(0, i, canvas.width, canvas.height/100 + 1);
			} else if (landscape == "mountains") {
				context.fillStyle = 'rgba(' + (192 - 120*((i-0.58*canvas.height)/(floorHeight*canvas.height))) + ', ' + (162 - 110*((i-0.58*canvas.height)/(floorHeight*canvas.height))) + ', ' + (120 - 100*((i-floorHeight*canvas.height)/(floorHeight*canvas.height))) + ')';
				context.fillRect(0, i, canvas.width, canvas.height/100 + 1);
			}
		} else {
			context.fillStyle = 'rgba(' + (250 - 100*((i-floorHeight*canvas.height)/(floorHeight*canvas.height))) + ', ' + (250 - 100*((i-floorHeight*canvas.height)/(floorHeight*canvas.height))) + ', ' + (250 - 100*((i-floorHeight*canvas.height)/(floorHeight*canvas.height))) + ')';
			context.fillRect(0, i, canvas.width, canvas.height/100 + 1);
		}
	}

	context.fillStyle = 'rgba(0, 0, 0)';
	roundRect(canvas.width/5, canvas.height*floorHeight + canvas.height/15, 3*canvas.width/5, canvas.height*floorHeight - canvas.height/15, 10);

	context.font = (canvas.width + canvas.height)/140 + 'px Arial';
	context.fillStyle = 'rgba(255, 255, 255)';
	context.textAlign = 'left';
	context.fillText("Date: " + months[date[0]] + ' ' + date[1] + ', ' + date[2], canvas.width/5 + canvas.width/100, canvas.height*floorHeight + canvas.height/15 + canvas.height/25);
	context.fillText("Temperature: " + temperature, canvas.width/5 + canvas.width/100, canvas.height*floorHeight + canvas.height/15 + 2*canvas.height/25);
	context.fillText("Food: " + food + " pounds", canvas.width/5 + canvas.width/100, canvas.height*floorHeight + canvas.height/15 + 3*canvas.height/25);
	context.fillText("Ammunition: " + ammo + " rounds", canvas.width/5 + canvas.width/100, canvas.height*floorHeight + canvas.height/15 + 4*canvas.height/25);
	context.fillText("Next Landmark: " + ((landmarks[nextLandmark]) ? landmarks[nextLandmark].distance - distance : 0) + " miles", canvas.width/5 + canvas.width/100, canvas.height*floorHeight + canvas.height/15 + 5*canvas.height/25);
	context.fillText("Distance Travelled: " + distance + " miles", canvas.width/5 + canvas.width/100, canvas.height*floorHeight + canvas.height/15 + 6*canvas.height/25);

	if (eventTimer > 0) {
		if (chosen != null) {
			wrapText(chosen[1], canvas.width/2.2, canvas.height*floorHeight + canvas.height/15 + canvas.height/25, 4*canvas.width/5 - canvas.width/2.2 - canvas.width/100, canvas.width/50);
		} else {
			var y = wrapText(landmarks[event].text, canvas.width/2.2, canvas.height*floorHeight + canvas.height/15 + canvas.height/25, 4*canvas.width/5 - canvas.width/2.2 - canvas.width/100, canvas.width/50);
		}

		if (opt && landmarks[event] && landmarks[event]["options"]) {
			if (!menu) {
				context.textAlign = 'center';
				context.fillText("In option screens, use the arrow keys to change selection and choose using the space bar", canvas.width/2, 0.88*canvas.height);
				context.textAlign = 'left';
			}
			for (var i=0; i<landmarks[event]["options"].length; i++) {
				if (i == selected) {
					context.fillStyle = 'rgba(244, 206, 66)';
				} else {
					context.fillStyle = 'rgba(255, 255, 255)';
				}

				context.fillText(landmarks[event]["options"][i][0], canvas.width/2.2, y + canvas.height/12.5 + i*canvas.height/25);
			}
		}
	}

	if (started < 3) {
		context.fillText("Press Space to Continue", canvas.width/2.2 + (4*canvas.width/5 - canvas.width/2.2 - canvas.width/100)/3.8, 0.88*canvas.height);
	}

	if (nextLandmark > landmarks.length) {
		context.fillText("The End", canvas.width/2.2 + (4*canvas.width/5 - canvas.width/2.2 - canvas.width/100)/2.4, 0.83*canvas.height);
	}
}

function roundRect(x, y, width, height, radius) {
	radius = {tl: radius, tr: radius, br: radius, bl: radius};

	context.beginPath();
	context.moveTo(x + radius.tl, y);
	context.lineTo(x + width - radius.tr, y);
	context.quadraticCurveTo(x + width, y, x + width, y + radius.tr);
	context.lineTo(x + width, y + height - radius.br);
	context.quadraticCurveTo(x + width, y + height, x + width - radius.br, y + height);
	context.lineTo(x + radius.bl, y + height);
	context.quadraticCurveTo(x, y + height, x, y + height - radius.bl);
	context.lineTo(x, y + radius.tl);
	context.quadraticCurveTo(x, y, x + radius.tl, y);
	context.closePath();
	context.fill();
}

function wrapText(text, x, y, maxWidth, textHeight) {
	var words = text.split(' ');
	var line = '';

	for(var n = 0; n < words.length; n++) {
		var testLine = line + words[n] + ' ';
		var metrics = context.measureText(testLine);
		var testWidth = metrics.width;
		if (testWidth > maxWidth && n > 0) {
			context.fillText(line, x, y);
			line = words[n] + ' ';
			y += textHeight;
		}
		else {
			line = testLine;
		}
	}

	context.fillText(line, x, y);

	return y;
}

setInterval(function() {
	canvas = document.getElementById('canvas');
	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;
	context = canvas.getContext('2d');
	context.imageSmoothingEnabled = false;

	if (timer > 0) {
		timer -= 1;
	} else if (timer == 0) {
		timer = -1;
		eventTimer = 0;
		opt = false;
		chosen = null;
	}

	if (!opt) {
		dayTick += 1;
		if (dayTick == dayTime) {
			dayTick = 0;
			date[1] += 1;
			if (date[1] > daysInMonths[months[date[0]]]) {
				date[1] = 1;
				date[0] += 1;
				if (date[0] > 11) {
					date[0] = 0;
					date[2] += 1;
				}
			}

			if (moving) {
				distance += speeds[travel];
			}

			if (!winter && food >= 10) {
				food -= 10;
			} else if (winter && food >= 1) {
				food -= 1;
			} else if (!winter && food < 10) {
				if (horses) {
					if (travel == "horse") {
						travel = "walk";
					}
					horses = false;
					food += 1000;
					opt = true;
					timer = 400;
					eventTimer = 1000;
					chosen = ["Yes", "Your party is out of food. Few things left in your possessions are edible. As starvation mounts, expedition members begin eyeing up the pack horses... Anything looks awfully tasty at this point... After the horses are gone, some men eat candles.", function() {}]
				}
			}

			if (date[0] == 5 && date[1] == 15) {
				temperature = "Hot";
			} else if (date[0] == 7 && date[1] == 1) {
				temperature = "Warm";
			} else if (date[0] == 8 && date[1] == 1) {
				temperature = "Cool";
			} else if (date[0] == 10 && date[1] == 1) {
				temperature = "Cold";
			} else if (date[0] == 2 && date[1] == 1) {
				temperature = "Cool";
			} else if (date[0] == 3 && date[1] == 1) {
				temperature = "Warm";
			}

			if (date[0] == 11 && date[1] == 24 && date[2] == 1804) {
				landmarks[13] = {
					distance: 1660,
					text: "Construction of the fort finally completes and the expedition party moves in for the winter."
				};

				eventTimer = 1000;
			}
			else if (date[0] == 1 && date[1] == 11 && date[2] == 1805) {
				landmarks[13] = {
					distance: 1660,
					text: "Sacagawea gives birth! Its a boy! She names him Jean Baptiste Charbonneau. Clark nicknames him Pompy."
				};

				eventTimer = 300;
			} else if (date[0] == 3 && date[1] == 7 && date[2] == 1805) {
				landmarks[13] = {
					distance: 1660,
					text: "Winter is finally over! As the Missouri River clears of ice, the barge is sent downstream and the expedition continues in boats similar to large canoes. The upcoming river sections are can be narrow and difficult to maneuver with a large ship, and transporting the ship over land is not worth the effort."
				};

				eventTimer = 300;
				winter = false;
				travel = "canoe";
				dayTime = 30;
			}
		}
	}

	if (landmarks[nextLandmark] && landmarks[nextLandmark].distance - distance <= 0) {
		if (landmarks[nextLandmark]["func"]) {
			landmarks[nextLandmark]["func"]();
		}
		eventTimer = 300;
		event += 1;
		if (landmarks[nextLandmark]["options"]) {
			moving = false;
			opt = true;
		}
		nextLandmark += 1;
		chosen = null;
	}

	if (eventTimer > 0 && !opt) {
		eventTimer -= 1;
	} else if (eventTimer == 0) {
		chosen = null;
	}

	sprite = ((moving && started == 3) ? (sprite+1)%(animationTime*sprites[travel].length) : 0);
	render();
}, 1000 / gameSpeed);

document.addEventListener('keydown', function(e) {
	switch (e.keyCode) {
		case 32:
			if (opt && landmarks[event]) {
				opt = false;
				chosen = landmarks[event]["options"][selected];
				chosen[2]();
				selected = 0;
				menu = true;
			}

			if (started == 0) {
				timer = 99999;
				eventTimer = 99999;
				started = 1;
				opt = true;
				moving = false;
				chosen = ["Yes", "       The United States's recent purchase of the Louisiana Territory has granted our great nation significant amounts of uncharted land. Your mission is to chart this land by travelling up the Missouri River and reaching the Pacific Ocean. Along the way, take down all manner of remarkable observation. Additionally, treat any Native entities you encounter along the way in a friendly and conciliatory manner, and satisfy to them that we wish to be but friendly and useful neighbors.", function() {}];
			}
			else if (started == 1) {
				timer = 99999;
				eventTimer = 99999;
				started = 2;
				opt = true;
				moving = false;
				chosen = ["Yes", "       I entrust to you this glorious opportunity. The development of our nation is in your hands. I hope you are sufficiently supplied and ready to begin your journey. You will begin the expedition on your barge in St. Louis, at the mouth of the Missouri River. Good luck.", function() {}];
			} else if (started == 2) {
				opt = false;
				timer = 0;
				eventTimer = 0;
				started = 3;
				chosen = null;
				moving = true;
			}
			break;
		case 65:
		case 87:
		case 37:
		case 38:
			if (opt) {
				selected = (selected-1) % landmarks[event]["options"].length;
			}
			break;
		case 39:
		case 40:
		case 68:
		case 83:
			if (opt) {
				selected = (selected+1) % landmarks[event]["options"].length;
			}
			break;
	}
});