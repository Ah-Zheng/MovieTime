
$('#btn').click(function (e) {
    e.preventDefault();
    let jumpToDate = $('#inputDate').val();
    let dateTime = new Date(jumpToDate);
    showHowManyDay(dateTime, dateTime.getDay());
});
// 判斷要顯示幾天
function showHowManyDay(date, week) {
    switch (week) {
        case 1:
            showDay(date, 3);
            break;
        case 2:
            showDay(date, 2);
            break;
        case 3:
            showDay(date, 8);
            break;
        case 4:
            showDay(date, 7);
            break;
        case 5:
            showDay(date, 6);
            break;
        case 6:
            showDay(date, 5);
            break;
        case 0:
            showDay(date, 4);
            break;
    }
}

// 將選項秀出來
function showDay(date, days) {
    let todatData = [date.getFullYear(), date.getMonth() + 1, date.getDate()];
    let text = `<option value="">${todatData.join(' / ')} (${weekFormat(date.getDay())})</option>`;
    for (let i = 0; i < days; i++) {
        date.setDate(date.getDate() + 1);
        let data = [date.getFullYear(), date.getMonth() + 1, date.getDate()];
        text += `<option value="">${data.join(' / ')} (${weekFormat(date.getDay())})</option>`;
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