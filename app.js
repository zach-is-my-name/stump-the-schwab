$(document).ready(function() {
    var state = {
        questions: [
            {
                questionTitle: 'Who won the World Series in 2004?',
                number: 1,
                answer: 2, // index of the multiple_choice array
                multiple_choice: ['giants', 'yankees', 'red sox', 'dodgers']
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
            }, {
                questionTitle: 'What was the highest-scoring game in NBA history?',
                number: 5,
                answer: 2,
                multiple_choice: [150, 213, 370, 186]
            }
        ],
        runningScore: 0,
        correctMessage: 'Correct!',
        incorrectMessage: 'Incorrect!'
    }

    function renderHTML(state, questionIndex) {
        var startOver = false;
        var question = state.questions[questionIndex];  // state.questions[0] =>
        var multipleChoices = question.multiple_choice;
        var title = question.questionTitle;
        var questionNumber = state.questions.indexOf(question);
        var answer = question.answer;
        var score = state.runningScore;
        var totalQuestions = state.questions.length;
        var inputs = multipleChoices.map(function(choice) {
            return '<input type="radio" class="user_input" name="question" value="' + choice + '">&nbsp' + choice + '<br />';
        });

        var html = '<div class="score-info"> \
                      <p> Score: ' + score + '/' + totalQuestions + '</p> \
                    </div> \
                    <div class="question-info">  \
                      <p> Question ' + (questionNumber + 1) + ' out of ' + totalQuestions + '</p> \
                      <span style="display:none">' + questionNumber + '</span> \
                    </div> <br /> <br />\
                    <form> <h2 class="question-title">' + title + '</h2>'

        for (var i = 0; i < inputs.length; i++) {
            html += inputs[i];
        }
        html += '<br /> <div class="buttons"><button class="js-submit-answer button">Submit</button>&nbsp \
                <button class="next button hide">Next</button> </div>\
                </form>';
        $('.js-question-box').html(html);
    }

    function checkAnswer(state, questionNumber, userAnswer) {
        var question = state.questions[questionNumber];
        var answer = question.multiple_choice[question.answer];
        var message = '';
        if (answer === userAnswer) {
            // update the score
            state.runningScore++;
            message = state.correctMessage;
        } else {
            message = state.incorrectMessage;
        }
        return message;
    }

    function renderScore(state) {
      var score = state.runningScore;
      var totalQuestions = state.questions.length;
      var html = '<div class="score-info"> \
                    <p> Score: ' + score + '/' + totalQuestions + '</p> \
                  </div>'
      $('.score-info').html(html);
    }

    $('div').on('click', '.start', function(event) {
        renderHTML(state, 0);
    });

    $('.js-question-box').on('click', '.js-submit-answer', function(event) {
        event.preventDefault();
        event.stopPropagation();
        var questionNumber = $(this).closest('div.js-question-box').find('span').text();
        var userAnswer = $(this).closest('div.js-question-box').find('input[name="question"]:checked').val();
        if (!userAnswer) {
          response = 'You must make a selection!';
          $('.message p').text(response);
          return false;
        } else {
          var response = checkAnswer(state, questionNumber, userAnswer);
          $('.message p').text(response);
          $('.js-submit-answer').prop('disabled', true).toggleClass('hide');
          $('.next').toggleClass('hide');
          renderScore(state);
        }
    });

    $('.js-question-box').on('click', '.next', function(event) {
      event.preventDefault();
      var currentQuestion = $(this).closest('div.js-question-box').find('span').text();
      currentQuestion++;
      renderHTML(state, currentQuestion);
    });

})
