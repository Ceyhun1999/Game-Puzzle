$(() => {
    const dataImg = ['spider-man.jpeg', 'Scooby-Doo.png', 'vinni.jpg', 'anime-girls.jpg', 'animals.webp', 'musicGroup.webp', 'cartoonNetwoork.jpeg', 'fishs.webp'];   
    let indexDataImg = 0; 
    let sec = 3;
    
    startGame();
    $('.btn-again').click(() => {
        $('#puzzle').html(` `);
        $('#fake-puzzle').html(` `);
        myTimerFunc();
        $('.timer').fadeIn();
        startGame();
    });
    $('.btn-changeImage').click(() => {
        $('#puzzle').html(` `);
        $('#fake-puzzle').html(` `);
        indexDataImg++;
        if (indexDataImg > dataImg.length -1) indexDataImg = 0;
        myTimerFunc();
        $('.timer').fadeIn();
        startGame();
    });

    myTimerFunc();
    function myTimerFunc() {
        $('.btn-again').attr('disabled', 'disabled');
        $('.btn-changeImage').attr('disabled', 'disabled');
        const myInterval = setInterval(changeTime, 1000)
        function changeTime() {
            sec--;
            if (sec == 0) {
                clearInterval(myInterval);
                $('.timer').fadeOut();
                sec = 3;
                $('.btn-again').removeAttr('disabled');
                $('.btn-changeImage').removeAttr('disabled');
            }
            $('.timer').text(`${sec}`);
        }
    }
       
    function startGame() {
        createPuzzle();
        setTimeout(destroyPuzzle, 3000);
        draggableFunc();
        let numberTruePuzzleİtem = [];
        let numberFalsePuzzleİtem = [];
        let marginLeft = $('#puzzle').get(0).getBoundingClientRect().left;

        function createPuzzle() {
            for (let i = 0; i < 6; i++) {
                for (let j = 0; j < 8; j++) {
                    $('#puzzle').append(`<div id="p${i}${j}" class="puzzle__item"></div>`);   
                    $(`#p${i}${j}`).css({
                        background: `url('img/${dataImg[indexDataImg]}') ${-100 * j}px ${- 100 * i}px`,
                        top: i * 100 +'px',
                        left: j * 100 + 'px',
                    });
                    $('#fake-puzzle').append(`<div id=c${i}${j} class="puzzle__item-fake"></div>`);      
                    $(`#c${i}${j}`).css({ 
                        top: i * 100 +'px',
                        left: j * 100 + 'px', 
                    });
                }
            }
        };

        function destroyPuzzle() {
            for (let i = 0; i < 6; i++) {
                for (let j = 0; j < 8; j++) {
                    $(`#p${i}${j}`)
                    .css({ transform: `rotate(${rand(-20, 20)}deg)` });
                    if ( j < 4) {
                        $(`#p${i}${j}`).animate({
                            top: rand(0, $('body').height() - 100) + 'px',
                            left: rand($('#puzzle').width(), $('body').width() - 100 - marginLeft) + 'px',
                        })
                    } else {
                        $(`#p${i}${j}`).animate({
                            top: rand(0, $('body').height() - 100) + 'px',
                            left:  rand(-100, -marginLeft) + 'px',
                        })
                    }
                }
            }
        };

        function draggableFunc() {
            for (let i = 0; i < 6; i++) {
                for (let j = 0; j < 8; j++) {
                    $(`#p${i}${j}`)
                    .draggable({
                        containment: "body",
                        snap: 'div',
                        start: function() {
                            $(this).css({ transform: `rotate(0)` })
                        },
                        stop: function () {
                            numberFalsePuzzleİtem.length = 0;
                            $(this).css({
                                left: Math.round(($(this).offset().left - marginLeft) / 100) * 100 +'px',
                                top: Math.round(($(this).offset().top) / 100) * 100 + 'px'
                            });
                            for (let i = 0; i < 6; i++) {
                                for (let j = 0; j < 8; j++) {
                                    let xLeft = $(`#p${i}${j}`).offset().left;
                                    let yTop = $(`#p${i}${j}`).offset().top;
                                    if (yTop == $(this).offset().top && xLeft == $(this).offset().left ) {
                                        numberFalsePuzzleİtem.push(true);
                                        if (numberFalsePuzzleİtem.length == 2) {
                                            $(this).animate({
                                                top: rand(0, $('body').height() - 100) + 'px',
                                                left: rand(-100, -marginLeft) + 'px',
                                            }, 1000);
                                        }
                                    }
                                }
                            };
                            checkGameResult();
                        }
                    })
                }
            }
        };

        function checkGameResult() {
            numberTruePuzzleİtem.length = 0;
            for (let i = 0; i < 6; i++) {
                for (let j = 0; j < 8; j++) {
                    let xLeft = $(`#p${i}${j}`).offset().left;
                    let yTop = $(`#p${i}${j}`).offset().top;
                    if (yTop == i * 100 && xLeft == j * 100 + marginLeft) numberTruePuzzleİtem.push(true);
                    if (numberTruePuzzleİtem.length == 48) gameResult();
                }
            }
        };

        function gameResult() {
            $('#puzzle').html(`<div class="result-game"></div>`);
            $('.result-game')
            .html(`<p class="result-game__item">You win</p>`)
            .animate({
                width: '100%',
                height: '100%',
            }, 1000);
            $('.result-game__item').animate({ opacity: '1' }, 1000);
        };

        function rand(min, max) {
            return Math.floor(Math.random() * (max - min + 1) ) + min;
        };
    };
});