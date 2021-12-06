const questions = document.querySelector('.questions');

$('.textUpper').keyup(function () {
    this.value = this.value.toUpperCase();
});

$('.textLower').keyup(function () {
    this.value = this.value.toLowerCase().replace(/(?:^|\s)\S/g, value => value.toUpperCase());
});


var gender = '';
var username = '';
var surname = '';
var inputid;
var user_answer1 = '';
var user_answer2 = '';
var user_answer3 = '';
var user_answer4 = '';
var input_ids = [];
var genderchoose = ''

var currentdate = new Date();
var datetime = currentdate.getDate() + "." +
    (currentdate.getMonth() + 1) + "." +
    currentdate.getFullYear();

gndr = () => {
    genderchoose = document.querySelector('input[name = gender]:checked').value;
    var resim = document.getElementById('imageGender');
    if (genderchoose == 'male') {
        resim.src = './images/erkek.png';
    } else {
        resim.src = './images/kadin.png';
    }
}

$('.surveyRegistration').on('submit', function (event) {
    event.preventDefault();
    username = $('#name').val();
    surname = $('#surname').val();
    if (genderchoose == 'male') {
        gender = 'Male'
    } else {
        gender = 'Female'
    }
    const renderPosts = async () => {

        let uri = 'http://localhost:7000/qa'
        var res = await fetch(uri);
        var posts = await res.json();
        let template = '';

        posts.forEach(post => {
            template += `
            <div>
            <p class="textcenter">${post.questions}</p>
            <div class="ml20 di-block w25">
            <input class="ml15" type="radio" name="${post.id}" value="${post.answer1}" required>
            <label for="${post.answer1}">${post.answer1}</label>
            </div>
            <div class="ml20 di-block w25">
            <input class="ml15" type="radio" name="${post.id}" value="${post.answer2}" >
            <label for="${post.answer2}">${post.answer2}</label>
            </div>
            <div class="ml20 di-block w25">
            <input class="ml15" type="radio" name="${post.id}" value="${post.answer3}" >
            <label for="${post.answer3}">${post.answer3}</label>
            </div>
            <div class="ml20 di-block w25">
            <input class="ml15" type="radio" name="${post.id}" value="${post.answer4}" >
            <label for="${post.answer4}">${post.answer4}</label>
            </div>
            </div> 
            <hr>
            `
            inputid = `${post.id}`
            input_ids.push(inputid);

        });
        questions.innerHTML = template;

    }
    $('#firstModal').hide();
    renderPosts();
    $('#secondModal').toggle();

});

$('.survey').on('submit', function (event) {
    event.preventDefault();
    user_answer1 = $("input[name=" + input_ids[0] + "]:checked").val();
    user_answer2 = $("input[name=" + input_ids[1] + "]:checked").val();
    user_answer3 = $("input[name=" + input_ids[2] + "]:checked").val();
    user_answer4 = $("input[name=" + input_ids[3] + "]:checked").val();

    $('#secondModal').hide();
    $('#lastModal').toggle();
});


$('.endSurvey').on('submit', function (event) {
    event.preventDefault();
    createPost();
    $('#lastModal').hide();


});

$('.modal').on('hidden.bs.modal', function () {
    $(this).find('form').trigger('reset');

});

const createPost = async () => {
    const doc = {
        name: username,
        surname: surname,
        gender: gender,
        userAnswer1: user_answer1,
        userAnswer2: user_answer2,
        userAnswer3: user_answer3,
        userAnswer4: user_answer4,
        date: datetime
    }

    await fetch('http://localhost:7000/users', {

        method: 'POST',
        body: JSON.stringify(doc),
        headers: {
            'Content-Type': 'application/json'
        }
    });
}