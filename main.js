// Main

const option1 = document.querySelector('.option1'); //Варианты ответа
const option2 = document.querySelector('.option2');
const option3 = document.querySelector('.option3');
const option4 = document.querySelector('.option4');

const options = document.querySelectorAll('.option'); // Массив вариантов ответа

const question = document.getElementById('question'); // Сам вопрос

const numOfQuestion = document.getElementById('number-of-question'); // Номер вопроса
const numOfAllQuestion = document.getElementById('number-of-all-questions'); // Общее кол-во вопросов
const answerTracker = document.getElementById('answers-tracker'); // Индикатор правильных ответов

let indexOfQuestion; // Индекс тек. вопроса
let indexOfPage = 0; // Индекс страницы
let score = 0; // Итоговый результат викторины

const nextButton = document.getElementById('btn-next');// Кнопка Next

// Modal

const quizModal = document.querySelector('.quiz-over-modal')
const correctAnswer = document.getElementById('correct-answer'); // Кол-во правильных ответов
const numOfAllQuestion2 = document.getElementById('number-of-all-questions-2'); // Общее кол-во вопросов
const tryAgainBtn = document.getElementById('btn-try-again'); // Кнопка "Попробовать снова"
const result = document.getElementById('result')

// Array with question

const questions = [
    {
        question: 'Какое растение едят коалы ?',
        options: ['Эвкалипт','Рис','Яблоко','Бамбук'],
        rightAnswer: 0
    },
    {
        question: 'Саддам Хусейн был президентом:',
        options: ['Ирана','Турции','Ирака','Пакистана'],
        rightAnswer: 2
    },
    {
        question: 'Что называют центром атома ?',
        options: ['Эпицентр','Середина','Ядро','Хаб'],
        rightAnswer: 2
    },
    {
        question: 'Какое животное питается тлями и щитовками ?',
        options: ['Галловый клещ','Божья коровка','Щелкун','Пчела'],
        rightAnswer: 1
    },
    {
        question: 'Какой термин означает коралловый остров в виде кольца ?',
        options: ['Сальп','Атолл','Берма','Бентос'],
        rightAnswer: 1
    },
    {
        question: 'Где говорят на языке Суахили ?',
        options: ['Африка','Европа','Америка','Южная Америка'],
        rightAnswer: 0
    },
    {
        question: 'Какой газ часто используется для нагрева газовых барбекю ?',
        options: ['Аргон','Гелий','Пропан','Метан'],
        rightAnswer: 2
    },
    {
        question: 'Что такое бронхит ?',
        options: ['Грибковая инфекция','Воспаление дыхательных путей','Аллергическая реакция','Бронхогенная карцинома'],
        rightAnswer: 0
    },
    {
        question: 'Как называется раствор соли и воды ?',
        options: ['Меласса','Солод','Брожение','Электролит'],
        rightAnswer: 3
    },
    {
        question: 'Как называется род литературы, предназначенный для игры на сцене ?',
        options: ['Сонет','Пастель','Драма','Роман'],
        rightAnswer: 2
    },
];

numOfAllQuestion.innerHTML = questions.length;

const load = () => {
    question.innerHTML = questions[indexOfQuestion].question;

    option1.innerHTML = questions[indexOfQuestion].options[0];
    option2.innerHTML = questions[indexOfQuestion].options[1];
    option3.innerHTML = questions[indexOfQuestion].options[2];
    option4.innerHTML = questions[indexOfQuestion].options[3];

    numOfQuestion.innerHTML = indexOfPage + 1;
    indexOfPage++;
};

let completedAnswers = [];

const randomQuestion = () => {
    let randomNum = Math.floor(Math.random() * questions.length);
    let hitDuplicate = false;

    if (indexOfPage === questions.length) {
        quizOver()
    } else {
        if (completedAnswers.length > 0){
            completedAnswers.forEach(item => {
                if (item === randomNum){
                    hitDuplicate = true
                }
            });
            if (hitDuplicate){
                randomQuestion()
            }else {
                indexOfQuestion = randomNum
                load();
            }
        }if (completedAnswers.length === 0){
            indexOfQuestion = randomNum
            load();
        }
    }
    completedAnswers.push(indexOfQuestion);
};

const checkAnswer = el => {
    if (el.target.dataset.id == questions[indexOfQuestion].rightAnswer) {
        el.target.classList.add('correct')
        updateTracker('correct')
        score++
        document.body.style.backgroundColor = '#2f974a'
    }else {
        el.target.classList.add('wrong')
        updateTracker('wrong')
        document.body.style.backgroundColor = '#b13345'
    }
    disableOptions()
};

const disableOptions = () => {
    options.forEach(item => {
        item.classList.add('disabled')
        if (item.dataset.id == questions[indexOfQuestion].rightAnswer) {
            item.classList.add('correct')
        }
    })
};

const enabledOptions = () => {
    options.forEach(item => {
        item.classList.remove('disabled', 'correct', 'wrong')
    })
}

const validation = () => {
    if (!options[0].classList.contains('disabled')){
        alert('Выберите вариант ответа !')
    }else {
        randomQuestion()
        enabledOptions()
    }
    document.body.style.backgroundColor = 'darkcyan'
}

const tracker = () => {
    questions.forEach(() => {
        const div = document.createElement('div')
        answerTracker.appendChild(div)
    })
}

const updateTracker = status => {
    answerTracker.children[indexOfPage - 1].classList.add(`${status}`)
}

for (let option of options) {
    option.addEventListener('click', e => checkAnswer(e))
}

nextButton.addEventListener('click', validation)
tryAgainBtn.addEventListener('click', () => {
    window.location.reload()
})


const quizOver = () => {
    quizModal.classList.add('active')

    if (score == questions.length) {
        result.innerHTML = 'Превосходно, ты гений !'
    }else if (score >= (questions.length / 2)) {
        result.innerHTML = 'Хороший результат, но можно и лучше !'
    }else result.innerHTML = 'Надеялся, что не придется выводить это сообщение'

    correctAnswer.innerHTML = score
    numOfAllQuestion2.innerHTML = questions.length
};

window.addEventListener('load',() => {
    randomQuestion()
    tracker()
});

