let dateTime = new Date();
let weekArray = ['日', '一', '二', '三', '四', '五', '六']; // 星期轉中文
let days = [2, 1, 0, 6, 5, 4, 3]; // 顯示天數
showDay(dateTime, days[dateTime.getDay()]);

// 測試日期選項
$('#inputDate').change(function (e) {
    e.preventDefault();
    let jumpToDate = $(this).val();
    if (jumpToDate != '') {
        dateTime = new Date(jumpToDate);
        showDay(dateTime, days[dateTime.getDay()]);
    } else {
        dateTime = new Date();
        showDay(dateTime, days[dateTime.getDay()]);
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

// 將日期秀出來
function showDay(date, days) {
    let todatData = [date.getFullYear(), date.getMonth() + 1, date.getDate()];
    let text = '<option value="">-起選擇日期-</option>';
    text += `<option value="${date.getDay()}">${todatData.join(' / ')} (${weekArray[date.getDay()]})</option>`;
    for (let i = 0; i < days; i++) {
        date.setDate(date.getDate() + 1);
        let data = [date.getFullYear(), date.getMonth() + 1, date.getDate()];
        text += `<option value="${date.getDay()}">${data.join(' / ')} (${weekArray[date.getDay()]})</option>`;
    }
    $('#dateOp').html(text);
}

// 取得電影資料
function getMovie(week) {
    $.ajax({
        type: "GET",
        url: "movieTime.json",
        dataType: "JSON",
        success: function (response) {
            let movie = response.filter(res => res.movieDay == week);
            let text = '';
            for (let i = 0; i < movie.length; i++) {
                text += `
                <div class="card text-center">
                    <div class="card-header">
                        <span class="h3">${movie[i].movieName}</span>
                    </div>
                    <div class="card-body">
                        <p><img src="${movie[0].movieImg}"></p>
                        <p>片長 : ${movie[0].movieLength}</p>
                        <p>上映日期 : ${movie[0].movieUpDate}</p>
                    </div>
                </div>
                `;
            }
            text += '</div>';
            $('aside>.row>.col-12').html(text);
        }
    });
}