
/**
 * Setup
 */
const debugEl = document.getElementById('debug'),
			// Mapping of indexes to icons: start from banana in middle of initial position and then upwards
			iconMap = ["banana", "saptar", "cireasa", "pruna", "portocala", "mosu1", "mosu2", "lamaie", "pepene"],
			// Width of the icons
			icon_width = 79,	
			// Height of one icon in the strip
			icon_height = 79,	
			// Number of icons in the strip
			num_icons = 9,	
			// Max-speed in ms for animating one icon down
			time_per_icon = 100,
			// Holds icon indexes
			indexes = [0, 0, 0];


/** 
 * Roll one reel
 */
const roll = (reel, offset = 0) => {
	// Minimum of 2 + the reel offset rounds
	const delta = (offset + 2) * num_icons + Math.round(Math.random() * num_icons); 
	
	// Return promise so we can wait for all reels to finish
	return new Promise((resolve, reject) => {
		
		const style = getComputedStyle(reel),
					// Current background position
					backgroundPositionY = parseFloat(style["background-position-y"]),
					// Target background position
					targetBackgroundPositionY = backgroundPositionY + delta * icon_height,
					// Normalized background position, for reset
					normTargetBackgroundPositionY = targetBackgroundPositionY%(num_icons * icon_height);
		
		// Delay animation with timeout, for some reason a delay in the animation property causes stutter
		setTimeout(() => { 
			// Set transition properties ==> https://cubic-bezier.com/#.41,-0.01,.63,1.09
			reel.style.transition = `background-position-y ${(8 + 1 * delta) * time_per_icon}ms cubic-bezier(.41,-0.01,.63,1.09)`;
			// Set background position
			reel.style.backgroundPositionY = `${backgroundPositionY + delta * icon_height}px`;
		}, offset * 150);
			
		// After animation
		setTimeout(() => {
			// Reset position, so that it doesn't get higher without limit
			reel.style.transition = `none`;
			reel.style.backgroundPositionY = `${normTargetBackgroundPositionY}px`;
			// Resolve this promise
			resolve(delta%num_icons);
		}, (8 + 1 * delta) * time_per_icon + offset * 150);
		
	});
};


/**
 * Roll all reels, when promise resolves roll again
 */
function playr() {
	var audio = new Audio('sanduw.ogg');
	audio.play();
}
function playw() {
	var audios = new Audio('sugeo.ogg');
	audios.play();
}
function rollAll() {
	
	castig.textContent = '';
	debugEl.textContent = 'A plecat spaga...';
	
	const reelsList = document.querySelectorAll('.slots > .reel');
	playw()
	Promise
		// Activate each reel, must convert NodeList to Array for this with spread operator
		.all( [...reelsList].map((reel, i) => roll(reel, i)) )	
		
		// When all reels done animating (all promises solve)
		.then((deltas) => {
			// add up indexes
			deltas.forEach((delta, i) => indexes[i] = (indexes[i] + delta)%num_icons);
			debugEl.textContent = indexes.map((i) => iconMap[i]).join(' - ');
		
			// Win conditions
			if (indexes[0] == indexes[1] || indexes[1] == indexes[2]) {
				const winCls = indexes[0] == indexes[2] ? "win2" : "win1";
				document.querySelector(".slots").classList.add(winCls);
				if (winCls == "win1"){
					playr()
					document.querySelector(".spaga").classList.add("mosu");
					balanta.textContent =+ balanta.textContent + betcurrent.textContent * 5;
					const win = betcurrent.textContent * 5;
					castig.textContent = 'Ai castigat '+win+' RON';
				}
				if (winCls == "win2"){
					playr()
					document.querySelector(".spaga").classList.add("mosu");
					balanta.textContent =+ balanta.textContent + betcurrent.textContent * 15;
					const win = betcurrent.textContent * 15;
					castig.textContent = 'Ai castigat '+win+' RON';
				}
				setTimeout(() => document.querySelector(".spaga").classList.remove("mosu"), 6000)
				setTimeout(() => document.querySelector(".slots").classList.remove(winCls), 6000)
			}
		
			// Again!
			// setTimeout(rollAll, 3000);
		});
};

// Kickoff
const castig = document.getElementById('castig')
const betcurrent = document.getElementById('betcurrent')
const balanta = document.getElementById('balanta')
const mosub = document.getElementById('bigg')
betcurrent.textContent = 0;
balanta.textContent = 100;
function invarte1(){
	const bet = 1;
	if (debugEl.textContent == 'A plecat spaga...') {
		end;
	}
	if (mosub.classList.contains("mosu")){
		end;
	}
	if (balanta.textContent >= 1){
		balanta.textContent = balanta.textContent - 1;
		betcurrent.textContent = 1;
		setTimeout(rollAll(), 3000);
	}
	else{
		debugEl.textContent = 'Nu ai suficienti bani!';
	}
};
function invarte2(){
	const bet = 2;
	if (debugEl.textContent == 'A plecat spaga...') {
		end;
	}
	if (mosub.classList.contains("mosu")){
		end;
	}
	if (balanta.textContent >= 2){
		balanta.textContent = balanta.textContent - 2;
		betcurrent.textContent = 2;
		setTimeout(rollAll(), 3000);
	}
	else{
		debugEl.textContent = 'Nu ai suficienti bani!';
	}
};
function invarte5(){
	const bet = 5;
	if (debugEl.textContent == 'A plecat spaga...') {
		end;
	}
	if (mosub.classList.contains("mosu")){
		end;
	}
	if (balanta.textContent >= 5){
		balanta.textContent = balanta.textContent - 5;
		betcurrent.textContent = 5;
		setTimeout(rollAll(), 3000);
	}
	else{
		debugEl.textContent = 'Nu ai suficienti bani!';
	}
};
function invarte10(){
	const bet = 10;
	if (debugEl.textContent == 'A plecat spaga...') {
		end;
	}
	if (mosub.classList.contains("mosu")){
		end;
	}
	if (balanta.textContent >= 10){
		balanta.textContent = balanta.textContent - 10;
		betcurrent.textContent = 10;
		setTimeout(rollAll(), 3000);
	}
	else{
		debugEl.textContent = 'Nu ai suficienti bani!';
	}
};
function invarte25(){
	const bet = 25;
	if (debugEl.textContent == 'A plecat spaga...') {
		end;
	}
	if (mosub.classList.contains("mosu")){
		end;
	}
	if (balanta.textContent >= 25){
		balanta.textContent = balanta.textContent - 25;
		betcurrent.textContent = 25;
		setTimeout(rollAll(), 3000);
	}
	else{
		debugEl.textContent = 'Nu ai suficienti bani!';
	}
};
function invarte50(){
	const bet = 50;
	if (debugEl.textContent == 'A plecat spaga...') {
		end;
	}
	if (mosub.classList.contains("mosu")){
		end;
	}
	if (balanta.textContent >= 50){
		balanta.textContent = balanta.textContent - 50;
		betcurrent.textContent = 50;
		setTimeout(rollAll(), 3000);
	}
	else{
		debugEl.textContent = 'Nu ai suficienti bani!';
	}
};