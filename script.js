var artiBpmfs = [];

onArticleChange();
onArtiBpmfChange();

document.querySelector('#文章').addEventListener('keyup', onArticleChange);
document.querySelector('#文章注音').addEventListener('keyup', onArtiBpmfChange);


function onArticleChange(e) {
	var content = document.querySelector('#文章').value;
	
	var node = document.querySelector('article');
	var ps = content.split('\n');

	node.innerHTML = '';

	var index = 0;
	for(var pi=0;pi<ps.length;++pi) {
		var ss = ps[pi].replace(/\s/g,'').split('');
		if(ss.length <= 0) {
			continue;
		}
		
		var pNode = document.createElement('p');
		node.appendChild(pNode);
		for(var si=0;si<ss.length;++si) {
			var sNode = document.createElement('span');
			pNode.appendChild(sNode);
			sNode.textContent = ss[si];
			sNode.index = index++;
			
			sNode.addEventListener('mouseenter', onWordSelect);
			sNode.addEventListener('touchstart', onWordSelect);
		}
	}
	
}
function onArtiBpmfChange(e) {
	var buf = document.querySelector('#文章注音').value.trim().split(/\s+/);
	
	artiBpmfs = [];
	for(var i=0;i<buf.length;++i) {
		var c = buf[i].substr(buf[i].length-1);
		if(c=='ˊ' || c=='ˇ' || c=='ˋ') {
			artiBpmfs.push({
				chara:buf[i].substr(0, buf[i].length-1),
				tone:c,
			});
		}
		else if(buf[i].substr(0, 1) == '˙') {
			artiBpmfs.push({
				chara:buf[i]+'　',
				tone:' ',
			});
		}
		else {
			artiBpmfs.push({
				chara:buf[i],
				tone:' ',
			});
		}
	}
}

function onWordSelect(e) {
	if(artiBpmfs.length <= 0) {
		document.querySelector('#單字注音 .字母').textContent = '';
		document.querySelector('#單字注音 .聲調').textContent = '';
		return;
	}
	
	var bpmf = artiBpmfs[e.target.index % artiBpmfs.length];
	document.querySelector('#單字注音 .字母').textContent = bpmf.chara;
	document.querySelector('#單字注音 .聲調').textContent = bpmf.tone;
}