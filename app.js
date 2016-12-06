$(document).ready(function() {
  var state = {
      questions: [
          {
              questionTitle: 'Who won the MLB World Series in 2004?',
              number: 1,
              answer: 2, // index of the multiple_choice array
              multiple_choice: ['Giants', 'Yankees', 'Red Sox', 'Dodgers']
          }, {
              questionTitle: 'What women\'s tennis player holds the world record for most grandslam championships?',
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
              multiple_choice: ['150', '213', '370', '186']
          }
      ],
      runningScore: 0,
      correctMessage: 'Correct!',
      incorrectMessage: 'Incorrect :(',
      originalStateHTML: ''
  }
  // let's keep track of the original state to reset later!
  var originalStateHTML = $('.js-question-box').clone();
  state.originalStateHTML = originalStateHTML;

  function renderHTML(state, questionIndex, islastQuestion, startOver) {
    var score = state.runningScore;
    var totalQuestions = state.questions.length;
    var html;

    if (startOver) {
      html = state.originalStateHTML;
      $('.js-question-box').replaceWith(html);
      return false;
    } else if (islastQuestion) {
      html = '<div class="js-final-view-box"> \
                <h2>Overall Score</h2> \
                  <p>You answered ' + score + ' out of ' + totalQuestions + ' correct!</p> \
                <div class="buttons"> \
                  <button class="restart button">Try Again</button> \
                </div> \
              </div>'
    } else {
      var question = state.questions[questionIndex];  // state.questions[0] =>
      var multipleChoices = question.multiple_choice;
      var title = question.questionTitle;
      var questionNumber = state.questions.indexOf(question);
      var answer = question.answer;
      var inputs = multipleChoices.map(function(choice) {
          return '<input type="radio" class="user_input" name="question" value="' + choice + '">&nbsp' + choice + '<br />';
      });

      html = '<div class="score-info"> \
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
    }
    $('.js-question-box').html(html);
  }

  function checkAnswer(state, questionNumber, userAnswer) {
    var question = state.questions[questionNumber];
    var answer = question.answer;
    userAnswer = question.multiple_choice.indexOf(userAnswer);
    var message = '';
    if (answer === userAnswer) {
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

  function resetState(state) {
    state.runningScore = 0;
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
        $('.js-submit-answer').toggleClass('hide');
        $('.next').toggleClass('hide');
        renderScore(state);
      }
  });

  $('.js-question-box').on('click', '.next', function(event) {
    event.preventDefault();
    $('.message p').text('');
    var questionsArray = state.questions;
    var currentQuestion = $(this).closest('div.js-question-box').find('span').text();
    var lastQuestionIndex = questionsArray.indexOf(questionsArray[state.questions.length - 1]);
    if (currentQuestion < lastQuestionIndex) {
      currentQuestion++;
      renderHTML(state, currentQuestion, false, false);
    } else {
      currentQuestion = 0;
      renderHTML(state, currentQuestion, true, false);
    }
  });

  $('.js-question-box').on('click', '.restart', function(event) {
    resetState(state);
    renderHTML(state, 0, false, true);
  });

})
