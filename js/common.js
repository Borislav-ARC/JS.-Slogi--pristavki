$(document).ready(function() {

$('#get-result').click(function() {

    var str = $('#main').val();
    var glasnie = 'ауоыиэяюёе';
    var soglasnie = 'бвгджзйклмнпрстфхцчшщ';
    var soglZvon = 'бвгджзйлмнр';
    var soglGluh = 'кпстфхцчшщ';
    var soglShip = 'жшчщ';
    var other = 'ъь';
    var bukvaY = 'й';
    var symbol;
    var pristavki = ['пре', 'при', 'без', 'бес', 'в', 'во', 'воз', 'вос', 'возо', 'вз', 'вс', 'вы', 'до', 'за', 'из', 'ис', 'изо', 'на', 'наи', 'недо', 'над', 'надо', 'не', 'низ', 'нис', 'низо', 'о', 'об', 'об', 'обез', 'обес', 'от', 'ото', 'па', 'пра', 'по', 'под', 'подо', 'пере', 'пред', 'предо', 'про', 'раз', 'рас', 'разо', 'с', 'со', 'су', 'через', 'черес', 'чрез'];

    // Ищем гласные
    var foundGlasnie = [];
    for(i=0;i<str.length;i++) {
        symbol = str.charAt(i);
        if(glasnie.indexOf(symbol) > -1) {
            if(foundGlasnie.indexOf(symbol, 0)) {
                foundGlasnie.push(symbol);
            }}}
    $('.glasnie span').html(foundGlasnie.join(', '));

    //Ищем согласные
    var foundSoglasnie = [];
    for(i=0;i<str.length;i++) {
        symbol = str.charAt(i);
        if(soglasnie.indexOf(symbol) > -1) {
            if(foundSoglasnie.indexOf(symbol, 0)) {
                foundSoglasnie.push(symbol);
            }}}
    $('.soglasnie span').html(foundSoglasnie.join(', '));

    // Ищем количество слов
    var words = str.split(' ');
    if(str != 0) {
        $('.words-count span').html(words.length);
    }


    // Ищем слоги
    var word, current, next, next2, prev, countGlas, foundedSlog;
    var checkedWord = [];

    // Ищем слова более 2 букв
    for(i=0;i<words.length;i++) {
        if(words[i].length > 2) {
            word = words[i];
            countGlas = 0;

            // Ищем в слове кол-во гласных => слогов. Понадобится в дальнейшем для проверки
            for(j=0; j<word.length; j++) {
                if( glasnie.indexOf(word.charAt(j)) > -1 ) {
                    // И сохраняем их в переменную
                    countGlas += 1;
                }}
                foundedSlog = countGlas;

            // На этот раз ищем и разбиваем на слоги
            for(b=0; b<word.length; b++) {
                current = word.charAt(b);
                next = word.charAt(b + 1) || undefined;
                next2 = word.charAt(b + 2) || undefined;
                prev = word.charAt(b-1) || undefined;

               // Проверяем, если это последний символ в слове
                if(next === undefined) {
                    checkedWord.push(current + ' ');
                }
                // Если текущая гласная и следующая гласная
                else if( glasnie.indexOf(current) > -1 && glasnie.indexOf(next) > -1 ) {
                    console.log(next);
                    // Если совпало добавляем в новый массив текущую букву + девис после нее
                    checkedWord.push(current + '-');
                    // отнимаем 1 из найденных слогов
                    foundedSlog -= 1;

                    // Если текущая гласная, след согласная и след опять гласная
                } else if( glasnie.indexOf(current) > -1 && soglasnie.indexOf(next) > -1 && glasnie.indexOf(next2) > -1) {
                    checkedWord.push(current + '-');
                    foundedSlog -= 1;

                    // Если текущая гласная, след согласная глухая, после согласная и это не последний слог
                } else if( glasnie.indexOf(current) > -1 && soglGluh.indexOf(next) > -1 && soglasnie.indexOf(next2) > -1 && foundedSlog > 1) {
                    checkedWord.push(current + '-');
                    foundedSlog -= 1;

                    // Если текущая 'Й', она не первая и не последняя, и это не последний слог
                } else if( bukvaY.indexOf(current) > -1 && current !== word.charAt(0) && current !== word.charAt(word.length - 1) && foundedSlog > 1) {
                    checkedWord.push(current + '-');
                    foundedSlog -= 1;

                    // Если текущая Ь или Ъ, следующая не гласная
                } else if( other.indexOf(current) > -1 && glasnie.indexOf(next) === -1) {
                    checkedWord.push(current + '-');
                    foundedSlog -= 1;

                    // Если текущая согласная звонкая или шипящая, перед ней гласная, следующая не гласная и не Ь или Ъ, и этой не последний слог
                } else if( (soglZvon.indexOf(current) > -1 || soglShip.indexOf(current) > -1)  && glasnie.indexOf(prev) > -1 && glasnie.indexOf(next) === -1 && other.indexOf(next) === -1 && foundedSlog > 1 ) {
                    checkedWord.push(current + '-');
                    foundedSlog -= 1;
                }
                else {
                    checkedWord.push(current);
                }
            }



        }
        else {
            checkedWord.push(words[i] + ' ');
        }
    }
    $('#result').val(checkedWord.join(''));


//    Поиск приставок

  //  Отсеиваем лишние слова
    var wordsPrist = $('#pristavki').val().split(' ');
    var foundPrist = [];
    word = wordsPrist[0];

        // Если слово более 2 символов
        if(word.length > 2) {
            for(p=0; p<pristavki.length; p++) {
                if( word.indexOf(pristavki[p]) === 0) {
                    foundPrist.push(pristavki[p]);

    }}
            $('#result-pristavki').html('Чисто гипотетически в слове <span>' + word + '</span> есть такие приставки: <span>' + foundPrist.join(', ') + '</span>' );
        }
    })
});
