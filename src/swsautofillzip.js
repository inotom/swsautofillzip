/**********************************************************************************
  swsautofillzip.js

  file created in 2017/06/17 18:21:08.

  MIT License

  Copyright (c) 2017 iNo (http://www.serendip.ws/)

 *********************************************************************************/

(function(global) {
  'use strict';

  var API_URI = 'http://zipcloud.ibsnet.co.jp/api/search?zipcode=';
  var ZIP_RE  = /^\d{3}-?\d{4}$/;
  var CALLBACK_NAME = 'swsAutofillzipCallback';

  global.addEventListener('DOMContentLoaded', function() {

    // required elements
    var elZipField = document.getElementById('swsautofillzip-zipcode');
    var elSearchButton = document.getElementById('swsautofillzip-search');
    // optional elements
    var elPrefecture = document.getElementById('swsautofillzip-prefecture');
    var elCity = document.getElementById('swsautofillzip-city');
    var elAddress = document.getElementById('swsautofillzip-address');
    var elHalfAddress = document.getElementById('swsautofillzip-half-address');
    var elFullAddress = document.getElementById('swsautofillzip-full-address');
    var elMessage = document.getElementById('swsautofillzip-message');

    /**
     * メッセージ表示要素が存在する場合、メッセージを表示する
     *
     * @param {string} msg メッセージ文字列.
     * @returns {undefined}
     */
    var warn = function(msg) {
      if (elMessage) {
        elMessage.textContent = msg;
      }
    };

    /**
     * 入力要素に値をセットする
     *
     * @param {Element|null} el 入力要素.
     * @param {string} value 入力文字列.
     * @returns {undefined}
     */
    var fillValue = function(el, value) {
      if (el) {
        el.value = value;
      }
    };

    // JSONP のコールバック関数を定義する
    if (!global[CALLBACK_NAME]) {
      global[CALLBACK_NAME] = function(json) {
        warn('');
        if (!json) {
          warn('通信に失敗しました');
          console.error('通信に失敗しました');
          return;
        }
        if (json.status !== 200) {
          warn(json.message);
          console.error(json.message);
          return;
        }
        if (!json.results || json.results.length === 0) {
          warn('郵便番号検索による住所は見つかりませんでした');
          return;
        }
        var result = json.results[0];
        fillValue(elPrefecture, result['address1']);
        fillValue(elCity, result['address2']);
        fillValue(elAddress, result['address3']);
        fillValue(elHalfAddress, result['address2'] + result['address3']);
        fillValue(elFullAddress, result['address1'] + result['address2'] + result['address3']);
      };
    }

    if (elSearchButton && elZipField) {

      elSearchButton.setAttribute('disabled', 'disabled');

      // 郵便番号入力値をチェックする
      // 正しい郵便番号が入力されていた場合、検索ボタンを有効化する
      elZipField.addEventListener('keyup', function() {
        var zipCode = elZipField.value;
        if (zipCode.match(ZIP_RE)) {
          elSearchButton.removeAttribute('disabled');
        } else {
          elSearchButton.setAttribute('disabled', 'disabled');
        }
      }, false);

      elSearchButton.addEventListener('click', function(e) {
        e.preventDefault();
        var zipCode = elZipField.value;
        if (zipCode.match(ZIP_RE)) {
          var elCallbackScript = document.getElementById('swsautofillzip-callback-script');
          if (elCallbackScript) {
            document.body.removeChild(elCallbackScript);
          }
          var script = document.createElement('script');
          script.src = API_URI + zipCode + '&callback=' + CALLBACK_NAME;
          script.id = 'swsautofillzip-callback-script';
          document.body.appendChild(script);
        }
      }, false);
    }
  }, false);
})(this);
