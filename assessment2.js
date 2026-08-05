'use strict';
const userNameInput = document.getElementById('user-name');
const assessmentButton = document.getElementById('assessment');
const resultDivision = document.getElementById('result-area');
const tweetDivision = document.getElementById('tweet-area');

assessmentButton.addEventListener(
  'click',
  function () {
    const userName = userNameInput.value;
     if (userName.length === 0) {
       // 名前が空の時は処理を終了する
       return;
     }

    // 診断結果表示エリアの作成
    resultDivision.innerText = '';
   
    // headerDivision の作成
    const headerDivision = document.createElement('div');
    headerDivision.setAttribute('class', 'card-header text-bg-primary');
    headerDivision.innerText = '診断結果';

    // bodyDivision の作成
    const bodyDivision = document.createElement('div');
    bodyDivision.setAttribute('class', 'card-body');

    const paragraph = document.createElement('p');
    paragraph.setAttribute('class', 'card-text');
    const result = assessment(userName);
    paragraph.innerText = result;
    bodyDivision.appendChild(paragraph);

    // resultDivision に Bootstrap のスタイルを適用する
    resultDivision.setAttribute('class', 'card');

    // headerDivision と bodyDivision を resultDivision に差し込む
    resultDivision.appendChild(headerDivision);
    resultDivision.appendChild(bodyDivision);

    // ツイートエリアの作成
    tweetDivision.innerText = '';
    const anchor = document.createElement('a');
    const hrefValue =
      'https://twitter.com/intent/tweet?button_hashtag=' +
      encodeURIComponent('あなたのいいところ') +
      '&ref_src=twsrc%5Etfw';
    
    anchor.setAttribute('href', hrefValue);
    anchor.setAttribute('class', 'twitter-hashtag-button');
    anchor.setAttribute('data-text', '診断結果の文章');
    anchor.setAttribute('data-text', result);
   
    tweetDivision.appendChild(anchor);


    const script = document.createElement('script');
    script.setAttribute('src', 'https://platform.twitter.com/widgets.js');
    tweetDivision.appendChild(script);
  }
);

userNameInput.addEventListener(
  'keydown',
  (event) => {
    if(event.code === 'Enter') {
      assessmentButton.dispatchEvent(new Event('click'))
    }
  }
)
const answers = [
  '###userName###さんのいいところは声です。###userName###さんの特徴的な声は皆を惹きつけ、心に残ります。',
  '###userName###さんのいいところはまなざしです。###userName###さんに見つめられた人は、気になって仕方がないでしょう。',
  '###userName###さんのいいところは情熱です。###userName###さんの情熱に周りの人は感化されます。',
  '###userName###さんのいいところは厳しさです。###userName###さんの厳しさがものごとをいつも成功に導きます。',
  '###userName###さんのいいところは知識です。博識な###userName###さんを多くの人が頼りにしています。',
  '###userName###さんのいいところはユニークさです。###userName###さんだけのその特徴が皆を楽しくさせます。',
  '###userName###さんのいいところは用心深さです。###userName###さんの洞察に、多くの人が助けられます。',
  '###userName###さんのいいところは見た目です。内側から溢れ出る###userName###さんの良さに皆が気を惹かれます。',
  '###userName###さんのいいところは決断力です。###userName###さんがする決断にいつも助けられる人がいます。',
  '###userName###さんのいいところは思いやりです。###userName###さんに気をかけてもらった多くの人が感謝しています。',
  '###userName###さんのいいところは感受性です。###userName###さんが感じたことに皆が共感し、わかりあうことができます。',
  '###userName###さんのいいところは節度です。強引すぎない###userName###さんの考えに皆が感謝しています。',
  '###userName###さんのいいところは好奇心です。新しいことに向かっていく###userName###さんの心構えが多くの人に魅力的に映ります。',
  '###userName###さんのいいところは気配りです。###userName###さんの配慮が多くの人を救っています。',
  '###userName###さんのいいところはそのすべてです。ありのままの###userName###さん自身がいいところなのです。',
  '###userName###のいいところは自制心です。やばいと思ったときにしっかりと衝動を抑えられる###userName###が皆から評価されています。',
  '###userName###のいいところは優しさです。###userName###の優しい雰囲気や立ち振る舞いに多くの人が癒やされています。'
];

/**
 * 名前の文字列を渡すと診断結果を返す関数
 * @param {string} userName ユーザの名前
 * @return {string} 診断結果
 */
 function assessment(userName) {
  // 全文字のコード番号を取得してそれを足し合わせる
  let sumOfCharCode = 0;
  for (let i = 0; i < userName.length; i++) {
    sumOfCharCode = sumOfCharCode + userName.charCodeAt(i);
  }
 
  // 文字のコード番号の合計を回答の数で割って添字の数値を求める
  const index = sumOfCharCode % answers.length;
  let result = answers[index];
 
  result = result.replaceAll('###userName###', userName);
  return result;
}

// テストを行う関数
function test() {
  console.log('診断結果の文章のテスト');

  //太郎
  console.log('太郎');
  console.assert(
    assessment('太郎') ===
      '太郎のいいところは決断力です。太郎がする決断にいつも助けられる人がいます。',
    '診断結果の文言の特定の部分を名前に置き換える処理が正しくありません。'
  );

  //次郎
  console.log('次郎');
  console.assert(
    assessment('次郎') ===
      '次郎のいいところは自制心です。やばいと思ったときにしっかりと衝動を抑えられる次郎が皆から評価されています。',
    '診断結果の文言の特定の部分を名前に置き換える処理が正しくありません。'
  );

  //花子
  console.log('花子');
  console.assert(
    assessment('花子') ===
      '花子のいいところはまなざしです。花子に見つめられた人は、気になって仕方がないでしょう。',
    '診断結果の文言の特定の部分を名前に置き換える処理が正しくありません。'
  );
  
  console.log('診断結果の文章のテスト終了');

  console.log('同じ名前なら、同じ結果を出力することのテスト');

  console.log('太郎');
  console.assert(
    assessment('太郎') === assessment('太郎'),
    '入力が同じ名前なら同じ診断結果を出力する処理が正しくありません。'
  );

  console.log('次郎');
  console.assert(
    assessment('次郎') === assessment('次郎'),
    '入力が同じ名前なら同じ診断結果を出力する処理が正しくありません。'
  );

  console.log('花子');
  console.assert(
    assessment('花子') === assessment('花子'),
    '入力が同じ名前なら同じ診断結果を出力する処理が正しくありません。'
  );

 console.log('同じ名前なら、同じ結果を出力することのテスト終了');
}

 test();

 let heading = document.getElementById('heading');
 heading.style.transform = 'rotateX(60deg)';
  let degree = 0;
 function rotateHeading() {
   degree = degree + 6; 
   degree = degree % 360;
   if (degree === 90) {
     heading.setAttribute('class', 'back');
   } else if (degree === 270) {
     heading.setAttribute('class', 'face');
   }
   heading.style.transform = 'rotateX(' + degree + 'deg)';
 }
 setInterval(rotateHeading, 20);
