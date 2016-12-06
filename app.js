$(document).ready(function() {
    var state = {
        questions: [
            {
                questionTitle: 'Who won the World Series in 2004?',
                number: 1,
                answer: 0, // index of the multiple_choice array
                multiple_choice: ['red sox', 'yankees', 'giants', 'dodgers']
            }, {
                questionTitle: 'What women\'s tennis player holds the world record for most grandslam championship',
                number: 2,
                answer: 0,
                multiple_choice: ['Serena Williams', 'Maria Sharapova', 'Venus Williams', 'Martina Hingis']
            }, {
                questionTitle: 'Which NFL team has the most SuperBowl wins',
                number: 3,
                answer: 2,
                multiple_choice: ['Baltimore Ravens', 'New England Patriots', 'Pittsburg Steelers', 'Greenbay Packers']
            }, {
                questionTitle: 'How many innings was played in longest baseball game in MLB history',
                number: 4,
                answer: 2,
                multiple_choice: ['25', '20', '33', '35']
            }
        ],
        user_answer: '',
        runningScore: 0,
        correct_message: 'Correct!',
        incorrect_message: 'Incorrect!'
    }

    function renderHTML(state, question) {
        var startOver = false;
        var question = state.questions[0];
        var multipleChoices = question.multiple_choice;
        var title = question.questionTitle;
        var questionNumber = question.number;
        var answer = question.answer;
        var inputs = multipleChoices.map(function(choice) {
            return '<input type="radio" class="user_input" name="question" value="' + choice + '">&nbsp' + choice + '<br />';
        });
        var html = '<form> <h2>' + title + '</h2>'
        for (var i = 0; i < inputs.length; i++) {
          html += inputs[i];
        }
        html += '<br /> <button class="js-submit-answer button">Submit</button></form>';
        $('.js-question-box').html(html);
    }

    function checkAnswer(state, questionNumber, userAnswer) {
        var question = state.questions[questionNumber];
        var answer = question.answer;
        var message = '';
        if (answer === userAnswer) {
            // update the score
            question.runningScore++;
            message = question.correct_message;
        } else {
            message = questions.incorrect_message;
        }
        return message;
    }

    $('div').on('click', '.start', function(event) {
        renderHTML(state, 1);
    });

    $('.js-question-box').on('click', '.js-submit-answer', function(event) {
        event.preventDefault();
        event.stopPropagation();
        var questionNumber = $(this).closest('div.js-question-box').find('span').text();
        console.log(questionNumber);
        var userAnswer = $(this).closest('div.js-question-box').find('input[name="question-1"]:checked').val();
    })


})
