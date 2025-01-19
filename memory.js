(function() {
	function randOrd(a, b) {
		return (Math.round(Math.random()) - 0.5);
	}
	var tile = new Array();
	for (var i = 0; i < 18; i++) {
		tile[i] = '<div class="cf' + Math.ceil((i + 1) / 6) + ' card">' + String.fromCharCode((i % 6) + 65) + '<\/div>';
		tile[i + 18] = tile[i];
	}

	function displayBack(i) {
		document.getElementById('t' + i).innerHTML = '<div class="back card"></div>';
		document.getElementById('t' + i).onclick = function() {
			disp(i)
		};
	}
	var ch1, ch2, tmr, tno, tid, cid, cnt;

	function begin() {
		for (var i = 0; i <= 35; i++) displayBack(i);
		if (tid) clearInterval(tid);
		tmr = tno = cnt = 0;
		tile.sort(randOrd);
		cntr();
		tid = setInterval(cntr, 1000);
	}

	function cntr() {
		var min = Math.floor(tmr / 60);
		var sec = tmr % 60;
		mem.cnt.value = min + ':' + (sec < 10 ? '0' : '') + sec;
		tmr++;
	}

	function disp(sel) {
		if (tno > 1) {
			clearTimeout(cid);
			conceal();
		}
		document.getElementById('t' + sel).innerHTML = tile[sel];
		if (tno == 0) ch1 = sel;
		else {
			ch2 = sel;
			cid = setTimeout(conceal, 900);
		}
		tno++;
	}

	function conceal() {
		tno = 0;
		if (tile[ch1] != tile[ch2]) {
			displayBack(ch1);
			displayBack(ch2);
		} else cnt++;
		if (cnt >= 18) clearInterval(tid);
	}

	function createGame(nm) {
        
		var d = document.createElement('div');
		var t = document.createElement('table');
		t.cellpadding = 0;
		t.cellspacing = 0;
		t.borders = 0;
		for (var a = 0; a <= 5; a++) {
			t.insertRow(a);
			for (var b = 0; b <= 5; b++) {
				t.rows[a].insertCell(b);
				t.rows[a].cells[b].className = 'blk';
				t.rows[a].cells[b].id = 't' + ((6 * a) + b);
				t.rows[a].cells[b].align = 'center';
			}
		}
		
		var f = document.createElement('form');
		f.id = 'mem';
		var bt = document.createElement('input');
		bt.type = 'button';
		bt.id = 'cnt';
		bt.value = '0.00';
		bt.onclick = begin;
		
		d.appendChild(f);
        d.appendChild(t);
        f.appendChild(bt);
		document.getElementById(nm).appendChild(d);
	}
	createGame('memory');
	begin();
})();