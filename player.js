$('.js-audio').each(function (index, el) {
	initAudioPlayer($('.js-audio'), index);
});


function initAudioPlayer(player) {
	let audio = player.find('audio'),
		play = player.find('.play-pause'),
        circle = player.find('#seekbar'),
        getCircle = circle.get(0),
        btn = document.getElementById('btnIcon'),
        totalLength = getCircle.getTotalLength();

	circle.attr({
		'stroke-dasharray': totalLength,
		'stroke-dashoffset': totalLength,
    });

	play.on('click', () => {
		if (audio[0].paused) {
			$('audio').each((index, el) => {
				$('audio')[index].pause();
            });
            btn.classList.remove('gg-play-button');
            btn.classList.add('gg-play-pause');
			audio[0].play();
		} else {
            btn.classList.remove('gg-play-pause');
            btn.classList.add('gg-play-button');
			audio[0].pause();
		}
	});

	audio.on('timeupdate', () => {
		let currentTime = audio[0].currentTime,
			maxduration = audio[0].duration || 295.9578552246094,
            calc = totalLength - (currentTime / maxduration * totalLength);
        circle.attr('stroke-dashoffset', calc);
	});

	audio.on('ended', () => {
        btn.classList.remove('gg-play-pause');
        btn.classList.add('gg-play-button');
		circle.attr('stroke-dashoffset', totalLength);
	});
}

function handleFiles(event) {
	var files = event.target.files;
    $("#audio").attr("src", URL.createObjectURL(files[0]));
    var btn = document.getElementById('btnIcon');
    btn.classList.remove('gg-play-pause');
    btn.classList.add('gg-play-button');
    $("#player")[0].load();
}

document.getElementById("input").addEventListener("change", handleFiles);