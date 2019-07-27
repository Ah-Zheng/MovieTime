let d = new Date();
let weekZh = ['日', '一', '二', '三', '四', '五', '六'];
let days = [2, 1, 0, 6, 5, 4, 3]; // 顯示天數
let theaterAr = ['親親戲院', '日新大戲院', '威秀影城', '秀泰影城', '全球影城', '萬代福影城'];
let movie;
showTheaterOp();
showDateOp(d, days[d.getDay()]);

// 測試日期選擇
$('#inputDate').change(function (e) {
    e.preventDefault();
    if ($(this).val() != '') {
        d = new Date($(this).val());
        showDateOp(d, days[d.getDay()]);
    } else {
        showDateOp(d, days[d.getDay()]);
    }
});

// 戲院選擇
$('#theaterOp').change(function (e) {
    e.preventDefault();
    if ($(this).val() != '') {
        showMovieOp($(this).val());
    }
});

// 戲院選項
function showTheaterOp() {
    let text = '<option value="">-請選擇戲院-</option>';
    for (let i = 0; i < theaterAr.length; i++) {
        text += `<option value="${theaterAr[i]}">${theaterAr[i]}</option>`;
    }
    $('#theaterOp').html(text);
}

// 電影選項
function showMovieOp(theaterIndex) {
    $.ajax({
        type: "GET",
        url: "data.json",
        dataType: "JSON",
        success: function (response) {
            let movieAr = response.filter(res => res.theater == theaterIndex);
            let text = '<option value="">-請選擇戲院-</option>';
            for (let i = 0; i < movieAr[0].movieList.length; i++) {
                text += `<option value="${movieAr[0].movieList[i]}">${movieAr[0].movieList[i]}</option>`;
            }
            $('#movieOp').html(text);
        }
    });
}

// 日期選項
function showDateOp(date, days) {
    let todayData = [date.getFullYear(), date.getMonth() + 1, date.getDate()];
    let text = '<option value="">-請選擇日期-</option>';
    text += `<option value="${date.getDay()}">${todayData.join(' / ')} (${weekZh[date.getDay()]})</option>`;
    for (let i = 0; i < days; i++) {
        date.setDate(date.getDate() + 1);
        let data = [date.getFullYear(), date.getMonth() + 1, date.getDate()];
        text += `<option value="${date.getDay()}">${data.join(' / ')} (${weekZh[date.getDay()]})</option>`;
    }
    $('#dateOp').html(text);
}