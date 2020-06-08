$(function() {
	images = [	// 배열생성
		"img/img01.jpg",
		"img/img02.jpg",
		"img/img03.jpg",
		"img/img04.jpg",
		"img/img05.jpg"
	];
	
	
	var clickCnt = 0;
	
	var $grid = $('.grid').imagesLoaded(function () {
		$grid.masonry({
			columnWidth: 250,	// 정확한 매커니즘을 모르겠다.
			itemSelector: '.grid-item',	// 아이템 설정
			gutter: 10	//좌우 간격 px 설정 상하 간격은 css에서 설정
		});
	});
	
	
	/* 이미지 삭제 버튼 */
	$("#imgDel").click(function() {
		clickCnt = 0;	//클릭을 0으로 초기화
		$(".picture").empty();	// div를 비워라. remove는 태그를 삭제하는 것이고, empty는 태그 내부를 삭제
		$grid.masonry('remove', this).masonry('layout');
	});
	
	
	/* 이미지 추가 버튼 */
	$("#imgAdd").click(function () {
		for (var i=images.length * clickCnt++; i < images.length * clickCnt; i++) {	// 0 ~ 5 반복
			$item = $("<div class='grid-item'><a href='" + images[i % images.length] + "'><img src='" + images[i % images.length] + "'/></div>");
			$(".picture").append($item).masonry('appended', $item);	// 0 ~ 4 5개
		}
		var addImg = (clickCnt - 1) == 0 ? "" : (":gt(" + (images.length * (clickCnt - 1) -1)) + ")";	// gt: great then
		$(".picture > div" + addImg).each(function () {
			var thisImg = $(this);	// 추가
			$(this).imagesLoaded()	// 수정
				.always(function() {
					console.log("always");
				})
				.done(function() {
					console.log("done");
					thisImg.find(".loader").hide();	// 추가
				})
				.fail(function() {
					console.log("fail");
//					thisImg.hide();	// 추가
				})
				.progress(function() {
					console.log("progress");
					thisImg.prepend("<div class='loader'>Loading...</div>");	//추가
				});
		});

		
		/* 제이쿼리 스크립트 */
		$('a').colorbox({rel:'gal'});
	});
	
});