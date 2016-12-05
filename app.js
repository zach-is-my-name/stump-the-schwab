$(document).ready(function() {
  var state = {
    questions: [
      {questionTitle: 'who won the world series in 2004', number: 1, answer: 'bsox', multiple_choice: ['red sox', 'yankees', 'giants', 'dodgers']},
      {questionTitle: 'What women\'s tennis player holds the world record for most grandslam championship', number: 2, answer: 'Serena Williams', multiple_choice: ['Serena Williams', 'Maria Sharapova', 'Venus Williams', 'Martina Hingis']},
      {questionTitle: 'Which NFL team has the most SuperBowl wins', number: 3, answer: 'Pittsburg Steelers', multiple_choice: ['Baltimore Ravens', 'New England Patriots', 'Pittsburg Steelers', 'Greenbay Packers']},
      {questionTitle: 'How many innings was played in longest baseball game in MLB history', number: 4, answer: '33 innings', multiple_choice: ['25', '20', '33', '35']}
  ],
    user_answer: '',
    runningScore: 0,
    correct_message: 'Correct!',
    incorrect_message: 'Incorrect!',
  }

  function renderHTML(state, question) {
    var startOver = false;
    var question = state.questions[0];
    var multipleChoices = question.multiple_choice;
    var title = question.questionTitle;
    var questionNumber = question.number;
    var answer =  question.answer;
    // console.log(question);
    var html = '<form> <h2>' + title + '</h2>' + multipleChoices.map(function(choice) {
      return '<input type="radio" name="question-' + questionNumber + '" value="' + choice + '">' + choice + '<br />'
    });
    html += '<button class="js-submit-answer">Submit</button> </form>';
    console.log(html);
    $('.js-question-box').html(html);
  }

  $('div').on('click', '.start', function(event) {
    event.preventDefault();
    renderHTML(state, 1);

  } )



  // renderHTML(state, '1');


})
