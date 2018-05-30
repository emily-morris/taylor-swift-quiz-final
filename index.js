'use strict';

const quizContent = [
	{
		question: 'What year was Taylor born?',
		answers: {
			a: '1991',
			b: '1989',
			c: '1995',
			d: '2000'
		},
		correctAnswer: 'b'
	},

	{
		question: 'What is Taylor\'s hometown?',
		answers: {
			a: 'Nashville, TN',
			b: 'Dallas, TX',
			c: 'Reading, PA',
			d: 'Albany, NY'
		},
		correctAnswer: 'c'
	},

	{
		question: 'What is the title of Taylor\'s debut single?',
		answers: {
			a: '"Love Story"',
			b: '"Tim McGraw"',
			c: '"You Belong with Me"',
			d: '"Our Song"'
		},
		correctAnswer: 'b'
	},

	{
		question: 'How many Grammy awards has Taylor won?',
		answers: {
			a: '10',
			b: '5',
			c: '1',
			d: '3'
		},
		correctAnswer: 'a'
	},

	{
		question: 'Taylor has famously feuded with this rapper:',
		answers: {
			a: 'Future',
			b: 'Drake',
			c: 'Kanye West',
			d: 'Kendrick Lamar'
		},
		correctAnswer: 'c'
	},

	{
		question: 'Which of these men has Taylor NOT dated?',
		answers: {
			a: 'Jake Gyllenhaal',
			b: 'Ryan Gosling',
			c: 'Tom Hiddleston',
			d: 'Taylor Lautner'
		},
		correctAnswer: 'b'
	},

	{
		question: 'Taylor has modeled for this brand:',
		answers: {
			a: 'Calvin Klein',
			b: 'Abercrombie & Fitch',
			c: 'BCBG',
			d: 'Gap'
		},
		correctAnswer: 'b'
	},

	{
		question: 'Taylor is BFFs with this model:',
		answers: {
			a: 'Taylor Hill',
			b: 'Bella Hadid',
			c: 'Cara Delevingne',
			d: 'Karlie Kloss'
		},
		correctAnswer: 'd'
	},

	{
		question: 'Taylor\'s two photogenic cats are named:',
		answers: {
			a: 'Meredith & Olivia',
			b: 'Itchy & Scratchy',
			c: 'Rowan & Dolly',
			d: 'Tigger & Luna'
		},
		correctAnswer: 'a'
	},

	{
		question: 'Who is NOT a member of the girl squad?',
		answers: {
			a: 'Selena Gomez',
			b: 'Katy Perry',
			c: 'Lorde',
			d: 'Lena Dunham'
		},
		correctAnswer: 'b'
	}
];

const runningFeedback = {
	correct: {
		message: 'Nice job, that\'s correct!'
	},
	incorrect: {
		message: 'Sorry, the correct answer is '
	}
}

const finalFeedback = {
	score: {
		message: 'You answered '
	},
	first: {
		message: 'Your knowledge of Taylor is impressive!'
	},
	second: {
		message: 'Not too bad!'
	},
	third: {
		message: 'You can do better than that!'
	}
}

let currentQuestion = 0;
let runningScore = 0;
let correctAnswer;
let userInput;

function renderQuiz() {
	$('#questionPage').hide();
	$('#feedbackPage').hide();
	$('#resultPage').hide();
	$('header').hide();
}

function getQuestion() {
	let quizItem = quizContent[currentQuestion];
	correctAnswer = quizItem.correctAnswer;
	$('#questionPage').show();
	$('#questionText').text(quizItem.question);
	$('#label1').text(quizItem.answers.a);
	$('#label2').text(quizItem.answers.b);
	$('#label3').text(quizItem.answers.c);
	$('#label4').text(quizItem.answers.d);	
}

function showFeedback(correct) {
	if(correct) {
		$('#questionPage').hide();
		$('#feedbackPage').show();
		$('#feedbackText').text(runningFeedback.correct.message);
		runningScore++;
	}
	else {
		$('#questionPage').hide();
		$('#feedbackPage').show();
		$('#feedbackText').text(runningFeedback.incorrect.message + `${correctAnswer}` + ')');
	}
}

function showResult() {
	$('#questionPage').hide();
	$('#resultPage').show();
	$('#finalScoreText').text(finalFeedback.score.message + `${runningScore}` + ' question(s) correctly!');
	if(runningScore < 5) {
		$('#resultMessage').text(finalFeedback.third.message);
	}
	else if(runningScore < 8) {
		$('#resultMessage').text(finalFeedback.second.message);
	}
	else {
		$('#resultMessage').text(finalFeedback.first.message);
	}
}

function startQuiz() {
	$('#startButton').click( function () {
		$('#startPage').hide();
		$('header').show();
		getQuestion();
		$('#questionCount').text(currentQuestion + 1);
	});
}

function submitAnswer() {
	$('input').click( function(event) {
			userInput = event.target.value;
		});
	$('#submitButton').click( function() {
		$('header').show();
		currentQuestion++;
		if(userInput === correctAnswer && currentQuestion < 10) {
			showFeedback(true);
			$('#score').text(runningScore);
		}
		else if(userInput !== correctAnswer && currentQuestion < 10) {
			showFeedback(false);	
		}
		else if (userInput === correctAnswer && currentQuestion === 10) {
			runningScore++;
			showResult();
			$('header').hide();
		}
		else {
			showResult();
			$('header').hide();
		}
	})
}

function getNextQuestion() {
	$('#nextButton').click( function () {
		$('#feedbackPage').hide();
		$('input').prop('checked', false);
		getQuestion();
		$('#questionCount').text(currentQuestion + 1);
	});
}

function restartQuiz() {
	$('#restartButton').click( function() {
		location.reload();
	});
}

function handleQuiz() {
	renderQuiz();
	startQuiz();
	submitAnswer();
	getNextQuestion();
	restartQuiz();
}

$(handleQuiz);