/*
 swipperの画像を設定する。
 画面表示時に一度だけ実行する。
*/
var swiperImageSet = function() {
    $.ajax({
        url: '/message/images',
        type: 'GET',
        // timeout: 10000,  // 単位はミリ秒
        // 送信前
        beforeSend: function(xhr, settings) {
        },
        // 応答後
        complete: function(xhr, textStatus) {
            // ボタンを有効化し、投稿を許可
        },
        
        // 通信成功時の処理
        success: function(images, dataType) {
            // 取得したパラメータに従い画像を表示する
            // 後でIDをDBへ格納する必要があるため、IDもDOMに持たせる
            for (var i = 0; i <= images.length - 1; i++) {
            	$(".swiper-wrapper").append('<div class="swiper-slide"><img style="width:90%;" src="' + images[i].url + '"><input type="hidden" name="messageImage" class="messageImage" value="' + images[i].msimage_id + '"></div>');
            };
            swiperInitialize();
        },
        // 通信失敗時の処理
        error: function(xhr, textStatus, error) {
 	        // 読み込み失敗のステータス表示
 	        alert("miss");
        }
    });
};

/*
 Swiperのinitialize処理。
 画像のDOMを生成し終わってから初期化する必要があるため、
 DOM生成後に呼び出す。
*/
var swiperInitialize = function() {
    var mySwiper = new Swiper('.swiper-container',{
        pagination: '.swiper-pagination',
        nextButton: '.swiper-button-next',
        prevButton: '.swiper-button-prev',
        //Your options here:
        mode:'horizontal',
        initialSlide: 1,
        loop: true
        //etc..
    });  
};

/*
 URLに選択した画像のパラメータを付与する。
*/
var selectImage = function(linkUrl) {
	// Activeな画像を取得
	var activeImageId = $('.swiper-slide-active').children('input').val();
	var param = "msimage_id=" + activeImageId;
	// URLの末尾に選択した画像のパラメータを付与してリンク遷移
	location.href = linkUrl + "?" + encodeURIComponent(param);
};

/*
 URLにメッセージ内容を付与する
*/
var selectNameAndMessage = function(linkUrl) {

	if($("#messageInput").valid()) {
		// 既存のクエリ文字列を取得する
		var query = document.location.search.substring(1);
		// 名前を取得する
		var messageBody = $('#messageBody').val();
		// メッセージ内容を取得する
		var name = $('#name').val();
		// twitteridを取得する
		var twitterid = $('#twitterid').val();

		// 名前とメッセージ内容を結合する
		var param = decodeURIComponent(query) + "&message_body=" + messageBody + "&name=" + name + "&twitterid=" + twitterid;
		// URLの末尾に選択した画像のパラメータを付与してリンク遷移
		location.href = linkUrl + "?" + encodeURIComponent(param);		
	}
};

/*
 メッセージ入力内容の確認表示処理
*/
var getSelectImage = function() {
	// URLからパラメータを取得
	var queryStrings = getQueryString();

	// msimage_idがあれば画像を表示する
	// ajaxでIDに対応する画像を取得して表示
	var msimage = getMsimage(queryStrings['msimage_id']);

	// message_bodyがあれば本文を表示する
	if(queryStrings['message_body']) {
		$("#messagePrev").append(queryStrings['message_body']);
	}
	// nameがあれば名前を表示する
	if(queryStrings['name']) {
		$("#namePrev").append(queryStrings['name']);
	}
};

/*
 メッセージ投稿処理
*/
var sendMessage = function() {
	var messageData = getQueryString();
	$.ajax({
        url: '/message',
        type: 'POST',
        data: messageData,
        // timeout: 10000,  // 単位はミリ秒
        // 送信前
        beforeSend: function(xhr, settings) {
        },
        // 応答後
        complete: function(xhr, textStatus) {
            // ボタンを有効化し、投稿を許可
        },
        // 通信成功時の処理
        success: function(result, dataType) {
            // サンクスページへの遷移
            location.href = "./card_result.html";
        },
        // 通信失敗時の処理
        error: function(xhr, textStatus, error) {
 	        // 読み込み失敗のステータス表示
 	        alert("投稿に失敗しました!");
        }
    });
}


/*---------------------------------------/
                                         /
    Validation                           /
                                         /
----------------------------------------*/

/*
 メッセージ入力内容に関するバリデーション処理
*/
var messageValidate = function() {
	$("#messageInput").validate({
		rules : {
			postname : {
				required: true,
      			minlength: 1,
      			maxlength: 10
			},
			messageBody : {
				required: true,
      			minlength: 1,
      			maxlength: 108
			},
			twitterid : {
				required: false,
      			maxlength: 15
			}
		},
		messages : {
			postname : {
				required: "名前が空白での投稿はできません。",
      			minlength: "名前が空白での投稿はできません。",
      			maxlength: "名前は10文字以内で入力してください。"
			},
			messageBody : {
				required: "メッセージ内容が空白での投稿はできません。",
				minlength: "メッセージ内容が空白での投稿はできません。",
      			maxlength: "メッセージは108文字以内で入力してください。"
			},
			twitterid : {
				maxlength: "TwitterIDは15文字以内で入力してください。"
			}
		},
		errorClass: "msgError",
        errorLabelContainer: "#errorList",
        wrapper: "li",
        onfocusout: false
	});
}


/*---------------------------------------/
                                         /
    Utility                              /
                                         /
----------------------------------------*/

/*
 URLからパラメータを抜き出す処理
*/
var getQueryString = function() {
    if (1 < document.location.search.length) {
        // 最初の1文字 (?記号) を除いた文字列を取得する
        var query = decodeURIComponent(document.location.search).substring(1);
 
        // クエリの区切り記号 (&) で文字列を配列に分割する
        var parameters = query.split('&');
 
        var result = new Object();
        for (var i = 0; i < parameters.length; i++) {
            // パラメータ名とパラメータ値に分割する
            var element = parameters[i].split('=');

            var paramName = decodeURIComponent(element[0]);
            var paramValue = decodeURIComponent(element[1]);

            // パラメータ名をキーとして連想配列に追加する
            result[paramName] = decodeURIComponent(paramValue);
        }
        return result;
    }
    return null;
};

/*
 idに対応するメッセージカード画像を取得する
*/
var getMsimage = function(msimage_id) {
    $.ajax({
        url: '/message/image',
        type: 'GET',
        data: {"msimage_id": msimage_id },
        // timeout: 10000,  // 単位はミリ秒
        // 送信前
        beforeSend: function(xhr, settings) {
        },
        // 応答後
        complete: function(xhr, textStatus) {
            // ボタンを有効化し、投稿を許可
        },
        
        // 通信成功時の処理
        success: function(image, dataType) {
            // 取得したパラメータに従い画像を表示する
           	$(".gallery-cell").append('<img style="width:90%;" src="' + image.url + '"><table class="table' + image.html_layout +' fit' + '"><script>jQuery(".fit").fitText(1.9);</script><tr><td id="messagePrev"></td></tr></table><table class="name_table' + image.html_layout +' fit2' + '"><script>jQuery(".fit2").fitText(1.2);</script><tr><td id="namePrev"></td></tr></table>');
           		// URLからパラメータを取得
			var queryStrings = getQueryString();

			// message_bodyがあれば本文を表示する
			if(queryStrings['message_body']) {
				$("#messagePrev").append(queryStrings['message_body']);
			}
			// nameがあれば名前を表示する
			if(queryStrings['name']) {
				$("#namePrev").append(queryStrings['name']);
			}
        },
        // 通信失敗時の処理
        error: function(xhr, textStatus, error) {
 	        // 読み込み失敗のステータス表示
 	        alert("読み込みに失敗しました!");
        }
    });
};

/*
 HTMLのエスケープ処理
*/
function escapeHtml(str) {
    str = str.replace(/&/g, '&amp;');
    str = str.replace(/</g, '&lt;');
    str = str.replace(/>/g, '&gt;');
    str = str.replace(/"/g, '&quot;');
    str = str.replace(/'/g, '&#39;');
    return str;
}
