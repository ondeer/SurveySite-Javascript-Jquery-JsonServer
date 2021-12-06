const tableRender = document.querySelector('.userTable');

const renderPosts = async () => {

    let uriUsers = 'http://localhost:7000/users'
    var resUsers = await fetch(uriUsers);
    var postsUsers = await resUsers.json();

    let uriQuestions = 'http://localhost:7000/qa'
    var resQuestions = await fetch(uriQuestions);
    var postsQuestions = await resQuestions.json();

    let template = '';

    /* posts2.forEach(post => {
         template += `
         <th>${post.baslik}</th> 
         `
     });*/

    template += `
        <tr>
        <th>Date</th>
        <th>Name</th> 
        <th>Surname</th>
        <th>Gender</th> 
        <th>${postsQuestions[0].questions}</th>
        <th>${postsQuestions[1].questions}</th>
        <th>${postsQuestions[2].questions}</th>
        <th>${postsQuestions[3].questions}</th>
        </tr>
        `

    postsUsers.forEach(post => {
        template += `
        <tr>
        <td>${post.date}</td>
        <td>${post.name}</td> 
        <td>${post.surname}</td>
        <td>${post.gender}</td> 
        <td>${post.userAnswer1}</td>
        <td>${post.userAnswer2}</td>
        <td>${post.userAnswer3}</td>
        <td>${post.userAnswer4}</td>
        </tr> `
    });

    tableRender.innerHTML = template;

    var chart1 = document.getElementById('myChart1');
    var chart2 = document.getElementById('myChart2');
    var chart3 = document.getElementById('myChart3');
    var chart4 = document.getElementById('myChart4');

    const firstAnswer = [0, 0, 0, 0];
    const secondAnswer = [0, 0, 0, 0];
    const thirdAnswer = [0, 0, 0, 0];
    const fourthAnswer = [0, 0, 0, 0];
    var total = 0;
    var counter = 0;

    postsUsers.forEach(post => {
        //Answer1
        if (post.userAnswer1 == postsQuestions[0].answer1) {
            firstAnswer[0]++;
        } else if (post.userAnswer1 == postsQuestions[0].answer2) {
            firstAnswer[1]++
        } else if (post.userAnswer1 == postsQuestions[0].answer3) {
            firstAnswer[2]++
        } else if (post.userAnswer1 == postsQuestions[0].answer4) {
            firstAnswer[3]++
        }
       
        //Answer2
        if (post.userAnswer2 == postsQuestions[1].answer1) {
            secondAnswer[0]++
        } else if (post.userAnswer2 == postsQuestions[1].answer2) {
            secondAnswer[1]++
        } else if (post.userAnswer2 == postsQuestions[1].answer3) {
            secondAnswer[2]++
        } else if (post.userAnswer2 == postsQuestions[1].answer4) {
            secondAnswer[3]++
        }

        //Answer3
        if (post.userAnswer3 == postsQuestions[2].answer1) {
            thirdAnswer[0]++
        } else if (post.userAnswer3 == postsQuestions[2].answer2) {
            thirdAnswer[1]++
        } else if (post.userAnswer3 == postsQuestions[2].answer3) {
            thirdAnswer[2]++
        } else if (post.userAnswer3 == postsQuestions[2].answer4) {
            thirdAnswer[3]++
        }

        //Answer4
        if (post.userAnswer4 == postsQuestions[3].answer1) {
            fourthAnswer[0]++
        } else if (post.userAnswer4 == postsQuestions[3].answer2) {
            fourthAnswer[1]++
        } else if (post.userAnswer4 == postsQuestions[3].answer3) {
            fourthAnswer[2]++
        } else if (post.userAnswer4 == postsQuestions[3].answer4) {
            fourthAnswer[3]++
        }

    });
    for (counter; counter < 4; counter++) {
        total += Number(firstAnswer[counter]);
    }
    

    for (counter = 0; counter < 4; counter++) {
        firstAnswer[counter] = (firstAnswer[counter] * 100 / total).toFixed(0);
        secondAnswer[counter] = (secondAnswer[counter] * 100 / total).toFixed(0);
        thirdAnswer[counter] = (thirdAnswer[counter] * 100 / total).toFixed(0);
        fourthAnswer[counter] = (fourthAnswer[counter] * 100 / total).toFixed(0);
    }


    window.showHide =  (e) => {
        if (e.value === 'Show Graphically') {
            e.value = 'Hide';
            createChart(chart1.id, postsQuestions[0].questions, postsQuestions[0].answer1, postsQuestions[0].answer2, postsQuestions[0].answer3, postsQuestions[0].answer4, firstAnswer[0], firstAnswer[1], firstAnswer[2], firstAnswer[3]);
            createChart(chart2.id, postsQuestions[1].questions, postsQuestions[1].answer1, postsQuestions[1].answer2, postsQuestions[1].answer3, postsQuestions[1].answer4, secondAnswer[0], secondAnswer[1], secondAnswer[2], secondAnswer[3]);
            createChart(chart3.id, postsQuestions[2].questions, postsQuestions[2].answer1, postsQuestions[2].answer2, postsQuestions[2].answer3, postsQuestions[2].answer4, thirdAnswer[0], thirdAnswer[1], thirdAnswer[2], thirdAnswer[3]);
            createChart(chart4.id, postsQuestions[3].questions, postsQuestions[3].answer1, postsQuestions[3].answer2, postsQuestions[3].answer3, postsQuestions[3].answer4, fourthAnswer[0], fourthAnswer[1], fourthAnswer[2], fourthAnswer[3]);
            chart1.style.display = 'block';
            chart2.style.display = 'block';
            chart3.style.display = 'block';
            chart4.style.display = 'block';
        } else {
            e.value = 'Show Graphically';
            chart1.style.display = 'none';
            chart2.style.display = 'none';
            chart3.style.display = 'none';
            chart4.style.display = 'none';
        }
    }

     createChart = (chartid, ques, a1, a2, a3, a4, ua1, ua2, ua3, ua4) => {  //a-- Answer   ua-userAnswer
        var xValues = [a1, a2, a3, a4];
        var yValues = [ua1, ua2, ua3, ua4];
        var barColors = [
            "#b91d47",
            "#00aba9",
            "#2b5797",
            "#e8c3b9",
        ];
        new Chart(chartid, {
            type: "doughnut",
            data: {
                labels: xValues,
                datasets: [{
                    backgroundColor: barColors,
                    data: yValues
                }]
            },
            options: {
                title: {
                    display: true,
                    text: ques
                }
            }
        });
    }



}
window.addEventListener('DOMContentLoaded', () => renderPosts())