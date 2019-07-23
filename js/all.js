let dateTime = new Date();
getMovieTime(dateTime, dateTime.getDay());

// 測試日期選項
$('#inputDate').change(function (e) {
    e.preventDefault();
    let jumpToDate = $(this).val();
    if (jumpToDate != '') {
        dateTime = new Date(jumpToDate);
        getMovieTime(dateTime, dateTime.getDay());
    } else {
        dateTime = new Date();
        getMovieTime(dateTime, dateTime.getDay());
    }
});

// 電影日期查詢
$('#dateOp').change(function (e) {
    e.preventDefault();
    let date = $(this).val();
    if (date != '') {
        getMovie(date);
    } else {
        $('aside>.row').html('');
    }
});

// 判斷要顯示幾天
function getMovieTime(date, week) {
    let days;
    switch (week) {
        case 1:
            days = 1;
            break;
        case 2:
            days = 2;
            break;
        case 3:
            days = 6;
            break;
        case 4:
            days = 5;
            break;
        case 5:
            days = 4;
            break;
        case 6:
            days = 3;
            break;
        case 0:
            days = 3;
            break;
    }
    showDay(date, days)
}

// 將電影日期秀出來
function showDay(date, days) {
    let todatData = [date.getFullYear(), date.getMonth() + 1, date.getDate()];
    let text = '<option value="">-起選擇日期-</option>';
    text += `<option value="${date.getDay()}">${todatData.join(' / ')} (${weekFormat(date.getDay())})</option>`;
    for (let i = 0; i < days; i++) {
        date.setDate(date.getDate() + 1);
        let data = [date.getFullYear(), date.getMonth() + 1, date.getDate()];
        text += `<option value="${date.getDay()}">${data.join(' / ')} (${weekFormat(date.getDay())})</option>`;
    }
    $('#dateOp').html(text);
}

// 將星期改成國字
function weekFormat(week) {
    let weekZh = '';
    switch (week) {
        case 1:
            weekZh = '一';
            break;
        case 2:
            weekZh = '二';
            break;
        case 3:
            weekZh = '三';
            break;
        case 4:
            weekZh = '四';
            break;
        case 5:
            weekZh = '五';
            break;
        case 6:
            weekZh = '六';
            break;
        case 0:
            weekZh = '日';
            break;
    }
    return weekZh;
}

// 取得電影資料
function getMovie(week) {
    $.ajax({
        type: "GET",
        url: "movieTime.json",
        dataType: "JSON",
        success: function (response) {
            let movie = response.filter(res => res.movieDay == week);
            let text = '<div class="col-4">';
            for (let i = 0; i < movie.length; i++) {
                text += '<div class="card text-center">';
                text += `<div class="card-header"><span class="h3">${movie[i].movieName}</span></div>`;
                text += '<div class="card-body">';
                text += `<p><img src="${movie[0].movieImg}" width="200px"></p>`;
                text += `<p>片長 : ${movie[0].movieLength}</p>`;
                text += `<p>上映日期 : ${movie[0].movieUpDate}</p>`;
                text += '</div></div>';
            }
            text += '</div>';
            $('aside>.row').html(text);
        }
    });
}